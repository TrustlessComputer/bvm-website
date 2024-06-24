import {
  DEVELOPERS_DOC_URL,
  DEVELOPERS_GRANTS_URL,
  WHITEPAPER_DOC_URL,
} from '@/config';
import { ReactElement } from 'react';
import { IGroupType } from '@layouts/HeaderV3/useHeaderMobile';

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
  isGroup?: boolean;
  groupType?: IGroupType;
  GroupDropDown?: () => ReactElement;
}

export const MenuBuild = {
  label: 'Build',
  // href: DEVELOPERS_DOC_URL,
  isNewWindow: false,
  isHide: false,
  subMenu: [
    {
      href: '/rollups',
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

export const NAV_ITEMS_LEFT: Array<NavItem> = [
  // {
  //   label: 'Use Bitcoin',
  //   href: '/use-bitcoin',
  //   isNewWindow: false,
  //   isHide: false,
  //   isStrong: true
  // },

  {
    label: 'Products',
    // href: DEVELOPERS_DOC_URL,
    isNewWindow: false,
    isHide: false,
    subMenu: [
      {
        href: '/ai-on-bitcoin',
        label: 'AI on Bitcoin',
        isNewWindow: false,
      },
      {
        href: '/smart-contracts-on-bitcoin',
        label: 'Smart contracts on Bitcoin',
        isNewWindow: false,
      },
      {
        href: '/bitcoin-l2s',
        label: 'Bitcoin L2s',
        isNewWindow: false,
      },
      {
        href: '/module-store',
        label: 'Module Store',
        isNewWindow: false,
      },
    ],
  },

  {
    label: 'Solutions',
    // href: DEVELOPERS_DOC_URL,
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
    label: 'Buy BVM',
    href: '/bvm',
    isNewWindow: false,
    isHide: false,
    isStrong: true,
  },
  {
    label: 'Mine SHARD',
    href: '/shard',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'Stake',
    href: '/staking',
    isNewWindow: false,
    isHide: false,
  },

  // {
  //   label: 'Build',
  //   // href: DEVELOPERS_DOC_URL,
  //   isNewWindow: false,
  //   isHide: false,
  //   subMenu: [
  //     {
  //       href: '/rollups',
  //       label: 'Bitcoin L2s',
  //       isNewWindow: false,
  //     },
  //     {
  //       href: '/module-store',
  //       label: 'Module Store',
  //       isNewWindow: false,
  //     },
  //     {
  //       href: DEVELOPERS_DOC_URL,
  //       label: 'Developer Docs',
  //       isNewWindow: true,
  //     },
  //     {
  //       href: DEVELOPERS_GRANTS_URL,
  //       label: 'Developer Grants',
  //       isNewWindow: true,
  //     },
  //   ],
  // },
  // {
  //   label: 'Learn',
  //   // href: DEVELOPERS_DOC_URL,
  //   isNewWindow: true,
  //   isHide: false,
  //   subMenu: [
  //     {
  //       href: 'https://bvm.network/onepager.pdf',
  //       label: 'Onepager',
  //       isNewWindow: true,
  //     },
  //     {
  //       href: 'https://bvm.network/deck.pdf',
  //       label: 'Deck',
  //       isNewWindow: true,
  //     },
  //     {
  //       href: WHITEPAPER_DOC_URL,
  //       label: 'Whitepaper',
  //       isNewWindow: true,
  //     },
  //   ],
  // },
  // {
  //   label: 'Bitcoin L2s',
  //   href: '/rollups',
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
  // {
  //   label: checkIsPublicSale() ? 'Public Sale' : 'Launchpad',
  //   href: checkIsPublicSale() ? '/public-sale' : '/launchpad',
  //   isNewWindow: false,
  //   isStrong: false,
  //   isHide: false,
  // },
  {
    label: 'BUIDL Airdrop',
    href: '/build-on-bitcoin',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'Roadmap',
    href: '/roadmap',
    isNewWindow: false,
    isHide: false,
  },
  // {
  //   label: 'Explore Bitcoin L2s',
  //   href: '/use-bitcoin',
  //   isNewWindow: false,
  //   isHide: false,
  // },
  // {
  //   label: 'Community',
  //   href: 'https://t.me/+rT0cmRXjs01kMzY1',
  //   isNewWindow: true,
  //   isHide: false,
  // },
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
  // {
  //   label: 'Twitter',
  //   isTwitter: true,
  //   href: 'https://twitter.com/bvmnetwork',
  //   isNewWindow: true,
  //   isHide: false,
  // },
  // {
  //   label: 'Github',
  //   isTwitter: true,
  //   href: 'https://github.com/trustlesscomputer/',
  //   isNewWindow: true,
  //   isHide: false,
  // },
  // {
  //   label: 'Try BVM',
  //   isTwitter: true,
  //   href: '/rollups/customize',
  //   isNewWindow: false,
  //   isHide: false,
  // },
].filter((item) => !item.isHide);
