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
    href: '/tc',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'Building Blocks',
    href: '/tc',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'Developers',
    href: '/tc',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'Whitepapers',
    href: '/tc',
    isNewWindow: false,
    isHide: false,
  },
].filter((item) => !item.isHide);
