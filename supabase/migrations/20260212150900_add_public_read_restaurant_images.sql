-- Add public read access to restaurant_images table
-- This allows the public homepage gallery to display images
-- Only active images are visible to the public

-- Add public SELECT policy for restaurant_images table
DROP POLICY IF EXISTS "public_read_restaurant_images" ON public.restaurant_images;
CREATE POLICY "public_read_restaurant_images"
ON public.restaurant_images
FOR SELECT
TO public
USING (is_active = true);

-- The existing admin policy allows authenticated users to manage all images
-- This new policy allows public users to only read active images