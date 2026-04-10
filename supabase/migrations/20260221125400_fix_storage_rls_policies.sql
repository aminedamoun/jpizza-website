-- Fix Storage RLS Policies Migration
-- Ensures authenticated users can upload, update, and delete images in restaurant-images bucket

-- 1. Drop existing policies to recreate them idempotently
DROP POLICY IF EXISTS "authenticated_users_upload_images" ON storage.objects;
DROP POLICY IF EXISTS "authenticated_users_update_images" ON storage.objects;
DROP POLICY IF EXISTS "authenticated_users_delete_images" ON storage.objects;
DROP POLICY IF EXISTS "public_read_images" ON storage.objects;

-- 2. Create storage policies for authenticated users (admin access)
CREATE POLICY "authenticated_users_upload_images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'restaurant-images');

CREATE POLICY "authenticated_users_update_images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'restaurant-images')
WITH CHECK (bucket_id = 'restaurant-images');

CREATE POLICY "authenticated_users_delete_images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'restaurant-images');

CREATE POLICY "public_read_images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'restaurant-images');

-- 3. Ensure RLS is enabled on storage.objects (idempotent)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;