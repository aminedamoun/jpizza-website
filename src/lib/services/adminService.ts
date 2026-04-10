'use client';

import {
  adminMenuItems,
  adminRestaurantImages,
  adminOffers,
  categories as staticCategories,
  subcategories as staticSubcategories,
  aboutImages as staticAboutImages,
} from '@/lib/data/staticData';

export type {
  AdminMenuItem,
  AdminRestaurantImage,
  AdminOffer,
  Category,
  Subcategory,
  AboutImage,
} from '@/lib/data/staticData';

// In-memory copies so admin edits persist within a session
let menuItemsStore = [...adminMenuItems];
let restaurantImagesStore = [...adminRestaurantImages];
let offersStore = [...adminOffers];
let categoriesStore = [...staticCategories];
let subcategoriesStore = [...staticSubcategories];
let aboutImagesStore = [...staticAboutImages];

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export const adminService = {
  // File Upload (local placeholder - stores as data URL)
  async uploadImage(_file: File): Promise<string> {
    return '/assets/images/no_image.png';
  },

  // Menu Items CRUD
  async getAllMenuItems() {
    return menuItemsStore;
  },

  async createMenuItem(item: Omit<typeof adminMenuItems[0], 'id'>) {
    const newItem = { ...item, id: generateId() };
    menuItemsStore.push(newItem);
    return newItem;
  },

  async updateMenuItem(id: string, updates: Partial<typeof adminMenuItems[0]>) {
    const index = menuItemsStore.findIndex((i) => i.id === id);
    if (index >= 0) {
      menuItemsStore[index] = { ...menuItemsStore[index], ...updates };
      return menuItemsStore[index];
    }
    throw new Error('Menu item not found');
  },

  async deleteMenuItem(id: string) {
    menuItemsStore = menuItemsStore.filter((i) => i.id !== id);
  },

  // Restaurant Images CRUD
  async getAllRestaurantImages() {
    return restaurantImagesStore;
  },

  async createRestaurantImage(image: Omit<typeof adminRestaurantImages[0], 'id'>) {
    const newImage = { ...image, id: generateId() };
    restaurantImagesStore.push(newImage);
    return newImage;
  },

  async updateRestaurantImage(id: string, updates: Partial<typeof adminRestaurantImages[0]>) {
    const index = restaurantImagesStore.findIndex((i) => i.id === id);
    if (index >= 0) {
      restaurantImagesStore[index] = { ...restaurantImagesStore[index], ...updates };
      return restaurantImagesStore[index];
    }
    throw new Error('Image not found');
  },

  async deleteRestaurantImage(id: string) {
    restaurantImagesStore = restaurantImagesStore.filter((i) => i.id !== id);
  },

  // Offers CRUD
  async getAllOffers() {
    return offersStore;
  },

  async createOffer(offer: Omit<typeof adminOffers[0], 'id'>) {
    const newOffer = { ...offer, id: generateId() };
    offersStore.push(newOffer);
    return newOffer;
  },

  async updateOffer(id: string, updates: Partial<typeof adminOffers[0]>) {
    const index = offersStore.findIndex((i) => i.id === id);
    if (index >= 0) {
      offersStore[index] = { ...offersStore[index], ...updates };
      return offersStore[index];
    }
    throw new Error('Offer not found');
  },

  async deleteOffer(id: string) {
    offersStore = offersStore.filter((i) => i.id !== id);
  },

  // Categories CRUD
  async getAllCategories() {
    return categoriesStore;
  },

  async createCategory(category: Omit<typeof staticCategories[0], 'id'>) {
    const newCategory = { ...category, id: generateId() };
    categoriesStore.push(newCategory);
    return newCategory;
  },

  async updateCategory(id: string, updates: Partial<typeof staticCategories[0]>) {
    const index = categoriesStore.findIndex((c) => c.id === id);
    if (index >= 0) {
      categoriesStore[index] = { ...categoriesStore[index], ...updates };
      return categoriesStore[index];
    }
    throw new Error('Category not found');
  },

  async deleteCategory(id: string) {
    categoriesStore = categoriesStore.filter((c) => c.id !== id);
  },

  // Subcategories CRUD
  async getAllSubcategories() {
    return subcategoriesStore;
  },

  async getSubcategoriesByCategory(categoryId: string) {
    return subcategoriesStore.filter((s) => s.categoryId === categoryId);
  },

  async createSubcategory(subcategory: Omit<typeof staticSubcategories[0], 'id'>) {
    const newSub = { ...subcategory, id: generateId() };
    subcategoriesStore.push(newSub);
    return newSub;
  },

  async updateSubcategory(id: string, updates: Partial<typeof staticSubcategories[0]>) {
    const index = subcategoriesStore.findIndex((s) => s.id === id);
    if (index >= 0) {
      subcategoriesStore[index] = { ...subcategoriesStore[index], ...updates };
      return subcategoriesStore[index];
    }
    throw new Error('Subcategory not found');
  },

  async deleteSubcategory(id: string) {
    subcategoriesStore = subcategoriesStore.filter((s) => s.id !== id);
  },

  // About Images CRUD
  async getAllAboutImages() {
    return aboutImagesStore;
  },

  async createAboutImage(image: Omit<typeof staticAboutImages[0], 'id'>) {
    const newImage = { ...image, id: generateId() };
    aboutImagesStore.push(newImage);
    return newImage;
  },

  async updateAboutImage(id: string, updates: Partial<typeof staticAboutImages[0]>) {
    const index = aboutImagesStore.findIndex((i) => i.id === id);
    if (index >= 0) {
      aboutImagesStore[index] = { ...aboutImagesStore[index], ...updates };
      return aboutImagesStore[index];
    }
    throw new Error('About image not found');
  },

  async deleteAboutImage(id: string) {
    aboutImagesStore = aboutImagesStore.filter((i) => i.id !== id);
  },
};
