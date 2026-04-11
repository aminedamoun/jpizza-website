'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { getWhatsAppUrl, getGeneralOrderMessage } from '@/lib/whatsapp';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays on mount
    if (videoRef?.current) {
      videoRef?.current?.play()?.catch((error) => {
        console.log('Video autoplay prevented:', error);
      });
    }
    // Ensure mobile video plays on mount
    if (mobileVideoRef?.current) {
      mobileVideoRef?.current?.play()?.catch((error) => {
        console.log('Mobile video autoplay prevented:', error);
      });
    }
  }, []);

  return (
    <section className="hero-video-container">
      {/* Desktop Video Background */}
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/assets/images/hero-poster.webp">
        
        <source src="https://6949b72b30e1aa8ca4b7eef2.imgix.net/BANNER%202.webm" type="video/webm" />
      </video>

      {/* Mobile Video Background */}
      <video
        ref={mobileVideoRef}
        className="hero-video-mobile"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/assets/images/hero-poster.webp">
        
        <source src="https://6949b72b30e1aa8ca4b7eef2.imgix.net/j%20banner%20vert.webm" type="video/webm" />
      </video>

      {/* Gradient Overlay */}
      <div className="hero-video-overlay" />

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center px-6 lg:px-12">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
          {/* Main Headline */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-4 animate-fade-in delay-100">
              <span className="text-[9px] tracking-[0.35em] uppercase text-primary font-semibold">
                Est. 2024
              </span>
            </div>

            <h1 className="font-serif mb-6 animate-fade-in-up delay-200 text-3xl sm:text-4xl lg:text-5xl text-neutral-50">
              AUTHENTIC
              <br />
              <span className="text-primary">ITALIAN</span>
              <br />
              PIZZA
            </h1>

            <p className="text-base text-white/90 font-light mb-4 max-w-xl animate-fade-in delay-400">Downtown Dubai • Fresh Daily 

            </p>
          </div>

          {/* CTAs */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link
              href="/menu"
              className="group flex items-center justify-between border-b border-primary/40 pb-4 hover:border-primary transition-all duration-500 animate-slide-in-right delay-300">
              
              <span className="text-xs uppercase tracking-[0.15em] text-white font-semibold">
                View Menu
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300">
                
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </Link>

            <Link
              href="/reservations"
              className="group flex items-center justify-between border-b border-primary/40 pb-4 hover:border-primary transition-all duration-500 animate-slide-in-right delay-400">
              
              <span className="text-xs uppercase tracking-[0.15em] text-white font-semibold">
                Reserve Table
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300">
                
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </Link>

            <a
              href={getWhatsAppUrl(getGeneralOrderMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between border-b border-[#25D366]/60 pb-4 hover:border-[#25D366] transition-all duration-500 animate-slide-in-right delay-500">
              
              <span className="text-xs uppercase tracking-[0.15em] text-white font-semibold">
                Order on WhatsApp
              </span>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] text-[#25D366] transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary">
          
          <path d="M12 5v14m-6-6l6 6 6-6" />
        </svg>
      </div>
    </section>);

}