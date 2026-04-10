-- Add is_intro column to restaurant_images table
ALTER TABLE public.restaurant_images
ADD COLUMN IF NOT EXISTS is_intro BOOLEAN DEFAULT false;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_restaurant_images_is_intro ON public.restaurant_images(is_intro) WHERE is_intro = true;

-- Add some sample intro images
DO $$
BEGIN
    -- Insert sample intro images if none exist
    IF NOT EXISTS (SELECT 1 FROM public.restaurant_images WHERE is_intro = true) THEN
        INSERT INTO public.restaurant_images (title, image_url, image_alt, is_intro, display_order, is_active)
        VALUES 
            ('Welcome Image 1', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800', 'Delicious pizza with fresh ingredients', true, 1, true),
            ('Welcome Image 2', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800', 'Authentic Italian pizza in wood-fired oven', true, 2, true),
            ('Welcome Image 3', 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800', 'Fresh pizza with melted cheese', true, 3, true),
            ('Welcome Image 4', 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800', 'Pizza chef preparing fresh dough', true, 4, true),
            ('Welcome Image 5', 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800', 'Gourmet pizza with premium toppings', true, 5, true),
            ('Welcome Image 6', 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=800', 'Traditional Italian pizza slice', true, 6, true),
            ('Welcome Image 7', 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800', 'Wood-fired pizza oven in action', true, 7, true),
            ('Welcome Image 8', 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800', 'Freshly baked pizza with basil', true, 8, true)
        ON CONFLICT (id) DO NOTHING;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Sample intro images insertion failed: %', SQLERRM;
END $$;