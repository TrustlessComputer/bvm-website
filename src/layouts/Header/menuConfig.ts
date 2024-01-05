import { DEVELOPERS_DOC_URL, WHITEPAPER_DOC_URL } from '@/config';

export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  isNewWindow?: boolean;
  href?: string;
  isHide?: boolean;
  isTwitter?: boolean;
}

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Bitcoin L2s',
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
    label: '$BVM',
    href: '/bvm',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'Developers',
    href: DEVELOPERS_DOC_URL,
    isNewWindow: true,
    isHide: false,
  },
  {
    label: 'Whitepaper',
    href: WHITEPAPER_DOC_URL,
    isNewWindow: true,
    isHide: false,
  },
  {
    label: 'Twitter',
    isTwitter: true,
    href: 'https://twitter.com/bvmnetwork',
    isNewWindow: true,
    isHide: false,
  },
].filter((item) => !item.isHide);
