'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    partySize: '2',
    name: '',
    phone: '',
    email: '',
    specialRequests: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Reservation request received! We will confirm via phone within 24 hours.');
      setFormData({
        date: '',
        time: '',
        partySize: '2',
        name: '',
        phone: '',
        email: '',
        specialRequests: '',
      });
    }, 2000);
  };

  return (
    <section className="py-20 px-6 lg:px-12 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Terminal Form */}
        <div className="terminal-form animate-fade-in">
          {/* Progress Indicator */}
          <div className="flex items-center gap-3 mb-10">
            <span className="text-[9px] text-foreground font-mono font-semibold">01</span>
            <div className="h-[2px] flex-1 bg-border relative">
              <div className="h-full w-1/2 bg-primary" />
            </div>
            <span className="text-[9px] text-muted-foreground font-mono">02</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Date & Time */}
            <div>
              <label className="block text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-5 font-semibold">
                Select Date & Time
              </label>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="form-input"
                  />
                </div>
                <div className="relative">
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="form-input w-full bg-transparent appearance-none"
                  >
                    <option value="">Select Time</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="11:30">11:30 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="12:30">12:30 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="13:30">1:30 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="14:30">2:30 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="18:30">6:30 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="19:30">7:30 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="20:30">8:30 PM</option>
                    <option value="21:00">9:00 PM</option>
                    <option value="21:30">9:30 PM</option>
                    <option value="22:00">10:00 PM</option>
                  </select>
                  <div className="absolute right-0 top-3 pointer-events-none">
                    <Icon name="ChevronDownIcon" size={20} className="text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>

            {/* Party Size */}
            <div>
              <label className="block text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-5 font-semibold">
                Party Size
              </label>
              <div className="relative">
                <select
                  name="partySize"
                  value={formData.partySize}
                  onChange={handleChange}
                  required
                  className="form-input w-full bg-transparent appearance-none"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5">5 People</option>
                  <option value="6">6 People</option>
                  <option value="7">7 People</option>
                  <option value="8">8 People</option>
                  <option value="9+">9+ People (Call us)</option>
                </select>
                <div className="absolute right-0 top-3 pointer-events-none">
                  <Icon name="ChevronDownIcon" size={20} className="text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <label className="block text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-5 font-semibold">
                Contact Information
              </label>
              <div className="space-y-8">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="form-input"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="form-input"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="form-input"
                />
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-5 font-semibold">
                Special Requests (Optional)
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                placeholder="Dietary restrictions, celebration notes, seating preferences..."
                rows={4}
                className="form-input resize-none"
              />
            </div>

            {/* Submit */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border">
              <p className="text-[9px] text-muted-foreground max-w-xs">
                By confirming, you agree to our 24-hour cancellation policy. No deposit required for parties under 8.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-12 py-4 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Request Reservation'}
                {!isSubmitting && (
                  <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </div>

            {/* Success Message */}
            {submitMessage && (
              <div className="mt-8 p-6 bg-success/10 border border-success text-success-foreground">
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircleIcon" size={24} className="text-success shrink-0" />
                  <p className="text-sm">{submitMessage}</p>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Alternative Booking */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-6">
            Prefer to book via WhatsApp?
          </p>
          <a
            href="https://wa.me/971547077277?text=Hi%2C%20I%27d%20like%20to%20make%20a%20reservation%20at%20J%20Pizza%20Bar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 btn-secondary"
          >
            <Icon name="ChatBubbleOvalLeftEllipsisIcon" size={20} />
            Reserve via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}