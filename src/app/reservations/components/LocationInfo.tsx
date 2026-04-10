export default function LocationInfo() {
  return (
    <section className="py-20 px-6 lg:px-12 bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Map */}
          <div className="aspect-[4/3] bg-background relative overflow-hidden border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1739989064394!2d55.27437931501205!3d25.197197083893827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1234567890123!5m2!1sen!2sae"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="J Pizza Bar location in Downtown Dubai"
            />
          </div>

          {/* Details */}
          <div>
            <h2 className="text-3xl font-serif text-foreground mb-8">
              VISIT US
            </h2>

            <div className="space-y-8">
              {/* Address */}
              <div>
                <h3 className="text-sm uppercase tracking-wider font-semibold text-foreground mb-3">
                  Address
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Sheikh Mohammed bin Rashid Blvd<br />
                  Downtown Dubai<br />
                  Dubai, United Arab Emirates
                </p>
                <p className="text-sm text-primary mt-2 font-medium">
                  2 minutes walk from Burj Khalifa
                </p>
              </div>

              {/* Parking */}
              <div>
                <h3 className="text-sm uppercase tracking-wider font-semibold text-foreground mb-3">
                  Parking
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Valet parking available<br />
                  Public parking: Dubai Mall P1 & P2
                </p>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Contact
                </h3>
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    <a href="tel:+971547077277" className="hover:text-primary transition-colors">
                      +971 54 707 7277
                    </a>
                  </p>
                  <p className="text-muted-foreground">
                    <a href="mailto:reservations@jpizza.ae" className="hover:text-primary transition-colors">
                      reservations@jpizza.ae
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Get Directions Button */}
            <div className="mt-10">
              <a
                href="https://goo.gl/maps/example"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block btn-secondary"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}