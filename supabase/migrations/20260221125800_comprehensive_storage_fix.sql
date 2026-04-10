-- Comprehensive Storage RLS Fix Migration
-- This migration completely resets and recreates storage policies for the restaurant-images bucket
-- to ensure authenticated users can upload, update, delete, and read images

-- Step 1: Drop all existing storage policies to start fresh
DROP POLICY IF EXISTS "authenticated_users_upload_images" ON storage.objects;
DROP POLICY IF EXISTS "authenticated_users_update_images" ON storage.objects;
DROP POLICY IF EXISTS "authenticated_users_delete_images" ON storage.objects;
DROP POLICY IF EXISTS "public_read_images" ON storage.objects;
DROP POLICY IF EXISTS "admin_upload_images" ON storage.objects;
DROP POLICY IF EXISTS "admin_update_images" ON storage.objects;
DROP POLICY IF EXISTS "admin_delete_images" ON storage.objects;

-- Step 2: Ensure the bucket exists and is properly configured
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'restaurant-images',
  'restaurant-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Step 3: Create comprehensive storage policies for authenticated users
-- These policies allow authenticated users (admin panel users) to perform all operations

-- Policy 1: Allow authenticated users to INSERT (upload) images
CREATE POLICY "authenticated_users_upload_images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'restaurant-images'
);

-- Policy 2: Allow authenticated users to SELECT (read) images
CREATE POLICY "authenticated_users_read_images"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'restaurant-images'
);

-- Policy 3: Allow authenticated users to UPDATE images
CREATE POLICY "authenticated_users_update_images"
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
CREATE POLICY "authenticated_users_delete_images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'restaurant-images'
);

-- Policy 5: Allow public (anon + authenticated) to SELECT (read) images
-- This is needed for displaying images on the public-facing website
CREATE POLICY "public_read_images"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'restaurant-images'
);

-- Step 4: Ensure RLS is enabled on storage.objects (should already be enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;