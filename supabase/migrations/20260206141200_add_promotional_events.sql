-- Add additional columns for promotional events
ALTER TABLE public.offers 
ADD COLUMN IF NOT EXISTS valid_until TEXT,
ADD COLUMN IF NOT EXISTS terms TEXT;

-- Insert 2 promotional event offers
INSERT INTO public.offers (
  title,
  subtitle,
  description,
  image_url,
  image_alt,
  cta_text,
  cta_link,
  status,
  valid_until,
  terms,
  display_order
) VALUES 
(
  'Buy 2 Get 1 Free',
  'SPECIAL PROMOTION',
  'Order any two large pizzas and get a third one absolutely free. Perfect for sharing with family and friends.',
  'https://images.unsplash.com/photo-1708938894316-20f2f21cf68d',
  'Delicious margherita pizza with fresh basil and mozzarella',
  'Order Now',
  '/delivery',
  'active',
  'Valid until end of February',
  'Dine-in and takeaway only',
  1
),
(
  'Weekend Feast',
  'WEEKEND SPECIAL',
  'Every Saturday and Sunday, get 30% off on all orders above AED 200. Make your weekends more delicious.',
  'https://images.unsplash.com/photo-1717250180255-5509e931bded',
  'Gourmet burger with premium ingredients',
  'Reserve Now',
  '/reservations',
  'active',
  'Valid every weekend',
  'Cannot be combined with other offers',
  2
)
ON CONFLICT (id) DO NOTHING;