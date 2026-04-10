import { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import MenuHeader from './components/MenuHeader';
import MenuGrid from './components/MenuGrid';
import SidesSection from './components/SidesSection';
import MenuCTA from './components/MenuCTA';

export const metadata: Metadata = {
  title: 'Menu - JPizza Dubai | Authentic Italian Pizza',
  description: 'Browse our authentic Italian pizza menu. Classic Margherita, specialty pizzas, vegan options, and more. All cooked with imported ingredients. Downtown Dubai.',
  keywords: 'pizza menu Dubai, Italian pizza prices, authentic pizza menu, vegan pizza Dubai, authentic pizza Downtown',
};

export default function MenuPage() {
  return (
    <>
      <Header />
      <main>
        <MenuHeader />
        <MenuGrid />
        <SidesSection />
        <MenuCTA />
      </main>
      <Footer />
    </>
  );
}