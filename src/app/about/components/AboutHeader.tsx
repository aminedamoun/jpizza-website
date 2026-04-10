export default function AboutHeader() {
  return (
    <div className="pt-28 pb-16 px-6 lg:px-12 bg-background border-b border-border">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in">
          <div className="w-12 h-[1px] bg-primary shimmer" />
          <span className="text-[9px] tracking-[0.35em] uppercase text-primary font-semibold">
            Est. 2024 · Naples to Dubai
          </span>
          <div className="w-12 h-[1px] bg-primary shimmer" />
        </div>

        <h1 className="text-display font-serif text-foreground mb-4 animate-fade-in-up delay-200">
          OUR STORY
        </h1>

        <p className="text-base text-muted-foreground max-w-2xl mx-auto animate-fade-in delay-300">
          Two decades of mastering the ancient craft of Neapolitan pizza-making,
          now brought to the heart of Dubai with uncompromising authenticity.
        </p>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-10 mt-10 animate-fade-in delay-400">
          {[
            { value: '20+', label: 'Years of craft' },
            { value: '450°', label: 'Oven temperature' },
            { value: '100%', label: 'Italian sourced' },
          ]?.map((stat) => (
            <div key={stat?.label} className="text-center">
              <p className="text-2xl font-serif text-primary mb-1">{stat?.value}</p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{stat?.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}