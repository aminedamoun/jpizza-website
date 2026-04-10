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

const tabs = [
  { key: 'menu', label: 'Menu Items', icon: '🍽️' },
  { key: 'categories', label: 'Categories', icon: '📂' },
  { key: 'subcategories', label: 'Subcategories', icon: '📁' },
  { key: 'images', label: 'Gallery', icon: '🖼️' },
  { key: 'about-images', label: 'About', icon: '📷' },
  { key: 'offers', label: 'Offers', icon: '🏷️' },
] as const;

type TabKey = typeof tabs[number]['key'];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('menu');
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return null;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-primary mb-1">Admin Panel</h1>
              <p className="text-sm text-muted-foreground">Manage your restaurant content</p>
            </div>
            <button
              onClick={async () => { await signOut(); router.push('/login'); }}
              className="text-sm bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
            >
              Sign Out
            </button>
          </div>

          {/* Tabs - scrollable on mobile, grid on desktop */}
          <div className="mb-6">
            {/* Mobile: horizontal scroll */}
            <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:hidden scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.key
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-card text-muted-foreground border border-border hover:border-primary hover:text-primary'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
            {/* Desktop: grid */}
            <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.key
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-card text-muted-foreground border border-border hover:border-primary hover:text-primary'
                  }`}
                >
                  <span className="text-base">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-card rounded-lg border border-border p-4 sm:p-6">
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
