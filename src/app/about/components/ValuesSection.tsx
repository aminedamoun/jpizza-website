export default function ValuesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-[9px] tracking-[0.4em] uppercase text-primary font-semibold">What We Stand For</span>
          <div className="flex-1 h-[1px] bg-border" />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Large card - spans 2 cols */}
          <div className="lg:col-span-2 relative overflow-hidden border border-border bg-card group min-h-[320px]">
            <img
              src="https://images.unsplash.com/photo-1664683591826-12d7d41543c1"
              alt="Authentic Neapolitan pizza with perfectly charred crust and fresh toppings on wooden board"
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" />

            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
            <div className="relative z-10 p-8 flex flex-col justify-end h-full">
              <div className="w-10 h-10 border border-primary flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-2">Uncompromising Authenticity</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                We never cut corners. Every ingredient is sourced from Italy, every technique follows 
                centuries-old Neapolitan tradition. Authenticity is not a marketing word — it&apos;s our standard.
              </p>
            </div>
          </div>

          {/* Tall card */}
          <div className="border border-border bg-card p-8 flex flex-col justify-between group hover:border-primary/40 transition-colors duration-500">
            <div className="w-10 h-10 border border-border group-hover:border-primary flex items-center justify-center mb-6 transition-colors duration-500">
              <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-serif text-xl text-foreground mb-3">Made with Passion</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Each pizza is crafted by hand with the same love and care as if you were dining in a family 
                kitchen in Naples. Passion is our secret ingredient.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-4xl font-serif text-primary">∞</p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground mt-1">Endless dedication</p>
            </div>
          </div>

          {/* Small card */}
          <div className="border border-border bg-muted p-8 group hover:border-primary/40 transition-colors duration-500">
            <div className="w-10 h-10 border border-border group-hover:border-primary flex items-center justify-center mb-6 transition-colors duration-500">
              <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-foreground mb-3">Italian Heritage</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Three generations of pizza-making knowledge, carried from Naples to Dubai.
            </p>
          </div>

          {/* Medium card with number stat */}
          <div className="border border-border bg-card p-8 flex flex-col justify-between group hover:border-primary/40 transition-colors duration-500">
            <div>
              <p
                className="font-serif text-primary leading-none mb-2"
                style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}>
                90s
              </p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-4">Cook time in the oven</p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-foreground mb-2">Speed & Precision</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                At 450°C, perfection happens fast. Our oven demands precision — and delivers it every time.
              </p>
            </div>
          </div>

          {/* Wide card - spans 2 cols */}
          <div className="lg:col-span-1 border border-border bg-card p-8 group hover:border-primary/40 transition-colors duration-500">
            <div className="w-10 h-10 border border-border group-hover:border-primary flex items-center justify-center mb-6 transition-colors duration-500">
              <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-foreground mb-3">Community First</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We are proud to be part of Dubai&apos;s vibrant food scene, bringing people together 
              over the universal language of great pizza.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}