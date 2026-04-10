import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function AboutCTA() {
  return (
    <section className="relative py-32 overflow-hidden bg-background">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://images.unsplash.com/photo-1732827097362-dd88dd5277f1"
          alt="Overhead view of multiple authentic Italian pizzas on a rustic wooden table in restaurant setting"
          className="w-full h-full object-cover opacity-20" />
        
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>
      {/* Decorative gold lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-10" />
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-16 text-center">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-[1px] bg-primary/60" />
          <span className="text-[9px] tracking-[0.4em] uppercase text-primary font-semibold">Experience JPizza</span>
          <div className="w-12 h-[1px] bg-primary/60" />
        </div>

        {/* Headline */}
        <h2
          className="font-serif text-foreground leading-tight mb-6"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
          
          TASTE THE<br />
          <span className="text-primary">DIFFERENCE</span>
        </h2>

        <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed mb-12">
          Stop reading about it — come taste it. Reserve your table tonight and experience 
          authentic Neapolitan pizza crafted with 20 years of Italian mastery.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/reservations" className="btn-primary inline-block">
            Reserve a Table
          </Link>
          <Link href="/menu" className="btn-secondary inline-block">
            Explore the Menu
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 pt-12 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
          { icon: '★', label: 'Top Rated', sub: 'Dubai Food Scene 2024' },
          { icon: '🍕', label: 'Authentic Neapolitan', sub: 'Certified Italian Recipes' },
          { icon: '🚀', label: 'Fast Delivery', sub: 'Via Talabat & Deliveroo' }]?.
          map((item) =>
          <div key={item?.label} className="flex flex-col items-center gap-2">
              <p className="text-sm font-medium text-foreground">{item?.label}</p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{item?.sub}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}