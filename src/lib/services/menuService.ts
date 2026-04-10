'use client';

import {
  menuItems as staticMenuItems,
  restaurantImages as staticRestaurantImages,
  offers as staticOffers,
  adminMenuItems,
} from '@/lib/data/staticData';

export type { MenuItem, RestaurantImage, Offer } from '@/lib/data/staticData';

// Read from localStorage if admin has made changes, otherwise use defaults
function getStoredMenuItems() {
  if (typeof window === 'undefined') return staticMenuItems;
  try {
    const stored = localStorage.getItem('jpizza_menu_items');
    if (stored) {
      const adminItems = JSON.parse(stored);
      // Convert admin format to public format
      return adminItems
        .filter((item: any) => item.isAvailable !== false)
        .map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: `AED ${item.price}`,
          category: item.category,
          subcategoryId: item.subcategoryId || null,
          image: item.imageUrl,
          alt: item.imageAlt,
          tags: item.tags || [],
          isFeatured: item.isFeatured || false,
        }));
    }
  } catch {
    // fall through to defaults
  }
  return staticMenuItems;
}

function getStoredOffers() {
  if (typeof window === 'undefined') return staticOffers;
  try {
    const stored = localStorage.getItem('jpizza_offers');
    if (stored) return JSON.parse(stored);
  } catch {
    // fall through
  }
  return staticOffers;
}

export const menuService = {
  async getMenuItems(category?: string) {
    const items = getStoredMenuItems();
    if (category && category !== 'all') {
      return items.filter((item: any) => item.category === category);
    }
    return items;
  },

  async getFeaturedPizzas(limit: number = 5) {
    const items = getStoredMenuItems();
    return items.filter((item: any) => item.isFeatured).slice(0, limit);
  },

  async getSides() {
    const items = getStoredMenuItems();
    return items.filter((item: any) => item.category === 'small_appetizer');
  },

  async getBeverages() {
    const items = getStoredMenuItems();
    return items.filter((item: any) => item.category === 'drinks');
  },

  async getRestaurantImages() {
    return staticRestaurantImages;
  },

  async getIntroImages() {
    return staticRestaurantImages;
  },

  async getActiveOffers() {
    return getStoredOffers();
  },
};
