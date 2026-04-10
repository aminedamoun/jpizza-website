-- Admin Storage and Policies Migration
-- Creates storage bucket for restaurant images and admin RLS policies

-- 1. Create storage bucket for restaurant images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'restaurant-images',
  'restaurant-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- 2. Create storage policies for authenticated users (admin access)
DROP POLICY IF EXISTS "authenticated_users_upload_images" ON storage.objects;
CREATE POLICY "authenticated_users_upload_images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'restaurant-images');

DROP POLICY IF EXISTS "authenticated_users_update_images" ON storage.objects;
CREATE POLICY "authenticated_users_update_images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'restaurant-images')
WITH CHECK (bucket_id = 'restaurant-images');

DROP POLICY IF EXISTS "authenticated_users_delete_images" ON storage.objects;
CREATE POLICY "authenticated_users_delete_images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'restaurant-images');

DROP POLICY IF EXISTS "public_read_images" ON storage.objects;
CREATE POLICY "public_read_images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'restaurant-images');

-- 3. Add admin RLS policies for menu_items table
DROP POLICY IF EXISTS "admin_manage_menu_items" ON public.menu_items;
CREATE POLICY "admin_manage_menu_items"
ON public.menu_items
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 4. Add admin RLS policies for restaurant_images table
DROP POLICY IF EXISTS "admin_manage_restaurant_images" ON public.restaurant_images;
CREATE POLICY "admin_manage_restaurant_images"
ON public.restaurant_images
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5. Add admin RLS policies for offers table
DROP POLICY IF EXISTS "admin_manage_offers" ON public.offers;
CREATE POLICY "admin_manage_offers"
ON public.offers
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);