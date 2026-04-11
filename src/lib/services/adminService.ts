'use client';

import {
  adminMenuItems,
  adminRestaurantImages,
  adminOffers,
  categories as staticCategories,
  subcategories as staticSubcategories,
  aboutImages as staticAboutImages,
} from '@/lib/data/staticData';
import type {
  AdminMenuItem,
  AdminRestaurantImage,
  AdminOffer,
  Category,
  Subcategory,
  AboutImage,
} from '@/lib/data/staticData';

export type { AdminMenuItem, AdminRestaurantImage, AdminOffer, Category, Subcategory, AboutImage };

// ---------------------------------------------------------------------------
// localStorage helpers
// ---------------------------------------------------------------------------

const STORAGE_KEYS = {
  menuItems: 'jpizza_menu_items',
  restaurantImages: 'jpizza_restaurant_images',
  offers: 'jpizza_offers',
  categories: 'jpizza_categories',
  subcategories: 'jpizza_subcategories',
  aboutImages: 'jpizza_about_images',
} as const;

const STORAGE_VERSION_KEY = 'jpizza_storage_version';
const STORAGE_VERSION = '2'; // bump when bundled image paths change

function loadFromStorage<T>(key: string, fallback: T[]): T[] {
  if (typeof window === 'undefined') return fallback;
  try {
    if (localStorage.getItem(STORAGE_VERSION_KEY) !== STORAGE_VERSION) {
      Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
      localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION);
      return fallback;
    }
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch {
    // corrupted data — reset
  }
  return fallback;
}

function saveToStorage<T>(key: string, data: T[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // storage full — silent fail
  }
}

// ---------------------------------------------------------------------------
// In-memory stores (hydrated from localStorage on first access)
// ---------------------------------------------------------------------------

let _menuItemsStore: AdminMenuItem[] | null = null;
let _restaurantImagesStore: AdminRestaurantImage[] | null = null;
let _offersStore: AdminOffer[] | null = null;
let _categoriesStore: Category[] | null = null;
let _subcategoriesStore: Subcategory[] | null = null;
let _aboutImagesStore: AboutImage[] | null = null;

