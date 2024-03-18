export const FAKE_DATA = [
  {
    id: 0,
    caseStudy: 'Generative Art',
    title: 'Generative Art',
    description:
      'Generative Collection Identification Challenge. Can you tell if the submitted image is part of a generative collection? \n This AI model can!',
    image: '/ai-landing/primitive_1.png',
    link: '/use',
    linkTitle: 'Give It A Try'
  },
  {
    id: 1,
    caseStudy: 'Chat AI',
    title: 'Empower your conversations.',
    description:
      'From answering questions to generating creative content, this AI model can adapt to your needs, providing insightful responses and engaging interactions.',
    image: '/ai-landing/primitive_2.png',
  },
  {
    id: 2,
    caseStudy: 'Music',
    title: 'Melody Composer AI.',
    description:
      'Whether you\'re a seasoned musician or just getting started, this AI model can help you release your creativity and compose beautiful melodies with ease.',
    image: '/ai-landing/primitive_3.png',
  },
  {
    id: 3,
    caseStudy: 'Image',
    title: ' Find your perfect match!',
    description:
      'Submit your image, and this AI model will analyze it to find which Crypto Punk avatar best fits you.',
    image: '/ai-landing/primitive_4.png',
  },
];

export type TDataPrimitive = (typeof FAKE_DATA)[number];
