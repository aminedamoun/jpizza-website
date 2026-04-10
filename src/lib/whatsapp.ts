const WHATSAPP_NUMBER = '971547077277';

export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getOrderMessage(itemName: string, price: string): string {
  return `Hi JPizza! 🍕 I would like to order:\n\n• ${itemName} — ${price}\n\nPlease confirm availability and delivery details. Thank you!`;
}

export function getGeneralOrderMessage(): string {
  return `Hi JPizza! 🍕 I'd like to place an order. Can you share the menu and delivery details? Thank you!`;
}

export function getReservationMessage(): string {
  return `Hi JPizza! 🍕 I'd like to make a table reservation. Can you help me with availability? Thank you!`;
}

export function getContactMessage(): string {
  return `Hi JPizza! 👋 I have a question and would like to get in touch. Can you help me?`;
}
