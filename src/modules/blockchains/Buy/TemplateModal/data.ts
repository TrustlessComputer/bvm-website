import { PRICING_PACKGE, PRICING_PACKGE_MAP } from '@/modules/PricingV2/constants';

export const FAKE_DATA_PACKAGE = [
  {
    id: '0',
    color: 'GREEN',
    template: PRICING_PACKGE_MAP[PRICING_PACKGE.Hacker],
    link: `/rollups/customizev2?package=${PRICING_PACKGE.Hacker}`,
    content: 'The easiest way to launch your blockchain',
    price: '$99',
    check: true,
    options: [
      '16 GB RAM',
      '8 cores',
      '320 GB SSD',
      '320 GB SSD',
      '320 GB SSD',
      '320 GB SSD',
      '320 GB SSD',
    ]
  },
  {
    id: '1',
    color: 'BLUE',
    template: PRICING_PACKGE_MAP[PRICING_PACKGE.Growth],
    link: `/rollups/customizev2?package=${PRICING_PACKGE.Growth}`,
    content: 'Scale your blockchain as you go',
    price: '$699',
    check: false,
    options: [
      '32 GB RAM',
      '16 cores',
      '400 GB SSD',
      '400 GB SSD',
      '400 GB SSD',
      '400 GB SSD',
    ]

  },
  {
    id: '2',
    color: 'ORANGE',
    template: PRICING_PACKGE_MAP[PRICING_PACKGE.Secure],
    link: `/rollups/customizev2?package=${PRICING_PACKGE.Secure}`,
    content: 'Fully secure your blockchain with a cryptographic prover',
    check: false,
    price: '$1999',
    options: [
      '64 GB RAM',
      '32 cores',
      '650 GB SSD',
      '650 GB SSD',
    ]
  },
]
