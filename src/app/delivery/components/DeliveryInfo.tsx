import Icon from '@/components/ui/AppIcon';

interface InfoItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const deliveryInfo: InfoItem[] = [
  {
    id: 'info_area',
    icon: 'MapPinIcon',
    title: 'Delivery Coverage',
    description: 'We deliver across Downtown Dubai, Business Bay, DIFC, and surrounding areas within 5km radius.',
  },
  {
    id: 'info_time',
    icon: 'ClockIcon',
    title: 'Delivery Hours',
    description: 'Daily: 7:30 AM - 1:30 AM',
  },
  {
    id: 'info_minimum',
    icon: 'CurrencyDollarIcon',
    title: 'Minimum Order',
    description: 'AED 50 minimum order for delivery. Free delivery on orders above AED 150.',
  },
  {
    id: 'info_packaging',
    icon: 'ShoppingBagIcon',
    title: 'Premium Packaging',
    description: 'Specially designed insulated boxes to keep your pizza hot and fresh during delivery.',
  },
  {
    id: 'info_payment',
    icon: 'CreditCardIcon',
    title: 'Payment Options',
    description: 'Cash on delivery, credit/debit cards, Apple Pay, and all major digital wallets accepted.',
  },
  {
    id: 'info_tracking',
    icon: 'TruckIcon',
    title: 'Real-Time Tracking',
    description: 'Track your order in real-time from preparation to delivery through our partner apps.',
  },
];

export default function DeliveryInfo() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-muted">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4 animate-fade-in">
            <div className="w-8 h-[1px] bg-primary shimmer" />
            <span className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground font-semibold">
              Details
            </span>
            <div className="w-8 h-[1px] bg-primary shimmer" />
          </div>
          <h2 className="text-display font-serif text-foreground mb-4 animate-fade-in-up delay-200">
            DELIVERY INFORMATION
          </h2>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deliveryInfo.map((item, index) => (
            <div
              key={item.id}
              className="group bg-background border border-border p-8 hover:border-primary transition-all duration-500 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 mb-6 flex items-center justify-center border-2 border-primary group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-500">
                <Icon
                  name={item.icon as any}
                  size={28}
                  className="text-primary group-hover:text-background transition-colors duration-500"
                />
              </div>

              {/* Title */}
              <h3 className="font-display text-base font-semibold text-foreground mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}