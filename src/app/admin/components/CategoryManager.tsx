'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { adminService } from '@/lib/services/adminService';

interface Category {
  id?: string;
  value: string;
  label: string;
  emoji: string;
  displayOrder: number;
  isVisible: boolean;
}

export default function CategoryManager() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllCategories();
      setCategories(data);
    } catch (error: any) {
      console.error('Failed to load categories:', error);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsNewCategory(false);
    setShowForm(true);
    setError(null);
  };

  const handleAddNew = () => {
    setEditingCategory({
      value: '',
      label: '',
      emoji: '🍽️',
      displayOrder: categories.length + 1,
      isVisible: true,
    });
    setIsNewCategory(true);
    setShowForm(true);
    setError(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    // Validation
    if (!editingCategory.label.trim()) {
      setError('Category name is required');
      return;
    }

    if (isNewCategory && !editingCategory.value.trim()) {
      setError('Category value is required');
      return;
    }

    // Validate value format (lowercase, underscores only)
    if (isNewCategory) {
      const valueRegex = /^[a-z][a-z0-9_]*$/;
      if (!valueRegex.test(editingCategory.value)) {
        setError('Category value must start with a letter and contain only lowercase letters, numbers, and underscores');
        return;
      }
    }

    try {
      setSaving(true);
      setError(null);

      if (isNewCategory) {
        await adminService.createCategory(editingCategory);
      } else if (editingCategory.id) {
        await adminService.updateCategory(editingCategory.id, editingCategory);
      }

      await loadCategories();
      resetForm();
    } catch (error: any) {
      console.error('Failed to save category:', error);
      setError(error.message || 'Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleVisibility = async (id: string, currentVisibility: boolean) => {
    try {
      await adminService.updateCategory(id, { isVisible: !currentVisibility });
      await loadCategories();
    } catch (error: any) {
      console.error('Failed to toggle visibility:', error);
      setError('Failed to update category visibility');
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const index = categories.findIndex((cat) => cat.id === id);
    if (index === -1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;

    try {
      // Swap display orders
      const currentCategory = categories[index];
      const targetCategory = categories[targetIndex];

      await adminService.updateCategory(currentCategory.id!, { displayOrder: targetCategory.displayOrder });
      await adminService.updateCategory(targetCategory.id!, { displayOrder: currentCategory.displayOrder });

      await loadCategories();
    } catch (error: any) {
      console.error('Failed to reorder categories:', error);
      setError('Failed to reorder categories');
    }
  };

  const handleDelete = async (id: string, categoryValue: string) => {
    if (!confirm(`Are you sure you want to delete the "${categoryValue}" category? This action cannot be undone.`)) {
      return;
    }

    try {
      await adminService.deleteCategory(id);
      await loadCategories();
    } catch (error: any) {
      console.error('Failed to delete category:', error);
      setError('Failed to delete category. Make sure no menu items are using this category.');
    }
  };

  const resetForm = () => {
    setEditingCategory(null);
    setIsNewCategory(false);
    setShowForm(false);
    setError(null);
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
          <h2 className="text-2xl font-serif text-primary">Menu Categories</h2>
          <p className="text-sm text-text-secondary mt-1">
            Manage category display names, order, and visibility
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-accent transition-colors"
        >
          + Add New Category
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Categories List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
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
            {categories.map((category, index) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReorder(category.id!, 'up')}
                      disabled={index === 0}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move up"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => handleReorder(category.id!, 'down')}
                      disabled={index === categories.length - 1}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move down"
                    >
                      ▼
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{category.emoji}</span>
                    <span className="text-sm text-gray-500">{category.value}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{category.label}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleToggleVisibility(category.id!, category.isVisible)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      category.isVisible
                        ? 'bg-green-100 text-green-800' :'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {category.isVisible ? 'Visible' : 'Hidden'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(category)}
                    className="text-primary hover:text-accent mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id!, category.value)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit/Create Sidebar */}
      {showForm && editingCategory && (
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
                {isNewCategory ? 'Add New Category' : 'Edit Category'}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Category Value (Database) *
                </label>
                <input
                  type="text"
                  value={editingCategory.value}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, value: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '_') })
                  }
                  disabled={!isNewCategory}
                  required
                  placeholder="e.g., appetizers, main_courses"
                  className={`w-full px-4 py-2 border border-border rounded-lg ${
                    isNewCategory
                      ? 'bg-white text-gray-900' :'bg-gray-100 text-gray-500 cursor-not-allowed'
                  }`}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {isNewCategory
                    ? 'Lowercase letters, numbers, and underscores only. Cannot be changed later.'
                    : 'This value cannot be changed as it may be used by existing menu items'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Display Name *
                </label>
                <input
                  type="text"
                  value={editingCategory.label}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, label: e.target.value })
                  }
                  required
                  placeholder="e.g., Appetizers, Main Courses"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-white text-gray-900"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This is the name shown to customers on the menu
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Emoji Icon
                </label>
                <input
                  type="text"
                  value={editingCategory.emoji}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, emoji: e.target.value })
                  }
                  placeholder="🍽️"
                  maxLength={2}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-white text-gray-900"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Optional emoji to display with the category
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={editingCategory.displayOrder || ''}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      displayOrder: parseInt(e.target.value) || 0,
                    })
                  }
                  min="0"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-white text-gray-900"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Lower numbers appear first in the menu
                </p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isVisible"
                  checked={editingCategory.isVisible}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, isVisible: e.target.checked })
                  }
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="isVisible" className="text-sm font-medium text-text-primary">
                  Visible on menu
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : isNewCategory ? 'Create Category' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={saving}
                  className="px-6 py-3 border border-border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}