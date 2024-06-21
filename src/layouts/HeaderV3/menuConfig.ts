import { DEVELOPERS_DOC_URL } from '@/config';
import { NavItem } from '@layouts/Header/menuConfig';
import GroupProducts from '@layouts/HeaderV3/components/GroupProducts';

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Products',
    href: '#',
    isNewWindow: false,
    isHide: false,
    GroupDropDown: GroupProducts,
  },
  {
    label: 'Research',
    href: '/research',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'Team',
    href: '/team',
    isNewWindow: false,
    isHide: false,
  },
  // {
  //   label: 'Docs',
  //   isNewWindow: false,
  //   isHide: false,
  //   subMenu: [
  //     {
  //       href: '/roadmap',
  //       label: 'Roadmap',
  //       isNewWindow: false,
  //     },
  //     {
  //       href: 'https://docs.bvm.network/bvm',
  //       label: 'Developer Docs',
  //       isNewWindow: true,
  //     },
  //     {
  //       href: '/whitepaper.pdf',
  //       label: 'Whitepaper v1',
  //       isNewWindow: false,
  //     },
  //   ],
  // },

  // {
  //   href: '/whitepaper.pdf',
  //   label: 'Whitepaper',
  //   isNewWindow: true,
  // },
  {
    label: 'BVM',
    href: '/bvm',
    isNewWindow: false,
    isHide: false,
    // subMenu: [
    //   {
    //     href: '/roadmap',
    //     label: 'Roadmap',
    //     isNewWindow: false,
    //   },
    //   {
    //     href: 'https://docs.bvm.network/bvm',
    //     label: 'Developer Docs',
    //     isNewWindow: true,
    //   },
    //   {
    //     href: '/whitepaper.pdf',
    //     label: 'WhitePaper',
    //     isNewWindow: false,
    //   },
    // ],
  },
  {
    label: 'Pricing',
    href: '/pricing',
    isNewWindow: false,
    isHide: false,
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
  ...NAV_ITEMS,
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
      href: '/build-on-bitcoin',
      label: 'Builder Program',
      isNewWindow: true,
    },
  ],
};

export const COMMUNITY_ITEMS = [
  {
    icon: '/icons/tele-ic-2.svg',
    alt: 'telegram',
    link: 'https://t.me/BVMofficialcommunity',
  },
  {
    icon: '/icons/x-ic.svg',
    // link: 'https://twitter.com/bird_2836',
    alt: 'x',
    link: 'https://twitter.com/BVMnetwork',
  },
];
