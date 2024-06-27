import { DEVELOPERS_DOC_URL } from '@/config';
import { NavItem } from '@layouts/Header/menuConfig';
import GroupProducts from '@layouts/HeaderV3/components/GroupProducts';
import GroupDeveloper from '@layouts/HeaderV3/components/GroupDeveloper';
import IcArrow from './components/IcArrow';

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Products',
    href: '#',
    isNewWindow: false,
    isHide: false,
    groupType: 'production',
    GroupDropDown: GroupProducts,
  },
  {
    label: 'Developers',
    isNewWindow: false,
    isHide: false,
    groupType: 'developers',
    GroupDropDown: GroupDeveloper,
    // subMenu: [
    //   {
    //     href: 'https://docs.bvm.network/bvm/quickstart/create-a-zk-powered-blockchain',
    //     label: 'Launch a Bitcoin ZK rollup',
    //     isNewWindow: true,
    //   },
    //   {
    //     href: 'https://docs.bvm.network/bvm/quickstart/connect-to-zk-powered-blockchains',
    //     label: 'Connect to a Bitcoin ZK rollup',
    //     isNewWindow: true,
    //   },
    //   {
    //     href: 'https://docs.bvm.network/bvm/quickstart/build-your-first-bitcoin-dapps',
    //     label: 'Build your first Bitcoin dapps',
    //     isNewWindow: true,
    //   },
    // ],
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

export const NAV_ITEMS_LEFT: Array<NavItem> = [
  {
    label: 'Products',
    href: '#',
    isNewWindow: false,
    isHide: false,
    GroupDropDown: GroupProducts,
  },
  {
    label: 'Developers',
    href: '/developers',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'Pricing',
    href: '/pricing',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: '$BVM',
    href: '/$bvm',
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
];

export const NAV_ITEMS_RIGHT: Array<NavItem> = [
  {
    label: 'Research',
    href: '/research',
    isNewWindow: false,
    isHide: false,
    GroupDropDown: GroupProducts,
  },
  {
    label: 'Team',
    href: '/team',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'Contact Us',
    href: '/contact-us',
    isNewWindow: false,
    isHide: false,
    icon: IcArrow,
    subMenu: [
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
    ],
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
  ...NAV_ITEMS_LEFT,
  ...NAV_ITEMS_RIGHT,
];

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
