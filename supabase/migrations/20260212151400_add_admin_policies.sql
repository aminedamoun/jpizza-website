-- Add admin policies for authenticated users
-- This allows authenticated users to perform all CRUD operations
-- on menu_items, restaurant_images, and offers tables

-- ============================================
-- MENU ITEMS POLICIES
-- ============================================

-- Allow authenticated users to read all menu items (including inactive ones)
DROP POLICY IF EXISTS "admin_read_menu_items" ON public.menu_items;
CREATE POLICY "admin_read_menu_items"
ON public.menu_items
FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to insert menu items
DROP POLICY IF EXISTS "admin_insert_menu_items" ON public.menu_items;
CREATE POLICY "admin_insert_menu_items"
ON public.menu_items
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update menu items
DROP POLICY IF EXISTS "admin_update_menu_items" ON public.menu_items;
CREATE POLICY "admin_update_menu_items"
ON public.menu_items
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users to delete menu items
DROP POLICY IF EXISTS "admin_delete_menu_items" ON public.menu_items;
CREATE POLICY "admin_delete_menu_items"
ON public.menu_items
FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- RESTAURANT IMAGES POLICIES
-- ============================================

-- Allow authenticated users to read all restaurant images (including inactive ones)
DROP POLICY IF EXISTS "admin_read_restaurant_images" ON public.restaurant_images;
CREATE POLICY "admin_read_restaurant_images"
ON public.restaurant_images
FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to insert restaurant images
DROP POLICY IF EXISTS "admin_insert_restaurant_images" ON public.restaurant_images;
CREATE POLICY "admin_insert_restaurant_images"
ON public.restaurant_images
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update restaurant images
DROP POLICY IF EXISTS "admin_update_restaurant_images" ON public.restaurant_images;
CREATE POLICY "admin_update_restaurant_images"
ON public.restaurant_images
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users to delete restaurant images
DROP POLICY IF EXISTS "admin_delete_restaurant_images" ON public.restaurant_images;
CREATE POLICY "admin_delete_restaurant_images"
ON public.restaurant_images
FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- OFFERS POLICIES
-- ============================================

-- Allow authenticated users to read all offers (including inactive ones)
DROP POLICY IF EXISTS "admin_read_offers" ON public.offers;
CREATE POLICY "admin_read_offers"
ON public.offers
FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to insert offers
DROP POLICY IF EXISTS "admin_insert_offers" ON public.offers;
CREATE POLICY "admin_insert_offers"
ON public.offers
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update offers
DROP POLICY IF EXISTS "admin_update_offers" ON public.offers;
CREATE POLICY "admin_update_offers"
ON public.offers
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users to delete offers
DROP POLICY IF EXISTS "admin_delete_offers" ON public.offers;
CREATE POLICY "admin_delete_offers"
ON public.offers
FOR DELETE
TO authenticated
USING (true);
