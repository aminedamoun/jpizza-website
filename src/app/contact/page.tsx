import { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ContactHeader from './components/ContactHeader';
import ContactMethods from './components/ContactMethods';
import LocationMap from './components/LocationMap';
import ContactInfo from './components/ContactInfo';

export const metadata: Metadata = {
  title: 'Contact Us - J Pizza Bar Dubai | Get in Touch',
  description: 'Contact J Pizza Bar Downtown Dubai. Phone, WhatsApp, email. Find us near Burj Khalifa. Opening hours, delivery zones, and parking information.',
  keywords: 'contact J Pizza Bar Dubai, pizza restaurant Downtown Dubai location, WhatsApp order Dubai, J Pizza Bar phone number',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactHeader />
        <ContactMethods />
        <LocationMap />
        <ContactInfo />
      </main>
      <Footer />
    </>
  );
}