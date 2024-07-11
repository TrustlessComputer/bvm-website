import React from 'react';
import s from './styles.module.scss';
import Image from 'next/image';

export const DATA_SIDEBAR = [
  {
    title: 'Network',
    icon: '/landingV3/images/logos/lego.png',
    isRequire: false,
    to: '#',
  },
  {
    title: 'Data Availability',
    icon: '/landingV3/images/logos/lego_1.png',

    isRequire: false,
    to: '#',
  },
  // {
  //   title: 'Storage',
  //   icon: '/landingV3/images/logos/lego_2.png',

  //   isRequire: false,
  //   to: '#',
  // },
  // {
  //   title: 'Settlement',
  //   icon: '/landingV3/images/logos/lego_3.png',

  //   isRequire: false,
  //   to: '#',
  // },
  // {
  //   title: 'System Apps',
  //   icon: '/landingV3/images/logos/lego_4.png',

  //   isRequire: false,
  //   to: '#',
  // },
  // {
  //   title: 'Bridge Apps',
  //   icon: '/landingV3/images/logos/lego_5.png',

  //   isRequire: false,
  //   to: '#',
  // },
  // {
  //   title: 'Wallet',
  //   icon: '/landingV3/images/logos/lego_6.png',

  //   isRequire: false,
  //   to: '#',
  // },
  // {
  //   title: 'DeFi',
  //   icon: '/landingV3/images/logos/lego_7.png',

  //   isRequire: false,
  //   to: '#',
  // },
  // {
  //   title: 'Degen Apps',
  //   icon: '/landingV3/images/logos/lego_8.png',

  //   isRequire: false,
  //   to: '#',
  // },
  // {
  //   title: 'Games',
  //   icon: '/landingV3/images/logos/lego_9.png',

  //   isRequire: false,
  //   to: '#',
  // },
  {
    title: 'Block gas limit',
    icon: '/landingV3/images/logos/lego_10.png',

    isRequire: false,
    to: '#',
  },
  {
    title: 'Withdrawal time',
    icon: '/landingV3/images/logos/lego_11.png',

    isRequire: false,
    to: '#',
  },
];

type SidebarProps = {
  items: IModelCategory[] | null;
};

export default function SideBar({ items }: SidebarProps) {
  return (
    <div className={s.sidebar}>
      <div className={s.inner}>
        {items &&
          items.map((item) => {
            return (
              <a href={`#${item.key}`} className={s.item} key={item.key}>
                <div className={s.item_inner}>
                  <Image
                    // src={item.icon}
                    src="/landingV3/images/logos/lego_11.png"
                    alt={item.title}
                    width={24}
                    height={24}
                  />
                  <div className={s.title}>
                    <h4>{item.title}</h4>
                  </div>
                </div>
              </a>
            );
          })}
        {/* {DATA_SIDEBAR.map((item) => {
          return (
            <div className={s.item} key={item.title}>
              <div className={s.item_inner}>
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={24}
                  height={24}
                />
                <div className={s.title}>
                  <h4>{item.title}</h4>
                </div>
              </div>
            </div>
          );
        })} */}
      </div>
    </div>
  );
}
