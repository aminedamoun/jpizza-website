-- Create Subcategories Table Migration
-- Allows dynamic subcategory creation linked to parent categories

-- Step 1: Create subcategories table
CREATE TABLE IF NOT EXISTS public.subcategories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
    value TEXT NOT NULL,
    label TEXT NOT NULL,
    emoji TEXT DEFAULT '🍽️',
    display_order INTEGER NOT NULL DEFAULT 0,
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(category_id, value)
);

-- Step 2: Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_subcategories_category_id ON public.subcategories(category_id);
CREATE INDEX IF NOT EXISTS idx_subcategories_display_order ON public.subcategories(display_order);
CREATE INDEX IF NOT EXISTS idx_subcategories_visible ON public.subcategories(is_visible);

-- Step 3: Add subcategory_id column to menu_items
ALTER TABLE public.menu_items
ADD COLUMN IF NOT EXISTS subcategory_id UUID REFERENCES public.subcategories(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_menu_items_subcategory_id ON public.menu_items(subcategory_id);

-- Step 4: Enable RLS
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS policies for public read access
DROP POLICY IF EXISTS "public_read_subcategories" ON public.subcategories;
CREATE POLICY "public_read_subcategories"
ON public.subcategories FOR SELECT
TO public
USING (true);

-- Step 6: Create RLS policies for public insert/update/delete
DROP POLICY IF EXISTS "public_insert_subcategories" ON public.subcategories;
CREATE POLICY "public_insert_subcategories"
ON public.subcategories FOR INSERT
TO public
WITH CHECK (true);

DROP POLICY IF EXISTS "public_update_subcategories" ON public.subcategories;
CREATE POLICY "public_update_subcategories"
ON public.subcategories FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "public_delete_subcategories" ON public.subcategories;
CREATE POLICY "public_delete_subcategories"
ON public.subcategories FOR DELETE
TO public
USING (true);

-- Step 7: Create updated_at trigger
DROP TRIGGER IF EXISTS update_subcategories_updated_at ON public.subcategories;
CREATE TRIGGER update_subcategories_updated_at
    BEFORE UPDATE ON public.subcategories
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Step 8: Insert sample subcategories for Drinks category
DO $$
DECLARE
    drinks_category_id UUID;
BEGIN
    -- Get drinks category id
    SELECT id INTO drinks_category_id FROM public.categories WHERE value = 'drinks' LIMIT 1;
    
    IF drinks_category_id IS NOT NULL THEN
        -- Insert subcategories for drinks
        INSERT INTO public.subcategories (category_id, value, label, emoji, display_order, is_visible)
        VALUES
            (drinks_category_id, 'tea', 'Tea', '🍵', 1, true),
            (drinks_category_id, 'coffee', 'Coffee', '☕', 2, true),
            (drinks_category_id, 'mocktails', 'Mocktails', '🍹', 3, true)
        ON CONFLICT (category_id, value) DO NOTHING;
    ELSE
        RAISE NOTICE 'Drinks category not found. Subcategories not created.';
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Subcategories insertion failed: %', SQLERRM;
END $$;

-- Step 9: Add comment
COMMENT ON TABLE public.subcategories IS 'Stores menu subcategories linked to parent categories';
COMMENT ON COLUMN public.menu_items.subcategory_id IS 'Optional reference to subcategories.id for finer categorization';