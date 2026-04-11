'use client';

import { useState, useRef } from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  alt: string;
}

const initialTeamMembers: TeamMember[] = [
  {
    id: 'team_marco',
    name: 'Marco Rossi',
    role: 'Founder & Head Pizzaiolo',
    bio: '20 years of experience in Naples, trained by third-generation masters',
    image: "/assets/images/team-1.webp",
    alt: 'Chef Marco Rossi in white chef uniform standing in restaurant kitchen'
  },
  {
    id: 'team_giulia',
    name: 'Giulia Bianchi',
    role: 'Sous Chef',
    bio: 'Culinary Institute of Florence graduate, specializing in Italian cuisine',
    image: "https://images.unsplash.com/photo-1707005112511-838d79cc74d3",
    alt: 'Chef Giulia Bianchi smiling in chef uniform with arms crossed'
  },
  {
    id: 'team_antonio',
    name: 'Antonio Ricci',
    role: 'Pizzaiolo',
    bio: 'Naples native with 15 years of traditional oven expertise',
    image: "/assets/images/team-2.webp",
    alt: 'Pizzaiolo Antonio Ricci working with pizza dough in traditional kitchen'
  }
];

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setTeamMembers((prev) =>
      prev.map((member, i) =>
        i === index ? { ...member, image: objectUrl, alt: `${member.name} photo` } : member
      )
    );
  };

  return (
    <section className="py-32 px-6 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-display font-serif text-foreground mb-6">
            MEET THE TEAM
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate Italians bringing authentic flavors to Dubai
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {teamMembers.map((member, index) =>
            <div key={member.id} className="group">
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden border border-border mb-6 relative">
                <img
                  src={member.image}
                  alt={member.alt}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />

                {/* Hidden file input */}
                <input
                  ref={(el) => { fileInputRefs.current[index] = el; }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, index)}
                />
              </div>

              {/* Info */}
              <div>
                <h3 className="text-xl font-serif text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-sm uppercase tracking-wider text-primary mb-3 font-semibold">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}