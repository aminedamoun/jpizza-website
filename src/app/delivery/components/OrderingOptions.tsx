'use client';

import Link from 'next/link';

interface Step {
  id: string;
  number: string;
  title: string;
  description: string;
}

const orderingSteps: Step[] = [
  {
    id: 'step_1',
    number: '01',
    title: 'Choose Your Platform',
    description: 'Select your preferred delivery partner or order directly via WhatsApp.',
  },
  {
    id: 'step_2',
    number: '02',
    title: 'Browse Our Menu',
    description: 'Explore our authentic Italian pizzas, sides, and beverages.',
  },
  {
    id: 'step_3',
    number: '03',
    title: 'Place Your Order',
    description: 'Add items to cart, customize as needed, and proceed to checkout.',
  },
  {
    id: 'step_4',
    number: '04',
    title: 'Track & Enjoy',
    description: 'Track your order in real-time and enjoy hot, fresh pizza at your doorstep.',
  },
];

export default function OrderingOptions() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4 animate-fade-in">
            <div className="w-8 h-[1px] bg-primary shimmer" />
            <span className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground font-semibold">
              How It Works
            </span>
            <div className="w-8 h-[1px] bg-primary shimmer" />
          </div>
          <h2 className="text-display font-serif text-foreground mb-4 animate-fade-in-up delay-200">
            EASY ORDERING PROCESS
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {orderingSteps.map((step, index) => (
            <div
              key={step.id}
              className="relative text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Step Number */}
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 flex items-center justify-center border-2 border-primary bg-background relative z-10">
                  <span className="font-display text-2xl font-bold text-primary">
                    {step.number}
                  </span>
                </div>
                {/* Connecting Line */}
                {index < orderingSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-[2px] bg-border" />
                )}
              </div>

              {/* Title */}
              <h3 className="font-display text-base font-semibold text-foreground mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-card border-2 border-primary/20 p-12 text-center animate-fade-in delay-500">
          <h3 className="font-serif text-2xl text-foreground mb-4">
            Ready to Order?
          </h3>
          <p className="text-sm text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience authentic Italian pizza delivered fresh to your door. Choose your preferred ordering method below.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/menu" className="btn-primary">
              View Full Menu
            </Link>
            <a
              href="https://wa.me/971547077277"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Order via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}