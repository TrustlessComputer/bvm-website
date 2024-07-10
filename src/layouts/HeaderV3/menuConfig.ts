import { DEVELOPERS_DOC_URL } from '@/config';
import { NavItem } from '@layouts/Header/menuConfig';
import GroupProducts from '@layouts/HeaderV3/components/GroupProducts';
import GroupDeveloper from '@layouts/HeaderV3/components/GroupDeveloper';
import ContactUs from "@layouts/HeaderV3/components/ContactUs";
import GroupSolutions from './components/GroupSolutions';

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
    label: 'Solutions',
    href: '#',
    isNewWindow: false,
    isHide: false,
    groupType: 'solutions',
    GroupDropDown: GroupSolutions,
  },
  {
    label: 'Developers',
    href: '/developers',
    isNewWindow: false,
    isHide: false,
    groupType: 'developers',
    GroupDropDown: GroupDeveloper,
  },
  {
    label: 'Pricing',
    href: '/pricing',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'Customers',
    href: '/customers',
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
  {
    label: 'contact us',
    MenuItemEl: ContactUs
  },
];
export const NAV_ITEMS_LEFT: Array<NavItem> = [
  {
    label: 'Products',
    href: '#',
    isNewWindow: false,
    isHide: false,
    groupType: 'production',
    GroupDropDown: GroupProducts,
  },
  {
    label: 'Solutions',
    href: '#',
    isNewWindow: false,
    isHide: false,
    groupType: 'solutions',
    GroupDropDown: GroupSolutions,
  },
  {
    label: 'Developers',
    href: '/developers',
    isNewWindow: false,
    isHide: false,
    groupType: 'developers',
    GroupDropDown: GroupDeveloper,
  },
  {
    label: 'Pricing',
    href: '/pricing',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'Customers',
    href: '/customers',
    isNewWindow: false,
    isHide: false,
  },
  // {
  //   label: 'AppStore',
  //   href: '/app-store',
  //   isNewWindow: false,
  //   isHide: false,
  // },
];

export const NAV_ITEMS_RIGHT: Array<NavItem> = [
  {
    label: '$BVM',
    href: '/bvm',
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
    label: 'Team',
    href: '/team',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'contact us',
    MenuItemEl: ContactUs
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
