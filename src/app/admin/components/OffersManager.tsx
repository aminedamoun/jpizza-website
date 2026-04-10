'use client';

import { useState, useEffect } from 'react';
import { adminService, AdminOffer } from '@/lib/services/adminService';
import AppImage from '@/components/ui/AppImage';
import { useAuth } from '@/contexts/AuthContext';

export default function OffersManager() {
  const { user } = useAuth();
  const [offers, setOffers] = useState<AdminOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingOffer, setEditingOffer] = useState<AdminOffer | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState<AdminOffer & { price?: string; rating?: number }>({
    title: '',
    subtitle: '',
    description: '',
    imageUrl: '',
    imageAlt: '',
    ctaText: 'Order Now',
    ctaLink: '/delivery',
    status: 'active',
    validUntil: '',
    terms: '',
    displayOrder: 0,
    price: '',
    rating: 5,
  });

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllOffers();
      setOffers(data);
    } catch (error) {
      console.error('Failed to load offers:', error);
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
      if (editingOffer?.id) {
        await adminService.updateOffer(editingOffer.id, formData);
      } else {
        await adminService.createOffer(formData);
      }
      await loadOffers();
      resetForm();
    } catch (error) {
      console.error('Failed to save offer:', error);
      alert('Failed to save offer');
    }
  };

  const handleEdit = (offer: AdminOffer) => {
    setEditingOffer(offer);
    setFormData({ ...offer, price: (offer as any).price || '', rating: (offer as any).rating ?? 5 });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this offer?')) return;

    try {
      await adminService.deleteOffer(id);
      await loadOffers();
    } catch (error) {
      console.error('Failed to delete offer:', error);
      alert('Failed to delete offer');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      imageUrl: '',
      imageAlt: '',
      ctaText: 'Order Now',
      ctaLink: '/delivery',
      status: 'active',
      validUntil: '',
      terms: '',
      displayOrder: 0,
      price: '',
      rating: 5,
    });
    setEditingOffer(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="text-center py-8">Loading offers...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif text-primary">Offers</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-accent transition-colors"
        >
          Add New Offer
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-border">
          <h3 className="text-xl font-serif text-primary mb-4">
            {editingOffer ? 'Edit Offer' : 'Add New Offer'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Price
                </label>
                <input
                  type="text"
                  value={(formData as any).price || ''}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value } as any)}
                  placeholder="e.g., AED 49 or 20% OFF"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Star Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star } as any)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill={star <= ((formData as any).rating ?? 5) ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      strokeWidth={star <= ((formData as any).rating ?? 5) ? 0 : 1.5}
                      className={`w-7 h-7 ${
                        star <= ((formData as any).rating ?? 5)
                          ? 'text-yellow-400' :'text-gray-300'
                      }`}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
                <span className="text-sm text-text-secondary ml-1">
                  {(formData as any).rating ?? 5} / 5
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={3}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Image Upload *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {uploading && <p className="text-sm text-accent mt-1">Uploading...</p>}
              {formData.imageUrl && (
                <div className="mt-2">
                  <AppImage
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Valid Until
                </label>
                <input
                  type="text"
                  value={formData.validUntil}
                  onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                  placeholder="e.g., Valid until end of February"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Terms & Conditions
                </label>
                <input
                  type="text"
                  value={formData.terms}
                  onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                  placeholder="e.g., Dine-in only"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  CTA Text
                </label>
                <input
                  type="text"
                  value={formData.ctaText}
                  onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  CTA Link
                </label>
                <input
                  type="text"
                  value={formData.ctaLink}
                  onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-accent transition-colors"
              >
                {editingOffer ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 text-text-primary px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers?.map((offer) => (
          <div key={offer.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-border">
            <AppImage
              src={offer.imageUrl}
              alt={offer.imageAlt}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-xl font-serif text-primary">{offer.title}</h3>
                {(offer as any).price && (
                  <span className="text-base font-bold text-primary whitespace-nowrap">{(offer as any).price}</span>
                )}
              </div>
              {/* Star Rating Display */}
              <div className="flex items-center gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill={star <= ((offer as any).rating ?? 5) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth={star <= ((offer as any).rating ?? 5) ? 0 : 1.5}
                    className={`w-4 h-4 ${
                      star <= ((offer as any).rating ?? 5) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {offer.subtitle && (
                <p className="text-sm text-accent mb-2">{offer.subtitle}</p>
              )}
              <p className="text-sm text-text-secondary mb-3 line-clamp-2">{offer.description}</p>
              <p className="text-sm text-text-secondary mb-2">Status: {offer.status}</p>
              <p className="text-sm text-text-secondary mb-4">Order: {offer.displayOrder}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(offer)}
                  className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent transition-colors text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(offer.id!)}
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}