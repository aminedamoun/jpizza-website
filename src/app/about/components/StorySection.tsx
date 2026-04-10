export default function StorySection() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-[9px] tracking-[0.4em] uppercase text-primary font-semibold">Our Story</span>
          <div className="flex-1 h-[1px] bg-border" />
        </div>

        {/* Asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-start">
          {/* Left: Large image with overlapping badge */}
          <div className="lg:col-span-5 relative mb-12 lg:mb-0">
            <div className="aspect-[3/4] overflow-hidden border border-border relative group">
              <img
                src="/assets/images/aboutus1-1774604157665.jpg"
                alt="Chef Marco hand-stretching pizza dough using traditional Neapolitan technique"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
              
              {/* Gold overlay gradient */}
              <div suppressHydrationWarning className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>

            {/* Floating badge - overlaps image */}
            <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-primary p-6 z-10 shadow-2xl">
              <p className="font-serif text-2xl text-background font-normal leading-tight">J Pizza House</p>
              <div className="w-8 h-[1px] bg-background/40 my-2" />
            </div>

            {/* Year tag */}
            <div className="absolute top-6 left-6 bg-background/80 backdrop-blur-sm border border-border px-4 py-2">
              <p className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Founded</p>
              <p className="font-serif text-xl text-primary">2024</p>
            </div>
          </div>

          {/* Right: Story content */}
          <div className="lg:col-span-7 lg:pl-20 pt-0 lg:pt-8">
            {/* Pull quote */}
            <blockquote className="mb-10 pl-6 border-l-2 border-primary">
              <p
                className="font-serif text-foreground leading-tight"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
                
                &ldquo; Pizza is not just food —<br />
                <span className="text-primary">it is memory, tradition,</span><br />
                and love on a plate.&rdquo;
              </p>
              <footer className="mt-4 text-[9px] uppercase tracking-[0.3em] text-muted-foreground">— J Pizza House</footer>
            </blockquote>

            <div className="space-y-5 text-muted-foreground text-sm leading-relaxed">
              <p>
                J Pizza House was created with a simple mission: to bring authentic Naples-style pizza to Dubai without compromise. Our restaurant represents 20 years of mastering the art of pizza-making in Italy.
              </p>
              <p>
                We use recipes and techniques passed down through generations — from the perfect dough hydration to the hand-stretching method — all brought to life in Downtown Dubai.
              </p>
              <p>
                Our ingredients are imported directly from Italy: Caputo 00 flour, San Marzano tomatoes, and buffalo mozzarella. Our custom-built oven, made in Naples, maintains a precise 450°C temperature for that authentic char and texture.
              </p>
            </div>

            {/* Ingredient highlights */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { label: 'Caputo 00 Flour', origin: 'Naples, Italy' },
                { label: 'San Marzano', origin: 'Campania, Italy' },
                { label: 'Buffalo Mozzarella', origin: 'Puglia, Italy' }
              ]?.map((item) =>
                <div key={item?.label} className="border border-border p-4 bg-card">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-primary mb-1">{item?.origin}</p>
                  <p className="text-xs text-foreground font-medium">{item?.label}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}