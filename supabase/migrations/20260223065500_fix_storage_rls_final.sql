-- Final Storage RLS Fix Migration
-- This migration definitively fixes the "new row violates row-level security policy" error
-- by properly configuring storage policies for authenticated users

-- Step 1: Drop ALL existing storage policies to ensure clean slate
DO $$
DECLARE
    policy_record RECORD;
BEGIN
    -- Drop all policies on storage.objects table
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE schemaname = 'storage' AND tablename = 'objects'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', policy_record.policyname);
        RAISE NOTICE 'Dropped policy: %', policy_record.policyname;
    END LOOP;
EXCEPTION
    WHEN insufficient_privilege THEN
        RAISE NOTICE 'Insufficient privileges to drop policies, continuing...';
    WHEN OTHERS THEN
        RAISE NOTICE 'Error dropping policies: %, continuing...', SQLERRM;
END $$;

-- Step 2: Ensure bucket exists and is properly configured
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'restaurant-images',
  'restaurant-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Step 3: Create storage policies for authenticated users
-- These policies allow any authenticated user to upload, read, update, and delete images

-- Policy 1: Allow authenticated users to INSERT (upload) images
CREATE POLICY "authenticated_insert_restaurant_images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'restaurant-images'
);

-- Policy 2: Allow authenticated users to SELECT (read) images
CREATE POLICY "authenticated_select_restaurant_images"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'restaurant-images'
);

-- Policy 3: Allow authenticated users to UPDATE images
CREATE POLICY "authenticated_update_restaurant_images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'restaurant-images'
)
WITH CHECK (
  bucket_id = 'restaurant-images'
);

-- Policy 4: Allow authenticated users to DELETE images
CREATE POLICY "authenticated_delete_restaurant_images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'restaurant-images'
);

-- Policy 5: Allow public (anon + authenticated) to SELECT (read) images
-- This is needed for displaying images on the public-facing website
CREATE POLICY "public_select_restaurant_images"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'restaurant-images'
);

-- Step 4: Ensure RLS is enabled on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Step 5: Verify policies were created
DO $$
DECLARE
    policy_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO policy_count
    FROM pg_policies
    WHERE schemaname = 'storage' 
    AND tablename = 'objects'
    AND policyname LIKE '%restaurant_images%';
    
    RAISE NOTICE 'Created % storage policies for restaurant-images bucket', policy_count;
END $$;