function getMenuItems() {
  if (!_menuItemsStore) _menuItemsStore = loadFromStorage(STORAGE_KEYS.menuItems, adminMenuItems);
  return _menuItemsStore;
}
function getRestaurantImages() {
  if (!_restaurantImagesStore) _restaurantImagesStore = loadFromStorage(STORAGE_KEYS.restaurantImages, adminRestaurantImages);
  return _restaurantImagesStore;
}
function getOffers() {
  if (!_offersStore) _offersStore = loadFromStorage(STORAGE_KEYS.offers, adminOffers);
  return _offersStore;
}
function getCategories() {
  if (!_categoriesStore) _categoriesStore = loadFromStorage(STORAGE_KEYS.categories, staticCategories);
  return _categoriesStore;
}
function getSubcategories() {
  if (!_subcategoriesStore) _subcategoriesStore = loadFromStorage(STORAGE_KEYS.subcategories, staticSubcategories);
  return _subcategoriesStore;
}
function getAboutImages() {
  if (!_aboutImagesStore) _aboutImagesStore = loadFromStorage(STORAGE_KEYS.aboutImages, staticAboutImages);
  return _aboutImagesStore;
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// ---------------------------------------------------------------------------
// Admin service
// ---------------------------------------------------------------------------

export const adminService = {
  // File Upload — convert to data URL so it works locally
  async uploadImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  },

  // --- Menu Items CRUD ---
  async getAllMenuItems() {
    return getMenuItems();
  },

  async createMenuItem(item: Omit<AdminMenuItem, 'id'>) {
    const store = getMenuItems();
    const newItem = { ...item, id: generateId() };
    store.push(newItem);
    saveToStorage(STORAGE_KEYS.menuItems, store);
    return newItem;
  },

  async updateMenuItem(id: string, updates: Partial<AdminMenuItem>) {
    const store = getMenuItems();
    const index = store.findIndex((i) => i.id === id);
    if (index >= 0) {
      store[index] = { ...store[index], ...updates };
      saveToStorage(STORAGE_KEYS.menuItems, store);
      return store[index];
    }
    throw new Error('Menu item not found');
  },

  async deleteMenuItem(id: string) {
    const store = getMenuItems();
    const filtered = store.filter((i) => i.id !== id);
    _menuItemsStore = filtered;
    saveToStorage(STORAGE_KEYS.menuItems, filtered);
  },

  // --- Restaurant Images CRUD ---
  async getAllRestaurantImages() {
    return getRestaurantImages();
  },

  async createRestaurantImage(image: Omit<AdminRestaurantImage, 'id'>) {
    const store = getRestaurantImages();
    const newImage = { ...image, id: generateId() };
    store.push(newImage);
    saveToStorage(STORAGE_KEYS.restaurantImages, store);
    return newImage;
  },

  async updateRestaurantImage(id: string, updates: Partial<AdminRestaurantImage>) {
    const store = getRestaurantImages();
    const index = store.findIndex((i) => i.id === id);
    if (index >= 0) {
      store[index] = { ...store[index], ...updates };
      saveToStorage(STORAGE_KEYS.restaurantImages, store);
      return store[index];
    }
    throw new Error('Image not found');
  },

  async deleteRestaurantImage(id: string) {
    const filtered = getRestaurantImages().filter((i) => i.id !== id);
    _restaurantImagesStore = filtered;
    saveToStorage(STORAGE_KEYS.restaurantImages, filtered);
  },

  // --- Offers CRUD ---
  async getAllOffers() {
    return getOffers();
  },

  async createOffer(offer: Omit<AdminOffer, 'id'>) {
    const store = getOffers();
    const newOffer = { ...offer, id: generateId() };
    store.push(newOffer);
    saveToStorage(STORAGE_KEYS.offers, store);
    return newOffer;
  },

  async updateOffer(id: string, updates: Partial<AdminOffer>) {
    const store = getOffers();
    const index = store.findIndex((i) => i.id === id);
    if (index >= 0) {
      store[index] = { ...store[index], ...updates };
      saveToStorage(STORAGE_KEYS.offers, store);
      return store[index];
    }
    throw new Error('Offer not found');
  },

  async deleteOffer(id: string) {
    const filtered = getOffers().filter((i) => i.id !== id);
    _offersStore = filtered;
    saveToStorage(STORAGE_KEYS.offers, filtered);
  },

  // --- Categories CRUD ---
  async getAllCategories() {
    return getCategories();
  },

  async createCategory(category: Omit<Category, 'id'>) {
    const store = getCategories();
    const newCategory = { ...category, id: generateId() };
    store.push(newCategory);
    saveToStorage(STORAGE_KEYS.categories, store);
    return newCategory;
  },

  async updateCategory(id: string, updates: Partial<Category>) {
    const store = getCategories();
    const index = store.findIndex((c) => c.id === id);
    if (index >= 0) {
      store[index] = { ...store[index], ...updates };
      saveToStorage(STORAGE_KEYS.categories, store);
      return store[index];
    }
    throw new Error('Category not found');
  },

  async deleteCategory(id: string) {
    const filtered = getCategories().filter((c) => c.id !== id);
    _categoriesStore = filtered;
    saveToStorage(STORAGE_KEYS.categories, filtered);
  },

  // --- Subcategories CRUD ---
  async getAllSubcategories() {
    return getSubcategories();
  },

  async getSubcategoriesByCategory(categoryId: string) {
    return getSubcategories().filter((s) => s.categoryId === categoryId);
  },

  async createSubcategory(subcategory: Omit<Subcategory, 'id'>) {
    const store = getSubcategories();
    const newSub = { ...subcategory, id: generateId() };
    store.push(newSub);
    saveToStorage(STORAGE_KEYS.subcategories, store);
    return newSub;
  },

  async updateSubcategory(id: string, updates: Partial<Subcategory>) {
    const store = getSubcategories();
    const index = store.findIndex((s) => s.id === id);
    if (index >= 0) {
      store[index] = { ...store[index], ...updates };
      saveToStorage(STORAGE_KEYS.subcategories, store);
      return store[index];
    }
    throw new Error('Subcategory not found');
  },

  async deleteSubcategory(id: string) {
    const filtered = getSubcategories().filter((s) => s.id !== id);
    _subcategoriesStore = filtered;
    saveToStorage(STORAGE_KEYS.subcategories, filtered);
  },

  // --- About Images CRUD ---
  async getAllAboutImages() {
    return getAboutImages();
  },

  async createAboutImage(image: Omit<AboutImage, 'id'>) {
    const store = getAboutImages();
    const newImage = { ...image, id: generateId() };
    store.push(newImage);
    saveToStorage(STORAGE_KEYS.aboutImages, store);
    return newImage;
  },

  async updateAboutImage(id: string, updates: Partial<AboutImage>) {
    const store = getAboutImages();
    const index = store.findIndex((i) => i.id === id);
    if (index >= 0) {
      store[index] = { ...store[index], ...updates };
      saveToStorage(STORAGE_KEYS.aboutImages, store);
      return store[index];
    }
    throw new Error('About image not found');
  },

  async deleteAboutImage(id: string) {
    const filtered = getAboutImages().filter((i) => i.id !== id);
    _aboutImagesStore = filtered;
    saveToStorage(STORAGE_KEYS.aboutImages, filtered);
  },
};
