export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  isNewWindow?: boolean;
  href?: string;
  isHide?: boolean;
}

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Blockchains',
    href: '/blockchains/computers',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'Building Blocks',
    href: '/building-blocks',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'Developers',
    href: '/developers',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'Whitepapers',
    href: '/whitepapers',
    isNewWindow: false,
    isHide: false,
  },
].filter((item) => !item.isHide);
