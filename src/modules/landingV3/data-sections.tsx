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
    title: 'A fully integrated suite of crypto and rollup products',
    subTitle: 'MODULAR SOLUTIONS',
    children: <div>
      <p> Leverage the BVM infrastructure to address all your rollup needs and invent new use cases on Bitcoin. Lower costs, expand your community, and optimize your rollup operations on a fully integrated rollup infrastructure.</p>
      <p>To make it all happen, we partner with some of the best crypto projects in the world.</p>
    </div>,
    image: '/images/legoModule.jpg',
    button: {
      link: BVM_STUDIO,
      title: 'BUILD YOUR ZK ROLLUP',
    },
  },
  {
    title: 'Launch, manage, and scale your rollup with ease',
    subTitle: 'ROLLUPS',
    children: <div>
      <p>No need to set up compute, storage, or hardware nodes—BVM handles it all. Start small at $99/month for a basic rollup and easily scale as your needs grow.</p>
    </div>,
    image: '/images/rollups.jpg',
    button: {
      link: BVM_STUDIO,
      title: 'BUILD YOUR ZK ROLLUP ',
    },
  },
  {
    title: '$99/month for a ZK rollup on Bitcoin',
    subTitle: 'NO CODE',
    children: <div>
      <p>Before BVM, building and scaling a blockchain required an army of PhDs, cryptographers, and distributed system
        engineers.
      </p>
      <p>Now, you can launch a ZK rollup blockchain, secured by Bitcoin, without writing a single line of code—all for just $99 monthly.
      </p>
    </div>,
    image: '/images/batches.jpg',
    button: {
      target: '_blank',
      link: BVM_STUDIO,
      title: 'BUILD YOUR ZK ROLLUP',
    },
  },
  {
    title: 'If you’ve deployed on Ethereum, you can easily deploy on Bitcoin.',
    subTitle: 'BUILD ON BITCOIN',

    children: <div>
      <p>Your ZK rollup on Bitcoin is EVM equivalent, enabling you to write Solidity smart contracts and build dapps on Bitcoin without learning a new toolkit. All your existing code and tools work seamlessly out of the box.</p>
    </div>,
    image: '/images/code.jpg',
    button: {
      link: 'https://docs.bvm.network/bvm',
      title: 'READ DEVELOPER DOCS',
    },
  },
  {
    title: 'Built by builders, for builders',
    subTitle: 'TEAM',
    children: <div>
      <p>Our team is full of developers who have been there and seen Bitcoin's scaling problems firsthand. Bitcoin's lack of scalability and programmability has been its hallmark.</p>
      <p>We want to fix that and help more developers build on Bitcoin. We believe Bitcoin could be generalized beyond just a currency.</p>
      <p>Oh, and we really like building things.</p>
    </div>,
    image: '/images/team.jpg',
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
