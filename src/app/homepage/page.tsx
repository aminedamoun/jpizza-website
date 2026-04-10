import { Metadata } from 'next';
import HomepageClient from './HomepageClient';

export const metadata: Metadata = {
  title: 'Pizzeria - Authentic Italian Pizza in Downtown Dubai',
  description: 'Experience authentic Naples-style pizza in Downtown Dubai. Traditional oven perfection with imported Italian ingredients, 24-hour fermented dough, and traditional techniques.',
  keywords: 'Italian pizza Dubai, authentic pizza, authentic pizza Downtown Dubai, Naples pizza UAE, best pizza Dubai',
};

export default function Homepage() {
  return <HomepageClient />;
}