import { NavItem } from '@layouts/Header/menuConfig';

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Solutions',
    href: '',
    isNewWindow: false,
    isHide: false,
    subMenu: [
      {
        href: '/ai-on-bitcoin',
        label: 'AI on Bitcoin',
        isNewWindow: false,
      },
    ],
  },
  {
    label: 'Modules',
    href: '',
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
    href: '',
    isNewWindow: false,
    isHide: false,
  },
]

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
  }

]
