import React from 'react';
import cn from 'classnames';
import s from './styles.module.scss';
import CategoryItem from './CategoryItem';

const DATA_CATEGORIES = [
  {
    leftTitle: 'Gamefi',
    midTitle: 'Blockchain for Gaming.',
    rightTitle: 'Bitcoin Arcade',
  },
  {
    leftTitle: 'DeFi',
    midTitle: 'Blockchain for Spot Dexs or Perpetual Dexs.',
    rightTitle: 'Naka Chain',
  },
  {
    leftTitle: 'AI',
    midTitle: 'Blockchain for on-chain AI.',
    rightTitle: 'Eternal AI',
  },
  {
    leftTitle: 'SocialFi',
    midTitle: 'Blockchain for social products.',
    rightTitle: 'Alpha',
  },
  {
    leftTitle: 'Lending protocols',
    midTitle: 'Blockchain protocols that enable borrowing and lending assets.',
    rightTitle: '',
  },
  {
    leftTitle: 'NFTFi',
    midTitle: 'Blockchain for NFT Collections, NFT trading.',
    rightTitle: '',
  },
  {
    leftTitle: 'Infrastructure',
    midTitle:
      'Blockchain for oracles, account abstraction, analytics tools and more.',
    rightTitle: '',
  },
  {
    leftTitle: 'Miscellaneous',
    midTitle: 'Surprise us!',
    rightTitle: '',
  },
];

export default function Categories() {
  return (
    <div className={cn(s.categories, 'container')}>
      <div className={s.categories_inner}>
        <div className={s.categories_heading}>
          <h3 className={s.categories_title}>Categories</h3>
          <p className={s.categories_desc}>
            BVM empowers you to build any Bitcoin Layer 2 across diverse
            categories. Explore featured categories below for inspiration.
          </p>
        </div>
        <div className={s.categories_content}>
          {DATA_CATEGORIES.map((item, index) => {
            return <CategoryItem data={item} index={index} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}
