'use client';

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import HeroSection from './components/HeroSection';
import FeaturedPizzas from './components/FeaturedPizzas';
import SpecialOffers from './components/SpecialOffers';
import DeliveryPromoSection from './components/DeliveryPromoSection';
import ExperienceJPizza from './components/ExperienceJPizza';
import WhyJPizza from './components/WhyJPizza';
import LocationSection from './components/LocationSection';

export default function HomepageClient() {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />
        <FeaturedPizzas />
        <SpecialOffers />
        <DeliveryPromoSection />
        <ExperienceJPizza />
        <WhyJPizza />
        <LocationSection />
      </main>
      <Footer />
    </div>
  );
}