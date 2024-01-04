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
    href: 'https://docs.trustless.computer',
    isNewWindow: true,
    isHide: false,
  },
  {
    label: 'Whitepapers',
    href: 'https://_blank',
    isNewWindow: true,
    isHide: false,
  },
  {
    label: 'Contact',
    href: 'https://twitter.com/bvmnetwork',
    isNewWindow: true,
    isHide: false,
  },
].filter((item) => !item.isHide);
