-- Correct Storage RLS Policy Fix
-- This migration fixes storage policies using the proper Supabase storage policy system
-- instead of directly manipulating storage.objects table

-- Step 1: Ensure bucket exists and is properly configured
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

-- Step 2: Drop existing policies safely (if they exist)
DROP POLICY IF EXISTS "authenticated_insert_restaurant_images" ON storage.objects;
DROP POLICY IF EXISTS "authenticated_select_restaurant_images" ON storage.objects;
DROP POLICY IF EXISTS "authenticated_update_restaurant_images" ON storage.objects;
DROP POLICY IF EXISTS "authenticated_delete_restaurant_images" ON storage.objects;
DROP POLICY IF EXISTS "public_select_restaurant_images" ON storage.objects;
DROP POLICY IF EXISTS "Give users authenticated access to folder" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated reads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;

-- Step 3: Create comprehensive storage policies for authenticated users
-- Policy 1: Allow authenticated users to INSERT (upload) images
CREATE POLICY "Allow authenticated users to upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'restaurant-images'
);

-- Policy 2: Allow public (everyone) to SELECT (read) images
-- This is needed for displaying images on the public-facing website
CREATE POLICY "Allow public to view images"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'restaurant-images'
);

-- Policy 3: Allow authenticated users to UPDATE images
CREATE POLICY "Allow authenticated users to update images"
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
CREATE POLICY "Allow authenticated users to delete images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'restaurant-images'
);

-- Step 4: Verify the bucket configuration
DO $$
DECLARE
    bucket_exists BOOLEAN;
    policy_count INTEGER;
BEGIN
    -- Check if bucket exists
    SELECT EXISTS (
        SELECT 1 FROM storage.buckets WHERE id = 'restaurant-images'
    ) INTO bucket_exists;
    
    IF bucket_exists THEN
        RAISE NOTICE 'Bucket restaurant-images exists and is configured';
    ELSE
        RAISE NOTICE 'WARNING: Bucket restaurant-images does not exist';
    END IF;
    
    -- Count policies
    SELECT COUNT(*) INTO policy_count
    FROM pg_policies
    WHERE schemaname = 'storage' 
    AND tablename = 'objects'
    AND policyname LIKE '%images%';
    
    RAISE NOTICE 'Created % storage policies for restaurant-images bucket', policy_count;
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Verification completed with notice: %', SQLERRM;
END $$;