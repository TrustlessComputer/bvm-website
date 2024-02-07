import { DEVELOPERS_DOC_URL, DEVELOPERS_GRANTS_URL, WHITEPAPER_DOC_URL } from '@/config';
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

export const NAV_ITEMS_LEFT: Array<NavItem> = [
  {
    label: 'Use Bitcoin',
    href: '/use-bitcoin',
    isNewWindow: false,
    isHide: false,
  },
  {
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
  },
  {
    label: 'Learn',
    // href: DEVELOPERS_DOC_URL,
    isNewWindow: true,
    isHide: false,
    subMenu: [
      {
        href: 'https://bvm.network/onepager.pdf',
        label: 'Onepager',
        isNewWindow: true,
      },
      {
        href: 'https://bvm.network/deck.pdf',
        label: 'Deck',
        isNewWindow: true,
      },
      {
        href: WHITEPAPER_DOC_URL,
        label: 'Whitepaper',
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
  //       href: 'https://bvm.network/onepager.pdf',
  //       label: 'Onepager',
  //     },
  //     {
  //       href: 'https://bvm.network/deck.pdf',
  //       label: 'Deck',
  //     },
  //     {
  //       href: WHITEPAPER_DOC_URL,
  //       label: 'Whitepaper',
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

export const NAV_ITEMS: Array<NavItem> = [
  ...NAV_ITEMS_LEFT,
  ...NAV_ITEMS_RIGHT,
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
