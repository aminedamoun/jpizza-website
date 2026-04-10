'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import MenuItemsManager from './components/MenuItemsManager';
import RestaurantImagesManager from './components/RestaurantImagesManager';
import OffersManager from './components/OffersManager';
import CategoryManager from './components/CategoryManager';
import SubcategoryManager from './components/SubcategoryManager';
import AboutImagesManager from './components/AboutImagesManager';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'menu' | 'categories' | 'subcategories' | 'images' | 'offers' | 'about-images'>('menu');
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-serif text-primary mb-2">Admin Panel</h1>
              <p className="text-text-secondary">Manage your restaurant content</p>
            </div>
            <button
              onClick={async () => { await signOut(); router.push('/login'); }}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Sign Out
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-border mb-8">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab('menu')}
                className={`pb-4 px-2 font-medium transition-colors ${
                  activeTab === 'menu' ?'text-primary border-b-2 border-primary' :'text-white hover:text-primary'
                }`}
              >
                Menu Items
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className={`pb-4 px-2 font-medium transition-colors ${
                  activeTab === 'categories' ?'text-primary border-b-2 border-primary' :'text-white hover:text-primary'
                }`}
              >
                Categories
              </button>
              <button
                onClick={() => setActiveTab('subcategories')}
                className={`pb-4 px-2 font-medium transition-colors ${
                  activeTab === 'subcategories' ?'text-primary border-b-2 border-primary' :'text-white hover:text-primary'
                }`}
              >
                Subcategories
              </button>
              <button
                onClick={() => setActiveTab('images')}
                className={`pb-4 px-2 font-medium transition-colors ${
                  activeTab === 'images' ?'text-primary border-b-2 border-primary' :'text-white hover:text-primary'
                }`}
              >
                Restaurant Images
              </button>
              <button
                onClick={() => setActiveTab('about-images')}
                className={`pb-4 px-2 font-medium transition-colors ${
                  activeTab === 'about-images' ?'text-primary border-b-2 border-primary' :'text-white hover:text-primary'
                }`}
              >
                About Images
              </button>
              <button
                onClick={() => setActiveTab('offers')}
                className={`pb-4 px-2 font-medium transition-colors ${
                  activeTab === 'offers' ?'text-primary border-b-2 border-primary' :'text-white hover:text-primary'
                }`}
              >
                Offers
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'menu' && <MenuItemsManager />}
            {activeTab === 'categories' && <CategoryManager />}
            {activeTab === 'subcategories' && <SubcategoryManager />}
            {activeTab === 'images' && <RestaurantImagesManager />}
            {activeTab === 'about-images' && <AboutImagesManager />}
            {activeTab === 'offers' && <OffersManager />}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}