import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { getWhatsAppUrl, getGeneralOrderMessage } from '@/lib/whatsapp';

export default function Footer() {
  return (
    <footer className="bg-card text-foreground py-16 px-6 lg:px-12 border-t border-border">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-10">
          {/* Logo & Location */}
          <div className="animate-fade-in">
            <Link href="/homepage" className="block mb-3">
              <AppImage
                src="/assets/images/jpizz-logo-1770822937653.png"
                alt="JPizza logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">
              Downtown Dubai • Authentic Italian Pizza
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-8 text-xs uppercase tracking-widest animate-fade-in delay-200">
            <Link href="/menu" className="hover:text-primary transition-colors duration-300">
              Menu
            </Link>
            <Link href="/reservations" className="hover:text-primary transition-colors duration-300">
              Reservations
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors duration-300">
              About
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors duration-300">
              Contact
            </Link>
            <Link href="/admin" className="hover:text-primary transition-colors duration-300">
              Admin
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 animate-fade-in delay-300">
            <a
              href="https://instagram.com/jpizza"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <Icon name="ChatBubbleLeftRightIcon" size={22} />
            </a>
            <a
              href={getWhatsAppUrl(getGeneralOrderMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              aria-label="WhatsApp"
            >
              <Icon name="ChatBubbleOvalLeftEllipsisIcon" size={22} />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-border/30 text-[10px] text-muted-foreground uppercase tracking-widest animate-fade-in delay-400">
          <p>© 2026 JPizza • All Rights Reserved</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors duration-300">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors duration-300">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}