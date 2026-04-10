'use client';

import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

import { menuService, type MenuItem } from '@/lib/services/menuService';
import { getWhatsAppUrl, getOrderMessage } from '@/lib/whatsapp';

export default function FeaturedPizzas() {
  const [featuredPizzas, setFeaturedPizzas] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedPizzas() {
      try {
        const pizzas = await menuService.getFeaturedPizzas(5);
        setFeaturedPizzas(pizzas);
      } catch (error) {
        console.error('Error loading featured pizzas:', error);
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedPizzas();
  }, []);

  if (loading) {
    return (
      <section className="py-24 px-6 lg:px-12 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-12" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) =>
              <div key={i} className="h-96 bg-muted rounded" />
              )}
            </div>
          </div>
        </div>
      </section>);

  }

  return (
    <section className="py-24 px-6 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-center mb-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4 animate-slide-in-left">
              <div className="w-8 h-[1px] bg-primary shimmer" />
              <span className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground font-semibold">
                Featured
              </span>
              <div className="w-8 h-[1px] bg-primary shimmer" />
            </div>
            <h2 className="text-display font-serif text-foreground animate-fade-in-up delay-200">OUR SIGNATURES

            </h2>
          </div>
        </div>

        {/* 2-Row Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {featuredPizzas.slice(0, 3).map((pizza, index) =>
          <div
            key={pizza.id}
            className="menu-item-card card-hover-lift bg-card animate-scale-in flex flex-col"
            style={{ animationDelay: `${index * 0.15}s` }}>

              {/* Image */}
              <div className="menu-item-image">
                <AppImage
                src={pizza.image}
                alt={pizza.alt}
                className="w-full h-full object-cover" />

              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {pizza.name}
                  </h3>
                  <span className="font-display text-base font-bold text-primary">
                    {pizza.price}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
                  {pizza.description}
                </p>
                <a
                  href={getWhatsAppUrl(getOrderMessage(pizza.name, pizza.price))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] uppercase tracking-[0.15em] font-semibold text-primary hover:text-accent transition-all duration-300 flex items-center gap-2 group mt-auto"
                >
                  Add to Order
                  <Icon
                    name="ArrowRightIcon"
                    size={14}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {featuredPizzas.slice(3, 5).map((pizza, index) =>
          <div
            key={pizza.id}
            className="menu-item-card card-hover-lift bg-card animate-scale-in flex flex-col"
            style={{ animationDelay: `${(index + 3) * 0.15}s` }}>

              {/* Image */}
              <div className="menu-item-image">
                <AppImage
                src={pizza.image}
                alt={pizza.alt}
                className="w-full h-full object-cover" />

              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {pizza.name}
                  </h3>
                  <span className="font-display text-base font-bold text-primary">
                    {pizza.price}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
                  {pizza.description}
                </p>
                <a
                  href={getWhatsAppUrl(getOrderMessage(pizza.name, pizza.price))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] uppercase tracking-[0.15em] font-semibold text-primary hover:text-accent transition-all duration-300 flex items-center gap-2 group mt-auto"
                >
                  Add to Order
                  <Icon
                    name="ArrowRightIcon"
                    size={14}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* View Full Menu CTA */}
        <div className="text-center mt-12 animate-fade-in delay-500">
          <a href="/menu" className="inline-block btn-secondary">
            View Full Menu
          </a>
        </div>
      </div>
    </section>);

}