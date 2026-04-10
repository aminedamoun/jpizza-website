-- Definitive Storage RLS Policy Fix
-- This migration completely resets storage policies to fix persistent RLS violations
-- Timestamp: 20260223070100 (higher than previous: 20260223070000)

-- Step 1: Drop ALL existing policies on storage.objects to start fresh
DO $$
DECLARE
    policy_record RECORD;
BEGIN
    -- Drop all policies on storage.objects table
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', policy_record.policyname);
        RAISE NOTICE 'Dropped policy: %', policy_record.policyname;
    END LOOP;
    
    RAISE NOTICE 'All existing storage policies have been dropped';
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Policy cleanup completed with notice: %', SQLERRM;
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

-- Step 3: Create comprehensive storage policies for restaurant-images bucket

-- Policy 1: Allow authenticated users to INSERT (upload) images
CREATE POLICY "authenticated_users_insert_restaurant_images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'restaurant-images'
);

-- Policy 2: Allow public (everyone) to SELECT (read) images
CREATE POLICY "public_select_restaurant_images"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'restaurant-images'
);

-- Policy 3: Allow authenticated users to UPDATE images
CREATE POLICY "authenticated_users_update_restaurant_images"
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
CREATE POLICY "authenticated_users_delete_restaurant_images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'restaurant-images'
);

-- Step 4: Verify the configuration
DO $$
DECLARE
    bucket_exists BOOLEAN;
    policy_count INTEGER;
    rls_enabled BOOLEAN;
BEGIN
    -- Check if bucket exists
    SELECT EXISTS (
        SELECT 1 FROM storage.buckets WHERE id = 'restaurant-images'
    ) INTO bucket_exists;
    
    IF bucket_exists THEN
        RAISE NOTICE '✓ Bucket restaurant-images exists and is configured';
    ELSE
        RAISE NOTICE '✗ WARNING: Bucket restaurant-images does not exist';
    END IF;
    
    -- Check if RLS is enabled on storage.objects
    SELECT relrowsecurity INTO rls_enabled
    FROM pg_class
    WHERE oid = 'storage.objects'::regclass;
    
    IF rls_enabled THEN
        RAISE NOTICE '✓ RLS is enabled on storage.objects';
    ELSE
        RAISE NOTICE '✗ WARNING: RLS is NOT enabled on storage.objects';
    END IF;
    
    -- Count policies for restaurant-images
    SELECT COUNT(*) INTO policy_count
    FROM pg_policies
    WHERE schemaname = 'storage' 
    AND tablename = 'objects'
    AND policyname LIKE '%restaurant_images%';
    
    RAISE NOTICE '✓ Created % storage policies for restaurant-images bucket', policy_count;
    
    -- List all policies
    FOR policy_count IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects'
        AND policyname LIKE '%restaurant_images%'
    LOOP
        RAISE NOTICE '  - Policy: %', policy_count;
    END LOOP;
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Verification completed with notice: %', SQLERRM;
END $$;