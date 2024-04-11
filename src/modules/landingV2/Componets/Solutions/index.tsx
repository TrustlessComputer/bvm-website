import React from 'react';
import s from './styles.module.scss';
import cn from 'classnames';
import SectionTitle from '../SectionTitle';
import CardExplore from '../Modules/CardExplore';

const DATA_SOLUTIONS = [
  {
    link: '/defi',
    color: '',
    title: 'Bitcoin l2 for DeFi',
    backgroundImg: '/landing-v2/images/card_v___1.jpg',
    decs: '2-second block time. $0.0001 transaction fee. 100% permissionless.',
    tags: [
      {
        subTitle: 'DeFi',
      },
    ],
  },
  {
    tags: [
      {
        subTitle: 'Gaming',
      },
    ],
    link: '/gamefi',
    color: '',
    title: 'Bitcoin l2 for GameFi',
    backgroundImg: '/landing-v2/images/card_v___2.jpg',
    decs: 'Experience unparalleled performance with high throughput, lightning-fast speeds, and low gas fees.',
  },
  {
    tags: [{ subTitle: 'Social' }],
    link: '/socialfi',
    color: '',
    title: 'Bitcoin l2 for SocialFi',
    backgroundImg: '/landing-v2/images/card_v___3.jpg',
    decs: 'Connect, engage and earn through personalized social experiences via chats, posts and community activities.',
  },
  {
    tags: [{ subTitle: 'AI' }],
    link: 'https://eternalai.org/',
    target: '_blank',
    color: '',
    title: 'Bitcoin l2 for AI',
    backgroundImg: '/landing-v2/images/card_v___4.jpg',
    decs: 'Powerful infrastructure, libraries, and tools to build eternal AI smart contracts.',
  },
  {
    tags: [{ subTitle: 'Payment & Commerece' }],
    link: '',
    color: '',
    title: 'Bitcoin l2 for Payments',
    backgroundImg: '/landing-v2/images/card_v___5.jpg',
    decs: 'Coming soon.',
  },
  {
    tags: [{ subTitle: 'Artists & Creator' }],
    link: '',
    color: '',
    title: 'Bitcoin l2 for Incriptions',
    backgroundImg: '/landing-v2/images/card_v___6.jpg',
    decs: 'Coming soon.',
  },
];

export default function Solutions() {
  return (
    <div className={cn(s.wrapper)}>
      <div className="container">
        <SectionTitle className={s.wrapper_title}>
          Explore our bitcoin l2 solutions
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
