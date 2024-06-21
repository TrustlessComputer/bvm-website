import { ReactElement } from 'react';

interface DataSections {
  title: string;
  children: string;
  image: string;
  direction?: 'left' | 'right';
  button?: {
    link: string;
    title: string;
    target?: '_blank' | '_self' | '_top';
  };
}

export const HOME_DATA_SECTIONS: DataSections[] = [
  {
    title: 'Tailored to your needs',
    children: `Build faster on Bitcoin with all the best building blocks in the BVM Module Store. BVM provides a modular framework to tailor your ZK rollup to your app.`,
    image: '/bvm/home-top-thumbnail.jpg',
    // button: {
    //   link: '/module',
    //   title: 'Explore BVM Module Store'
    // }
  },
  {
    title: 'Easy to migrate from Ethereum',
    children: `BVM is EVM-equivalent. It allows developers to migrate dapps from Ethereum to Bitcoin with minimal or no modifications.`,
    image: '/bvm/home-section-2.jpg',
    button: {
      target: '_blank',
      link: 'https://docs.bvm.network/bvm',
      title: 'Migrate to Bitcoin',
    },
    direction: 'left',
  },
  {
    title: 'Be the first to build on Bitcoin',
    children: `Join the next-generation Bitcoin builders to upgrade Bitcoin beyond just a currency. Build DeFi, AI, DAOs, NFTs, payments, and gaming on Bitcoin.`,
    image: '/bvm/home-section-3.jpg',
    // button: {
    //   link: '/chains',
    //   title: 'Explore the all-new Bitcoin'
    // }
  },
];

export const DATA_BRAND = [
  {
    icon: '/bvm/brands/1.png',
    title: 'Polygon',
  },
  {
    icon: '/bvm/brands/2.png',
    title: 'Filecoin',
  }, {
    icon: '/bvm/brands/3.png',
    title: 'Bitcoin',
  },
  {
    icon: '/bvm/brands/4.png',
    title: 'zkSync',
  },
  {
    icon: '/bvm/brands/5.png',
    title: 'Bitcoin Stamps',
  },
  {
    icon: '/bvm/brands/6.png',
    title: 'Near',
  },
  {
    icon: '/bvm/brands/7.png',
    title: 'Celestia',
  },
  {
    icon: '/bvm/brands/8.png',
    title: 'Optimism',
  },
  {
    icon: '/bvm/brands/9.png',
    title: 'Eigen',
  },
  {
    icon: '/bvm/brands/10.png',
    title: 'Ordinals',
  },
];
