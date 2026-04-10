-- Allow public read access to menu items
DROP POLICY IF EXISTS "public_read_menu_items" ON public.menu_items;
CREATE POLICY "public_read_menu_items"
ON public.menu_items
FOR SELECT
TO public
USING (true);

-- Allow public insert access to menu items
DROP POLICY IF EXISTS "public_insert_menu_items" ON public.menu_items;
CREATE POLICY "public_insert_menu_items"
ON public.menu_items
FOR INSERT
TO public
WITH CHECK (true);

-- Allow public update access to menu items
DROP POLICY IF EXISTS "public_update_menu_items" ON public.menu_items;
CREATE POLICY "public_update_menu_items"
ON public.menu_items
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Allow public delete access to menu items
DROP POLICY IF EXISTS "public_delete_menu_items" ON public.menu_items;
CREATE POLICY "public_delete_menu_items"
ON public.menu_items
FOR DELETE
TO public
USING (true);

-- Allow public read access to restaurant images
DROP POLICY IF EXISTS "public_read_restaurant_images" ON public.restaurant_images;
CREATE POLICY "public_read_restaurant_images"
ON public.restaurant_images
FOR SELECT
TO public
USING (true);

-- Allow public insert access to restaurant images
DROP POLICY IF EXISTS "public_insert_restaurant_images" ON public.restaurant_images;
CREATE POLICY "public_insert_restaurant_images"
ON public.restaurant_images
FOR INSERT
TO public
WITH CHECK (true);

-- Allow public update access to restaurant images
DROP POLICY IF EXISTS "public_update_restaurant_images" ON public.restaurant_images;
CREATE POLICY "public_update_restaurant_images"
ON public.restaurant_images
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Allow public delete access to restaurant images
DROP POLICY IF EXISTS "public_delete_restaurant_images" ON public.restaurant_images;
CREATE POLICY "public_delete_restaurant_images"
ON public.restaurant_images
FOR DELETE
TO public
USING (true);

-- Allow public read access to offers
DROP POLICY IF EXISTS "public_read_offers" ON public.offers;
CREATE POLICY "public_read_offers"
ON public.offers
FOR SELECT
TO public
USING (true);

-- Allow public insert access to offers
DROP POLICY IF EXISTS "public_insert_offers" ON public.offers;
CREATE POLICY "public_insert_offers"
ON public.offers
FOR INSERT
TO public
WITH CHECK (true);

-- Allow public update access to offers
DROP POLICY IF EXISTS "public_update_offers" ON public.offers;
CREATE POLICY "public_update_offers"
ON public.offers
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Allow public delete access to offers
DROP POLICY IF EXISTS "public_delete_offers" ON public.offers;
CREATE POLICY "public_delete_offers"
ON public.offers
FOR DELETE
TO public
USING (true);

-- Log completion
DO $$
BEGIN
    RAISE NOTICE 'Public access policies created successfully for admin panel';
END $$;