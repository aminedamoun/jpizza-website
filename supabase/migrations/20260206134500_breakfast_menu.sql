-- Breakfast Menu Migration
-- Adds breakfast categories and comprehensive breakfast menu items

-- 1. Add breakfast categories to existing menu_category enum
ALTER TYPE public.menu_category ADD VALUE IF NOT EXISTS 'breakfast_combos';
ALTER TYPE public.menu_category ADD VALUE IF NOT EXISTS 'toasts_eggs';
ALTER TYPE public.menu_category ADD VALUE IF NOT EXISTS 'signature_breakfast';
ALTER TYPE public.menu_category ADD VALUE IF NOT EXISTS 'healthy_lifestyle';
ALTER TYPE public.menu_category ADD VALUE IF NOT EXISTS 'light_plates_salads';
ALTER TYPE public.menu_category ADD VALUE IF NOT EXISTS 'sweet_breakfast';

-- 2. Insert breakfast menu items
DO $$
BEGIN
    -- Breakfast Combos
    INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, tags, display_order)
    VALUES
        ('J''s Double Breakfast Combo', 'Shakshuka with omelette, tomato, potato, butter, and feta cheese. Served with Greek yogurt drizzled with honey, black olives, fresh cucumber and tomato, walnuts, blackberries, a hint of strawberry syrup, and J''s special bread.', 149.00, 'breakfast_combos'::public.menu_category, 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666', 'Double breakfast combo plate with shakshuka, omelette, Greek yogurt, fresh fruits, and artisan bread', ARRAY['Vegetarian', 'Premium']::TEXT[], 100),
        ('J''s Single Breakfast Combo', 'Tender potatoes with butter and feta cheese, fresh tomato and cucumber, black olives, crunchy walnuts, and juicy blackberries. Served with Greek yogurt drizzled with honey and J''s special bread.', 99.00, 'breakfast_combos'::public.menu_category, 'https://images.unsplash.com/photo-1525351484163-7529414344d8', 'Single breakfast combo with potatoes, feta cheese, Greek yogurt, fresh vegetables, and walnuts', ARRAY['Vegetarian']::TEXT[], 101)
    ON CONFLICT (id) DO NOTHING;

    -- Toasts & Eggs
    INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, tags, display_order)
    VALUES
        ('Poached Avo on Toast', 'Mashed avocado on toasted sourdough farm bread with poached eggs, cherry tomatoes, red radish, borage microgreens, zaatar oil, fresh lime, and black sea salt.', 48.00, 'toasts_eggs'::public.menu_category, 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d', 'Avocado toast with poached eggs, cherry tomatoes, and microgreens on sourdough bread', ARRAY['Vegetarian', 'Healthy']::TEXT[], 102),
        ('Tuna on Avo Toast', 'Tuna and grilled halloumi on toasted sourdough bread with creamy avocado, pickled onion, fresh lime, zaatar oil, cracked black pepper, black salt, fresh leaves, and borage microgreens.', 60.00, 'toasts_eggs'::public.menu_category, 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7', 'Tuna and halloumi toast with avocado, pickled onions, and fresh herbs on sourdough', ARRAY['High Protein']::TEXT[], 103),
        ('Salmon Avo on Toast', 'Salmon on toasted sourdough farm bread with mashed avocado, cherry tomatoes, orange tobikko, a touch of chilli oil, fresh lime, borage microgreens, and black sea salt.', 65.00, 'toasts_eggs'::public.menu_category, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', 'Salmon avocado toast with tobikko, cherry tomatoes, and microgreens on artisan bread', ARRAY['High Protein', 'Premium']::TEXT[], 104),
        ('Salmon on Toast', 'Salmon on toasted sourdough farm bread with creamy avocado, fresh lime, orange tobikko, borage microgreens, and black sea salt.', 60.00, 'toasts_eggs'::public.menu_category, 'https://images.unsplash.com/photo-1559847844-5315695dadae', 'Smoked salmon toast with avocado, tobikko, and fresh lime on sourdough', ARRAY['High Protein', 'Premium']::TEXT[], 105),
        ('Tuna on Toast', 'Tuna on toasted sourdough bread with fresh lime, cherry tomatoes, borage microgreens, and cracked black pepper.', 55.00, 'toasts_eggs'::public.menu_category, 'https://images.unsplash.com/photo-1553909489-ec2175ef8f35', 'Tuna toast with cherry tomatoes, microgreens, and lime on sourdough bread', ARRAY['High Protein']::TEXT[], 106),
        ('Scrambled Eggs', 'Creamy scrambled eggs with parmesan, sautéed in olive oil and unsalted butter, seasoned with crushed black pepper and fine blue sea salt. Served on toasted sourdough bread with mushroom sauce and borage microgreens.', 50.00, 'toasts_eggs'::public.menu_category, 'https://images.unsplash.com/photo-1525351326368-efbb5cb6814d', 'Creamy scrambled eggs with parmesan and mushroom sauce on toasted sourdough', ARRAY['Vegetarian']::TEXT[], 107)
    ON CONFLICT (id) DO NOTHING;

    -- Signature Breakfast Plates
    INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, tags, display_order)
    VALUES
        ('Pulled Beef Benedict', 'Pulled beef and sautéed white mushrooms on toasted sourdough, topped with a poached egg, fresh basil, hollandaise sauce, microgreens, fresh lime, and cracked black pepper.', 70.00, 'signature_breakfast'::public.menu_category, 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7', 'Eggs Benedict with pulled beef, mushrooms, and hollandaise sauce on sourdough toast', ARRAY['Premium']::TEXT[], 108),
        ('English Breakfast', 'Bagel with turkey bacon, cooked veal sausage, pulled beef, portobello mushrooms, and a tray egg. Served with wild rocket, cooked tomato, Algerian potato hash brown, and vegan aioli sauce.', 70.00, 'signature_breakfast'::public.menu_category, 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666', 'Full English breakfast with turkey bacon, sausage, eggs, mushrooms, and hash browns', ARRAY['Premium']::TEXT[], 109),
        ('Breakfast Bowl', 'Grilled chicken and halloumi on basmati rice, served with sourdough bread, beetroot purée, grilled white mushrooms, fresh avocado, poached egg, and buttered greens. Finished with roasted pine nuts, olive oil, oregano, and cracked black pepper.', 85.00, 'signature_breakfast'::public.menu_category, 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2', 'Breakfast bowl with grilled chicken, halloumi, rice, avocado, and poached egg', ARRAY['High Protein', 'Premium']::TEXT[], 110),
        ('Turkish Egg', 'Veal sausage on toasted sourdough bread with egg, Turkish yogurt, fresh parsley and dill, drizzled with chili oil and lime. Topped with pine seeds, dried oregano, red chili flakes, and black sea salt.', 60.00, 'signature_breakfast'::public.menu_category, 'https://images.unsplash.com/photo-1525351484163-7529414344d8', 'Turkish eggs with veal sausage, yogurt, herbs, and chili oil on sourdough', ARRAY['Spicy']::TEXT[], 111),
        ('Shakshuka', 'Sourdough bread with mozzarella, pasteurized eggs, shakshoumi sauce, oregano, and a hint of fresh lime.', 55.00, 'signature_breakfast'::public.menu_category, 'https://images.unsplash.com/photo-1587486937736-e7c6b76584e8', 'Middle Eastern shakshuka with eggs poached in spiced tomato sauce with mozzarella', ARRAY['Vegetarian', 'Spicy']::TEXT[], 112)
    ON CONFLICT (id) DO NOTHING;

    -- Healthy & Lifestyle
    INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, tags, display_order)
    VALUES
        ('Keto Lifestyle Bowl', 'Basmati rice topped with pan-seared salmon, avocado, edamame, mango, beetroot, white ginger, fresh shallot, crispy onion, borage microgreens, white & black sesame, and fresh lime.', 86.00, 'healthy_lifestyle'::public.menu_category, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', 'Keto bowl with pan-seared salmon, avocado, edamame, and colorful fresh vegetables', ARRAY['Healthy', 'High Protein', 'Premium']::TEXT[], 113)
    ON CONFLICT (id) DO NOTHING;

    -- Light Plates & Salads
    INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, tags, display_order)
    VALUES
        ('Peach Burrata Blossom', 'Burrata with fresh peach slices, basil, and mint, finished with a yuzu-honey dressing.', 58.00, 'light_plates_salads'::public.menu_category, 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5', 'Fresh burrata cheese with sliced peaches, basil, and mint drizzled with honey dressing', ARRAY['Vegetarian', 'Premium']::TEXT[], 114),
        ('Mozzarella Salad', 'Fresh mozzarella with juicy tomatoes, bright lemon, and fragrant basil, drizzled with vibrant pesto sauce.', 45.00, 'light_plates_salads'::public.menu_category, 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5', 'Caprese salad with fresh mozzarella, tomatoes, basil, and pesto sauce', ARRAY['Vegetarian']::TEXT[], 115)
    ON CONFLICT (id) DO NOTHING;

    -- Sweet Breakfast
    INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, tags, display_order)
    VALUES
        ('French Love Toast', 'Soft brioche layered with banana, strawberry, and blueberry, lightly toasted in unsalted butter. Topped with pistachio ice cream, fresh mint leaves, and icing sugar.', 80.00, 'sweet_breakfast'::public.menu_category, 'https://images.unsplash.com/photo-1484723091739-30a097e8f929', 'French toast with fresh berries, banana, pistachio ice cream, and powdered sugar', ARRAY['Sweet', 'Premium']::TEXT[], 116)
    ON CONFLICT (id) DO NOTHING;

    RAISE NOTICE 'Breakfast menu items inserted successfully';
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Breakfast menu items insertion failed: %', SQLERRM;
END $$;