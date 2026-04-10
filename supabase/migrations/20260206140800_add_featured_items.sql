-- Add is_featured column to menu_items table
ALTER TABLE public.menu_items 
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_menu_items_is_featured 
ON public.menu_items(is_featured) 
WHERE is_featured = true;

-- Add comment
COMMENT ON COLUMN public.menu_items.is_featured IS 'Marks item as featured for homepage display';