-- Menu Management Schema Migration
-- Creates tables for menu items, restaurant images, and offers

-- 1. Create ENUM types
DROP TYPE IF EXISTS public.menu_category CASCADE;
CREATE TYPE public.menu_category AS ENUM ('breakfast', 'small_appetizer', 'pizza', 'pasta', 'dessert', 'drinks');

DROP TYPE IF EXISTS public.offer_status CASCADE;
CREATE TYPE public.offer_status AS ENUM ('active', 'inactive', 'scheduled');

-- 2. Create menu_items table
CREATE TABLE IF NOT EXISTS public.menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category public.menu_category NOT NULL,
    image_url TEXT NOT NULL,
    image_alt TEXT NOT NULL,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_available BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create restaurant_images table
CREATE TABLE IF NOT EXISTS public.restaurant_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    image_alt TEXT NOT NULL,
    span_class TEXT DEFAULT '',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create offers table
CREATE TABLE IF NOT EXISTS public.offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    image_alt TEXT NOT NULL,
    cta_text TEXT DEFAULT 'Order Now',
    cta_link TEXT DEFAULT '/delivery',
    status public.offer_status DEFAULT 'active'::public.offer_status,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. Create indexes
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON public.menu_items(category);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON public.menu_items(is_available);
CREATE INDEX IF NOT EXISTS idx_menu_items_display_order ON public.menu_items(display_order);
CREATE INDEX IF NOT EXISTS idx_restaurant_images_active ON public.restaurant_images(is_active);
CREATE INDEX IF NOT EXISTS idx_restaurant_images_display_order ON public.restaurant_images(display_order);
CREATE INDEX IF NOT EXISTS idx_offers_status ON public.offers(status);
CREATE INDEX IF NOT EXISTS idx_offers_display_order ON public.offers(display_order);

-- 6. Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- 7. Create triggers for updated_at
DROP TRIGGER IF EXISTS update_menu_items_updated_at ON public.menu_items;
CREATE TRIGGER update_menu_items_updated_at
    BEFORE UPDATE ON public.menu_items
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_restaurant_images_updated_at ON public.restaurant_images;
CREATE TRIGGER update_restaurant_images_updated_at
    BEFORE UPDATE ON public.restaurant_images
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_offers_updated_at ON public.offers;
CREATE TRIGGER update_offers_updated_at
    BEFORE UPDATE ON public.offers
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- 8. Enable RLS
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

-- 9. Create RLS policies (public read access)
DROP POLICY IF EXISTS "public_read_menu_items" ON public.menu_items;
CREATE POLICY "public_read_menu_items"
ON public.menu_items
FOR SELECT
TO public
USING (is_available = true);

DROP POLICY IF EXISTS "public_read_restaurant_images" ON public.restaurant_images;
CREATE POLICY "public_read_restaurant_images"
ON public.restaurant_images
FOR SELECT
TO public
USING (is_active = true);

DROP POLICY IF EXISTS "public_read_offers" ON public.offers;
CREATE POLICY "public_read_offers"
ON public.offers
FOR SELECT
TO public
USING (
    status = 'active'::public.offer_status
    AND (start_date IS NULL OR start_date <= CURRENT_TIMESTAMP)
    AND (end_date IS NULL OR end_date >= CURRENT_TIMESTAMP)
);

