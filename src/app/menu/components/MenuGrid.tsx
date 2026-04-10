'use client';

import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { menuService, type MenuItem } from '@/lib/services/menuService';
import { adminService } from '@/lib/services/adminService';
import { getWhatsAppUrl, getOrderMessage } from '@/lib/whatsapp';


interface Category {
  id: string;
  value: string;
  label: string;
  displayOrder?: number;
}

interface Subcategory {
  id: string;
  value: string;
  label: string;
  emoji: string;
}

export default function MenuGrid() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([{ id: 'all', value: 'all', label: 'All Items' }]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await adminService.getAllCategories();
        const visibleCategories = data
          .filter((cat) => cat.isVisible)
          .map((cat) => ({
            id: cat.id,
            value: cat.value,
            label: cat.label,
            displayOrder: cat.displayOrder,
          }));
        setCategories([{ id: 'all', value: 'all', label: 'All Items' }, ...visibleCategories]);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    async function loadSubcategories() {
      if (activeCategory === 'all') {
        setSubcategories([]);
        setActiveSubcategory(null);
        return;
      }

      try {
        const categoryData = categories.find(cat => cat.value === activeCategory);
        if (!categoryData) return;

        const allSubcategories = await adminService.getAllSubcategories();
        const categorySubcategories = allSubcategories.filter(
          sub => sub.categoryId === categoryData.id && sub.isVisible
        );
        setSubcategories(categorySubcategories);
        setActiveSubcategory(null);
      } catch (error) {
        console.error('Error loading subcategories:', error);
      }
    }

    loadSubcategories();
  }, [activeCategory, categories]);

  useEffect(() => {
    async function loadMenuItems() {
      try {
        let items = await menuService.getMenuItems(activeCategory);
        setMenuItems(items);
      } catch (error) {
        console.error('Error loading menu items:', error);
      } finally {
        setLoading(false);
      }
    }

    loadMenuItems();
  }, [activeCategory]);

  const filteredItems = (() => {
    let items = activeCategory === 'all' ? menuItems : menuItems.filter((item) => item.category === activeCategory);
    
    if (activeSubcategory) {
      items = items.filter((item) => item.subcategoryId === activeSubcategory);
    }
    
    return items;
  })();

  // Group items by category for the "All Items" view
  const groupedItems = (() => {
    if (activeCategory !== 'all') return null;

    const ALLOWED_LABELS = [
      'breakfast',
      'croissant special',
      "j\'s special toasties",
      "j\'s special salads",
      'small appetizer',
      'pizza',
      'pasta',
      'dessert',
      'soup of the day',
      'drinks',
    ];

    const groups: { category: Category; items: MenuItem[] }[] = [];
    const visibleCategories = categories.filter(
      c => c.value !== 'all' &&
        ALLOWED_LABELS.includes(c.label.toLowerCase())
    );

    for (const cat of visibleCategories) {
      let items = menuItems.filter(item => item.category === cat.value);
      if (items.length > 0) {
        groups.push({ category: cat, items });
      }
    }

    return groups;
  })();

  const renderMenuCard = (item: MenuItem, index: number) => (
    <div
      key={item.id}
      className="menu-item-card card-hover-lift bg-card animate-scale-in flex flex-col"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Image */}
      <div className="menu-item-image">
        <AppImage
          src={item.image}
          alt={item.alt}
          className="w-full h-full object-cover"
        />
        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.12em] font-semibold shadow-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-lg font-semibold text-foreground">
            {item.name}
          </h3>
          <span className="font-display text-base font-bold text-primary">
            {item.price}
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
          {item.description}
        </p>
        <a
          href={getWhatsAppUrl(getOrderMessage(item.name, item.price))}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] uppercase tracking-[0.15em] font-semibold text-primary hover:text-accent transition-all duration-300 flex items-center gap-2 group mt-auto"
        >
          Add to Order
          <Icon
            name="ArrowRightIcon"
            size={14}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </a>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section className="py-20 px-6 lg:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <div key={category.id} className="h-10 w-32 bg-muted rounded animate-pulse" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Category Tabs */}
        <div className="flex overflow-x-auto sm:flex-wrap sm:justify-center gap-2 sm:gap-4 mb-8 animate-fade-in -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 sm:pb-0">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.value)}
              className={`flex-shrink-0 px-4 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm uppercase tracking-[0.15em] font-medium transition-all duration-500 border ${
                activeCategory === category.value
                  ? 'bg-primary text-primary-foreground border-primary shadow-[0_4px_20px_rgba(0,0,0,0.15)] scale-105'
                  : 'bg-transparent text-foreground border-muted-foreground/20 hover:border-primary/60 hover:bg-primary/5 hover:shadow-[0_2px_12px_rgba(0,0,0,0.08)]'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Subcategory Tabs */}
        {subcategories.length > 0 && (
          <div className="flex overflow-x-auto sm:flex-wrap sm:justify-center gap-2 sm:gap-3 mb-8 animate-fade-in -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 sm:pb-0">
            <button
              onClick={() => setActiveSubcategory(null)}
              className={`flex-shrink-0 px-4 sm:px-6 py-2 text-xs uppercase tracking-[0.12em] font-medium transition-all duration-300 border rounded-full ${
                activeSubcategory === null
                  ? 'bg-accent text-white border-accent shadow-md'
                  : 'bg-transparent text-muted-foreground border-muted-foreground/20 hover:border-accent/60 hover:bg-accent/5'
              }`}
            >
              All
            </button>
            {subcategories.map((subcategory) => (
              <button
                key={subcategory.id}
                onClick={() => setActiveSubcategory(subcategory.id)}
                className={`flex-shrink-0 px-4 sm:px-6 py-2 text-xs uppercase tracking-[0.12em] font-medium transition-all duration-300 border rounded-full ${
                  activeSubcategory === subcategory.id
                    ? 'bg-accent text-white border-accent shadow-md'
                    : 'bg-transparent text-muted-foreground border-muted-foreground/20 hover:border-accent/60 hover:bg-accent/5'
                }`}
              >
                {subcategory.emoji} {subcategory.label}
              </button>
            ))}
          </div>
        )}

        {/* All Items View — Grouped by Category */}
        {activeCategory === 'all' && groupedItems ? (
          groupedItems.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <h3 className="text-xl font-serif text-foreground mb-2">No Menu Items Found</h3>
              <p className="text-muted-foreground">There are currently no menu items available. Please check back later.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {groupedItems.map(({ category, items }) => (
                <div key={category.id}>
                  {/* Category Heading */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex-1 h-px bg-border" />
                    <h2 className="font-display text-2xl font-bold text-foreground uppercase tracking-[0.12em] px-4 whitespace-nowrap">
                      {category.label}
                    </h2>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  {/* Items Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item, index) => renderMenuCard(item, index))}
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* Single Category View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <div className="max-w-md mx-auto">
                  <svg
                    className="mx-auto h-16 w-16 text-muted-foreground/40 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="text-xl font-serif text-foreground mb-2">
                    No Menu Items Found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {activeSubcategory
                      ? `No items found in the selected subcategory.`
                      : `No items found in the ${categories.find(c => c.value === activeCategory)?.label || activeCategory} category.`}
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setActiveSubcategory(null);
                    }}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                  >
                    View All Categories
                  </button>
                </div>
              </div>
            ) : (
              filteredItems.map((item, index) => renderMenuCard(item, index))
            )}
          </div>
        )}
      </div>
    </section>
  );
}