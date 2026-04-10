import Icon from '@/components/ui/AppIcon';
import { getWhatsAppUrl } from '@/lib/whatsapp';

interface ContactMethod {
  id: string;
  icon: string;
  title: string;
  details: string;
  link: string;
  linkText: string;
}

const contactMethods: ContactMethod[] = [
  {
    id: 'contact_phone',
    icon: 'PhoneIcon',
    title: 'Phone',
    details: '054 707 7277',
    link: 'tel:+971547077277',
    linkText: 'Call Us',
  },
  {
    id: 'contact_whatsapp',
    icon: 'ChatBubbleOvalLeftEllipsisIcon',
    title: 'WhatsApp',
    details: 'Fast response for orders & inquiries',
    link: getWhatsAppUrl('Hi JPizza! 👋 I have a question and would like to get in touch. Can you help me?'),
    linkText: 'Message Us',
  },
  {
    id: 'contact_email',
    icon: 'EnvelopeIcon',
    title: 'Email',
    details: 'info@jpizza.ae',
    link: 'mailto:info@jpizza.ae',
    linkText: 'Send Email',
  },
  {
    id: 'contact_instagram',
    icon: 'CameraIcon',
    title: 'Instagram',
    details: '@jpizza_dubai',
    link: 'https://instagram.com/jpizza_dubai',
    linkText: 'Follow Us',
  },
];

export default function ContactMethods() {
  return (
    <section className="py-20 px-6 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactMethods.map((method, index) => (
            <div
              key={method.id}
              className="border border-border p-6 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group card-hover-lift animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center border-2 border-primary mb-5 group-hover:bg-primary transition-all duration-300">
                <Icon
                  name={method.icon as any}
                  size={28}
                  className="text-primary group-hover:text-background transition-colors duration-300"
                />
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-foreground mb-2 uppercase tracking-[0.12em]">
                {method.title}
              </h3>

              {/* Details */}
              <p className="text-xs text-muted-foreground mb-4">
                {method.details}
              </p>

              {/* Link */}
              <a
                href={method.link}
                target={method.link.startsWith('http') ? '_blank' : undefined}
                rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-sm font-semibold text-primary hover:text-accent transition-colors uppercase tracking-wider flex items-center gap-2"
              >
                {method.linkText}
                <Icon name="ArrowRightIcon" size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}