'use client';

import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import { adminService } from '@/lib/services/adminService';

interface RestaurantImage {
  id: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  spanClass?: string;
  displayOrder: number;
  isActive?: boolean;
}

export default function ExperienceJPizza() {
  const [images, setImages] = useState<RestaurantImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    async function loadImages() {
      try {
        const restaurantImages = await adminService.getAllRestaurantImages();
        setImages(restaurantImages);
      } catch (error) {
        console.error('Error loading restaurant images:', error);
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => {
          if (prev === null) return null;
          return (prev + 1) % images.length;
        });
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => {
          if (prev === null) return null;
          return (prev - 1 + images.length) % images.length;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, images.length]);

  const handleNext = () => {
    setSelectedImageIndex((prev) => {
      if (prev === null || images.length === 0) return prev;
      return (prev + 1) % images.length;
    });
  };

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => {
      if (prev === null || images.length === 0) return prev;
      return (prev - 1 + images.length) % images.length;
    });
  };

  if (loading) {
    return (
      <section className="py-24 px-6 lg:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-12 bg-muted rounded w-96 mx-auto mb-4 animate-pulse" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <section className="py-24 px-6 lg:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in">
              <span className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground font-semibold">
                Photo Gallery
              </span>
              <div className="w-8 h-[1px] bg-primary shimmer" />
            </div>
            <h2 className="text-display font-serif text-foreground mb-4 animate-fade-in-up delay-200">
              EXPERIENCE JPIZZA
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto animate-fade-in delay-300">
              Explore our restaurant through captivating moments. Click any image to view it larger.
            </p>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="group relative h-64 overflow-hidden cursor-pointer border border-border hover:border-primary transition-all duration-300"
                onClick={() => setSelectedImageIndex(index)}
              >
                <AppImage
                  src={image.imageUrl}
                  alt={image.imageAlt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImageIndex(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors duration-300 z-10"
            onClick={() => setSelectedImageIndex(null)}
            aria-label="Close lightbox"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Previous Button */}
          <button
            className="absolute left-4 text-white hover:text-primary transition-colors duration-300 z-10"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            aria-label="Previous image"
          >
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <AppImage
                key={selectedImageIndex}
                src={images[selectedImageIndex].imageUrl}
                alt={images[selectedImageIndex].imageAlt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
          </div>

          {/* Next Button */}
          <button
            className="absolute right-4 text-white hover:text-primary transition-colors duration-300 z-10"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next image"
          >
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
            {selectedImageIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}