'use client';

import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import { menuService, type RestaurantImage } from '@/lib/services/menuService';

export default function RestaurantGallery() {
  const [galleryImages, setGalleryImages] = useState<RestaurantImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGalleryImages() {
      try {
        const images = await menuService.getRestaurantImages();
        setGalleryImages(images);
      } catch (error) {
        console.error('Error loading gallery images:', error);
      } finally {
        setLoading(false);
      }
    }

    loadGalleryImages();
  }, []);

  if (loading) {
    return (
      <section className="py-24 px-6 lg:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-muted rounded w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[250px]">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-muted rounded animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4 animate-fade-in">
            <div className="w-8 h-[1px] bg-primary shimmer" />
            <span className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground font-semibold">
              Gallery
            </span>
            <div className="w-8 h-[1px] bg-primary shimmer" />
          </div>
          <h2 className="text-display font-serif text-foreground mb-4 animate-fade-in-up delay-200">
            EXPERIENCE JPIZZA
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto animate-fade-in delay-300">
            Step inside our world of authentic Italian craftsmanship, where tradition meets passion in every detail.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[250px]">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden border border-border hover:border-primary transition-all duration-500 animate-scale-in ${image.span || ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <AppImage
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-12 h-[1px] bg-primary mb-3" />
                  <p className="text-xs text-foreground leading-relaxed">
                    {image.alt.split(',')[0]}
                  </p>
                </div>
              </div>

              {/* Gold Corner Accent */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-t-primary border-l-[30px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in delay-500">
          <a href="/about" className="inline-block btn-secondary">
            Visit Our Restaurant
          </a>
        </div>
      </div>
    </section>
  );
}