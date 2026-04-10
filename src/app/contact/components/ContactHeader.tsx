export default function ContactHeader() {
  return (
    <div className="pt-28 pb-16 px-6 lg:px-12 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in">
          <div className="w-12 h-[1px] bg-primary shimmer" />
          <span className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground font-semibold">
            Contact
          </span>
          <div className="w-12 h-[1px] bg-primary shimmer" />
        </div>

        <h1 className="text-display font-serif text-foreground mb-4 animate-fade-in-up delay-200">
          GET IN TOUCH
        </h1>

        <p className="text-base text-muted-foreground max-w-2xl mx-auto animate-fade-in delay-300">
          We'd love to hear from you. Whether you have questions, feedback, or just want to say hello.
        </p>
      </div>
    </div>
  );
}