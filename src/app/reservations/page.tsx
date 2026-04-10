import { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ReservationHeader from './components/ReservationHeader';
import BookingForm from './components/BookingForm';
import LocationInfo from './components/LocationInfo';

export const metadata: Metadata = {
  title: 'Reservations - J Pizza Bar Dubai | Book Your Table',
  description: 'Reserve your table at J Pizza Bar Downtown Dubai. Online booking available. Walk-ins welcome. Authentic Italian pizza in the heart of Dubai.',
  keywords: 'book table Dubai, pizza reservation, Downtown Dubai restaurant booking, J Pizza Bar reservations',
};

export default function ReservationsPage() {
  return (
    <>
      <Header />
      <main>
        <ReservationHeader />
        <BookingForm />
        <LocationInfo />
      </main>
      <Footer />
    </>
  );
}