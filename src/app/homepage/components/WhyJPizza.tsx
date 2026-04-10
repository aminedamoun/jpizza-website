import Icon from '@/components/ui/AppIcon';

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 'feature_flour',
    icon: 'SparklesIcon',
    title: 'Imported Italian 00 Flour',
    description: 'Authentic Caputo flour from Naples, milled specifically for pizza dough perfection.',
  },
  {
    id: 'feature_dough',
    icon: 'ClockIcon',
    title: '24-Hour Fermented Dough',
    description: 'Slow fermentation develops complex flavors and creates our signature light, airy crust.',
  },
  {
    id: 'feature_oven',
    icon: 'FireIcon',
    title: 'Traditional Oven at 450°C',
    description: 'Traditional oven imported from Italy, achieving the perfect char and texture.',
  },
];

export default function WhyJPizza() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-muted">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4 animate-fade-in">
            <div className="w-8 h-[1px] bg-primary shimmer" />
            <span className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground font-semibold">
              Authenticity
            </span>
            <div className="w-8 h-[1px] bg-primary shimmer" />
          </div>
          <h2 className="text-display font-serif text-foreground mb-4 animate-fade-in-up delay-200">
            WHY JPIZZA?
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto animate-fade-in delay-300">
            We don't cut corners. Every pizza is a commitment to Italian tradition and culinary excellence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="group text-center animate-scale-in"
              style={{ animationDelay: `${(index + 4) * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border-2 border-primary group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-500">
                <Icon
                  name={feature.icon as any}
                  size={32}
                  className="text-primary group-hover:text-background transition-colors duration-500"
                />
              </div>

              {/* Title */}
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in delay-500">
          <a
            href="/about"
            className="inline-block btn-secondary"
          >
            Learn Our Story
          </a>
        </div>
      </div>
    </section>
  );
}