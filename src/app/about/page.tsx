import { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import AboutHeader from './components/AboutHeader';
import StorySection from './components/StorySection';
import ProcessSection from './components/ProcessSection';
import ValuesSection from './components/ValuesSection';
import AboutCTA from './components/AboutCTA';

export const metadata: Metadata = {
  title: 'About Us - JPizza Dubai | Authentic Italian Pizza Story',
  description: 'Learn about JPizza - from Naples to Dubai. Founded by Chef Marco with 20 years of Italian pizza-making expertise. Authentic ingredients, traditional techniques, oven perfection.',
  keywords: 'Italian chef Dubai, authentic pizza story, Naples pizza tradition, JPizza founder, authentic pizza Dubai',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHeader />
        <StorySection />
        <ValuesSection />
        <ProcessSection />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}