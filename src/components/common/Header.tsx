'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
  { id: 'nav_homepage', label: 'Home', href: '/homepage' },
  { id: 'nav_menu', label: 'Menu', href: '/menu' },
  { id: 'nav_delivery', label: 'Delivery', href: '/delivery' },
  { id: 'nav_reservations', label: 'Reservations', href: '/reservations' },
  { id: 'nav_about', label: 'About', href: '/about' },
  { id: 'nav_contact', label: 'Contact', href: '/contact' }];


  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-background/98 backdrop-blur-md border-b border-border shadow-lg shadow-primary/5' : 'bg-background/90 backdrop-blur-md'}`
      }>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/homepage" className="flex items-center hover:opacity-80 transition-all duration-300 animate-fade-in">
            <AppImage
              src="/assets/images/jpizz-logo-1770822937653.webp"
              alt="Restaurant logo"
              className="h-12 w-auto object-contain" />

          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks?.map((link, index) =>
            <Link
              key={link?.id}
              href={link?.href}
              className={`nav-link animate-fade-in delay-${(index + 1) * 100}`}
              style={{ animationDelay: `${index * 0.1}s` }}>

                {link?.label}
              </Link>
            )}
          </nav>

          {/* CTA Button */}
          <a
            href="https://wa.me/971547077277"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:block btn-primary text-xs animate-fade-in delay-500">

            Order Now
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-foreground"
            aria-label="Toggle menu">

            <Icon name={isMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={28} />
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen &&
      <div className="lg:hidden bg-card border-t border-border animate-fade-in">
          <nav className="px-6 py-8 space-y-6">
            {navLinks?.map((link) =>
          <Link
            key={link?.id}
            href={link?.href}
            onClick={() => setIsMenuOpen(false)}
            className={`block text-base ${
            pathname === link?.href ? 'text-primary font-semibold' : 'text-foreground'}`
            }>

                {link?.label}
              </Link>
          )}
            <a
            href="https://wa.me/971547077277"
            target="_blank"
            rel="noopener noreferrer"
            className="block btn-primary text-center">

              Order Now
            </a>
          </nav>
        </div>
      }
    </header>);

}