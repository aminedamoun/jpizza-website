'use client';

import AppImage from '@/components/ui/AppImage';

interface DeliveryPartner {
  id: string;
  name: string;
  logo: string;
  link: string;
  alt: string;
}

const deliveryPartners: DeliveryPartner[] = [
{
  id: 'partner_talabat',
  name: 'Talabat',
  logo: "/assets/images/talabat-1774517513507.webp",
  link: 'https://www.talabat.com/uae/j-pizza-bar',
  alt: 'Talabat food delivery service logo'
},
{
  id: 'partner_deliveroo',
  name: 'Deliveroo',
  logo: "/assets/images/deliveroo-1774521176397.webp",
  link: 'https://deliveroo.ae/menu/dubai/downtown-dubai-mall/j-pizza-bar',
  alt: 'Deliveroo food delivery service logo'
}];


export default function DeliveryPartners() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4 animate-fade-in">
            <div className="w-8 h-[1px] bg-primary shimmer" />
            <span className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground font-semibold">
              Order Through
            </span>
            <div className="w-8 h-[1px] bg-primary shimmer" />
          </div>
          <h2 className="text-display font-serif text-foreground mb-4 animate-fade-in-up delay-200">
            OUR DELIVERY PARTNERS
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto animate-fade-in delay-300">
            Choose your preferred delivery platform and enjoy our food at home.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {deliveryPartners.map((partner, index) =>
          <a
            key={partner.id}
            href={partner.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center p-6 bg-card border border-border hover:border-primary transition-all duration-500 animate-scale-in card-hover-lift gap-3"
            style={{ animationDelay: `${index * 0.1}s` }}>
            
              <div className="relative w-full h-14 flex items-center justify-center">
                <AppImage
                src={partner.logo}
                alt={partner.alt}
                className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-xs text-muted-foreground font-medium tracking-wide group-hover:text-primary transition-colors duration-300">
                {partner.name}
              </span>
            </a>
          )}
        </div>

        {/* Direct Order CTA */}
        <div className="mt-16 text-center animate-fade-in delay-500">
          <div className="inline-block bg-muted border-2 border-primary/20 p-8">
            <p className="text-lg text-muted-foreground mb-8">
              Prefer to order directly?
            </p>
            <a
              href="https://wa.me/971547077277"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-3">
              
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Order via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>);

}