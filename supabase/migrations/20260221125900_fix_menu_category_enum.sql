-- Fix Menu Category Enum Migration
-- Adds missing 'classic' value to menu_category enum type
-- This fixes the error: invalid input value for enum menu_category: "classic"

-- Step 1: Add the 'classic' value to the menu_category enum if it doesn't exist
-- Note: ALTER TYPE ADD VALUE cannot be run inside a transaction block in some PostgreSQL versions,
-- but Supabase migrations handle this correctly

DO $$
BEGIN
  -- Check if 'classic' value already exists in the enum
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum
    WHERE enumlabel = 'classic'
    AND enumtypid = 'public.menu_category'::regtype
  ) THEN
    -- Add 'classic' to the enum
    ALTER TYPE public.menu_category ADD VALUE 'classic';
    RAISE NOTICE 'Added classic value to menu_category enum';
  ELSE
    RAISE NOTICE 'classic value already exists in menu_category enum';
  END IF;
END $$;

-- Step 2: Verify the enum values
-- You can uncomment this to see all current enum values:
-- SELECT enumlabel FROM pg_enum WHERE enumtypid = 'public.menu_category'::regtype ORDER BY enumsortorder;