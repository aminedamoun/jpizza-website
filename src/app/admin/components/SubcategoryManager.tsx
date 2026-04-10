'use client';

import { useState, useEffect } from 'react';
import { adminService } from '@/lib/services/adminService';

interface Subcategory {
  id?: string;
  categoryId: string;
  value: string;
  label: string;
  emoji: string;
  displayOrder: number;
  isVisible: boolean;
}

interface Category {
  id: string;
  value: string;
  label: string;
  emoji: string;
}

export default function SubcategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isNewSubcategory, setIsNewSubcategory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
    loadSubcategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await adminService.getAllCategories();
      setCategories(data);
    } catch (error: any) {
      console.error('Failed to load categories:', error);
      setError('Failed to load categories');
    }
  };

  const loadSubcategories = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllSubcategories();
      setSubcategories(data);
    } catch (error: any) {
      console.error('Failed to load subcategories:', error);
      setError('Failed to load subcategories');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (subcategory: Subcategory) => {
    setEditingSubcategory(subcategory);
    setSelectedCategoryId(subcategory.categoryId);
    setIsNewSubcategory(false);
    setShowForm(true);
    setError(null);
  };

  const handleAddNew = () => {
    // Calculate next display order based on all subcategories, not just current category
    const maxDisplayOrder = subcategories.reduce((max, sub) => 
      Math.max(max, sub.displayOrder || 0), 0
    );
    
    setEditingSubcategory({
      categoryId: categories[0]?.id || '',
      value: '',
      label: '',
      emoji: '🍽️',
      displayOrder: maxDisplayOrder + 1,
      isVisible: true,
    });
    setSelectedCategoryId(categories[0]?.id || '');
    setIsNewSubcategory(true);
    setShowForm(true);
    setError(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubcategory) return;

    // Validation
    if (!editingSubcategory.label.trim()) {
      setError('Subcategory name is required');
      return;
    }

    if (!selectedCategoryId) {
      setError('Please select a parent category');
      return;
    }

    if (isNewSubcategory && !editingSubcategory.value.trim()) {
      setError('Subcategory value is required');
      return;
    }

    // Validate value format (lowercase, underscores only)
    if (isNewSubcategory) {
      const valueRegex = /^[a-z][a-z0-9_]*$/;
      if (!valueRegex.test(editingSubcategory.value)) {
        setError('Subcategory value must start with a letter and contain only lowercase letters, numbers, and underscores');
        return;
      }
      
      // Check for duplicate value within the same category
      const isDuplicate = subcategories.some(
        sub => sub.categoryId === selectedCategoryId && 
               sub.value.toLowerCase() === editingSubcategory.value.toLowerCase()
      );
      if (isDuplicate) {
        setError('A subcategory with this value already exists in this category');
        return;
      }
    }

    try {
      setSaving(true);
      setError(null);

      const subcategoryData = {
        ...editingSubcategory,
        categoryId: selectedCategoryId,
      };

      if (isNewSubcategory) {
        const result = await adminService.createSubcategory(subcategoryData);
        
      } else if (editingSubcategory.id) {
        await adminService.updateSubcategory(editingSubcategory.id, subcategoryData);
      }

      await loadSubcategories();
      resetForm();
    } catch (error: any) {
      console.error('Failed to save subcategory:', error);
      setError(error.message || 'Failed to save subcategory. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleVisibility = async (id: string, currentVisibility: boolean) => {
    try {
      await adminService.updateSubcategory(id, { isVisible: !currentVisibility });
      await loadSubcategories();
    } catch (error: any) {
      console.error('Failed to toggle visibility:', error);
      setError('Failed to update subcategory visibility');
    }
  };

  const handleReorder = async (id: string, categoryId: string, direction: 'up' | 'down') => {
    const categorySubcategories = subcategories.filter(sub => sub.categoryId === categoryId);
    const index = categorySubcategories.findIndex((sub) => sub.id === id);
    if (index === -1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categorySubcategories.length) return;

    try {
      const currentSubcategory = categorySubcategories[index];
      const targetSubcategory = categorySubcategories[targetIndex];

      await adminService.updateSubcategory(currentSubcategory.id!, { displayOrder: targetSubcategory.displayOrder });
      await adminService.updateSubcategory(targetSubcategory.id!, { displayOrder: currentSubcategory.displayOrder });

      await loadSubcategories();
    } catch (error: any) {
      console.error('Failed to reorder subcategories:', error);
      setError('Failed to reorder subcategories');
    }
  };

  const handleDelete = async (id: string, subcategoryLabel: string) => {
    if (!confirm(`Are you sure you want to delete the "${subcategoryLabel}" subcategory? This action cannot be undone.`)) {
      return;
    }

    try {
      await adminService.deleteSubcategory(id);
      await loadSubcategories();
    } catch (error: any) {
      console.error('Failed to delete subcategory:', error);
      setError('Failed to delete subcategory. Make sure no menu items are using this subcategory.');
    }
  };

  const resetForm = () => {
    setEditingSubcategory(null);
    setIsNewSubcategory(false);
    setShowForm(false);
    setSelectedCategoryId('');
    setError(null);
  };

  const getSubcategoriesByCategory = (categoryId: string) => {
    return subcategories.filter(sub => sub.categoryId === categoryId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-serif text-primary">Subcategories</h2>
          <p className="text-sm text-text-secondary mt-1">
            Manage subcategories for each category (e.g., Tea, Coffee under Drinks)
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-accent transition-colors"
        >
          + Add New Subcategory
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Subcategories by Category */}
      <div className="space-y-6">
        {categories.map((category) => {
          const categorySubcategories = getSubcategoriesByCategory(category.id);
          if (categorySubcategories.length === 0) return null;

          return (
            <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  {category.emoji} {category.label}
                </h3>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subcategory
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Display Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categorySubcategories.map((subcategory, index) => (
                    <tr key={subcategory.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleReorder(subcategory.id!, category.id, 'up')}
                            disabled={index === 0}
                            className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Move up"
                          >
                            ▲
                          </button>
                          <button
                            onClick={() => handleReorder(subcategory.id!, category.id, 'down')}
                            disabled={index === categorySubcategories.length - 1}
                            className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Move down"
                          >
                            ▼
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{subcategory.emoji}</span>
                          <span className="text-sm text-gray-500">{subcategory.value}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{subcategory.label}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleVisibility(subcategory.id!, subcategory.isVisible)}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            subcategory.isVisible
                              ? 'bg-green-100 text-green-800' :'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {subcategory.isVisible ? 'Visible' : 'Hidden'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(subcategory)}
                          className="text-primary hover:text-accent mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(subcategory.id!, subcategory.label)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>

      {/* Edit/Add Form Modal */}
      {showForm && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={resetForm}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-serif text-primary">
                {isNewSubcategory ? 'Add New Subcategory' : 'Edit Subcategory'}
              </h3>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Parent Category *
                </label>
                <select
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.emoji} {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {isNewSubcategory && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Value (lowercase, underscores) *
                  </label>
                  <input
                    type="text"
                    value={editingSubcategory?.value || ''}
                    onChange={(e) => setEditingSubcategory({ ...editingSubcategory!, value: e.target.value })}
                    required
                    placeholder="e.g., green_tea"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Display Name *
                </label>
                <input
                  type="text"
                  value={editingSubcategory?.label || ''}
                  onChange={(e) => setEditingSubcategory({ ...editingSubcategory!, label: e.target.value })}
                  required
                  placeholder="e.g., Green Tea"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Emoji
                </label>
                <input
                  type="text"
                  value={editingSubcategory?.emoji || ''}
                  onChange={(e) => setEditingSubcategory({ ...editingSubcategory!, emoji: e.target.value })}
                  placeholder="🍵"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isVisible"
                  checked={editingSubcategory?.isVisible || false}
                  onChange={(e) => setEditingSubcategory({ ...editingSubcategory!, isVisible: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="isVisible" className="text-sm text-text-primary">
                  Visible in menu
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}