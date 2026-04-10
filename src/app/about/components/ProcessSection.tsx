'use client';

import { useState, useRef } from 'react';

interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  detail: string;
}

const initialProcessSteps: ProcessStep[] = [
  {
    id: 'step_dough',
    number: '01',
    title: '24-Hour Fermentation',
    description: 'Italian 00 flour, water, salt, and yeast. The dough ferments for 24 hours at controlled temperature, developing complex flavors and our signature airy texture.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1c601ed42-1765214343832.png',
    alt: 'Pizza dough balls fermenting in wooden trays covered with cloth in temperature-controlled environment',
    detail: '24 hrs · 18°C'
  },
  {
    id: 'step_toppings',
    number: '02',
    title: 'Premium Toppings',
    description: 'Only the finest ingredients make it onto our pizzas. San Marzano tomatoes, buffalo mozzarella, Parma ham, fresh basil — all imported from Italy and prepared fresh daily.',
    image: "/assets/images/seasoning-1774603823449.png",
    alt: 'Fresh Italian ingredients including buffalo mozzarella, San Marzano tomatoes, and basil on marble counter',
    detail: '100% Italian'
  },
  {
    id: 'step_oven',
    number: '03',
    title: 'Oven Perfection',
    description: 'Our Naples-imported oven reaches 450°C, cooking each pizza in just 90 seconds. The intense heat creates the perfect char, crispy crust, and melted toppings.',
    image: "https://images.unsplash.com/photo-1587759954886-73b7a967f344",
    alt: 'Pizza cooking in traditional brick oven with flames visible in background',
    detail: '450°C · 90 sec'
  },
  {
    id: 'step_serve',
    number: '04',
    title: 'Served Fresh',
    description: 'Each pizza goes from oven to table in minutes, ensuring you experience the perfect temperature, texture, and flavor. The way it was meant to be enjoyed.',
    image: "/assets/images/Seoul_City-1774603224220.jpeg",
    alt: 'Freshly baked Margherita pizza being served on wooden board with steam rising from melted cheese',
    detail: 'Oven to table'
  }
];

export default function ProcessSection() {
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>(initialProcessSteps);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setProcessSteps((prev) =>
      prev.map((step, i) =>
        i === index ? { ...step, image: objectUrl } : step
      )
    );
  };

  return (
    <section className="py-24 bg-muted overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[9px] tracking-[0.4em] uppercase text-primary font-semibold">The Craft</span>
              <div className="w-12 h-[1px] bg-primary" />
            </div>
            <h2
              className="font-serif text-foreground leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}>
              FROM DOUGH<br />
              <span className="text-primary">TO PERFECTION</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every pizza that leaves our kitchen follows the same meticulous four-step process 
              refined over two decades of Italian craftsmanship.
            </p>
          </div>
        </div>

        {/* Steps — alternating large/small layout */}
        <div className="space-y-0">
          {processSteps.map((step, index) =>
            <div
              key={step.id}
              className={`grid grid-cols-1 lg:grid-cols-12 border-t border-border py-12 gap-8 items-center group ${
                index === processSteps.length - 1 ? 'border-b' : ''}`
              }>
              
              {/* Step number */}
              <div className="lg:col-span-1 hidden lg:flex items-start pt-1">
                <span
                  className="font-serif group-hover:text-primary/40 transition-colors duration-500 text-[rgba(212,175,55,1)]"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                  {step.number}
                </span>
              </div>

              {/* Image */}
              <div className={`lg:col-span-4 ${index % 2 === 1 ? 'lg:order-3' : 'lg:order-2'}`}>
                <div className="menu-item-card aspect-[4/3] overflow-hidden relative">
                  <img
                    src={step.image}
                    alt={step.alt}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                
                  {/* Detail badge */}
                  <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm border border-primary/30 px-3 py-1.5">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-primary font-semibold">{step.detail}</span>
                  </div>

                  {/* Hidden file input */}
                  <input
                    ref={(el) => { fileInputRefs.current[index] = el; }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, index)}
                  />
                </div>
              </div>

              {/* Content */}
              <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2 lg:pr-8' : 'lg:order-3 lg:pl-8'}`}>
                {/* Mobile step number */}
                <span className="lg:hidden font-serif text-primary/30 text-4xl block mb-3">{step.number}</span>
                <h3
                  className="font-serif text-foreground mb-4 leading-tight"
                  style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}>
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>

                {/* Decorative line */}
                <div className="mt-6 w-12 h-[1px] bg-primary/40 group-hover:w-24 transition-all duration-500" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}