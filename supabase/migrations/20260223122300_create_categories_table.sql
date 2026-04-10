-- Create Categories Table Migration
-- Allows dynamic category creation without enum modifications

-- Step 1: Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    value TEXT NOT NULL UNIQUE,
    label TEXT NOT NULL,
    emoji TEXT DEFAULT '🍽️',
    display_order INTEGER NOT NULL DEFAULT 0,
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Step 2: Create index for performance
CREATE INDEX IF NOT EXISTS idx_categories_display_order ON public.categories(display_order);
CREATE INDEX IF NOT EXISTS idx_categories_visible ON public.categories(is_visible);

-- Step 3: Insert existing categories from enum
INSERT INTO public.categories (value, label, emoji, display_order, is_visible)
VALUES
    ('breakfast', 'Breakfast', '☀️', 1, true),
    ('small_appetizer', 'Small Appetizer', '🥗', 2, true),
    ('pizza', 'Pizza', '🍕', 3, true),
    ('pasta', 'Pasta', '🍝', 4, true),
    ('dessert', 'Dessert', '🍰', 5, true),
    ('drinks', 'Drinks', '🥤', 6, true),
    ('classic', 'Classic', '⭐', 7, true)
ON CONFLICT (value) DO NOTHING;

-- Step 4: Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS policies for public read access
CREATE POLICY "public_read_categories"
ON public.categories FOR SELECT
TO public
USING (true);

-- Step 6: Create RLS policies for public insert/update/delete
CREATE POLICY "public_insert_categories"
ON public.categories FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "public_update_categories"
ON public.categories FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

CREATE POLICY "public_delete_categories"
ON public.categories FOR DELETE
TO public
USING (true);

-- Step 7: Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON public.categories
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Step 8: Add comment
COMMENT ON TABLE public.categories IS 'Stores menu categories with display configuration';