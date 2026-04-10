-- Add price column to offers table
ALTER TABLE public.offers ADD COLUMN IF NOT EXISTS price text;
