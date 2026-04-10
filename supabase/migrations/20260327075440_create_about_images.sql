-- Create about_images table for managing About Us page images
CREATE TABLE IF NOT EXISTS public.about_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  image_alt TEXT NOT NULL DEFAULT '',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_about_images_display_order ON public.about_images(display_order);
CREATE INDEX IF NOT EXISTS idx_about_images_is_active ON public.about_images(is_active);

ALTER TABLE public.about_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_about_images" ON public.about_images;
CREATE POLICY "public_read_about_images"
ON public.about_images
FOR SELECT
TO public
USING (true);

DROP POLICY IF EXISTS "authenticated_manage_about_images" ON public.about_images;
CREATE POLICY "authenticated_manage_about_images"
ON public.about_images
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Seed with default about image
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.about_images LIMIT 1) THEN
    INSERT INTO public.about_images (title, image_url, image_alt, display_order, is_active)
    VALUES (
      'Chef at Work',
      'https://698ef95f42985dd050940011.imgix.net/aboutus1.webp',
      'Chef Marco hand-stretching pizza dough using traditional Neapolitan technique',
      0,
      true
    )
    ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;
