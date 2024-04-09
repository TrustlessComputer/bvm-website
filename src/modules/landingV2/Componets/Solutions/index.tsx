import React from 'react';
import s from './styles.module.scss';
import cn from 'classnames';
import SectionTitle from '../SectionTitle';
import CardExplore from '../Modules/CardExplore';

const DATA_SOLUTIONS = [
  {
    subTitle: 'DeFi',
    link: '/defi',
    color: '',
    title: 'Bitcoin l2 for defi',
    backgroundImg: '/landing-v2/images/card_1.jpg',
    decs: '2-second block time. $0.0001 transaction fee. 100% permissionless.',
  },
  {
    subTitle: 'Gaming',
    link: '/gamefi',
    color: '',
    title: 'Bitcoin l2 for gamefi',
    backgroundImg: '/landing-v2/images/card_2.jpg',
    decs: 'Experience unparalleled performance with high throughput, lightning-fast speeds, and low gas fees.',
  },
  {
    subTitle: 'Social',
    link: '/social',
    color: '',
    title: 'Bitcoin l2 for socialfi',
    backgroundImg: '/landing-v2/images/card_3.jpg',
    decs: 'Connect, engage and earn through personalized social experiences via chats, posts and community activities.',
  },
  {
    subTitle: 'AI',
    link: 'https://eternalai.org/',
    target: '_blank',
    color: '',
    title: 'Bitcoin l2 for ai',
    backgroundImg: '/landing-v2/images/card_4.jpg',
    decs: 'Powerful infrastructure, libraries, and tools to build eternal AI smart contracts.',
  },
  {
    subTitle: 'Payment & Commerece',
    link: '',
    color: '',
    title: 'Bitcoin l2 for payments',
    backgroundImg: '/landing-v2/images/card_5.jpg',
    decs: 'Coming soon.',
  },
  {
    subTitle: 'Artists & Creator',
    link: '',
    color: '',
    title: 'Bitcoin l2 for incriptions',
    backgroundImg: '/landing-v2/images/card_6.jpg',
    decs: 'Coming soon.',
  },
];

export default function Solutions() {
  return (
    <div className={cn(s.wrapper)}>
      <div className="container">
        <SectionTitle className={s.wrapper_title}>
          Explore our bitcoin l2 sulotions
        </SectionTitle>

        <div className={s.wrapper_list}>
          {DATA_SOLUTIONS.map((item, index) => {
            return <CardExplore {...item} type="solutions" key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}
