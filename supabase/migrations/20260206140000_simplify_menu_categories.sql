-- Simplify Menu Categories Migration
-- Consolidates all subcategories into 6 main categories:
-- breakfast, small_appetizer, pizza, pasta, dessert, drinks

-- 1. First, convert category column to TEXT to allow updates
ALTER TABLE public.menu_items ALTER COLUMN category TYPE TEXT;

-- 2. Drop the old enum type
DROP TYPE IF EXISTS public.menu_category CASCADE;

-- 3. Update all breakfast subcategories to 'breakfast'
UPDATE public.menu_items
SET category = 'breakfast'
WHERE category IN (
  'breakfast_combos',
  'toasts_eggs',
  'signature_breakfast',
  'healthy_lifestyle',
  'light_plates_salads',
  'sweet_breakfast'
);

-- 4. Update all small appetizer subcategories to 'small_appetizer'
UPDATE public.menu_items
SET category = 'small_appetizer'
WHERE category IN (
  'small_appetizers',
  'fresh_light',
  'cheese_specialty',
  'bites_comfort'
);

-- 5. Update all pizza subcategories to 'pizza'
UPDATE public.menu_items
SET category = 'pizza'
WHERE category IN (
  'signature_pizzas',
  'classics_cheese',
  'gourmet_sandwiches'
);

-- 6. Update all drink subcategories to 'drinks'
UPDATE public.menu_items
SET category = 'drinks'
WHERE category IN (
  'tea_selection',
  'coffee',
  'mocktails',
  'fresh_juices',
  'soft_drinks_water'
);

-- 7. Update desserts category
UPDATE public.menu_items
SET category = 'dessert'
WHERE category = 'desserts';

-- 8. Pasta category should already be 'pasta', but ensure it
UPDATE public.menu_items
SET category = 'pasta'
WHERE category LIKE '%pasta%';

-- 9. Create new menu_category enum with only 6 categories
CREATE TYPE public.menu_category AS ENUM (
  'breakfast',
  'small_appetizer',
  'pizza',
  'pasta',
  'dessert',
  'drinks'
);

-- 10. Convert column back to enum type
ALTER TABLE public.menu_items 
  ALTER COLUMN category TYPE public.menu_category 
  USING category::public.menu_category;