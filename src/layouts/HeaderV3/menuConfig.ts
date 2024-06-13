import { DEVELOPERS_DOC_URL } from '@/config';
import { NavItem } from '@layouts/Header/menuConfig';

// export const NAV_ITEMS: Array<NavItem> = [
//   {
//     label: 'Solutions',
//     href: '',
//     isNewWindow: false,
//     isHide: false,
//     subMenu: [
//       {
//         href: 'https://eternalai.org',
//         label: 'Bitcoin L2 for AI',
//         isNewWindow: true,
//       },
//       {
//         href: '/gamefi',
//         label: 'Bitcoin L2 for GameFi',
//         isNewWindow: false,
//       },
//       {
//         href: '/defi',
//         label: 'Bitcoin L2 for DeFi',
//         isNewWindow: false,
//       },
//       {
//         href: '/socialfi',
//         label: 'Bitcoin L2 for SocialFi',
//         isNewWindow: false,
//       },
//     ],
//   },
//   {
//     label: 'Modules',
//     href: '/module-store',
//     isNewWindow: false,
//     isHide: false,
//   },
//   {
//     label: 'Ecosystem',
//     href: '/use-bitcoin',
//     isNewWindow: false,
//     isHide: false,
//   },
//   {
//     label: 'Learn',
//     isNewWindow: false,
//     isHide: false,
//     subMenu: [
//       {
//         href: '/roadmap',
//         label: 'Roadmap',
//         isNewWindow: false,
//       },
//       {
//         href: 'https://docs.bvm.network/bvm',
//         label: 'Developer Docs',
//         isNewWindow: true,
//       },
//       {
//         href: '/whitepaper.pdf',
//         label: 'WhitePaper',
//         isNewWindow: false,
//       },
//     ],
//   },
//   // {
//   //   label: 'Launchpad',
//   //   isNewWindow: false,
//   //   isHide: false,
//   //   subMenu: [
//   //     {
//   //       href: `${LAUNCHPAD_DETAIL_URL}/3`,
//   //       label: 'Current project',
//   //       isNewWindow: false,
//   //     },
//   //     {
//   //       href: LAUNCHPAD_URL,
//   //       label: 'View all projects',
//   //       isNewWindow: false,
//   //     },
//   //   ],
//   // },
// ];
export const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Chains',
    href: '/chains',
    isNewWindow: false,
    isHide: false,
    // subMenu: [
    //   {
    //     href: 'https://eternalai.org',
    //     label: 'Bitcoin L2 for AI',
    //     isNewWindow: true,
    //   },
    //   {
    //     href: '/gamefi',
    //     label: 'Bitcoin L2 for GameFi',
    //     isNewWindow: false,
    //   },
    //   {
    //     href: '/defi',
    //     label: 'Bitcoin L2 for DeFi',
    //     isNewWindow: false,
    //   },
    //   {
    //     href: '/socialfi',
    //     label: 'Bitcoin L2 for SocialFi',
    //     isNewWindow: false,
    //   },
    // ],
  },
  {
    label: 'Modules',
    href: '/modules',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'Research',
    href: '/research',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'Docs',
    isNewWindow: false,
    isHide: false,
    subMenu: [
      {
        href: '/roadmap',
        label: 'Roadmap',
        isNewWindow: false,
      },
      {
        href: 'https://docs.bvm.network/bvm',
        label: 'Developer Docs',
        isNewWindow: true,
      },
      {
        href: '/whitepaper.pdf',
        label: 'WhitePaper',
        isNewWindow: false,
      },
    ],
  },
  {
    label: 'BVM',
    isNewWindow: false,
    isHide: false,
    subMenu: [
      {
        href: '/roadmap',
        label: 'Roadmap',
        isNewWindow: false,
      },
      {
        href: 'https://docs.bvm.network/bvm',
        label: 'Developer Docs',
        isNewWindow: true,
      },
      {
        href: '/whitepaper.pdf',
        label: 'WhitePaper',
        isNewWindow: false,
      },
    ],
  },
];
export const TOP_NAV_ITEMS: Array<NavItem> = [
  // {
  //   label: 'Launchpad',
  //   isNewWindow: false,
  //   isHide: false,
  //   href: LAUNCHPAD_URL,
  // },
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
