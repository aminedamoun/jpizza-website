'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { menuService } from '@/lib/services/menuService';
import { offers as staticOffers, type Offer } from '@/lib/data/staticData';

function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={star <= rating ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={star <= rating ? 0 : 1.5}
          className={`w-3.5 h-3.5 ${
            star <= rating ? 'text-primary' : 'text-muted-foreground opacity-40'
          }`}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function SpecialOffers() {
  const [offers, setOffers] = useState<Offer[]>(staticOffers as Offer[]);

  useEffect(() => {
    menuService.getActiveOffers().then((data) => {
      if (data?.length) setOffers(data);
    }).catch(() => {});
  }, []);

  if (offers.length === 0) return null;

  return (
    <section className="py-24 px-6 lg:px-12 bg-muted">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4 animate-slide-in-left">
            <div className="w-8 h-[1px] bg-primary shimmer" />
            <span className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground font-semibold">
              Limited Time
            </span>
            <div className="w-8 h-[1px] bg-primary shimmer" />
          </div>
          <h2 className="text-display font-serif text-foreground animate-fade-in-up delay-200">
            SPECIAL OFFERS
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
            Exclusive deals crafted for our valued guests
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <div
              key={offer.id}
              className="menu-item-card card-hover-lift bg-card animate-scale-in"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              {/* Image */}
              <div className="menu-item-image relative">
                <AppImage
                  src={offer.imageUrl}
                  alt={offer.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Valid Until badge */}
                {offer.validUntil && (
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-[9px] tracking-[0.2em] uppercase font-bold px-3 py-1">
                    {offer.validUntil}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                {offer.subtitle && (
                  <span className="text-[9px] tracking-[0.3em] uppercase text-primary font-semibold mb-2 block">
                    {offer.subtitle}
                  </span>
                )}

                {/* Stars */}
                <div className="mb-2">
                  <StarRating rating={offer.rating ?? 5} />
                </div>

                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display text-lg font-semibold text-foreground leading-tight">
                    {offer.title}
                  </h3>
                  {offer.price && (
                    <span className="font-display text-base font-bold text-primary whitespace-nowrap ml-2">
                      {offer.price}
                    </span>
                  )}
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  {offer.description}
                </p>

                {offer.terms && (
                  <p className="text-[10px] text-muted-foreground italic mb-3">
                    * {offer.terms}
                  </p>
                )}

                <Link
                  href={offer.ctaLink || '/delivery'}
                  className="text-[10px] uppercase tracking-[0.15em] font-semibold text-primary hover:text-accent transition-all duration-300 flex items-center gap-2 group"
                >
                  {offer.ctaText || 'Order Now'}
                  <Icon
                    name="ArrowRightIcon"
                    size={14}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
