-- Convert menu_items.category from ENUM to dynamic TEXT with foreign key
-- This allows categories to be managed dynamically through the categories table

-- Step 1: Add new temporary column
ALTER TABLE public.menu_items 
ADD COLUMN IF NOT EXISTS category_new TEXT;

-- Step 2: Copy existing data from old column to new column
UPDATE public.menu_items 
SET category_new = category::TEXT;

-- Step 3: Drop old column (this will also drop the constraint)
ALTER TABLE public.menu_items 
DROP COLUMN IF EXISTS category;

-- Step 4: Rename new column to original name
ALTER TABLE public.menu_items 
RENAME COLUMN category_new TO category;

-- Step 5: Make category NOT NULL
ALTER TABLE public.menu_items 
ALTER COLUMN category SET NOT NULL;

-- Step 6: Add foreign key constraint to categories table
ALTER TABLE public.menu_items 
ADD CONSTRAINT fk_menu_items_category 
FOREIGN KEY (category) 
REFERENCES public.categories(value) 
ON DELETE RESTRICT 
ON UPDATE CASCADE;

-- Step 7: Recreate index on category column
DROP INDEX IF EXISTS idx_menu_items_category;
CREATE INDEX idx_menu_items_category ON public.menu_items(category);

-- Step 8: Drop the old ENUM type (no longer needed)
DROP TYPE IF EXISTS public.menu_category CASCADE;

-- Step 9: Add helpful comment
COMMENT ON COLUMN public.menu_items.category IS 'References categories.value - dynamically managed categories';