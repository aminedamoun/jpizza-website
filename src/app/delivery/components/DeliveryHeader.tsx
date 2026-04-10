'use client';

import AppImage from '@/components/ui/AppImage';

export default function DeliveryHeader() {
  return (
    <section className="relative pt-52 pb-32 px-6 lg:px-12 bg-muted overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://images.unsplash.com/photo-1709036253558-5a8895579a9f"
          alt="Delivery person on scooter delivering fresh hot pizza in urban setting"
          className="w-full h-full object-cover opacity-20" />
        
        <div className="absolute inset-0 bg-gradient-to-b from-muted/80 via-muted/90 to-muted" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in">
            <div className="w-8 h-[1px] bg-primary shimmer" />
            <span className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground font-semibold">
              Fast & Fresh
            </span>
            <div className="w-8 h-[1px] bg-primary shimmer" />
          </div>

          <h1 className="text-hero font-serif text-foreground mb-6 text-editorial animate-fade-in-up delay-200">
            DELIVERY
          </h1>

          <p className="text-lg text-muted-foreground mb-8 animate-fade-in delay-300">
            Authentic Italian pizza delivered hot to your doorstep.
            <br />
            Same quality, same passion, now at your convenience.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm animate-fade-in delay-400">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center border-2 border-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <span className="text-foreground font-semibold">30-45 Min Delivery</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center border-2 border-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="text-foreground font-semibold">Contactless Available</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center border-2 border-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <span className="text-foreground font-semibold">Track Your Order</span>
            </div>
          </div>
        </div>
      </div>
    </section>);

}