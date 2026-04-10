import Link from 'next/link';
import { getWhatsAppUrl, getGeneralOrderMessage } from '@/lib/whatsapp';

export default function MenuCTA() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-card text-foreground border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-display font-serif mb-6 animate-fade-in-up">
          READY TO ORDER?
        </h2>
        <p className="text-base text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in delay-200">
          Reserve your table for dine-in or order via WhatsApp for delivery to Downtown Dubai.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in delay-300">
          <Link href="/reservations" className="btn-primary">
            Reserve Table
          </Link>
          <a
            href={getWhatsAppUrl(getGeneralOrderMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Order on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}