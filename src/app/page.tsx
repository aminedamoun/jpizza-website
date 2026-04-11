import { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import HeroSection from './homepage/components/HeroSection';
import FeaturedPizzas from './homepage/components/FeaturedPizzas';
import SpecialOffers from './homepage/components/SpecialOffers';
import DeliveryPromoSection from './homepage/components/DeliveryPromoSection';
import ExperienceJPizza from './homepage/components/ExperienceJPizza';
import WhyJPizza from './homepage/components/WhyJPizza';
import LocationSection from './homepage/components/LocationSection';

export const metadata: Metadata = {
  title: 'Pizzeria - Authentic Italian Pizza in Downtown Dubai',
  description: 'Experience authentic Naples-style pizza in Downtown Dubai. Traditional oven perfection with imported Italian ingredients, 24-hour fermented dough, and traditional techniques.',
  keywords: 'Italian pizza Dubai, authentic pizza, authentic pizza Downtown Dubai, Naples pizza UAE, best pizza Dubai',
};

export default function RootPage() {
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
