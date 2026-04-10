'use client';

import { introImages } from '@/lib/data/staticData';

export type { IntroImage } from '@/lib/data/staticData';

export const introService = {
  async getIntroImages() {
    return introImages;
  },
};
