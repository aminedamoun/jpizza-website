'use client';

import {
  menuItems as staticMenuItems,
  restaurantImages as staticRestaurantImages,
  offers as staticOffers,
  introImages as staticIntroImages,
} from '@/lib/data/staticData';

export type { MenuItem, RestaurantImage, Offer } from '@/lib/data/staticData';

export const menuService = {
  async getMenuItems(category?: string) {
    if (category && category !== 'all') {
      return staticMenuItems.filter((item) => item.category === category);
    }
    return staticMenuItems;
  },

  async getFeaturedPizzas(limit: number = 5) {
    return staticMenuItems.filter((item) => item.isFeatured).slice(0, limit);
  },

  async getSides() {
    return staticMenuItems.filter((item) => item.category === 'small_appetizer');
  },

  async getBeverages() {
    return staticMenuItems.filter((item) => item.category === 'drinks');
  },

  async getRestaurantImages() {
    return staticRestaurantImages;
  },

  async getIntroImages() {
    return staticRestaurantImages;
  },

  async getActiveOffers() {
    return staticOffers;
  },
};
