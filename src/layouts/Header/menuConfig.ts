export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  isHide?: boolean;
}

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Blockchains',
    children: [
      {
        label: 'Explore Design Work',
        subLabel: 'Trending Design to inspire you',
        href: '#',
      },
      {
        label: 'New & Noteworthy',
        subLabel: 'Up-and-coming Designers',
        href: '#',
      },
    ],
    isHide: false,
  },
  {
    label: 'Building Blocks',
    children: [
      {
        label: 'Job Board',
        subLabel: 'Find your dream design job',
        href: '#',
      },
      {
        label: 'Freelance Projects',
        subLabel: 'An exclusive list for contract work',
        href: '#',
      },
    ],
    isHide: false,
  },
  {
    label: 'Developers',
    href: '#',
    isHide: false,
  },
  {
    label: 'Whitepapers',
    href: '#',
    isHide: false,
  },
].filter((item) => !item.isHide);
