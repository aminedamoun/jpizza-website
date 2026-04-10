import { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import DeliveryHeader from './components/DeliveryHeader';
import DeliveryPartners from './components/DeliveryPartners';
import DeliveryInfo from './components/DeliveryInfo';
import OrderingOptions from './components/OrderingOptions';

export const metadata: Metadata = {
  title: 'Delivery - J Pizza Bar | Order Authentic Italian Pizza',
  description: 'Get J Pizza Bar delivered to your doorstep. Order through our delivery partners or directly via WhatsApp. Fast, hot, and fresh pizza delivery in Dubai.',
  keywords: 'pizza delivery Dubai, food delivery, J Pizza Bar delivery, order pizza online Dubai',
};

export default function DeliveryPage() {
  return (
    <>
      <Header />
      <main>
        <DeliveryHeader />
        <DeliveryPartners />
        <DeliveryInfo />
        <OrderingOptions />
      </main>
      <Footer />
    </>
  );
}