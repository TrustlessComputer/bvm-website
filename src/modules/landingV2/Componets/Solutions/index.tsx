import React from 'react';
import s from './styles.module.scss';
import cn from 'classnames';
import SectionTitle from '../SectionTitle';
import CardExplore from '../Modules/CardExplore';

const DATA_SOLUTIONS = [
  {
    subTitle: 'DeFi',
    link: '',
    color: '',
    title: 'Bitcoin l2 for defi',
    backgroundImg: '/landing-v2/images/card_1.jpg',
    decs: 'Powerful infrastructure and tools to build and scale your own Bitcoin L2 with.',
  },
  {
    subTitle: 'Gaming',
    link: '',
    color: '',
    title: 'Bitcoin l2 for gamefi',
    backgroundImg: '/landing-v2/images/card_2.jpg',
    decs: 'Powerful infrastructure and tools to build and scale your own Bitcoin L2 with.',
  },
  {
    subTitle: 'Social',
    link: '',
    color: '',
    title: 'Bitcoin l2 for socialfi',
    backgroundImg: '/landing-v2/images/card_3.jpg',
    decs: 'Powerful infrastructure and tools to build and scale your own Bitcoin L2 with.',
  },
  {
    subTitle: 'AI',
    link: '',
    color: '',
    title: 'Bitcoin l2 for ai',
    backgroundImg: '/landing-v2/images/card_4.jpg',
    decs: 'Powerful infrastructure and tools to build and scale your own Bitcoin L2 with.',
  },
  {
    subTitle: 'Payment & Commerece',
    link: '',
    color: '',
    title: 'Bitcoin l2 for payments',
    backgroundImg: '/landing-v2/images/card_5.jpg',
    decs: 'Powerful infrastructure and tools to build and scale your own Bitcoin L2 with.',
  },
  {
    subTitle: 'Payment & Commerece',
    link: '',
    color: '',
    title: 'Bitcoin l2 for incriptions',
    backgroundImg: '/landing-v2/images/card_6.jpg',
    decs: 'Powerful infrastructure and tools to build and scale your own Bitcoin L2 with.',
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
          {DATA_SOLUTIONS.map((item) => {
            return <CardExplore {...item} type="solutions" />;
          })}
        </div>
      </div>
    </div>
  );
}
