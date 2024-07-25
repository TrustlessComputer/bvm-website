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
    title: 'A fully integrated suite of blockchain products',
    subTitle: 'MODULAR SOLUTIONS',
    children: <div>
      <p> Reduce costs, grow users, and run your app more efficiently on a fully integrated platform. You don't need to
        set up compute, storage, and hardware node. BVM handles everything.</p>
      <p> To make it all happen, we partner with some of the best crypto projects in the world.</p>
    </div>,
    image: '/images/home-block-1-v100.jpg',
    button: {
      link: BVM_STUDIO,
      title: 'Customize & launch your blockchain',
    },
  },
  {
    title: 'Learn blockchain. Dream blockchain. Developer blockchain.',
    subTitle: 'BUILD DECENTRALIZED APPS',
    children: <div>

      <p>Decentralized applications are unlike anything before them. They run exactly as programmed without any possibility of downtime, fraud, or interference — entirely trustless. They are written in a new programming language called Solidity.
      </p>

    </div>,
    image: '/bvm/home-section-2.jpg',
    button: {
      target: '_blank',
      link: 'https://docs.bvm.network/bvm',
      title: 'Read developer docs',
    },
    direction: 'left',
  },
  {
    title: '$99/mo for a fully managed blockchain',
    subTitle: 'PRICING',

    children: <div>
      <p>Before BVM, you need an army of PhDs, cryptographers, and distributed system engineers to build and scale a blockchain.</p>
      <p>Today, you can launch a blockchain backed by Bitcoin’s security with just a few clicks for $99 monthly.</p>
    </div>,
    image: '/images/home-pricing-v10.jpg',
    button: {
      link: '/pricing',
      title: 'View pricing',
    },
  },
  {
    title: 'Built by developers, for developers',
    subTitle: 'TEAM',
    children: <div>
      <p>Our team is full of developers who have been there and seen Bitcoin's scaling problems firsthand. Bitcoin's
        lack of scalability and programmability has been its hallmark. </p>
      <p>We want to fix that and help more developers build on Bitcoin. We believe Bitcoin could be generalized beyond
        just a currency.</p>
      <p>Oh, and we really like building things.</p>
    </div>,
    direction: 'left',
    image: '/bvm/home-team-v2.png',
    button: {
      link: '/research',
      title: 'Read our research',
    },
    button2: {
      link: '/team',
      title: 'Meet the team',
    },
  },
];

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
