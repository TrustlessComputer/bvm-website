import { ReactElement, ReactNode } from 'react';
import { BVM_STUDIO } from '@constants/route-path';

interface DataSections {
  title: string;
  subTitle: string;
  children: string | ReactNode | ReactElement;
  image: string;
  direction?: 'left' | 'right';
  button?: {
    link: string;
    title: string;
    target?: '_blank' | '_self' | '_top';
  };
  button2?: {
    link: string;
    title: string;
    target?: '_blank' | '_self' | '_top';
  };
}

export const HOME_DATA_SECTIONS: DataSections[] = [
  {
    title: 'Pick your favorite building blocks',
    subTitle: 'STEP 1',
    children: <div>
      <p>BVM partners with the best crypto projects to create a fully integrated suite of rollup products. Need compute? Choose ZK. Need storage? Choose Avail DA. Need hardware? Choose an instance with 32 cores and 64 GB RAM.</p>
    </div>,
    image: '/images/legoModule.jpg',
    // button: {
    //   link: BVM_STUDIO,
    //   title: 'BUILD YOUR ZK ROLLUP',
    // },
  },
  {
    title: 'Assemble building blocks into a rollup',
    subTitle: 'STEP 2',
    children: <div>
      <p>Once you've selected the best building blocks for your rollup, assemble them into your unique rollup with simple drag-and-drop functionality.</p>
    </div>,
    image: '/images/rollups.jpg',
    // button: {
    //   link: BVM_STUDIO,
    //   title: 'BUILD YOUR ZK ROLLUP ',
    // },
  },
  {
    title: 'Deploy your rollup with just a click',
    subTitle: 'STEP 3',
    children: <div>
      <p>Before BVM, building and scaling a blockchain required an army of PhDs, cryptographers, and distributed system engineers. Now, you can deploy one with just a click — no coding needed.</p>
    </div>,
    image: '/images/home-section-3-v3.png',
    // button: {
    //   target: '_blank',
    //   link: BVM_STUDIO,
    //   title: 'BUILD YOUR ZK ROLLUP',
    // },
  },
  {
    title: 'Extend your rollup with more dapps',
    subTitle: 'STEP 4',

    children: <div>
      <p>If you’ve built dapps on Ethereum, you can easily build on Bitcoin. Your ZK rollup on Bitcoin is EVM-equivalent, allowing you to write Solidity smart contracts on Bitcoin without learning a new toolkit. All your existing code and tools work seamlessly out of the box.</p>
    </div>,
    image: '/images/code.jpg',
    // button: {
    //   link: 'https://docs.bvm.network/bvm',
    //   title: 'READ DEVELOPER DOCS',
    // },
  },

];

export const TEAM = {
  title: 'Built by builders, for builders',
  subTitle: 'TEAM',
  children: <div>
    <p>Our team is full of developers who have been there and seen Bitcoin's scaling problems firsthand. Bitcoin's lack of scalability and programmability has been its hallmark.</p>
    <p>We want to fix that and help more developers build on Bitcoin. We believe Bitcoin could be generalized beyond just a currency.</p>
    <p>Oh, and we really like building things.</p>
  </div>,
  image: '/images/team2.png',
  button: {
    link: '/research',
    title: 'Read our research',
  },
  button2: {
    link: '/team',
    title: 'Meet the team',
  },
};

export const DATA_BRAND = [
  {
    icon: '/lego/lego_polygon.png',
    title: 'Polygon',
  },
  {
    icon: '/lego/lego_filecoin.png',
    title: 'Filecoin',
  }, {
    icon: '/lego/lego_bitcoin.png',
    title: 'Bitcoin',
  },
  {
    icon: '/lego/lego_zkStack.png',
    title: 'ZK Stack',
  },
  {
    icon: '/lego/lego_avial.png',
    title: 'Avail DA',
  },
  {
    icon: '/lego/lego_nearDA.png',
    title: 'Near DA',
  },
  {
    icon: '/lego/lego_celestia.png',
    title: 'Celestia',
  },
  {
    icon: '/lego/lego_opstack.png',
    title: 'OP Stack',
  },
  {
    icon: '/lego/lego_eigenDA.png',
    title: 'Eigen DA',
  },
  {
    icon: '/lego/lego_ordinals.png',
    title: 'Ordinals',
  },
];
