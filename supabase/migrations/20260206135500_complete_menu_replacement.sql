-- Complete Menu Replacement Migration
-- Removes all existing menu items and replaces with comprehensive new menu

-- 1. Delete all existing menu items
DELETE FROM public.menu_items;

-- 2. Drop and recreate menu_category enum with all new categories
ALTER TABLE public.menu_items ALTER COLUMN category TYPE TEXT;
DROP TYPE IF EXISTS public.menu_category CASCADE;
CREATE TYPE public.menu_category AS ENUM (
  'breakfast_combos',
  'toasts_eggs',
  'signature_breakfast',
  'healthy_lifestyle',
  'light_plates_salads',
  'sweet_breakfast',
  'small_appetizers',
  'fresh_light',
  'cheese_specialty',
  'bites_comfort',
  'signature_pizzas',
  'classics_cheese',
  'gourmet_sandwiches',
  'pasta',
  'desserts',
  'tea_selection',
  'coffee',
  'mocktails',
  'fresh_juices',
  'soft_drinks_water'
);
ALTER TABLE public.menu_items ALTER COLUMN category TYPE public.menu_category USING category::text::public.menu_category;

-- 3. Insert all new menu items
DO $$
BEGIN
  -- BREAKFAST MENU
  -- Breakfast Combos
  INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, tags, display_order)
  VALUES
    ('J''s Double Breakfast Combo', 'Shakshuka with omelette, tomato, potato, butter, and feta cheese. Served with Greek yogurt drizzled with honey, black olives, fresh cucumber and tomato, walnuts, blackberries, a hint of strawberry syrup, and J''s special bread.', 149.00, 'breakfast_combos'::public.menu_category, 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666', 'Double breakfast combo plate with shakshuka, omelette, Greek yogurt, fresh fruits, and artisan bread', ARRAY['Vegetarian', 'Premium']::TEXT[], 1),
    ('J''s Single Breakfast Combo', 'Tender potatoes with butter and feta cheese, fresh tomato and cucumber, black olives, crunchy walnuts, and juicy blackberries. Served with Greek yogurt drizzled with honey and J''s special bread.', 99.00, 'breakfast_combos'::public.menu_category, 'https://images.unsplash.com/photo-1525351484163-7529414344d8', 'Single breakfast combo with potatoes, feta cheese, Greek yogurt, fresh vegetables, and walnuts', ARRAY['Vegetarian']::TEXT[], 2)
  ON CONFLICT (id) DO NOTHING;

  -- Toasts & Eggs
  INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, tags, display_order)
  VALUES
    ('Poached Avo on Toast', 'Mashed avocado on toasted sourdough farm bread with poached eggs, cherry tomatoes, red radish, borage microgreens, zaatar oil, fresh lime, and black sea salt.', 48.00, 'toasts_eggs'::public.menu_category, 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d', 'Avocado toast with poached eggs, cherry tomatoes, and microgreens on sourdough bread', ARRAY['Vegetarian', 'Healthy']::TEXT[], 3),
    ('Tuna on Avo Toast', 'Tuna and grilled halloumi on toasted sourdough bread with creamy avocado, pickled onion, fresh lime, zaatar oil, cracked black pepper, black salt, fresh leaves, and borage microgreens.', 60.00, 'toasts_eggs'::public.menu_category, 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7', 'Tuna and halloumi toast with avocado, pickled onions, and fresh herbs on sourdough', ARRAY['High Protein']::TEXT[], 4),
    ('Salmon Avo on Toast', 'Salmon on toasted sourdough farm bread with mashed avocado, cherry tomatoes, orange tobikko, a touch of chilli oil, fresh lime, borage microgreens, and black sea salt.', 65.00, 'toasts_eggs'::public.menu_category, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', 'Salmon avocado toast with tobikko, cherry tomatoes, and microgreens on artisan bread', ARRAY['High Protein', 'Premium']::TEXT[], 5),
    ('Salmon on Toast', 'Salmon on toasted sourdough farm bread with creamy avocado, fresh lime, orange tobikko, borage microgreens, and black sea salt.', 60.00, 'toasts_eggs'::public.menu_category, 'https://images.unsplash.com/photo-1559847844-5315695dadae', 'Smoked salmon toast with avocado, tobikko, and fresh lime on sourdough', ARRAY['High Protein', 'Premium']::TEXT[], 6),
    ('Tuna on Toast', 'Tuna on toasted sourdough bread with fresh lime, cherry tomatoes, borage microgreens, and cracked black pepper.', 55.00, 'toasts_eggs'::public.menu_category, 'https://images.unsplash.com/photo-1553909489-ec2175ef8f35', 'Tuna toast with cherry tomatoes, microgreens, and lime on sourdough bread', ARRAY['High Protein']::TEXT[], 7),
    ('Scrambled Eggs', 'Creamy scrambled eggs with parmesan, sautéed in olive oil and unsalted butter, seasoned with crushed black pepper and fine blue sea salt. Served on toasted sourdough bread with mushroom sauce and borage microgreens.', 50.00, 'toasts_eggs'::public.menu_category, 'https://images.unsplash.com/photo-1525351326368-efbb5cb6814d', 'Creamy scrambled eggs with parmesan and mushroom sauce on toasted sourdough', ARRAY['Vegetarian']::TEXT[], 8)
  ON CONFLICT (id) DO NOTHING;

  -- Signature Breakfast Plates
  INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, tags, display_order)
  VALUES
    ('Pulled Beef Benedict', 'Pulled beef and sautéed white mushrooms on toasted sourdough, topped with a poached egg, fresh basil, hollandaise sauce, microgreens, fresh lime, and cracked black pepper.', 70.00, 'signature_breakfast'::public.menu_category, 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7', 'Eggs Benedict with pulled beef, mushrooms, and hollandaise sauce on sourdough toast', ARRAY['Premium']::TEXT[], 9),
    ('English Breakfast', 'Bagel with turkey bacon, cooked veal sausage, pulled beef, portobello mushrooms, and a tray egg. Served with wild rocket, cooked tomato, Algerian potato hash brown, and vegan aioli sauce.', 70.00, 'signature_breakfast'::public.menu_category, 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666', 'Full English breakfast with turkey bacon, sausage, eggs, mushrooms, and hash browns', ARRAY['Premium']::TEXT[], 10),
    ('Breakfast Bowl', 'Grilled chicken and halloumi on basmati rice, served with sourdough bread, beetroot purée, grilled white mushrooms, fresh avocado, poached egg, and buttered greens. Finished with roasted pine nuts, olive oil, oregano, and cracked black pepper.', 85.00, 'signature_breakfast'::public.menu_category, 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2', 'Breakfast bowl with grilled chicken, halloumi, rice, avocado, and poached egg', ARRAY['High Protein', 'Premium']::TEXT[], 11),
    ('Turkish Egg', 'Veal sausage on toasted sourdough bread with egg, Turkish yogurt, fresh parsley and dill, drizzled with chili oil and lime. Topped with pine seeds, dried oregano, red chili flakes, and black sea salt.', 60.00, 'signature_breakfast'::public.menu_category, 'https://images.unsplash.com/photo-1525351484163-7529414344d8', 'Turkish eggs with veal sausage, yogurt, herbs, and chili oil on sourdough', ARRAY['Spicy']::TEXT[], 12),
    ('Shakshuka', 'Sourdough bread with mozzarella, pasteurized eggs, shakshoumi sauce, oregano, and a hint of fresh lime.', 55.00, 'signature_breakfast'::public.menu_category, 'https://images.unsplash.com/photo-1587486937736-e7c6b76584e8', 'Middle Eastern shakshuka with eggs poached in spiced tomato sauce with mozzarella', ARRAY['Vegetarian', 'Spicy']::TEXT[], 13)
  ON CONFLICT (id) DO NOTHING;

  -- Healthy & Lifestyle
  INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, tags, display_order)
  VALUES
    ('Keto Lifestyle Bowl', 'Basmati rice topped with pan-seared salmon, avocado, edamame, mango, beetroot, white ginger, fresh shallot, crispy onion, borage microgreens, white & black sesame, and fresh lime.', 86.00, 'healthy_lifestyle'::public.menu_category, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', 'Keto bowl with pan-seared salmon, avocado, edamame, and colorful fresh vegetables', ARRAY['Healthy', 'High Protein', 'Premium']::TEXT[], 14)
  ON CONFLICT (id) DO NOTHING;

  -- Light Plates & Salads
  INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, tags, display_order)
  VALUES
    ('Peach Burrata Blossom', 'Burrata with fresh peach slices, basil, and mint, finished with a yuzu-honey dressing.', 58.00, 'light_plates_salads'::public.menu_category, 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5', 'Fresh burrata cheese with sliced peaches, basil, and mint drizzled with honey dressing', ARRAY['Vegetarian', 'Premium']::TEXT[], 15),
    ('Mozzarella Salad', 'Fresh mozzarella with juicy tomatoes, bright lemon, and fragrant basil, drizzled with vibrant pesto sauce.', 45.00, 'light_plates_salads'::public.menu_category, 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5', 'Caprese salad with fresh mozzarella, tomatoes, basil, and pesto sauce', ARRAY['Vegetarian']::TEXT[], 16)
  ON CONFLICT (id) DO NOTHING;

  -- Sweet Breakfast
  INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, tags, display_order)
  VALUES
    ('French Love Toast', 'Soft brioche layered with banana, strawberry, and blueberry, lightly toasted in unsalted butter. Topped with pistachio ice cream, fresh mint leaves, and icing sugar.', 80.00, 'sweet_breakfast'::public.menu_category, 'https://images.unsplash.com/photo-1484723091739-30a097e8f929', 'French toast with fresh berries, banana, pistachio ice cream, and powdered sugar', ARRAY['Sweet', 'Premium']::TEXT[], 17)
  ON CONFLICT (id) DO NOTHING;

  -- SMALL APPETIZERS
  -- Fresh & Light
  INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, tags, display_order)
  VALUES
    ('Crunch Bites', 'Smashed baby potatoes, corn, compressed cucumber, red radish, and shallot, tossed in sesame mayonnaise dressing. Small bites. Big city.', 45.00, 'fresh_light'::public.menu_category, 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf', 'Colorful appetizer with smashed potatoes, vegetables, and sesame mayo dressing', ARRAY['Vegetarian']::TEXT[], 18),
    ('Tropical Ceviche', 'Citrus-cured fish with coconut milk, mango, and crispy artichokes. Bright. Raw. Alive.', 58.00, 'fresh_light'::public.menu_category, 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41', 'Fresh ceviche with citrus-cured fish, mango, coconut milk, and crispy artichokes', ARRAY['Premium']::TEXT[], 19),
    ('Kale It', 'Kale lettuce with parmesan Caesar dressing, pulled chicken, and crunchy baguette crumbs.', 55.00, 'fresh_light'::public.menu_category, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', 'Kale Caesar salad with grilled chicken, parmesan, and crispy croutons', ARRAY['Healthy']::TEXT[], 20),
    ('Mixed Salad', 'Fresh iceberg lettuce, cherry tomatoes, sliced white onion, cucumber wedges, and Kalamata olives with lemon dressing.', 60.00, 'fresh_light'::public.menu_category, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd', 'Fresh mixed green salad with tomatoes, cucumbers, olives, and lemon dressing', ARRAY['Vegetarian', 'Healthy']::TEXT[], 21)
  ON CONFLICT (id) DO NOTHING;

  -- Cheese & Specialty Plates
  INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, tags, display_order)
  VALUES
    ('Peach Burrata Blossom', 'Creamy burrata with fresh peach slices, basil, and mint, finished with a yuzu-honey dressing.', 58.00, 'cheese_specialty'::public.menu_category, 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5', 'Creamy burrata cheese with fresh peach slices, herbs, and honey dressing', ARRAY['Vegetarian', 'Premium']::TEXT[], 22),
    ('Mozzarella Salad', 'Fresh mozzarella with juicy tomatoes, bright lemon, fragrant basil, and a drizzle of vibrant pesto sauce.', 45.00, 'cheese_specialty'::public.menu_category, 'https://images.unsplash.com/photo-1608897013039-887f21d8c804', 'Caprese-style mozzarella salad with tomatoes, basil, and pesto', ARRAY['Vegetarian']::TEXT[], 23)
  ON CONFLICT (id) DO NOTHING;

  -- Bites & Comfort Food
  INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, tags, display_order)
  VALUES
    ('Kofta Bites', 'Mini bite-sized spiced beef koftas served with J''s signature tahini dip.', 52.00, 'bites_comfort'::public.menu_category, 'https://images.unsplash.com/photo-1529042410759-befb1204b468', 'Mini beef kofta meatballs with tahini dipping sauce', ARRAY[]::TEXT[], 24),
    ('Wing It', 'Juicy chicken wings brushed with fermented honey, served with sriracha sauce and topped with J''s special toasted garlic spice. Not your average wing.', 48.00, 'bites_comfort'::public.menu_category, 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7', 'Glazed chicken wings with honey, sriracha, and toasted garlic spice', ARRAY['Spicy']::TEXT[], 25),
    ('French Fries', 'Golden, crispy fries — perfectly seasoned and irresistibly crunchy.', 30.00, 'bites_comfort'::public.menu_category, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877', 'Golden crispy French fries perfectly seasoned', ARRAY['Vegetarian']::TEXT[], 26)
  ON CONFLICT (id) DO NOTHING;

  -- PIZZA PIZZA PIZZA
  -- Signature Pizzas
  INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, tags, display_order)
  VALUES
    ('Beef Lover', 'Café de Paris sauce, beef steak, truffle honey, punchy cheese, and thin fries — that classic entrecôte vibe.', 116.00, 'signature_pizzas'::public.menu_category, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38', 'Gourmet beef pizza with steak, truffle honey, cheese, and thin fries', ARRAY['Premium']::TEXT[], 27),
    ('Seoul City', 'Korean short ribs, fresh kimchi, crispy shallots, and black garlic dots. K-pop meets J.', 95.00, 'signature_pizzas'::public.menu_category, 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f', 'Korean-inspired pizza with short ribs, kimchi, and black garlic', ARRAY['Spicy', 'Premium']::TEXT[], 28),
    ('Duck Pineapple Dance', 'Slow-cooked duck on a teriyaki base with sweet charred pineapple and crispy onions. For the adventurous in you.', 95.00, 'signature_pizzas'::public.menu_category, 'https://images.unsplash.com/photo-1628840042765-356cda07504e', 'Gourmet pizza with slow-cooked duck, teriyaki, pineapple, and crispy onions', ARRAY['Premium']::TEXT[], 29),
    ('Peppy', 'Spicy pepperoni, bubbling cheese, fermented honey, and chilli flakes. Late night with no regrets.', 76.00, 'signature_pizzas'::public.menu_category, 'https://images.unsplash.com/photo-1628840042765-356cda07504e', 'Spicy pepperoni pizza with melted cheese, honey, and chili flakes', ARRAY['Spicy']::TEXT[], 30),
    ('Chicken Harissa', 'Charred harissa base, grilled chicken, yogurt drizzle, pickled onions, and special herbs. Oriental and zesty.', 86.00, 'signature_pizzas'::public.menu_category, 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f', 'Spicy harissa chicken pizza with yogurt, pickled onions, and herbs', ARRAY['Spicy']::TEXT[], 31)
  ON CONFLICT (id) DO NOTHING;

  -- Classics & Cheese Lovers
  INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, tags, display_order)
  VALUES
    ('Marggy', 'Juicy tomato base, fresh mozzarella, and sweet basil powder. Classic never goes out of style.', 68.00, 'classics_cheese'::public.menu_category, 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002', 'Classic Margherita pizza with tomato sauce, mozzarella, and basil', ARRAY['Vegetarian']::TEXT[], 32),
    ('Shroomy', 'Roasted mushroom base with black garlic, herbs, and a hint of truffle. Earthy. Warm. Lush.', 84.00, 'classics_cheese'::public.menu_category, 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f', 'Mushroom pizza with black garlic, herbs, and truffle oil', ARRAY['Vegetarian', 'Premium']::TEXT[], 33),
    ('Cheesy', 'Our signature cheese blend, Cacio e Pepe–style, with that perfect gooey pull every time.', 72.00, 'classics_cheese'::public.menu_category, 'https://images.unsplash.com/photo-1513104890138-7c749659a591', 'Four cheese pizza with signature blend and gooey melted cheese', ARRAY['Vegetarian']::TEXT[], 34),
    ('Tuna', 'Juicy tomato base, fresh mozzarella, onions, and tuna. Fresh, flavorful, perfect.', 88.00, 'classics_cheese'::public.menu_category, 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f', 'Tuna pizza with tomato sauce, mozzarella, and onions', ARRAY[]::TEXT[], 35),
    ('Gorgonzola Green Blue', 'Tomato base, mozzarella, gorgonzola, and broccoli. Bold. Creamy. Vibrant.', 88.00, 'classics_cheese'::public.menu_category, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38', 'Gorgonzola pizza with mozzarella, broccoli, and blue cheese', ARRAY['Vegetarian']::TEXT[], 36),
    ('Mozzarella', 'Juicy tomato base, fresh mozzarella, basil, and extra fior di latte. Pure cheesy bliss.', 78.00, 'classics_cheese'::public.menu_category, 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002', 'Double mozzarella pizza with tomato, basil, and fior di latte', ARRAY['Vegetarian']::TEXT[], 37)
  ON CONFLICT (id) DO NOTHING;

  -- GOURMET SANDWICHES
  INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, tags, display_order)
  VALUES
    ('Grilled Chicken Sandwich', 'Grilled smoked chicken layered with mozzarella, fresh tomato, baby gem, and creamy avocado. Served in panouzo bread with house pesto and mayonnaise.', 55.00, 'gourmet_sandwiches'::public.menu_category, 'https://images.unsplash.com/photo-1553909489-ec2175ef8f35', 'Grilled chicken sandwich with mozzarella, avocado, and pesto on panouzo bread', ARRAY[]::TEXT[], 38),
    ('Tuna Sandwich', 'Panouzo bread filled with tuna, fresh rocket, cheddar cheese, crisp red onion, spring onion, juicy tomato, and creamy mayonnaise.', 60.00, 'gourmet_sandwiches'::public.menu_category, 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3', 'Tuna sandwich with rocket, cheddar, vegetables, and mayo on panouzo bread', ARRAY[]::TEXT[], 39),
    ('Brisket Sandwich', 'Soft panouzo bread stuffed with tender brisket beef, sun-dried tomato, caramelized onion, fresh rocket, juicy tomato, melted cheddar, and creamy dijonnaise sauce.', 75.00, 'gourmet_sandwiches'::public.menu_category, 'https://images.unsplash.com/photo-1553909489-ec2175ef8f35', 'Brisket beef sandwich with caramelized onions, cheddar, and dijonnaise', ARRAY['Premium']::TEXT[], 40)
  ON CONFLICT (id) DO NOTHING;

  -- PASTA PASTA PASTA
  INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, tags, display_order)
  VALUES
    ('Midnight Mac', 'Rich red sauce with cheese, parmesan crust, and creamy mascarpone. Nostalgic, old-school comfort.', 42.00, 'pasta'::public.menu_category, 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9', 'Creamy mac and cheese with red sauce, parmesan crust, and mascarpone', ARRAY['Vegetarian']::TEXT[], 41),
    ('Lasagna', 'Layers of pasta baked with rich tomato sauce, seasoned minced beef, creamy béchamel, and golden melted cheese.', 70.00, 'pasta'::public.menu_category, 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3', 'Classic lasagna with layers of pasta, beef, béchamel, and melted cheese', ARRAY[]::TEXT[], 42),
    ('Rigatoni Bolognese', 'Hearty rigatoni tossed in a rich tomato and garlic sauce, slow-cooked with ground beef, butter, and sunflower oil. Finished with onion and garlic powder, black pepper, a touch of lime, fresh basil, microgreens, parmesan, and melted mozzarella.', 95.00, 'pasta'::public.menu_category, 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9', 'Rigatoni pasta with rich Bolognese sauce, beef, herbs, and melted cheese', ARRAY[]::TEXT[], 43),
    ('Creamy Spaghetti Special', 'Chef''s creamy spaghetti recipe, rich and comforting.', 50.00, 'pasta'::public.menu_category, 'https://images.unsplash.com/photo-1612874742237-6526221588e3', 'Creamy spaghetti with chef special sauce', ARRAY['Vegetarian']::TEXT[], 44)
  ON CONFLICT (id) DO NOTHING;

  -- DESSERTS
  INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, tags, display_order)
  VALUES
    ('J''s Caramel Chocolate Fondant', 'Warm chocolate fondant filled with hazelnut caramel cream and chocolate crisp.', 55.00, 'desserts'::public.menu_category, 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51', 'Warm chocolate fondant with molten hazelnut caramel center', ARRAY['Sweet']::TEXT[], 45),
    ('J''s Soft Serve with a Raspberry Twist', 'Classic vanilla soft serve swirled with raspberry.', 45.00, 'desserts'::public.menu_category, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb', 'Vanilla soft serve ice cream with raspberry swirl', ARRAY['Sweet']::TEXT[], 46),
    ('J''s Soft Serve with a Caramel Lotus Twist', 'Vanilla soft serve topped with caramel sauce and Lotus crumble.', 45.00, 'desserts'::public.menu_category, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb', 'Vanilla soft serve with caramel sauce and Lotus biscuit crumble', ARRAY['Sweet']::TEXT[], 47),
    ('J''s Special Tiramisu', 'Layers of espresso-soaked ladyfingers with creamy mascarpone, finished with cocoa dust.', 50.00, 'desserts'::public.menu_category, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9', 'Classic Italian tiramisu with espresso-soaked ladyfingers and mascarpone', ARRAY['Sweet']::TEXT[], 48),
    ('J''s Galatopita', 'Classic Italian-style cheesecake with smooth mascarpone, lightly baked. Served with vanilla gelato and honey drizzle.', 65.00, 'desserts'::public.menu_category, 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866', 'Italian-style cheesecake with mascarpone, vanilla gelato, and honey', ARRAY['Sweet', 'Premium']::TEXT[], 49)
  ON CONFLICT (id) DO NOTHING;

  -- TEA SELECTION
  INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, tags, display_order)
  VALUES
    ('Berry Queen', 'Premium berry-infused tea blend', 55.00, 'tea_selection'::public.menu_category, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc', 'Berry-infused tea in elegant teacup', ARRAY[]::TEXT[], 50),
    ('Green Tea', 'Classic premium green tea', 55.00, 'tea_selection'::public.menu_category, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc', 'Traditional green tea in ceramic cup', ARRAY[]::TEXT[], 51),
    ('English Breakfast Tea', 'Traditional English breakfast tea blend', 55.00, 'tea_selection'::public.menu_category, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc', 'English breakfast tea in classic teacup', ARRAY[]::TEXT[], 52),
    ('Chamomile with Mandarin', 'Soothing chamomile tea with mandarin notes', 55.00, 'tea_selection'::public.menu_category, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc', 'Chamomile tea with mandarin in glass teacup', ARRAY[]::TEXT[], 53),
    ('Hot Lemon with Ginger & Honey', 'Warming lemon tea with fresh ginger and honey', 55.00, 'tea_selection'::public.menu_category, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc', 'Hot lemon ginger tea with honey', ARRAY[]::TEXT[], 54),
    ('Masala Chai', 'Spiced Indian chai with aromatic spices', 55.00, 'tea_selection'::public.menu_category, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc', 'Traditional masala chai tea with spices', ARRAY[]::TEXT[], 55),
    ('Milk Oolong with Banana & Cinnamon', 'Creamy oolong tea with banana and cinnamon notes', 55.00, 'tea_selection'::public.menu_category, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc', 'Milk oolong tea with banana and cinnamon', ARRAY[]::TEXT[], 56)
  ON CONFLICT (id) DO NOTHING;

  -- COFFEE
  INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, tags, display_order)
  VALUES
    ('Iced Americano', 'Chilled espresso with cold water', 24.00, 'coffee'::public.menu_category, 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7', 'Iced Americano coffee in tall glass with ice', ARRAY[]::TEXT[], 57),
    ('Iced Latte Macchiato', 'Layered iced latte with espresso and milk', 28.00, 'coffee'::public.menu_category, 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7', 'Iced latte macchiato with layered espresso and milk', ARRAY[]::TEXT[], 58),
    ('Iced Spanish Latte', 'Sweet iced latte with condensed milk', 35.00, 'coffee'::public.menu_category, 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7', 'Iced Spanish latte with condensed milk', ARRAY[]::TEXT[], 59),
    ('Iced Latte', 'Classic iced latte with espresso and cold milk', 28.00, 'coffee'::public.menu_category, 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7', 'Classic iced latte with espresso', ARRAY[]::TEXT[], 60),
    ('Flat White', 'Smooth espresso with microfoam milk', 26.00, 'coffee'::public.menu_category, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', 'Flat white coffee with microfoam', ARRAY[]::TEXT[], 61),
    ('Latte', 'Classic espresso with steamed milk', 26.00, 'coffee'::public.menu_category, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', 'Classic latte with espresso and steamed milk', ARRAY[]::TEXT[], 62),
    ('Cappuccino', 'Espresso with foamed milk and cocoa dust', 26.00, 'coffee'::public.menu_category, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', 'Cappuccino with foamed milk and cocoa', ARRAY[]::TEXT[], 63),
    ('Cortado', 'Espresso cut with warm milk', 24.00, 'coffee'::public.menu_category, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', 'Cortado espresso with warm milk', ARRAY[]::TEXT[], 64),
    ('Piccolo', 'Small latte with ristretto shot', 22.00, 'coffee'::public.menu_category, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', 'Piccolo latte with ristretto shot', ARRAY[]::TEXT[], 65)
  ON CONFLICT (id) DO NOTHING;

  -- MOCKTAILS
  INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, tags, display_order)
  VALUES
    ('Old Fashion New Style', 'Non-alcoholic American malt with aromatic bitters, brown sugar, and flavored smoke.', 52.00, 'mocktails'::public.menu_category, 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b', 'Non-alcoholic old fashioned cocktail with smoke and bitters', ARRAY[]::TEXT[], 66),
    ('Lychee Raspberry Collins', 'London Dry non-alcoholic spirit with lychee and raspberry, topped with sparkling Classico wine.', 42.00, 'mocktails'::public.menu_category, 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b', 'Lychee raspberry mocktail with sparkling wine', ARRAY[]::TEXT[], 67),
    ('Popcorn Cola', 'White cane non-alcoholic spirit with popcorn syrup and classic cola.', 38.00, 'mocktails'::public.menu_category, 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b', 'Popcorn-flavored cola mocktail', ARRAY[]::TEXT[], 68),
    ('Piña Colada', 'Dark cane non-alcoholic spirit with coconut syrup and fresh pineapple.', 42.00, 'mocktails'::public.menu_category, 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b', 'Non-alcoholic piña colada with coconut and pineapple', ARRAY[]::TEXT[], 69),
    ('Long Island Iced Tea', 'Dark cane, white cane, London Dry, triple sec, and hibiscus tea.', 45.00, 'mocktails'::public.menu_category, 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b', 'Non-alcoholic Long Island iced tea mocktail', ARRAY[]::TEXT[], 70),
    ('Espresso Martini', 'Double espresso with tiramisu essence, rich and velvety.', 45.00, 'mocktails'::public.menu_category, 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b', 'Non-alcoholic espresso martini with tiramisu', ARRAY[]::TEXT[], 71),
    ('Spicy Margarita', 'London Dry non-alcoholic spirit with mango and jalapeño heat.', 45.00, 'mocktails'::public.menu_category, 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b', 'Spicy mango margarita mocktail with jalapeño', ARRAY['Spicy']::TEXT[], 72),
    ('New York Sour', 'American malt with fresh lemon and a layer of non-alcoholic red wine foam.', 45.00, 'mocktails'::public.menu_category, 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b', 'New York sour mocktail with red wine foam', ARRAY[]::TEXT[], 73),
    ('Saffron Mojito', 'Saffron infusion with mint, coconut water, and sparkling finish.', 48.00, 'mocktails'::public.menu_category, 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b', 'Saffron mojito with mint and coconut water', ARRAY[]::TEXT[], 74),
    ('Italian Spritz', 'Classico sparkling wine with non-alcoholic aperitivo and passion fruit.', 48.00, 'mocktails'::public.menu_category, 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b', 'Italian spritz mocktail with passion fruit', ARRAY[]::TEXT[], 75)
  ON CONFLICT (id) DO NOTHING;

  -- FRESH JUICES
  INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, tags, display_order)
  VALUES
    ('Carrot', 'Freshly pressed carrots, naturally sweet and vitamin-rich.', 38.00, 'fresh_juices'::public.menu_category, 'https://images.unsplash.com/photo-1600271886742-f049cd451bba', 'Fresh carrot juice in glass', ARRAY['Healthy']::TEXT[], 76),
    ('Green Apple', 'Crisp, tangy juice made from fresh green apples.', 38.00, 'fresh_juices'::public.menu_category, 'https://images.unsplash.com/photo-1600271886742-f049cd451bba', 'Fresh green apple juice', ARRAY['Healthy']::TEXT[], 77),
    ('Orange', 'Freshly squeezed orange juice, sweet and refreshing.', 38.00, 'fresh_juices'::public.menu_category, 'https://images.unsplash.com/photo-1600271886742-f049cd451bba', 'Freshly squeezed orange juice', ARRAY['Healthy']::TEXT[], 78)
  ON CONFLICT (id) DO NOTHING;

  -- SOFT DRINKS & WATER
  INSERT INTO public.menu_items (name, description, price, category, image_url, image_alt, tags, display_order)
  VALUES
    ('Cola', 'Classic cola soft drink', 15.00, 'soft_drinks_water'::public.menu_category, 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e', 'Cola soft drink in glass with ice', ARRAY[]::TEXT[], 79),
    ('Cola Zero', 'Zero sugar cola', 15.00, 'soft_drinks_water'::public.menu_category, 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e', 'Zero sugar cola in glass', ARRAY[]::TEXT[], 80),
    ('Fanta', 'Orange flavored soft drink', 15.00, 'soft_drinks_water'::public.menu_category, 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e', 'Fanta orange soda', ARRAY[]::TEXT[], 81),
    ('Sprite', 'Lemon-lime soft drink', 15.00, 'soft_drinks_water'::public.menu_category, 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e', 'Sprite lemon-lime soda', ARRAY[]::TEXT[], 82),
    ('Zero Heineken (Non-Alcoholic)', 'Non-alcoholic beer', 28.00, 'soft_drinks_water'::public.menu_category, 'https://images.unsplash.com/photo-1608270586620-248524c67de9', 'Non-alcoholic Heineken beer bottle', ARRAY[]::TEXT[], 83),
    ('Water - Still Small', 'Small bottle of still water', 13.00, 'soft_drinks_water'::public.menu_category, 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d', 'Small bottle of still water', ARRAY[]::TEXT[], 84),
    ('Water - Still Large', 'Large bottle of still water', 18.00, 'soft_drinks_water'::public.menu_category, 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d', 'Large bottle of still water', ARRAY[]::TEXT[], 85),
    ('Water - Sparkling Small', 'Small bottle of sparkling water', 13.00, 'soft_drinks_water'::public.menu_category, 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d', 'Small bottle of sparkling water', ARRAY[]::TEXT[], 86),
    ('Water - Sparkling Large', 'Large bottle of sparkling water', 18.00, 'soft_drinks_water'::public.menu_category, 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d', 'Large bottle of sparkling water', ARRAY[]::TEXT[], 87)
  ON CONFLICT (id) DO NOTHING;

  RAISE NOTICE 'All menu items inserted successfully';
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Menu items insertion failed: %', SQLERRM;
END $$;