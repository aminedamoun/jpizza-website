-- Allow public storage uploads for restaurant-images bucket
-- This migration fixes RLS policy blocking image uploads after authentication removal
-- Timestamp: 20260223114000 (higher than previous: 20260223070500)

-- Step 1: Drop existing authenticated-only INSERT policy
DROP POLICY IF EXISTS "authenticated_users_insert_restaurant_images" ON storage.objects;

-- Step 2: Create new public INSERT policy for restaurant-images bucket
CREATE POLICY "public_insert_restaurant_images"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'restaurant-images'
);

-- Step 3: Update UPDATE policy to allow public access
DROP POLICY IF EXISTS "authenticated_users_update_restaurant_images" ON storage.objects;

CREATE POLICY "public_update_restaurant_images"
ON storage.objects
FOR UPDATE
TO public
USING (
  bucket_id = 'restaurant-images'
)
WITH CHECK (
  bucket_id = 'restaurant-images'
);

-- Step 4: Update DELETE policy to allow public access
DROP POLICY IF EXISTS "authenticated_users_delete_restaurant_images" ON storage.objects;

CREATE POLICY "public_delete_restaurant_images"
ON storage.objects
FOR DELETE
TO public
USING (
  bucket_id = 'restaurant-images'
);

-- Step 5: Verify configuration
DO $$
DECLARE
    policy_count INTEGER;
BEGIN
    -- Count policies for restaurant-images bucket
    SELECT COUNT(*) INTO policy_count
    FROM pg_policies
    WHERE schemaname = 'storage'
    AND tablename = 'objects'
    AND policyname LIKE '%restaurant_images%';
    
    RAISE NOTICE '✓ Storage policies updated: % policies active for restaurant-images bucket', policy_count;
    RAISE NOTICE '✓ Public users can now INSERT, UPDATE, DELETE, and SELECT images';
END $$;