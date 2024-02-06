import { DEVELOPERS_DOC_URL, WHITEPAPER_DOC_URL } from '@/config';
import { checkIsPublicSale } from '@/modules/Whitelist/utils';

export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  isNewWindow?: boolean;
  href?: string;
  isHide?: boolean;
  isTwitter?: boolean;
  isStrong?: boolean;
  subMenu?: any;
}

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Bitcoin L2s',
    href: '/blockchains',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: checkIsPublicSale() ? 'Public Sale' : 'Launchpad',
    href: checkIsPublicSale() ? '/public-sale' : '/launchpad',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'Module Store',
    href: '/module-store',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: '$BVM',
    href: '/bvm',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'Roadmap',
    href: '/roadmap',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'Onepager',
    href: 'https://bvm.network/onepager.pdf',
    isNewWindow: true,
    isHide: false,
  },

  {
    label: 'Deck',
    href: 'https://bvm.network/deck.pdf',
    isNewWindow: true,
    isHide: false,
  },
  {
    label: 'Whitepaper',
    href: WHITEPAPER_DOC_URL,
    isNewWindow: true,
    isHide: false,
  },
  {
    label: 'Developers',
    href: DEVELOPERS_DOC_URL,
    isNewWindow: true,
    isHide: false,
  },
  {
    label: 'Twitter',
    isTwitter: true,
    href: 'https://twitter.com/bvmnetwork',
    isNewWindow: true,
    isHide: false,
  },
  {
    label: 'Github',
    isTwitter: true,
    href: 'https://github.com/trustlesscomputer/',
    isNewWindow: true,
    isHide: false,
  },
].filter((item) => !item.isHide);

export const NAV_ITEMS_LEFT: Array<NavItem> = [
  {
    label: 'Use Bitcoin',
    href: '/use-bitcoin',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'Build',
    href: DEVELOPERS_DOC_URL,
    isNewWindow: false,
    isHide: false,
    subMenu: [
      {
        link: '/blockchains',
        title: 'Bitcoin L2s',
        isNewWindow: false,
      },
      {
        link: '/module-store',
        title: 'Module Store',
        isNewWindow: false,
      },
      {
        link: DEVELOPERS_DOC_URL,
        title: 'Developer Docs',
        isNewWindow: true,
      },
    ],
  },
  {
    label: 'Learn',
    href: DEVELOPERS_DOC_URL,
    isNewWindow: true,
    isHide: false,
    subMenu: [
      {
        link: 'https://bvm.network/onepager.pdf',
        title: 'Onepager',
        isNewWindow: true,
      },
      {
        link: 'https://bvm.network/deck.pdf',
        title: 'Deck',
        isNewWindow: true,
      },
      {
        link: WHITEPAPER_DOC_URL,
        title: 'Whitepaper',
        isNewWindow: true,
      },
    ],
  },
  // {
  //   label: 'Bitcoin L2s',
  //   href: '/blockchains',
  //   isNewWindow: false,
  //   isHide: false,
  // },
  // {
  //   label: 'Module Store',
  //   href: '/module-store',
  //   isNewWindow: false,
  //   isHide: false,
  // },
  // {
  //   label: checkIsPublicSale() ? 'Public Sale' : 'Launchpad',
  //   href: checkIsPublicSale() ? '/public-sale' : '/launchpad',
  //   isNewWindow: false,
  //   isStrong: false,
  //   isHide: false,
  // },
].filter((item) => !item.isHide);

export const NAV_ITEMS_RIGHT: Array<NavItem> = [
  {
    label: '$BVM',
    href: '/bvm',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: checkIsPublicSale() ? 'Public Sale' : 'Launchpad',
    href: checkIsPublicSale() ? '/public-sale' : '/launchpad',
    isNewWindow: false,
    isStrong: false,
    isHide: false,
  },
  {
    label: 'Roadmap',
    href: '/roadmap',
    isNewWindow: false,
    isHide: false,
  },
  // {
  //   label: 'Learn',
  //   href: DEVELOPERS_DOC_URL,
  //   isNewWindow: true,
  //   isHide: false,
  //   subMenu: [
  //     {
  //       link: 'https://bvm.network/onepager.pdf',
  //       title: 'Onepager',
  //     },
  //     {
  //       link: 'https://bvm.network/deck.pdf',
  //       title: 'Deck',
  //     },
  //     {
  //       link: WHITEPAPER_DOC_URL,
  //       title: 'Whitepaper',
  //     },
  //   ],
  // },
  // {
  //   label: 'Build',
  //   href: DEVELOPERS_DOC_URL,
  //   isNewWindow: true,
  //   isHide: false,
  // },

].filter((item) => !item.isHide);
