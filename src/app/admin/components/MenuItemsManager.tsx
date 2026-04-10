'use client';

import { useState, useEffect } from 'react';
import { adminService, AdminMenuItem } from '@/lib/services/adminService';
import AppImage from '@/components/ui/AppImage';
import { useAuth } from '@/contexts/AuthContext';

export default function MenuItemsManager() {
  const { user } = useAuth();
  const [items, setItems] = useState<AdminMenuItem[]>([]);
  const [categories, setCategories] = useState<Array<{ id: string; value: string; label: string; emoji: string }>>([]);
  const [subcategories, setSubcategories] = useState<Array<{ id: string; categoryId: string; value: string; label: string; emoji: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<AdminMenuItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const [formData, setFormData] = useState<AdminMenuItem>({
    name: '',
    description: '',
    price: 0,
    category: 'pizza',
    subcategoryId: null,
    imageUrl: '',
    imageAlt: '',
    tags: [],
    isAvailable: true,
    isFeatured: false,
    displayOrder: 0,
  });

  useEffect(() => {
    loadItems();
    loadCategories();
    loadSubcategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await adminService.getAllCategories();
      setCategories(
        data.map((cat) => ({
          id: cat.id,
          value: cat.value,
          label: `${cat.emoji} ${cat.label}`,
          emoji: cat.emoji,
        }))
      );
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const loadSubcategories = async () => {
    try {
      const data = await adminService.getAllSubcategories();
      setSubcategories(data);
    } catch (error) {
      console.error('Failed to load subcategories:', error);
    }
  };

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllMenuItems();
      setItems(data);
    } catch (error) {
      console.error('Failed to load menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const imageUrl = await adminService.uploadImage(file);
      setFormData({ ...formData, imageUrl });
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Ensure isAvailable is always included in the payload
      const payload = {
        ...formData,
        isAvailable: formData.isAvailable ?? true,
      };

      if (editingItem?.id) {
        await adminService.updateMenuItem(editingItem.id, payload);
      } else {
        await adminService.createMenuItem(payload);
      }
      await loadItems();
      resetForm();
    } catch (error) {
      console.error('Failed to save menu item:', error);
      alert('Failed to save menu item');
    }
  };

  const handleEdit = (item: AdminMenuItem) => {
    setEditingItem(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      await adminService.deleteMenuItem(id);
      await loadItems();
    } catch (error) {
      console.error('Failed to delete menu item:', error);
      alert('Failed to delete menu item');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: 'pizza',
      subcategoryId: null,
      imageUrl: '',
      imageAlt: '',
      tags: [],
      isAvailable: true,
      isFeatured: false,
      displayOrder: 0,
    });
    setEditingItem(null);
    setShowForm(false);
  };

  const toggleCategory = (categoryValue: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryValue)) {
      newExpanded.delete(categoryValue);
    } else {
      newExpanded.add(categoryValue);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleAllCategories = () => {
    if (expandedCategories.size === categories.length) {
      setExpandedCategories(new Set());
    } else {
      setExpandedCategories(new Set(categories.map(c => c.value)));
    }
  };

  const getItemsByCategory = (categoryValue: string) => {
    return items.filter(item => item.category === categoryValue);
  };

  const getNextDisplayOrderForSubcategory = (subcategoryId: string | null, excludeItemId?: string) => {
    const siblingItems = items.filter(
      item => item.subcategoryId === subcategoryId && item.id !== excludeItemId
    );
    if (siblingItems.length === 0) return 1;
    const maxOrder = Math.max(...siblingItems.map(i => i.displayOrder ?? 0));
    return maxOrder + 1;
  };

  const getItemsBySubcategory = (categoryValue: string) => {
    const categoryItems = items.filter(item => item.category === categoryValue);
    const subcategoryIds = [...new Set(categoryItems.map(item => item.subcategoryId))];

    const groups: { subcategoryId: string | null; subcategoryLabel: string; items: AdminMenuItem[] }[] = [];

    for (const subId of subcategoryIds) {
      const subItems = categoryItems
        .filter(item => item.subcategoryId === subId)
        .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

      const subInfo = subcategories.find(s => s.id === subId);
      const label = subInfo ? `${subInfo.emoji} ${subInfo.label}` : 'No Subcategory';

      groups.push({ subcategoryId: subId, subcategoryLabel: label, items: subItems });
    }

    // Sort groups: no-subcategory last
    groups.sort((a, b) => {
      if (a.subcategoryId === null) return 1;
      if (b.subcategoryId === null) return -1;
      return 0;
    });

    return groups;
  };

  if (loading) {
    return <div className="text-center py-8">Loading menu items...</div>;
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif text-primary">Menu Items by Category</h2>
        <div className="flex gap-3">
          <button
            onClick={toggleAllCategories}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
          >
            {expandedCategories.size === categories.length ? 'Collapse All' : 'Expand All'}
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-accent transition-colors"
          >
            Add New Item
          </button>
        </div>
      </div>

      {/* Sidebar Form */}
      {showForm && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
            onClick={resetForm}
          />
          
          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300">
            <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-serif text-primary">
                {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Price (AED) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => {
                    setFormData({ ...formData, category: e.target.value, subcategoryId: null });
                  }}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Subcategory (Optional)
                </label>
                <select
                  value={formData.subcategoryId || ''}
                  onChange={(e) => {
                    const newSubcategoryId = e.target.value || null;
                    const nextOrder = getNextDisplayOrderForSubcategory(newSubcategoryId, editingItem?.id);
                    setFormData({ ...formData, subcategoryId: newSubcategoryId, displayOrder: editingItem ? formData.displayOrder : nextOrder });
                  }}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">None</option>
                  {subcategories
                    .filter(sub => {
                      const selectedCategory = categories.find(cat => cat.value === formData.category);
                      return selectedCategory && sub.categoryId === selectedCategory.id;
                    })
                    .map((subcategory) => (
                      <option key={subcategory.id} value={subcategory.id}>
                        {subcategory.emoji} {subcategory.label}
                      </option>
                    ))}
                </select>
                <p className="text-xs text-muted-foreground mt-1">
                  Select a subcategory if this item belongs to a specific subcategory (e.g., Tea, Coffee under Drinks)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.displayOrder || ''}
                  onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Order is independent per subcategory — start from 1 within each subcategory to arrange items freely.
                  {formData.subcategoryId && !editingItem && (
                    <span className="text-primary font-medium"> Suggested: {getNextDisplayOrderForSubcategory(formData.subcategoryId)}</span>
                  )}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Image Upload
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {uploading && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    <p className="text-sm text-accent">Uploading...</p>
                  </div>
                )}
                {formData.imageUrl && (
                  <div className="mt-3">
                    <AppImage
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Image Alt Text *
                </label>
                <input
                  type="text"
                  value={formData.imageAlt}
                  onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isAvailable}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                    className="w-4 h-4 text-primary focus:ring-primary border-border rounded"
                  />
                  <span className="text-sm font-medium text-text-primary">Available</span>
                </label>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured || false}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-primary focus:ring-primary border-border rounded"
                  />
                  <span className="text-sm font-medium text-text-primary">Featured Item</span>
                </label>
                <p className="text-xs text-muted-foreground mt-1 ml-6">
                  Display this item in the homepage "OUR SIGNATURE PIZZAS" section
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition-colors font-medium"
                >
                  {editingItem ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-200 text-text-primary px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* Category Sections */}
      <div className="space-y-4">
        {categories.map((category) => {
          const categoryItems = getItemsByCategory(category.value);
          const isExpanded = expandedCategories.has(category.value);
          const subcategoryGroups = getItemsBySubcategory(category.value);
          
          return (
            <div key={category.value} className="bg-gray-900 rounded-lg border border-border overflow-hidden">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.value)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.label.split(' ')[0]}</span>
                  <h3 className="text-lg font-serif text-primary">
                    {category.label.substring(category.label.indexOf(' ') + 1)}
                  </h3>
                  <span className="text-sm text-text-secondary">({categoryItems.length} items)</span>
                </div>
                <svg
                  className={`w-5 h-5 text-primary transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Category Items */}
              {isExpanded && (
                <div className="px-6 pb-6">
                  {categoryItems.length === 0 ? (
                    <div className="text-center py-8 text-text-secondary">
                      No items in this category yet
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {subcategoryGroups.map(({ subcategoryId, subcategoryLabel, items: subItems }) => (
                        <div key={subcategoryId ?? '__none__'}>
                          {/* Subcategory heading */}
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs font-semibold uppercase tracking-widest text-accent border border-accent/40 px-3 py-1 rounded-full">
                              {subcategoryLabel}
                            </span>
                            <div className="flex-1 h-px bg-gray-700" />
                            <span className="text-xs text-text-secondary">{subItems.length} items · order restarts from 1</span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {subItems.map((item, idx) => (
                              <div 
                                key={item.id} 
                                className="bg-white rounded-lg shadow-md overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer group"
                                onClick={() => handleEdit(item)}
                              >
                                <div className="relative aspect-square">
                                  <AppImage
                                    src={item.imageUrl}
                                    alt={item.imageAlt}
                                    className="w-full h-full object-cover"
                                  />
                                  {/* Per-subcategory order badge */}
                                  <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                                    {item.displayOrder ?? idx + 1}
                                  </div>
                                  {!item.isAvailable && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                      <span className="text-white text-xs font-semibold">Unavailable</span>
                                    </div>
                                  )}
                                  {item.isFeatured && (
                                    <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
                                      ⭐ Featured
                                    </div>
                                  )}
                                </div>
                                <div className="p-3">
                                  <h3 className="text-sm font-serif text-primary mb-1 truncate group-hover:text-accent transition-colors">
                                    {item.name}
                                  </h3>
                                  <p className="text-xs text-accent font-semibold mb-1">AED {item.price}</p>
                                  <p className="text-xs text-text-secondary line-clamp-2 mb-2">{item.description}</p>
                                  <div className="flex gap-2 mt-3">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleEdit(item);
                                      }}
                                      className="flex-1 bg-primary text-white px-2 py-1.5 rounded text-xs hover:bg-accent transition-colors"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(item.id!);
                                      }}
                                      className="flex-1 bg-red-500 text-white px-2 py-1.5 rounded text-xs hover:bg-red-600 transition-colors"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}