-- 10. Insert mock data for menu items
DO $$
BEGIN
    -- Pizza Items
    INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, tags, display_order)
    VALUES
        ('Margherita DOC', 'San Marzano tomatoes, buffalo mozzarella, fresh basil, extra virgin olive oil', 45.00, 'pizza'::public.menu_category, 'https://images.unsplash.com/photo-1677357903776-6a5c18c729e6', 'Margherita pizza with buffalo mozzarella, tomato sauce, and fresh basil leaves on traditional crust', ARRAY['Vegetarian']::TEXT[], 1),
        ('Marinara', 'San Marzano tomatoes, garlic, oregano, extra virgin olive oil (no cheese)', 38.00, 'pizza'::public.menu_category, 'https://img.rocket.new/generatedImages/rocket_gen_img_1769c9345-1765214342986.png', 'Marinara pizza with tomato sauce, garlic, and oregano on thin crust', ARRAY['Vegan']::TEXT[], 2),
        ('Napoli', 'Tomato sauce, mozzarella, anchovies, capers, oregano', 48.00, 'pizza'::public.menu_category, 'https://images.unsplash.com/photo-1724116382330-129f46c9c2ae', 'Naples-style pizza with anchovies, capers, and oregano on mozzarella base', ARRAY[]::TEXT[], 3),
        ('Quattro Stagioni', 'Tomato sauce, mozzarella, mushrooms, ham, artichokes, olives (four seasons)', 55.00, 'pizza'::public.menu_category, 'https://img.rocket.new/generatedImages/rocket_gen_img_12773ca67-1765630893941.png', 'Four seasons pizza divided into quarters with mushrooms, ham, artichokes, and olives', ARRAY[]::TEXT[], 4),
        ('Diavola', 'Spicy salami, tomato sauce, mozzarella, chili flakes, oregano', 52.00, 'pizza'::public.menu_category, 'https://img.rocket.new/generatedImages/rocket_gen_img_107b3b30f-1765319154480.png', 'Spicy Diavola pizza topped with salami, red chili flakes, melted mozzarella on crispy crust', ARRAY['Spicy']::TEXT[], 5),
        ('Quattro Formaggi', 'Mozzarella, gorgonzola, parmesan, taleggio, white base', 58.00, 'pizza'::public.menu_category, 'https://img.rocket.new/generatedImages/rocket_gen_img_14bd2b5b2-1764696426492.png', 'Four cheese pizza with melted mozzarella, gorgonzola, parmesan, and taleggio on white sauce base', ARRAY['Vegetarian']::TEXT[], 6),
        ('Prosciutto e Rucola', 'Parma ham, arugula, cherry tomatoes, parmesan shavings, balsamic glaze', 62.00, 'pizza'::public.menu_category, 'https://images.unsplash.com/photo-1646257106101-b3913ef72c6f', 'Prosciutto pizza topped with thin-sliced Parma ham, fresh arugula, cherry tomatoes, and parmesan', ARRAY[]::TEXT[], 7),
        ('Funghi e Tartufo', 'Mixed mushrooms, truffle oil, mozzarella, thyme, garlic', 68.00, 'pizza'::public.menu_category, 'https://images.unsplash.com/photo-1530632789071-8543f47edb34', 'Mushroom and truffle pizza with mixed fungi, drizzled truffle oil, fresh thyme, and melted cheese', ARRAY['Vegetarian', 'Premium']::TEXT[], 8),
        ('Frutti di Mare', 'Tomato sauce, mixed seafood (shrimp, mussels, calamari), garlic, parsley', 72.00, 'pizza'::public.menu_category, 'https://images.unsplash.com/photo-1649458816208-8da25c24557f', 'Seafood pizza topped with shrimp, mussels, calamari, and fresh parsley', ARRAY['Premium']::TEXT[], 9),
        ('Ortolana', 'Grilled vegetables (zucchini, eggplant, peppers), tomato sauce, vegan mozzarella', 48.00, 'pizza'::public.menu_category, 'https://images.unsplash.com/photo-1506095075646-383d9629a42e', 'Vegan vegetable pizza with grilled zucchini, eggplant, and peppers', ARRAY['Vegan']::TEXT[], 10),
        ('Pesto Verde', 'Vegan pesto, cherry tomatoes, pine nuts, vegan mozzarella, arugula', 52.00, 'pizza'::public.menu_category, 'https://images.unsplash.com/photo-1714305219586-b72a00732eb7', 'Vegan pesto pizza with cherry tomatoes, pine nuts, and fresh arugula', ARRAY['Vegan']::TEXT[], 11)
    ON CONFLICT (id) DO NOTHING;

    -- Small Appetizers
    INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, display_order)
    VALUES
        ('Burrata Pugliese', 'Fresh burrata cheese with heirloom tomatoes and basil', 38.00, 'small_appetizer'::public.menu_category, 'https://images.unsplash.com/photo-1603615502450-b7fb9f176bdd', 'Fresh burrata cheese with colorful heirloom tomatoes and basil leaves', 12),
        ('Arancini Siciliani', 'Fried rice balls with mozzarella and meat ragù', 28.00, 'small_appetizer'::public.menu_category, 'https://images.unsplash.com/photo-1688458296759-91020b4ff2ba', 'Golden fried arancini rice balls served with marinara sauce', 13),
        ('Insalata Mista', 'Mixed greens, cherry tomatoes, olives, Italian dressing', 22.00, 'small_appetizer'::public.menu_category, 'https://images.unsplash.com/photo-1549641477-4c46a164b00e', 'Fresh mixed green salad with cherry tomatoes and black olives', 14)
    ON CONFLICT (id) DO NOTHING;

    -- Drinks
    INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, display_order)
    VALUES
        ('Limonata Italiana', 'Fresh lemon soda with mint', 18.00, 'drinks'::public.menu_category, 'https://images.unsplash.com/photo-1620400081393-69907fa4e510', 'Italian lemon soda in glass with fresh mint and ice', 15),
        ('Aranciata Rossa', 'Blood orange soda', 18.00, 'drinks'::public.menu_category, 'https://images.unsplash.com/photo-1657014462907-cdeb97a7de54', 'Red blood orange Italian soda in glass bottle', 16),
        ('Espresso', 'Italian espresso coffee', 15.00, 'drinks'::public.menu_category, 'https://images.unsplash.com/photo-1588716857257-8603edde1d83', 'Single shot of Italian espresso in white ceramic cup', 17)
    ON CONFLICT (id) DO NOTHING;

    RAISE NOTICE 'Menu items inserted successfully';
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Menu items insertion failed: %', SQLERRM;
END $$;

