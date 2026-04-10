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

export interface AdminMenuItem {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategoryId?: string | null;
  imageUrl: string;
  imageAlt: string;
  tags?: string[];
  isAvailable?: boolean;
  isFeatured?: boolean;
  displayOrder?: number;
}

export interface AdminRestaurantImage {
  id?: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  spanClass?: string;
  displayOrder?: number;
  isActive?: boolean;
  isIntro?: boolean;
}

export interface AdminOffer {
  id?: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  ctaText?: string;
  ctaLink?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  validUntil?: string;
  terms?: string;
  displayOrder?: number;
}

export const adminService = {
  // File Upload
  async uploadImage(file: File): Promise<string> {
    const supabase = createClient();

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('restaurant-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError.message);
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('restaurant-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error: any) {
      console.error('Image upload failed:', error.message);
      throw error;
    }
  },

  // Menu Items CRUD
  async getAllMenuItems(): Promise<AdminMenuItem[]> {
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
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
          price: parseFloat(row.price),
          category: row.category,
          subcategoryId: row.subcategory_id || null,
          imageUrl: row.image_url,
          imageAlt: row.image_alt,
          tags: row.tags || [],
          isAvailable: row.is_available,
          isFeatured: row.is_featured || false,
          displayOrder: row.display_order,
        })) || []
      );
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },

  async createMenuItem(item: AdminMenuItem): Promise<AdminMenuItem | null> {
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from('menu_items')
        .insert({
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category,
          subcategory_id: item.subcategoryId || null,
          image_url: item.imageUrl,
          image_alt: item.imageAlt,
          tags: item.tags || [],
          is_available: item.isAvailable ?? true,
          is_featured: item.isFeatured ?? false,
          display_order: item.displayOrder ?? 0,
        })
        .select()
        .single();

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        } else {
          console.error('Data error:', error.message);
          return null;
        }
      }

      return {
        id: data.id,
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        category: data.category,
        subcategoryId: data.subcategory_id || null,
        imageUrl: data.image_url,
        imageAlt: data.image_alt,
        tags: data.tags || [],
        isAvailable: data.is_available,
        isFeatured: data.is_featured || false,
        displayOrder: data.display_order,
      };
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },

  async updateMenuItem(id: string, item: Partial<AdminMenuItem>): Promise<AdminMenuItem | null> {
    const supabase = createClient();

    try {
      const updateData: any = {};
      if (item.name !== undefined) updateData.name = item.name;
      if (item.description !== undefined) updateData.description = item.description;
      if (item.price !== undefined) updateData.price = item.price;
      if (item.category !== undefined) updateData.category = item.category;
      if (item.subcategoryId !== undefined) updateData.subcategory_id = item.subcategoryId;
      if (item.imageUrl !== undefined) updateData.image_url = item.imageUrl;
      if (item.imageAlt !== undefined) updateData.image_alt = item.imageAlt;
      if (item.tags !== undefined) updateData.tags = item.tags;
      // CRITICAL: Always ensure is_available defaults to true
      updateData.is_available = item.isAvailable ?? true;
      if (item.isFeatured !== undefined) updateData.is_featured = item.isFeatured;
      if (item.displayOrder !== undefined) updateData.display_order = item.displayOrder;

      const { data, error } = await supabase
        .from('menu_items')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        } else {
          console.error('Data error:', error.message);
          return null;
        }
      }

      return {
        id: data.id,
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        category: data.category,
        subcategoryId: data.subcategory_id || null,
        imageUrl: data.image_url,
        imageAlt: data.image_alt,
        tags: data.tags || [],
        isAvailable: data.is_available,
        isFeatured: data.is_featured || false,
        displayOrder: data.display_order,
      };
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },

  async deleteMenuItem(id: string): Promise<boolean> {
    const supabase = createClient();

    try {
      const { error } = await supabase.from('menu_items').delete().eq('id', id);

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        } else {
          console.error('Data error:', error.message);
          return false;
        }
      }

      return true;
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },

  // Restaurant Images CRUD
  async getAllRestaurantImages(): Promise<AdminRestaurantImage[]> {
    const supabase = createClient();

    try {
      // No authentication check needed - RLS policies handle security
      // Public users can read active images, authenticated users can read all
      const { data, error } = await supabase
        .from('restaurant_images')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        } else {
          console.error('Data error:', error.message);
          return [];
        }
      }

      return (
        data?.map((row) => ({
          id: row.id,
          title: row.title,
          imageUrl: row.image_url,
          imageAlt: row.image_alt,
          spanClass: row.span_class,
          displayOrder: row.display_order,
          isActive: row.is_active,
          isIntro: row.is_intro || false,
        })) || []
      );
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },

  async createRestaurantImage(image: AdminRestaurantImage): Promise<AdminRestaurantImage | null> {
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from('restaurant_images')
        .insert({
          title: image.title,
          image_url: image.imageUrl,
          image_alt: image.imageAlt,
          span_class: image.spanClass || '',
          display_order: image.displayOrder ?? 0,
          is_active: image.isActive ?? true,
          is_intro: image.isIntro ?? false,
        })
        .select()
        .single();

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        } else {
          console.error('Data error:', error.message);
          return null;
        }
      }

      return {
        id: data.id,
        title: data.title,
        imageUrl: data.image_url,
        imageAlt: data.image_alt,
        spanClass: data.span_class,
        displayOrder: data.display_order,
        isActive: data.is_active,
        isIntro: data.is_intro || false,
      };
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },

  async updateRestaurantImage(id: string, image: Partial<AdminRestaurantImage>): Promise<AdminRestaurantImage | null> {
    const supabase = createClient();

    try {
      const updateData: any = {};
      if (image.title !== undefined) updateData.title = image.title;
      if (image.imageUrl !== undefined) updateData.image_url = image.imageUrl;
      if (image.imageAlt !== undefined) updateData.image_alt = image.imageAlt;
      if (image.spanClass !== undefined) updateData.span_class = image.spanClass;
      if (image.displayOrder !== undefined) updateData.display_order = image.displayOrder;
      if (image.isActive !== undefined) updateData.is_active = image.isActive;
      if (image.isIntro !== undefined) updateData.is_intro = image.isIntro;

      const { data, error } = await supabase
        .from('restaurant_images')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        } else {
          console.error('Data error:', error.message);
          return null;
        }
      }

      return {
        id: data.id,
        title: data.title,
        imageUrl: data.image_url,
        imageAlt: data.image_alt,
        spanClass: data.span_class,
        displayOrder: data.display_order,
        isActive: data.is_active,
        isIntro: data.is_intro || false,
      };
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },

  async deleteRestaurantImage(id: string): Promise<void> {
    const supabase = createClient();

    try {
      const { error } = await supabase.from('restaurant_images').delete().eq('id', id);

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        } else {
          console.error('Data error:', error.message);
          throw error;
        }
      }
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },

  // Offers CRUD
  async getAllOffers(): Promise<AdminOffer[]> {
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
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
          status: row.status,
          startDate: row.start_date,
          endDate: row.end_date,
          validUntil: row.valid_until,
          terms: row.terms,
          displayOrder: row.display_order,
        })) || []
      );
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },

  async createOffer(offer: AdminOffer): Promise<AdminOffer | null> {
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from('offers')
        .insert({
          title: offer.title,
          subtitle: offer.subtitle,
          description: offer.description,
          image_url: offer.imageUrl,
          image_alt: offer.imageAlt,
          cta_text: offer.ctaText || 'Order Now',
          cta_link: offer.ctaLink || '/delivery',
          status: offer.status || 'active',
          start_date: offer.startDate,
          end_date: offer.endDate,
          valid_until: offer.validUntil,
          terms: offer.terms,
          display_order: offer.displayOrder ?? 0,
        })
        .select()
        .single();

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        } else {
          console.error('Data error:', error.message);
          return null;
        }
      }

      return {
        id: data.id,
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        imageUrl: data.image_url,
        imageAlt: data.image_alt,
        ctaText: data.cta_text,
        ctaLink: data.cta_link,
        status: data.status,
        startDate: data.start_date,
        endDate: data.end_date,
        validUntil: data.valid_until,
        terms: data.terms,
        displayOrder: data.display_order,
      };
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },

  async updateOffer(id: string, offer: Partial<AdminOffer>): Promise<AdminOffer | null> {
    const supabase = createClient();

    try {
      const updateData: any = {};
      if (offer.title !== undefined) updateData.title = offer.title;
      if (offer.subtitle !== undefined) updateData.subtitle = offer.subtitle;
      if (offer.description !== undefined) updateData.description = offer.description;
      if (offer.imageUrl !== undefined) updateData.image_url = offer.imageUrl;
      if (offer.imageAlt !== undefined) updateData.image_alt = offer.imageAlt;
      if (offer.ctaText !== undefined) updateData.cta_text = offer.ctaText;
      if (offer.ctaLink !== undefined) updateData.cta_link = offer.ctaLink;
      if (offer.status !== undefined) updateData.status = offer.status;
      if (offer.startDate !== undefined) updateData.start_date = offer.startDate;
      if (offer.endDate !== undefined) updateData.end_date = offer.endDate;
      if (offer.validUntil !== undefined) updateData.valid_until = offer.validUntil;
      if (offer.terms !== undefined) updateData.terms = offer.terms;
      if (offer.displayOrder !== undefined) updateData.display_order = offer.displayOrder;

      const { data, error } = await supabase
        .from('offers')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        } else {
          console.error('Data error:', error.message);
          return null;
        }
      }

      return {
        id: data.id,
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        imageUrl: data.image_url,
        imageAlt: data.image_alt,
        ctaText: data.cta_text,
        ctaLink: data.cta_link,
        status: data.status,
        startDate: data.start_date,
        endDate: data.end_date,
        validUntil: data.valid_until,
        terms: data.terms,
        displayOrder: data.display_order,
      };
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },

  async deleteOffer(id: string): Promise<boolean> {
    const supabase = createClient();

    try {
      const { error } = await supabase.from('offers').delete().eq('id', id);

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        } else {
          console.error('Data error:', error.message);
          return false;
        }
      }

      return true;
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },

  // Categories CRUD
  async getAllCategories(): Promise<Array<{
    id: string;
    value: string;
    label: string;
    emoji: string;
    displayOrder: number;
    isVisible: boolean;
  }>> {
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        } else {
          console.error('Data error:', error.message);
          return [];
        }
      }

      return (
        data?.map((row) => ({
          id: row.id,
          value: row.value,
          label: row.label,
          emoji: row.emoji || '🍽️',
          displayOrder: row.display_order,
          isVisible: row.is_visible,
        })) || []
      );
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },

  async createCategory(category: {
    value: string;
    label: string;
    emoji?: string;
    displayOrder?: number;
    isVisible?: boolean;
  }): Promise<any> {
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from('categories')
        .insert({
          value: category.value,
          label: category.label,
          emoji: category.emoji || '🍽️',
          display_order: category.displayOrder ?? 0,
          is_visible: category.isVisible ?? true,
        })
        .select()
        .single();

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        } else {
          console.error('Data error:', error.message);
          throw new Error(error.message);
        }
      }

      return data;
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },

  async updateCategory(
    id: string,
    category: Partial<{
      label: string;
      emoji: string;
      displayOrder: number;
      isVisible: boolean;
    }>
  ): Promise<any> {
    const supabase = createClient();

    try {
      const updateData: any = {};
      if (category.label !== undefined) updateData.label = category.label;
      if (category.emoji !== undefined) updateData.emoji = category.emoji;
      if (category.displayOrder !== undefined) updateData.display_order = category.displayOrder;
      if (category.isVisible !== undefined) updateData.is_visible = category.isVisible;

      const { data, error } = await supabase
        .from('categories')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        } else {
          console.error('Data error:', error.message);
          throw new Error(error.message);
        }
      }

      return data;
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },

  async deleteCategory(id: string): Promise<void> {
    const supabase = createClient();

    try {
      const { error } = await supabase.from('categories').delete().eq('id', id);

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        } else {
          console.error('Data error:', error.message);
          throw new Error(error.message);
        }
      }
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },

  // Subcategories CRUD
  async getAllSubcategories(): Promise<Array<{
    id: string;
    categoryId: string;
    value: string;
    label: string;
    emoji: string;
    displayOrder: number;
    isVisible: boolean;
  }>> {
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from('subcategories')
        .select('*')
        .order('category_id', { ascending: true })
        .order('display_order', { ascending: true });

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        } else {
          console.error('Data error:', error.message);
          return [];
        }
      }

      return (
        data?.map((row) => ({
          id: row.id,
          categoryId: row.category_id,
          value: row.value,
          label: row.label,
          emoji: row.emoji || '🍽️',
          displayOrder: row.display_order,
          isVisible: row.is_visible,
        })) || []
      );
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },

  async getSubcategoriesByCategory(categoryId: string): Promise<Array<{
    id: string;
    value: string;
    label: string;
    emoji: string;
    displayOrder: number;
    isVisible: boolean;
  }>> {
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from('subcategories')
        .select('*')
        .eq('category_id', categoryId)
        .order('display_order', { ascending: true });

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        } else {
          console.error('Data error:', error.message);
          return [];
        }
      }

      return (
        data?.map((row) => ({
          id: row.id,
          value: row.value,
          label: row.label,
          emoji: row.emoji || '🍽️',
          displayOrder: row.display_order,
          isVisible: row.is_visible,
        })) || []
      );
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },

  async createSubcategory(subcategory: {
    categoryId: string;
    value: string;
    label: string;
    emoji?: string;
    displayOrder?: number;
    isVisible?: boolean;
  }): Promise<any> {
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from('subcategories')
        .insert({
          category_id: subcategory.categoryId,
          value: subcategory.value,
          label: subcategory.label,
          emoji: subcategory.emoji || '🍽️',
          display_order: subcategory.displayOrder ?? 0,
          is_visible: subcategory.isVisible ?? true,
        })
        .select()
        .single();

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        } else {
          console.error('Data error:', error.message);
          throw new Error(error.message);
        }
      }

      return data;
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },

  async updateSubcategory(
    id: string,
    subcategory: Partial<{
      label: string;
      emoji: string;
      displayOrder: number;
      isVisible: boolean;
    }>
  ): Promise<any> {
    const supabase = createClient();

    try {
      const updateData: any = {};
      if (subcategory.label !== undefined) updateData.label = subcategory.label;
      if (subcategory.emoji !== undefined) updateData.emoji = subcategory.emoji;
      if (subcategory.displayOrder !== undefined) updateData.display_order = subcategory.displayOrder;
      if (subcategory.isVisible !== undefined) updateData.is_visible = subcategory.isVisible;

      const { data, error } = await supabase
        .from('subcategories')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        } else {
          console.error('Data error:', error.message);
          throw new Error(error.message);
        }
      }

      return data;
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },

  async deleteSubcategory(id: string): Promise<void> {
    const supabase = createClient();

    try {
      const { error } = await supabase.from('subcategories').delete().eq('id', id);

      if (error) {
        if (isSchemaError(error)) {
          console.error('Schema error:', error.message);
          throw error;
        } else {
          console.error('Data error:', error.message);
          throw new Error(error.message);
        }
      }
    } catch (error: any) {
      console.error('Schema-related error:', error.message);
      throw error;
    }
  },
};