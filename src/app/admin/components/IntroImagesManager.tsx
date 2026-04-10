'use client';

import { useState, useEffect } from 'react';
import { adminService, type AdminRestaurantImage } from '@/lib/services/adminService';
import AppImage from '@/components/ui/AppImage';

export default function IntroImagesManager() {
  const [images, setImages] = useState<AdminRestaurantImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingImage, setEditingImage] = useState<AdminRestaurantImage | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    imageAlt: '',
    displayOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    try {
      setLoading(true);
      const allImages = await adminService.getAllRestaurantImages();
      const introImages = allImages.filter(img => img.isIntro);
      setImages(introImages);
    } catch (error) {
      console.error('Error loading intro images:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const imageUrl = await adminService.uploadImage(file);
      setFormData({ ...formData, imageUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (editingImage) {
        await adminService.updateRestaurantImage(editingImage.id!, {
          ...formData,
          isIntro: true,
        });
      } else {
        await adminService.createRestaurantImage({
          ...formData,
          isIntro: true,
        });
      }

      setShowForm(false);
      setEditingImage(null);
      resetForm();
      loadImages();
    } catch (error) {
      console.error('Error saving intro image:', error);
      alert('Failed to save intro image');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this intro image?')) return;

    try {
      await adminService.deleteRestaurantImage(id);
      loadImages();
    } catch (error) {
      console.error('Error deleting intro image:', error);
      alert('Failed to delete intro image');
    }
  }

  function handleEdit(image: AdminRestaurantImage) {
    setEditingImage(image);
    setFormData({
      title: image.title,
      imageUrl: image.imageUrl,
      imageAlt: image.imageAlt,
      displayOrder: image.displayOrder || 0,
      isActive: image.isActive ?? true,
    });
    setShowForm(true);
  }

  function resetForm() {
    setFormData({
      title: '',
      imageUrl: '',
      imageAlt: '',
      displayOrder: 0,
      isActive: true,
    });
  }

  function handleCancel() {
    setShowForm(false);
    setEditingImage(null);
    resetForm();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-serif text-primary">Intro Images</h2>
          <p className="text-text-secondary text-sm mt-1">
            Manage images displayed on the welcome intro page
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary text-background px-6 py-2 font-medium hover:bg-primary/90 transition-colors"
        >
          Add Intro Image
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-border p-6 mb-8">
          <h3 className="text-xl font-serif text-primary mb-4">
            {editingImage ? 'Edit Intro Image' : 'Add New Intro Image'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-background border border-border px-4 py-2 text-foreground"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Image</label>
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full bg-background border border-border px-4 py-2 text-foreground"
                  disabled={uploading}
                />
                <div className="text-sm text-text-secondary">OR</div>
                <input
                  type="url"
                  placeholder="Enter image URL"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-2 text-foreground"
                  required
                />
              </div>
              {uploading && <p className="text-sm text-primary mt-2">Uploading...</p>}
              {formData.imageUrl && (
                <div className="mt-4">
                  <AppImage
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-48 h-48 object-cover"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Image Alt Text</label>
              <input
                type="text"
                value={formData.imageAlt}
                onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                className="w-full bg-background border border-border px-4 py-2 text-foreground"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Display Order</label>
              <input
                type="number"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                className="w-full bg-background border border-border px-4 py-2 text-foreground"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="isActive" className="text-sm font-medium">
                Active
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-primary text-background px-6 py-2 font-medium hover:bg-primary/90 transition-colors"
              >
                {editingImage ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-muted text-foreground px-6 py-2 font-medium hover:bg-muted/80 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="bg-card border border-border overflow-hidden">
            <div className="aspect-video relative">
              <AppImage
                src={image.imageUrl}
                alt={image.imageAlt}
                className="w-full h-full object-cover"
              />
              {!image.isActive && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs">
                  Inactive
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium text-foreground mb-1">{image.title}</h3>
              <p className="text-sm text-text-secondary mb-2">{image.imageAlt}</p>
              <p className="text-xs text-text-secondary mb-4">Order: {image.displayOrder}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(image)}
                  className="flex-1 bg-primary text-background px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(image.id!)}
                  className="flex-1 bg-red-500 text-white px-4 py-2 text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary">No intro images yet. Add your first one!</p>
        </div>
      )}
    </div>
  );
}