-- 11. Insert mock data for restaurant images
DO $$
BEGIN
    INSERT INTO public.restaurant_images (title, image_url, image_alt, span_class, display_order)
    VALUES
        ('Restaurant Interior', 'https://img.rocket.new/generatedImages/rocket_gen_img_1f587d908-1765261181204.png', 'Elegant restaurant interior with warm lighting, wooden tables, and modern Italian decor', 'lg:col-span-2 lg:row-span-2', 1),
        ('Traditional Oven', 'https://images.unsplash.com/photo-1735152128905-1c2d44391813', 'Chef preparing authentic Italian pizza in traditional brick oven', '', 2),
        ('Pizza Preparation', 'https://images.unsplash.com/photo-1610913729774-a5e4746b5939', 'Close-up of artisan pizza dough being hand-stretched by experienced pizzaiolo', '', 3),
        ('Fresh Pizza', 'https://images.unsplash.com/photo-1726298882906-6d01c9116e13', 'Freshly baked margherita pizza with melted mozzarella, basil, and tomato sauce', '', 4),
        ('Dining Area', 'https://img.rocket.new/generatedImages/rocket_gen_img_121bbeb80-1767014779396.png', 'Cozy restaurant dining area with intimate booth seating and ambient lighting', '', 5),
        ('Italian Cuisine', 'https://img.rocket.new/generatedImages/rocket_gen_img_1510aa8bf-1764886094732.png', 'Beautifully plated Italian appetizers and fresh ingredients on rustic wooden table', 'lg:col-span-2', 6)
    ON CONFLICT (id) DO NOTHING;

    RAISE NOTICE 'Restaurant images inserted successfully';
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Restaurant images insertion failed: %', SQLERRM;
END $$;

-- 12. Insert mock data for offers
DO $$
BEGIN
    INSERT INTO public.offers (title, subtitle, description, image_url, image_alt, cta_text, cta_link, status, display_order)
    VALUES
        ('Get Your JPIZZA Pizza Delivered', 'Delivery Service', 'Authentic Italian pizza delivered hot and fresh. Experience the same quality and taste from the comfort of your home.', 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca', 'Delicious JPizza margherita with fresh basil being delivered hot from traditional oven', 'Order Delivery', '/delivery', 'active'::public.offer_status, 1)
    ON CONFLICT (id) DO NOTHING;

    RAISE NOTICE 'Offers inserted successfully';
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Offers insertion failed: %', SQLERRM;
END $$;