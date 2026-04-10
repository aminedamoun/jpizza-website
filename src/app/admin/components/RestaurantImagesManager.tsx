'use client';

import { useState, useEffect } from 'react';
import { adminService, AdminRestaurantImage } from '@/lib/services/adminService';
import AppImage from '@/components/ui/AppImage';
import { useAuth } from '@/contexts/AuthContext';

export default function RestaurantImagesManager() {
  const { user } = useAuth();
  const [images, setImages] = useState<AdminRestaurantImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingImage, setEditingImage] = useState<AdminRestaurantImage | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState<AdminRestaurantImage>({
    title: '',
    imageUrl: '',
    imageAlt: '',
    spanClass: '',
    displayOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllRestaurantImages();
      setImages(data);
    } catch (error) {
      console.error('Failed to load restaurant images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      
      // Upload image to storage
      const imageUrl = await adminService.uploadImage(file);
      
      // Create new image entry with uploaded URL
      const fileName = file.name.split('.')[0].replace(/[^a-zA-Z0-9\s]/g, ' ');
      const newImage: AdminRestaurantImage = {
        title: fileName,
        imageUrl,
        imageAlt: fileName,
        spanClass: '',
        displayOrder: images.length,
        isActive: true,
      };
      
      // Save to database
      await adminService.createRestaurantImage(newImage);
      
      // Reload images to show the new one
      await loadImages();
      
      // Reset file input
      e.target.value = '';
      
      alert('✅ Image uploaded and added to main page successfully!');
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('❌ Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingImage?.id) {
        await adminService.updateRestaurantImage(editingImage.id, formData);
      } else {
        await adminService.createRestaurantImage(formData);
      }
      await loadImages();
      resetForm();
    } catch (error) {
      console.error('Failed to save restaurant image:', error);
      alert('Failed to save restaurant image');
    }
  };

  const handleEdit = (image: AdminRestaurantImage) => {
    setEditingImage(image);
    setFormData(image);
    setShowSidebar(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      await adminService.deleteRestaurantImage(id);
      await loadImages();
    } catch (error) {
      console.error('Failed to delete restaurant image:', error);
      alert('Failed to delete restaurant image');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      imageUrl: '',
      imageAlt: '',
      spanClass: '',
      displayOrder: 0,
      isActive: true,
    });
    setEditingImage(null);
    setShowSidebar(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading restaurant images...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-serif text-primary">Restaurant Images</h2>
        <div className="flex flex-wrap gap-3">
          <label className="bg-accent text-white px-6 py-2.5 rounded-lg hover:bg-primary transition-colors cursor-pointer font-medium shadow-md hover:shadow-lg flex items-center gap-2">
            {uploading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span>Upload from Computer</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
          <button
            onClick={() => {
              setEditingImage(null);
              setFormData({
                title: '',
                imageUrl: '',
                imageAlt: '',
                spanClass: '',
                displayOrder: images.length,
                isActive: true,
              });
              setShowSidebar(true);
            }}
            className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-accent transition-colors font-medium shadow-md hover:shadow-lg"
          >
            Add Manually
          </button>
        </div>
      </div>

      {/* Image Grid with Smaller Thumbnails */}
      {images.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="mt-4 text-text-secondary">No images yet. Upload your first restaurant image!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {images?.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-border hover:shadow-xl transition-all duration-200 cursor-pointer group"
              onClick={() => handleEdit(image)}
            >
              <div className="relative aspect-square">
                <AppImage
                  src={image.imageUrl}
                  alt={image.imageAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center">
                    <svg className="w-8 h-8 text-white mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span className="text-white text-sm font-medium">Edit</span>
                  </div>
                </div>
                {!image.isActive && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-md">
                    Inactive
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-primary truncate" title={image.title}>{image.title}</h3>
                <p className="text-xs text-text-secondary mt-1">Order: {image.displayOrder}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sidebar Edit Panel */}
      {showSidebar && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={resetForm}
          />

          {/* Sidebar */}
          <div className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                <h3 className="text-2xl font-serif text-primary">
                  {editingImage ? 'Edit Image' : 'Add New Image'}
                </h3>
                <button
                  onClick={resetForm}
                  className="text-text-secondary hover:text-primary text-3xl leading-none transition-colors"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Enter image title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Image Upload *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
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
                    }}
                    disabled={uploading}
                    className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-accent file:cursor-pointer"
                  />
                  {uploading && (
                    <div className="flex items-center gap-2 mt-2">
                      <svg className="animate-spin h-4 w-4 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <p className="text-sm text-accent">Uploading image...</p>
                    </div>
                  )}
                  {formData.imageUrl && (
                    <div className="mt-3">
                      <p className="text-xs text-text-secondary mb-2">Preview:</p>
                      <AppImage
                        src={formData.imageUrl}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border border-border"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Image Alt Text *
                  </label>
                  <input
                    type="text"
                    value={formData.imageAlt}
                    onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Describe the image for accessibility"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Span Class
                    </label>
                    <input
                      type="text"
                      value={formData.spanClass}
                      onChange={(e) => setFormData({ ...formData, spanClass: e.target.value })}
                      placeholder="lg:col-span-2"
                      className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.displayOrder}
                      onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-5 h-5 text-primary focus:ring-primary border-border rounded cursor-pointer"
                    />
                    <span className="text-sm font-medium text-text-primary">Active (visible on main page)</span>
                  </label>
                </div>

                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition-colors font-medium shadow-md hover:shadow-lg"
                  >
                    {editingImage ? 'Update Image' : 'Create Image'}
                  </button>
                  {editingImage && (
                    <button
                      type="button"
                      onClick={async () => {
                        if (editingImage.id) {
                          await handleDelete(editingImage.id);
                          resetForm();
                        }
                      }}
                      className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium shadow-md hover:shadow-lg"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}