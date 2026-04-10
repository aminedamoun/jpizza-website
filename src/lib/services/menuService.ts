'use client';

import { createClient } from '@/lib/supabase/client';

function isSchemaError(error: any): boolean {
  if (!error) return false;

  if (error.code && typeof error.code === 'string') {
    const errorClass = error.code.substring(0, 2);
    if (errorClass === '42' || errorClass === '08') {
      return true;
    }
    if (errorClass === '23') {
      return false;
    }
  }

  if (error.message) {
    const schemaErrorPatterns = [
      /relation.*does not exist/i,
      /column.*does not exist/i,
      /function.*does not exist/i,
      /syntax error/i,
      /invalid.*syntax/i,
      /type.*does not exist/i,
      /undefined.*column/i,
      /undefined.*table/i,
      /undefined.*function/i,
    ];

    return schemaErrorPatterns.some((pattern) => pattern.test(error.message));
  }

  return false;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  subcategoryId?: string | null;
  image: string;
  alt: string;
  tags?: string[];
  isFeatured?: boolean;
}

export interface RestaurantImage {
  id: string;
  src: string;
  alt: string;
  span?: string;
}

export interface Offer {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  ctaText: string;
  ctaLink: string;
  validUntil?: string;
  terms?: string;
}

export const menuService = {
  async getMenuItems(category?: string): Promise<MenuItem[]> {
    const supabase = createClient();

    try {
      let query = supabase
        .from('menu_items')
        .select('id, name, description, price, category, subcategory_id, image_url, image_alt, tags, is_featured, is_available, display_order')
        // Defensive query: handle both true and null values
        .or('is_available.eq.true,is_available.is.null')
        .order('display_order', { ascending: true });

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        } else if (error.code === 'PGRST116') {
          return [];
        } else {
          console.error('Data error:', error.message);
          return [];
        }
      }

      // Debug logging to verify fetched items
      

      return (
        data?.map((row) => ({
          id: row.id,
          name: row.name,
          description: row.description,
          price: `AED ${row.price}`,
          category: row.category,
          subcategoryId: row.subcategory_id || null,
          image: row.image_url,
          alt: row.image_alt,
          tags: row.tags || [],
          isFeatured: row.is_featured || false,
        })) || []
      );
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },

  async getFeaturedPizzas(limit: number = 5): Promise<MenuItem[]> {
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('id, name, description, price, category, subcategory_id, image_url, image_alt, tags, is_featured, is_available, display_order')
        .eq('is_featured', true)
        .eq('is_available', true)
        .order('display_order', { ascending: true })
        .limit(limit);

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        } else if (error.code === 'PGRST116') {
          return [];
        } else {
          console.error('Data error:', error.message);
          return [];
        }
      }

      return (
        data?.map((row) => ({
          id: row.id,
          name: row.name,
          description: row.description,
          price: `AED ${row.price}`,
          category: row.category,
          subcategoryId: row.subcategory_id || null,
          image: row.image_url,
          alt: row.image_alt,
          tags: row.tags || [],
          isFeatured: row.is_featured || false,
        })) || []
      );
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },

  async getSides(): Promise<MenuItem[]> {
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('category', 'small_appetizer')
        .eq('is_available', true)
        .order('display_order', { ascending: true });

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        } else if (error.code === 'PGRST116') {
          return [];
        } else {
          console.error('Data error:', error.message);
          return [];
        }
      }

      return (
        data?.map((row) => ({
          id: row.id,
          name: row.name,
          description: row.description,
          price: `AED ${row.price}`,
          category: row.category,
          image: row.image_url,
          alt: row.image_alt,
        })) || []
      );
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },

  async getBeverages(): Promise<MenuItem[]> {
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('category', 'drinks')
        .eq('is_available', true)
        .order('display_order', { ascending: true });

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        } else if (error.code === 'PGRST116') {
          return [];
        } else {
          console.error('Data error:', error.message);
          return [];
        }
      }

      return (
        data?.map((row) => ({
          id: row.id,
          name: row.name,
          description: row.description,
          price: `AED ${row.price}`,
          category: row.category,
          image: row.image_url,
          alt: row.image_alt,
        })) || []
      );
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },

  async getRestaurantImages(): Promise<RestaurantImage[]> {
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from('restaurant_images')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        } else if (error.code === 'PGRST116') {
          return [];
        } else {
          console.error('Data error:', error.message);
          return [];
        }
      }

      return (
        data?.map((row) => ({
          id: row.id,
          src: row.image_url,
          alt: row.image_alt,
          span: row.span_class,
        })) || []
      );
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },

  async getIntroImages(): Promise<RestaurantImage[]> {
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from('restaurant_images')
        .select('*')
        .eq('is_active', true)
        .eq('is_intro', true)
        .order('display_order', { ascending: true });

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        } else if (error.code === 'PGRST116') {
          return [];
        } else {
          console.error('Data error:', error.message);
          return [];
        }
      }

      return (
        data?.map((row) => ({
          id: row.id,
          src: row.image_url,
          alt: row.image_alt,
          span: row.span_class,
        })) || []
      );
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },

  async getActiveOffers(): Promise<Offer[]> {
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('status', 'active')
        .order('display_order', { ascending: true });

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        } else if (error.code === 'PGRST116') {
          return [];
        } else {
          console.error('Data error:', error.message);
          return [];
        }
      }

      return (
        data?.map((row) => ({
          id: row.id,
          title: row.title,
          subtitle: row.subtitle,
          description: row.description,
          imageUrl: row.image_url,
          imageAlt: row.image_alt,
          ctaText: row.cta_text,
          ctaLink: row.cta_link,
          validUntil: row.valid_until,
          terms: row.terms,
        })) || []
      );
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },
};