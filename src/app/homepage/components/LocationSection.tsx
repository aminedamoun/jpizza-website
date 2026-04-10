export default function LocationSection() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Map */}
          <div className="aspect-[4/3] lg:aspect-square bg-muted relative overflow-hidden border border-border animate-slide-in-left">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1739989064394!2d55.27437931501205!3d25.197197083893827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67c3c9%3A0x5c5e5c5e5c5e5c5e!2sJ%20Pizza%20House%2C%20Downtown%20Dubai!5e0!3m2!1sen!2sae!4v1739275523073!5m2!1sen!2sae"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="J Pizza House location map in Downtown Dubai" />

          </div>

          {/* Details */}
          <div className="animate-slide-in-right">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-primary shimmer" />
              <span className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground font-semibold">
                Visit Us
              </span>
            </div>

            <h2 className="text-display font-serif text-foreground mb-6">
              DOWNTOWN DUBAI
            </h2>

            <div className="space-y-6 mb-10">
              {/* Address */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.12em] font-semibold text-foreground mb-2">
                  Address
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  J Pizza Bar - Burj Khalifa<br />
                  Downtown Dubai<br />
                  Dubai, United Arab Emirates
                </p>
                <p className="text-xs text-primary mt-2">
                  2 minutes walk from Burj Khalifa
                </p>
              </div>

              {/* Hours */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.12em] font-semibold text-foreground mb-2">
                  Opening Hours
                </h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Daily: 7:00 AM - 2:00 AM</p>
                  <p>Breakfast: 7:00 AM - 2:00 PM</p>
                  <p>Delivery: 7:30 AM - 1:30 AM</p>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.12em] font-semibold text-foreground mb-2">
                  Contact
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <a href="tel:+971547077277" className="hover:text-primary transition-colors duration-300">+971 54 707 7277

                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <a href="mailto:info@jpizza.ae" className="hover:text-primary transition-colors duration-300">info@jpizzabar.com

                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://www.google.com/maps/search/?api=1&query=J+Pizza+House+Downtown+Dubai+Burj+Khalifa"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-center">

                Get Directions
              </a>
              <a
                href="https://wa.me/971547077277"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-center">

                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>);

}