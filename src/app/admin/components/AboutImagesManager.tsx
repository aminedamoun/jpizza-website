'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import AppImage from '@/components/ui/AppImage';
import { adminService } from '@/lib/services/adminService';

interface AboutImage {
  id?: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  displayOrder: number;
  isActive: boolean;
}

async function getAllAboutImages(): Promise<AboutImage[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('about_images')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) { console.error('Error loading about images:', error); return []; }
  return (data || []).map((row) => ({
    id: row.id,
    title: row.title,
    imageUrl: row.image_url,
    imageAlt: row.image_alt,
    displayOrder: row.display_order,
    isActive: row.is_active,
  }));
}

async function createAboutImage(image: AboutImage): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from('about_images').insert({
    title: image.title,
    image_url: image.imageUrl,
    image_alt: image.imageAlt,
    display_order: image.displayOrder,
    is_active: image.isActive,
  });
  if (error) throw error;
}

async function updateAboutImage(id: string, image: Partial<AboutImage>): Promise<void> {
  const supabase = createClient();
  const updateData: any = {};
  if (image.title !== undefined) updateData.title = image.title;
  if (image.imageUrl !== undefined) updateData.image_url = image.imageUrl;
  if (image.imageAlt !== undefined) updateData.image_alt = image.imageAlt;
  if (image.displayOrder !== undefined) updateData.display_order = image.displayOrder;
  if (image.isActive !== undefined) updateData.is_active = image.isActive;
  updateData.updated_at = new Date().toISOString();
  const { error } = await supabase.from('about_images').update(updateData).eq('id', id);
  if (error) throw error;
}

async function deleteAboutImage(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from('about_images').delete().eq('id', id);
  if (error) throw error;
}

export default function AboutImagesManager() {
  const [images, setImages] = useState<AboutImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [editingImage, setEditingImage] = useState<AboutImage | null>(null);
  const [formData, setFormData] = useState<AboutImage>({
    title: '',
    imageUrl: '',
    imageAlt: '',
    displayOrder: 0,
    isActive: true,
  });

  useEffect(() => { loadImages(); }, []);

  const loadImages = async () => {
    try {
      setLoading(true);
      const data = await getAllAboutImages();
      setImages(data);
    } catch (error) {
      console.error('Failed to load about images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const imageUrl = await adminService.uploadImage(file);
      const fileName = file.name.split('.')[0].replace(/[^a-zA-Z0-9\s]/g, ' ');
      await createAboutImage({
        title: fileName,
        imageUrl,
        imageAlt: fileName,
        displayOrder: images.length,
        isActive: true,
      });
      await loadImages();
      e.target.value = '';
      alert('✅ About image uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('❌ Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingImage?.id) {
        await updateAboutImage(editingImage.id, formData);
      } else {
        await createAboutImage(formData);
      }
      await loadImages();
      resetForm();
    } catch (error) {
      console.error('Failed to save about image:', error);
      alert('Failed to save image');
    }
  };

  const handleEdit = (image: AboutImage) => {
    setEditingImage(image);
    setFormData(image);
    setShowSidebar(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      await deleteAboutImage(id);
      await loadImages();
      resetForm();
    } catch (error) {
      console.error('Failed to delete about image:', error);
      alert('Failed to delete image');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', imageUrl: '', imageAlt: '', displayOrder: 0, isActive: true });
    setEditingImage(null);
    setShowSidebar(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading about images...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-serif text-primary">About Us Images</h2>
          <p className="text-sm text-text-secondary mt-1">Manage images displayed on the About Us page</p>
        </div>
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
                <span>Upload Image</span>
              </>
            )}
            <input type="file" accept="image/*" onChange={handleQuickUpload} disabled={uploading} className="hidden" />
          </label>
          <button
            onClick={() => {
              setEditingImage(null);
              setFormData({ title: '', imageUrl: '', imageAlt: '', displayOrder: images.length, isActive: true });
              setShowSidebar(true);
            }}
            className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-accent transition-colors font-medium shadow-md hover:shadow-lg"
          >
            Add Manually
          </button>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="mt-4 text-text-secondary">No about images yet. Upload your first image!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-border hover:shadow-xl transition-all duration-200 cursor-pointer group"
              onClick={() => handleEdit(image)}
            >
              <div className="relative aspect-square">
                <AppImage src={image.imageUrl} alt={image.imageAlt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center">
                    <svg className="w-8 h-8 text-white mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span className="text-white text-sm font-medium">Edit</span>
                  </div>
                </div>
                {!image.isActive && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-md">Inactive</div>
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
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300" onClick={resetForm} />
          <div className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                <h3 className="text-2xl font-serif text-primary">{editingImage ? 'Edit Image' : 'Add New Image'}</h3>
                <button onClick={resetForm} className="text-text-secondary hover:text-primary text-3xl leading-none transition-colors" aria-label="Close">×</button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Title *</label>
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
                  <label className="block text-sm font-medium text-text-primary mb-2">Upload Image *</label>
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
                      <AppImage src={formData.imageUrl} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-border" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Alt Text *</label>
                  <input
                    type="text"
                    value={formData.imageAlt}
                    onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Describe the image for accessibility"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-5 h-5 text-primary focus:ring-primary border-border rounded cursor-pointer"
                    />
                    <span className="text-sm font-medium text-text-primary">Active (visible on About page)</span>
                  </label>
                </div>

                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  <button type="submit" className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition-colors font-medium shadow-md hover:shadow-lg">
                    {editingImage ? 'Update Image' : 'Create Image'}
                  </button>
                  {editingImage?.id && (
                    <button
                      type="button"
                      onClick={() => editingImage.id && handleDelete(editingImage.id)}
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
