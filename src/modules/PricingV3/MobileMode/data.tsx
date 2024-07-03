import { PRICING_PACKGE } from '@/modules/PricingV2/constants';

export type PackageItemType = {
  key: string;
  title: string;
  value: PRICING_PACKGE;
  description: string;
  isEnterprise: boolean;
  ctaBtnTitle: string;
  Hardware: {
    Memory: string;
    CPU: string;
    Storage: string;
  };
  Blockchain: {
    [key: string]: string | boolean;
  };
  PreInstalledDapps: {
    [key: string]: string | boolean;
  };
  Support: {
    [key: string]: string | boolean;
  };
};

export const HACKER_INFOR: PackageItemType = {
  key: 'Hacker',
  title: 'Hacker',
  value: PRICING_PACKGE.Hacker,
  isEnterprise: false,
  ctaBtnTitle: 'Launch now with 1-Click',
  description: 'The easiest way to launch your own ZK Rollup on Bitcoin',
  Hardware: {
    Memory: '16 GB RAM',
    CPU: '8 cores',
    Storage: '320 GB SSD',
  },
  Blockchain: {
    'Data availability': 'Polygon',
    'Max block gas limit': '1,000,000,000',
    'ZK Prover': false,
    'Withdrawal period': '6 hours',
  },
  PreInstalledDapps: {
    'Network Explorer': true,
    'BVM Bridge': true,
    'Bitcoin Bridge': false,
    'Ethereum Bridge': false,
  },
  Support: {
    'Support response time': '48h',
    'Telegram support': true,
    'Dedicated Telegram group': false,
    'Access to BVM engineering team': false,
  },
};

export const GROWTH_INFOR: PackageItemType = {
  key: 'Growth',
  title: 'Growth',
  value: PRICING_PACKGE.Growth,
  isEnterprise: false,
  ctaBtnTitle: 'Customize',
  description: 'Scale your Bitcoin ZK rollup as you go',
  Hardware: {
    Memory: '32 GB RAM',
    CPU: '16 cores',
    Storage: '400 GB SSD',
  },
  Blockchain: {
    'Data availability': 'Polygon, Celestia, Near DA, Eigen DA',
    'Max block gas limit': '2,000,000,000',
    'ZK Prover': false,
    'Withdrawal period': '4 hours',
  },
  PreInstalledDapps: {
    'Network Explorer': true,
    'BVM Bridge': true,
    'Bitcoin Bridge': true,
    'Ethereum Bridge': true,
  },
  Support: {
    'Support response time': '24h',
    'Telegram support': true,
    'Dedicated Telegram group': false,
    'Access to BVM engineering team': false,
  },
};

export const SECURE_INFOR: PackageItemType = {
  key: 'Secure',
  title: 'Secure',
  value: PRICING_PACKGE.Secure,
  isEnterprise: false,
  ctaBtnTitle: 'Customize',
  description:
    'Fully secure your Bitcoin ZK rollup with a cryptographic prover',
  Hardware: {
    Memory: '64 GB RAM',
    CPU: '32 cores',
    Storage: '650 GB SSD',
  },
  Blockchain: {
    'Data availability': 'Polygon, Celestia, Near DA, Eigen DA',
    'Max block gas limit': '4,000,000,000',
    'ZK Prover': true,
    'Withdrawal period': '2 hours',
  },
  PreInstalledDapps: {
    'Network Explorer': true,
    'BVM Bridge': true,
    'Bitcoin Bridge': true,
    'Ethereum Bridge': true,
  },
  Support: {
    'Support response time': '12h',
    'Telegram support': true,
    'Dedicated Telegram group': true,
    'Access to BVM engineering team': false,
  },
};

export const ENTERPRISE_INFOR: PackageItemType = {
  key: 'Enterprise',
  title: 'Enterprise',
  value: PRICING_PACKGE.Enterprise,
  isEnterprise: true,
  ctaBtnTitle: 'Contact us',
  description:
    'For organizations who need customization, BVM engineering team access, and dedicated support',
  Hardware: {
    Memory: 'Custom',
    CPU: 'Custom',
    Storage: 'Custom',
  },
  Blockchain: {
    'Data availability': 'Custom',
    'Max block gas limit': 'Custom',
    'ZK Prover': 'Custom',
    'Withdrawal period': 'Custom',
  },
  PreInstalledDapps: {
    'Network Explorer': 'Custom',
    'BVM Bridge': 'Custom',
    'Bitcoin Bridge': 'Custom',
    'Ethereum Bridge': 'Custom',
  },
  Support: {
    'Support response time': '1h',
    'Telegram support': true,
    'Dedicated Telegram group': true,
    'Access to BVM engineering team': true,
  },
};

export const DATA_LIST = [
  HACKER_INFOR,
  GROWTH_INFOR,
  SECURE_INFOR,
  ENTERPRISE_INFOR,
];
