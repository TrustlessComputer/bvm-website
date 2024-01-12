import React from 'react';
import img1 from '@/public/landing/images/scaleble_mobile_1.png';
import img2 from '@/public/landing/images/scaleble_mobile_2.png';
import img3 from '@/public/landing/images/scaleble_mobile_3.png';
import s from './styles.module.scss';
import ItemScaleableMobile from './ItemScaleableMobile';

const DATA_MOBILE = [
  {
    title: 'Welcome to the future of Bitcoin.',
    description:
      'If Ethereum is the world’s computer, Bitcoin is the world’s supercomputer. With Bitcoin Virtual Machine, anyone can launch their own Bitcoin L2 blockchain.',
    img: img1,
    bottomContent: 'Unlimited throughput',
    bg: '1A67E3',
    subContent:
      'Hyperscale Bitcoin with an unlimited number of Bitcoin Virtual Machines as Bitcoin L2 blockchains.',
  },
  {
    title: '',
    description: '',
    img: img2,
    bottomContent: 'Infinite applications',
    bg: '2AA848',
    subContent:
      'Bitcoin Virtual Machines support Solidity smart contracts on Bitcoin, so you can quickly build all kinds of decentralized applications on Bitcoin.',
  },
  {
    title: '',
    description: '',
    img: img3,
    bottomContent: 'Fast & cheap',
    bg: 'DD9910',
    subContent:
      'Bitcoin Virtual Machines implement rollups on Bitcoin. Rollups significantly reduce the block time and transaction fees.',
  },
];

export default function ScaleableMobile() {
  return (
    <div className={s.scalebleMobile}>
      {DATA_MOBILE.map((item, index) => {
        return <ItemScaleableMobile data={item} key={index} />;
      })}
    </div>
  );
}
