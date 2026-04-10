export default function LocationMap() {
  return (
    <section className="py-20 px-6 lg:px-12 bg-muted">
      <div className="max-w-7xl mx-auto">
        {/* Map */}
        <div className="aspect-[16/9] lg:aspect-[21/9] bg-background relative overflow-hidden border border-border mb-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1739989064394!2d55.27437931501205!3d25.197197083893827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67c3c9%3A0x5c5e5c5e5c5e5c5e!2sJ%20Pizza%20House%2C%20Downtown%20Dubai!5e0!3m2!1sen!2sae!4v1739275523073!5m2!1sen!2sae"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="J Pizza House location map in Downtown Dubai"
          />
        </div>

        {/* Location Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Address */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-semibold text-foreground mb-4">
              Address
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              J Pizza Bar - Burj Khalifa<br />
              Downtown Dubai<br />
              Dubai, United Arab Emirates
            </p>
            <p className="text-sm text-primary mt-3 font-medium">
              2 minutes walk from Burj Khalifa
            </p>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-semibold text-foreground mb-4">
              Opening Hours
            </h3>
            <div className="space-y-2 text-muted-foreground">
              <p className="flex justify-between">
                <span>Daily</span>
                <span className="font-medium">7:00 AM - 2:00 AM</span>
              </p>
              <p className="flex justify-between">
                <span>Breakfast</span>
                <span className="font-medium">7:00 AM - 2:00 PM</span>
              </p>
              <p className="flex justify-between">
                <span>Delivery</span>
                <span className="font-medium">7:30 AM - 1:30 AM</span>
              </p>
            </div>
          </div>

          {/* Parking & Access */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-semibold text-foreground mb-4">
              Parking & Access
            </h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• Valet parking available</li>
              <li>• Dubai Mall P1 & P2 parking</li>
              <li>• Metro: Burj Khalifa/Dubai Mall Station</li>
              <li>• Wheelchair accessible</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}