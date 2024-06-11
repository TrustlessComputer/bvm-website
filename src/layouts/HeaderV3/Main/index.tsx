import SvgInset from '@/components/SvgInset';
import { NavItem } from '@/layouts/Header/menuConfig';
import Link from 'next/link';
import s from './style.module.scss';
import Image from 'next/image';
import IconLogo from '../components/IcLogo';

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Chains',
    href: '',
    isNewWindow: false,
    isHide: false,
    subMenu: [
      {
        href: 'https://eternalai.org',
        label: 'Bitcoin L2 for AI',
        isNewWindow: true,
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
    label: 'Modules',
    href: '/module-store',
    isNewWindow: false,
    isHide: false,
  },
  {
    label: 'Research',
    href: '/use-bitcoin',
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
const Main = () => {
  return (
    <div className={`${s.wrapper}`}>
      <div className={`${s.inner} containerV3`}>
        <div className={s.logo}>
          <IconLogo />
          <h6 className={s.logo_text}>Bitcoin Virtual Machine</h6>
        </div>
        <div className={s.menu}>
          {NAV_ITEMS.map((item) => {
            return (
              <Link
                key={item.label}
                href={item.href ?? '#'}
                target={item.isNewWindow ? '_blank' : '_self'}
              >
                <p className={s.itemLabel}>{item.label}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Main;
