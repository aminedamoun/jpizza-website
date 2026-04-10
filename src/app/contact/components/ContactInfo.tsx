export default function ContactInfo() {
  return (
    <section className="py-20 px-6 lg:px-12 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* General Inquiries */}
          <div>
            <h3 className="text-2xl font-serif text-foreground mb-6">
              General Inquiries
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm uppercase tracking-wider text-muted-foreground mb-1">
                  Email
                </p>
                <a
                  href="mailto:info@jpizza.ae"
                  className="text-lg text-foreground hover:text-primary transition-colors"
                >
                  info@jpizza.ae
                </a>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wider text-muted-foreground mb-1">
                  Phone
                </p>
                <a
                  href="tel:+971547077277"
                  className="text-lg text-foreground hover:text-primary transition-colors"
                >
                  054 707 7277
                </a>
              </div>
            </div>
          </div>

          {/* Reservations & Orders */}
          <div>
            <h3 className="text-2xl font-serif text-foreground mb-6">
              Reservations & Orders
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm uppercase tracking-wider text-muted-foreground mb-1">
                  Reservations
                </p>
                <a
                  href="mailto:reservations@jpizza.ae"
                  className="text-lg text-foreground hover:text-primary transition-colors"
                >
                  reservations@jpizza.ae
                </a>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wider text-muted-foreground mb-1">
                  WhatsApp Orders
                </p>
                <a
                  href="https://wa.me/971547077277"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-foreground hover:text-primary transition-colors"
                >
                  054 707 7277
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Zones */}
        <div className="mt-16 p-8 bg-muted border border-border">
          <h3 className="text-xl font-serif text-foreground mb-4">
            Delivery Zones
          </h3>
          <p className="text-muted-foreground mb-4">
            We currently deliver to the following areas in Dubai:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-foreground">
            <span>• Downtown Dubai</span>
            <span>• DIFC</span>
            <span>• Business Bay</span>
            <span>• Dubai Marina</span>
            <span>• JBR</span>
            <span>• Palm Jumeirah</span>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Minimum order: AED 100 | Delivery fee: AED 15
          </p>
        </div>
      </div>
    </section>
  );
}