import React from 'react';
import s from './styles.module.scss';
import SectionTitle from '../SectionTitle';
import CardExplore from '../SectionTitle/CardExplore';
import cn from 'classnames';

const DATA_MODULES = [
  {
    subTitle: 'Rollup Framework',
    link: '',
    color: '7E7CFF',
    title: 'Optimism',
    backgroundImg: '',
    decs: 'Powerful infrastructure and tools to build and scale your own Bitcoin L2 with.',
    icon: '/landing-v2/svg/optimics.svg',
  },
  {
    subTitle: 'Cross-chain bridges',
    link: '',
    color: 'FE6420',
    title: 'Filecoin',
    backgroundImg: '',
    icon: '/landing-v2/svg/filecoin.svg',
    decs: 'Powerful infrastructure and tools to build and scale your own Bitcoin L2 with.',
  },
  {
    subTitle: 'AI Module',
    link: '',
    color: '66BCFF',
    title: 'Bitcoin Stamps',
    backgroundImg: '',
    icon: '/landing-v2/svg/stamp.svg',
    decs: 'Powerful infrastructure and tools to build and scale your own Bitcoin L2 with.',
  },
  {
    subTitle: 'Execution',
    link: '',
    color: '7EBD4E',
    title: 'Celestia',
    backgroundImg: '',
    icon: '/landing-v2/svg/celestia.svg',
    decs: 'Powerful infrastructure and tools to build and scale your own Bitcoin L2 with.',
  },
  {
    subTitle: 'Rollup Framework',
    link: '',
    color: '7E7CFF',
    title: 'Uniswap',
    backgroundImg: '',
    icon: '/landing-v2/svg/uniswap.svg',
    decs: 'Powerful infrastructure and tools to build and scale your own Bitcoin L2 with.',
  },
  {
    subTitle: 'Data Availability',
    link: '',
    color: 'FF0420',
    title: 'Ordinals',
    backgroundImg: '',
    icon: '/landing-v2/svg/ordinal.svg',
    decs: 'Powerful infrastructure and tools to build and scale your own Bitcoin L2 with.',
  },
];

export default function Modules() {
  return (
    <div className={cn(s.wrapper)}>
      <div className="container">
        <SectionTitle className={s.wrapper_title}>
          Explore our bitcoin modules
        </SectionTitle>

        <div className={s.wrapper_list}>
          {DATA_MODULES.map((item, index) => {
            return <CardExplore {...item} type="modules" key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}
