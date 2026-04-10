-- Fix is_available column to prevent NULL values and ensure all items are visible

-- Step 1: Update existing NULL or false values to true
UPDATE menu_items 
SET is_available = true 
WHERE is_available IS NULL OR is_available = false;

-- Step 2: Set default value to true for new rows
ALTER TABLE menu_items 
ALTER COLUMN is_available SET DEFAULT true;

-- Step 3: Add NOT NULL constraint
ALTER TABLE menu_items 
ALTER COLUMN is_available SET NOT NULL;

-- Step 4: Add CHECK constraint to ensure is_available is never NULL
ALTER TABLE menu_items 
ADD CONSTRAINT check_is_available_not_null 
CHECK (is_available IS NOT NULL);