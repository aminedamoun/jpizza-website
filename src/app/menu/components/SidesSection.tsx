'use client';

import { useState, useEffect } from 'react';

import { menuService, type MenuItem } from '@/lib/services/menuService';

export default function SidesSection() {
  const [sides, setSides] = useState<MenuItem[]>([]);
  const [beverages, setBeverages] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSidesAndBeverages() {
      try {
        const [sidesData, beveragesData] = await Promise.all([
          menuService.getSides(),
          menuService.getBeverages(),
        ]);
        setSides(sidesData);
        setBeverages(beveragesData);
      } catch (error) {
        console.error('Error loading sides and beverages:', error);
      } finally {
        setLoading(false);
      }
    }

    loadSidesAndBeverages();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6 lg:px-12 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="h-8 bg-background rounded w-64 mx-auto mb-8 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 bg-background rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}