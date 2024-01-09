import React from 'react';
import ItemChain from './ItemChain';
import s from './styles.module.scss';

import chain_1 from 'public/landing/images/chain_1.png';
import chain_2 from 'public/landing/images/chain_2.png';
import chain_3 from 'public/landing/images/chain_3.png';

const DATA_CHAINS = [
  {
    img: chain_1,
    title: 'Alpha Chain',
    stud: 1,
    data: [
      {
        left: 'Use Case',
        right: 'SocialFi',
        icon: '/landing/svg/lego_icon_rect.svg',
      },
      {
        left: 'Rollups',
        right: 'Optimistic, Sovereign',
        icon: '/landing/svg/lego_icon_rollup.svg',
      },
      {
        left: 'Data Validity',
        right: 'Bitcoin',
        icon: '/landing/svg/lego_icon_cube.svg',
      },
      {
        left: 'Data Availability',
        right: 'Polygon',
        icon: '/landing/svg/lego_icon_cube.svg',
      },
    ],

    bgTop: '35CCA6',
    bgBottom: '20A785',
  },
  {
    img: chain_2,
    title: 'Naka Chain',
    stud: 3,
    data: [
      {
        left: 'Use Case',
        right: 'DeFi',
        icon: '/landing/svg/lego_icon_rect.svg',
      },
      {
        left: 'Rollups',
        right: 'Optimistic, Sovereign',
        icon: '/landing/svg/lego_icon_rollup.svg',
      },
      {
        left: 'Data Validity',
        right: 'Bitcoin',
        icon: '/landing/svg/lego_icon_cube.svg',
      },
      {
        left: 'Data Availability',
        right: 'Polygon',
        icon: '/landing/svg/lego_icon_cube.svg',
      },
    ],
    bgTop: 'FFD73B',
    bgBottom: 'A07300',
  },
  {
    img: chain_3,
    title: 'AI Chain',
    stud: 2,
    data: [
      {
        left: 'Use Case',
        right: 'AI',
        icon: '/landing/svg/lego_icon_rect.svg',
      },
      {
        left: 'Rollups',
        right: 'Optimistic, Sovereign',
        icon: '/landing/svg/lego_icon_rollup.svg',
      },
      {
        left: 'Data Validity',
        right: 'Bitcoin',
        icon: '/landing/svg/lego_icon_cube.svg',
      },
      {
        left: 'Data Availability',
        right: 'Celestia',
        icon: '/landing/svg/lego_icon_cube.svg',
      },
    ],
    bgTop: '98DCF5',
    bgBottom: '007AC5',
  },
];

function Chain() {
  return (
    <div className={s.listChains}>
      {DATA_CHAINS.map((item) => {
        return <ItemChain key={item.title} data={item} />;
      })}
    </div>
  );
}

export default Chain;
