export default function MenuHeader() {
  return (
    <div className="pt-28 pb-16 px-6 lg:px-12 bg-card text-foreground border-b border-border">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in">
          <div className="w-12 h-[1px] bg-primary shimmer" />
          <span className="text-[9px] tracking-[0.35em] uppercase text-primary font-semibold">
            Menu
          </span>
          <div className="w-12 h-[1px] bg-primary shimmer" />
        </div>

        <h1 className="text-display font-serif mb-4 animate-fade-in-up delay-200">
          OUR MENU
        </h1>

        <p className="text-base text-muted-foreground max-w-2xl mx-auto animate-fade-in delay-300">
          All pizzas cooked at 450°C. All ingredients imported from Italy. Dough fermented for 24 hours.
        </p>
      </div>
    </div>
  );
}