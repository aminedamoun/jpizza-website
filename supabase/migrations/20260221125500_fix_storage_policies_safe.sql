-- Safe Storage RLS Policies Migration
-- Recreates storage policies for restaurant-images bucket with proper error handling

-- Use DO block to handle policy recreation safely
DO $$
BEGIN
  -- Drop and recreate INSERT policy
  BEGIN
    DROP POLICY IF EXISTS "authenticated_users_upload_images" ON storage.objects;
  EXCEPTION
    WHEN insufficient_privilege THEN
      RAISE NOTICE 'Skipping drop of authenticated_users_upload_images - insufficient privileges';
    WHEN undefined_object THEN
      RAISE NOTICE 'Policy authenticated_users_upload_images does not exist';
  END;

  BEGIN
    CREATE POLICY "authenticated_users_upload_images"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'restaurant-images');
  EXCEPTION
    WHEN duplicate_object THEN
      RAISE NOTICE 'Policy authenticated_users_upload_images already exists';
  END;

  -- Drop and recreate UPDATE policy
  BEGIN
    DROP POLICY IF EXISTS "authenticated_users_update_images" ON storage.objects;
  EXCEPTION
    WHEN insufficient_privilege THEN
      RAISE NOTICE 'Skipping drop of authenticated_users_update_images - insufficient privileges';
    WHEN undefined_object THEN
      RAISE NOTICE 'Policy authenticated_users_update_images does not exist';
  END;

  BEGIN
    CREATE POLICY "authenticated_users_update_images"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (bucket_id = 'restaurant-images')
    WITH CHECK (bucket_id = 'restaurant-images');
  EXCEPTION
    WHEN duplicate_object THEN
      RAISE NOTICE 'Policy authenticated_users_update_images already exists';
  END;

  -- Drop and recreate DELETE policy
  BEGIN
    DROP POLICY IF EXISTS "authenticated_users_delete_images" ON storage.objects;
  EXCEPTION
    WHEN insufficient_privilege THEN
      RAISE NOTICE 'Skipping drop of authenticated_users_delete_images - insufficient privileges';
    WHEN undefined_object THEN
      RAISE NOTICE 'Policy authenticated_users_delete_images does not exist';
  END;

  BEGIN
    CREATE POLICY "authenticated_users_delete_images"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'restaurant-images');
  EXCEPTION
    WHEN duplicate_object THEN
      RAISE NOTICE 'Policy authenticated_users_delete_images already exists';
  END;

  -- Drop and recreate SELECT policy
  BEGIN
    DROP POLICY IF EXISTS "public_read_images" ON storage.objects;
  EXCEPTION
    WHEN insufficient_privilege THEN
      RAISE NOTICE 'Skipping drop of public_read_images - insufficient privileges';
    WHEN undefined_object THEN
      RAISE NOTICE 'Policy public_read_images does not exist';
  END;

  BEGIN
    CREATE POLICY "public_read_images"
    ON storage.objects
    FOR SELECT
    TO public
    USING (bucket_id = 'restaurant-images');
  EXCEPTION
    WHEN duplicate_object THEN
      RAISE NOTICE 'Policy public_read_images already exists';
  END;
END $$;

-- Ensure RLS is enabled (this should work even without ownership)
DO $$
BEGIN
  ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN insufficient_privilege THEN
    RAISE NOTICE 'RLS already enabled or insufficient privileges';
END $$;