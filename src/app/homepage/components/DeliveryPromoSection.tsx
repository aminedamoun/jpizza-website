'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { menuService, type Offer } from '@/lib/services/menuService';

export default function DeliveryPromoSection() {
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOffer() {
      try {
        const offers = await menuService.getActiveOffers();
        if (offers.length > 0) {
          setOffer(offers[0]);
        }
      } catch (error) {
        console.error('Error loading offer:', error);
      } finally {
        setLoading(false);
      }
    }

    loadOffer();
  }, []);

  if (loading) {
    return (
      <section className="py-24 px-6 lg:px-12 bg-card relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mb-6" />
              <div className="h-12 bg-muted rounded w-96 mb-8" />
              <div className="h-4 bg-muted rounded w-full mb-2" />
              <div className="h-4 bg-muted rounded w-3/4" />
            </div>
            <div className="aspect-square bg-muted rounded animate-pulse" />
          </div>
        </div>
      </section>);

  }

  if (!offer) {
    return null;
  }

  return (
    <section className="py-24 px-6 lg:px-12 bg-card relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="animate-slide-in-left">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-primary shimmer" />
              <span className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground font-semibold">
                {offer.subtitle || 'Delivery Service'}
              </span>
            </div>

            <h2 className="text-display font-serif text-foreground mb-6">Get Your</h2>

            <div className="mb-6">
              <h3 className="font-serif text-[64px] text-[rgba(207,7,7,1)]">JPIZZA</h3>
            </div>

            <h2 className="font-serif text-foreground mb-8 text-5xl">
              Pizza Delivered Right
              <br />
              <span className="text-primary">to Your Doorstep</span>
            </h2>

            <p className="text-base text-muted-foreground mb-8 max-w-lg leading-relaxed">
              {offer.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={offer.ctaLink}
                className="btn-primary text-center">

                {offer.ctaText}
              </Link>
              <a
                href="https://wa.me/971547077277"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-center">

                WhatsApp Order
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-slide-in-right">
            <div className="aspect-video relative overflow-hidden border-2 border-primary/20">
              <AppImage
                src="https://6949b72b30e1aa8ca4b7eef2.imgix.net/i-recommend-eat-this-delicious-pizza-cheerful-bus-2026-01-11-08-23-33-utc.jpg"
                alt={offer.imageAlt}
                className="w-full h-full object-cover" />


              {/* Overlay Badge */}
              <div className="absolute top-8 right-8 bg-primary text-background px-6 py-4 animate-pulse">
                <p className="text-xs uppercase tracking-[0.15em] font-bold">30 Min</p>
                <p className="text-[10px] uppercase tracking-wider">Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}