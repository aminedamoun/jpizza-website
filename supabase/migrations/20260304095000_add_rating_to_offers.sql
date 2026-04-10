-- Add rating column to offers table
ALTER TABLE public.offers
ADD COLUMN IF NOT EXISTS rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5);
