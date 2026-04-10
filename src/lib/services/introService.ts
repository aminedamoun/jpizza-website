'use client';

import { createClient } from '@/lib/supabase/client';

export interface IntroImage {
  id: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  displayOrder: number;
}

export const introService = {
  async getIntroImages(): Promise<IntroImage[]> {
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from('restaurant_images')
        .select('*')
        .eq('is_intro', true)
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching intro images:', error);
        return [];
      }

      return (
        data?.map((row) => ({
          id: row.id,
          title: row.title,
          imageUrl: row.image_url,
          imageAlt: row.image_alt,
          displayOrder: row.display_order,
        })) || []
      );
    } catch (error) {
      console.error('Failed to fetch intro images:', error);
      return [];
    }
  },
};