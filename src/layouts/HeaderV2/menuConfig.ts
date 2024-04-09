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
    href: '',
    isNewWindow: false,
    isHide: false,
    subMenu: [
      {
        href: '',
        label: 'AI on Bitcoin',
        isNewWindow: false,
      },
    ],
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
    link: '',
    alt: 'telegram',
  },
  {
    icon: './icons/x-ic.svg',
    link: '',
    alt: 'x',
  },
];
