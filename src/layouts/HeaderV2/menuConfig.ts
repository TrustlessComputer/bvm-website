import { DEVELOPERS_DOC_URL, DEVELOPERS_GRANTS_URL } from '@/config';
import { NavItem } from '@layouts/Header/menuConfig';

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Solutions',
    href: '',
    isNewWindow: false,
    isHide: false,
    subMenu: [
      {
        href: '/use-bitcoin',
        label: 'Success Stories',
        isNewWindow: false,
      },
      {
        href: 'https://eternalai.org',
        label: 'Bitcoin L2 for AI',
        isNewWindow: true,
      },
      {
        href: '/gamefi',
        label: 'Bitcoin L2 for GameFi',
        isNewWindow: false,
      },
      {
        href: '/defi',
        label: 'Bitcoin L2 for DeFi',
        isNewWindow: false,
      },
      {
        href: '/socialfi',
        label: 'Bitcoin L2 for SocialFi',
        isNewWindow: false,
      },
    ],
  },
  {
    label: 'Modules',
    href: '/module-store',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'Customers',
    href: '/use-bitcoin',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'Roadmap',
    isNewWindow: false,
    isHide: false,
    href: '/roadmap',
  },
];
export const NAV_ITEMS_MOBILE: Array<NavItem> = [
  {
    label: 'SHARD',
    href: '/shard',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'BVM',
    href: '/bvm',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'Solutions',
    href: '',
    isNewWindow: false,
    isHide: false,
    subMenu: [
      {
        href: '/use-bitcoin',
        label: 'Success Stories',
        isNewWindow: false,
      },
      {
        href: '/ai',
        label: 'Bitcoin L2 for AI',
        isNewWindow: false,
      },
      {
        href: '/gamefi',
        label: 'Bitcoin L2 for GameFi',
        isNewWindow: false,
      },
      {
        href: '/defi',
        label: 'Bitcoin L2 for DeFi',
        isNewWindow: false,
      },
      {
        href: '/socialfi',
        label: 'Bitcoin L2 for SocialFi',
        isNewWindow: false,
      },
    ],
  },
  {
    label: 'Modules',
    href: '/module-store',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'Customers',
    href: '/use-bitcoin',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'Roadmap',
    isNewWindow: false,
    isHide: false,
    href: '/roadmap',
  },
];
export const MenuBuild = {
  label: 'Build',
  // href: DEVELOPERS_DOC_URL,
  isNewWindow: false,
  isHide: false,
  subMenu: [
    {
      href: '/blockchains',
      label: 'Bitcoin L2s',
      isNewWindow: false,
    },
    {
      href: '/module-store',
      label: 'Module Store',
      isNewWindow: false,
    },
    {
      href: DEVELOPERS_DOC_URL,
      label: 'Developer Docs',
      isNewWindow: true,
    },
    {
      href: DEVELOPERS_GRANTS_URL,
      label: 'Developer Grants',
      isNewWindow: true,
    },
  ],
};

export const COMMUNITY_ITEMS = [
  {
    icon: './icons/tele-ic-2.svg',
    alt: 'telegram',
    link: 'https://t.me/BVMofficialcommunity',
  },
  {
    icon: './icons/x-ic.svg',
    // link: 'https://twitter.com/bird_2836',
    alt: 'x',
    link: 'https://twitter.com/BVMnetwork',
  },
];
