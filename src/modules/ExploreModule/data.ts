import { TDappCardProps } from '@/modules/ExploreModule/components/DappCard';
import { TChainCard } from '@/modules/ExploreModule/components/ChainCard';

export const DAPPS_DATA: Omit<TDappCardProps, 'idx'>[] = [
  {
    image: '/explore/dapp01.png',
    title: 'Imagine',
    description:
      'Turn your thoughts into visuals directly on your phone in various styles!',
    bgColor: 'linear-gradient(0deg, #0071BC 0%, #1797D5 36%, #61FFF7 100%)',
    tags: ['EternalAI Chain'],
    link: {
      url: 'https://eternalai.org/app',
      target: '_blank',
    },
  },
  {
    image: '/explore/dapp2.png',
    title: 'Bitcoin Wars',
    description:
      'The first fully on-chain game built on a ZK Rollup on the Bitcoin network.',
    bgColor: 'linear-gradient(0deg, #F15A24 0%, #F7931E 40%, #FBB03B 100%);',
    tags: ['Bitcoin Wars Chain'],
    link: { url: '/bitcoin-wars', target: '' },
  },
  {
    image: '/explore/dapp3.png',
    title: 'RuneDex - Order book',
    bgColor:
      'linear-gradient(226.59deg, #FFC32A -7.83%, #F5E000 23.69%, #53B900 67.99%, #BDF710 100%)',
    description:
      'Experience trading on a Dex with the same seamless experience as a Cex using an order book system.',
    tags: ['RuneChain'],
    link: {
      url: 'https://runechain.com/',
      target: '_blank',
    },
  },
  {
    image: '/explore/dapp4.png',
    title: 'NakaDex - AMM',
    bgColor:
      'linear-gradient(226.66deg, #FF8D97 -7.83%, #FF6366 21.47%, #E40004 69.37%, #FFDEDE 118.41%)',
    description:
      'The first Dex on Bitcoin using an Automated Market Maker (AMM) approach.',
    tags: ['NakaChain'],
    link: {
      url: 'https://nakachain.xyz/',
      target: '_blank',
    },
  },
  {
    image: '/explore/runfun.png',
    title: 'Runes.fun',
    bgColor:
      'linear-gradient(227deg, #FF9E71 -7.83%, #FFB656 23.69%, #F37100 67.99%, #FBA868 100%)',
    description:
      'Anyone can etch their own Runes as a fair launch with no premine and no team allocation.',
    tags: ['RuneChain'],
    link: {
      url: 'https://runes-fun.runechain.com',
      target: '_blank',
    },
  },
  {
    image: '/explore/alpha.png',
    title: 'Alpha',
    bgColor:
      'linear-gradient(227deg, #AE71FF -7.83%, #9456FF 23.69%, #6610E6 67.99%, #ED68FB 100%)',
    description:
      'The first social app on Bitcoin.<br/>$2.7M paid to creators as of today.',
    tags: ['AlphaChain'],
    link: {
      url: 'https://alpha.wtf',
      target: '_blank',
    },
  },
];

export const CHAIN_DATA: Omit<TChainCard, 'idx'>[] = [
  {
    image: '/explore/naka.png',
    title: 'Nakachain',
    description:
      'A powerful Bitcoin L2 for DeFi.<br/>2-second block time. $0.0001 transaction fee. 100% permissionless.',
    social: [
      {
        icon: '/explore/x.svg',
        link: 'https://x.com/naka_chain',
      },
      {
        icon: '/explore/web.svg',
        link: 'https://nakachain.xyz',
      },
    ],
    tags: ['L2', 'Optimistic Rollup'],
  },
  {
    image: '/explore/eternal2.png',
    title: 'Eternal AI',
    description:
      'The first Bitcoin L2 for fully on-chain AI, designed to preserve AI as censorship-resistant, tamper-proof, and permissionlessly accessible to every human.',
    social: [
      {
        icon: '/explore/x.svg',
        link: 'https://x.com/CryptoEternalAI',
      },
      {
        icon: '/explore/web.svg',
        link: 'https://eternalai.org',
      },
    ],
    tags: ['L2', 'Optimistic Rollup'],
  },
  {
    image: '/explore/rune.png',
    title: 'Runechain',
    description:
      'The Bitcoin L2 for Runes.<br/>Making Runes trading possible and easy for everyone.',
    social: [
      {
        icon: '/explore/x.svg',
        link: 'https://x.com/RuneChain_L2',
      },
      {
        icon: '/explore/web.svg',
        link: 'https://runechain.com',
      },
    ],
    tags: ['L2', 'Optimistic Rollup'],
  },
  {
    image: '/explore/alpha-app.png',
    title: 'Alpha',
    description:
      'The Bitcoin L2 allows you to customize your social app your way with features like chat, posts, image and story uploads.  ',
    social: [
      {
        icon: '/explore/x.svg',
        link: 'https://x.com/AlphaOnBitcoin',
      },
      {
        icon: '/explore/web.svg',
        link: 'https://alpha.wtf',
      },
    ],
    tags: ['L2', 'Optimistic Rollup'],
  },
  {
    image: '/explore/bitcoin-wars.png',
    title: 'Bitcoin Wars',
    description:
      'A ZK rollup on Bitcoin and EVM compatible. Every game state and logic was crafted as smart contracts in Solidity and deployed effortlessly with Hardhat.',
    social: [
      {
        icon: '/explore/x.svg',
        link: 'https://x.com/BVMnetwork',
      },
      {
        icon: '/explore/web.svg',
        link: 'https://bvm.network/bitcoin-wars',
      },
    ],
    tags: ['L#', 'ZK Rollup'],
  },
  {
    image: '/explore/powd3r.jpg',
    title: 'POWD3R',
    description:
      'The first and only Bitcoin mining offered on Bitcoin blockchain through a Web3-enabled Bitcoin Layer 2.',
    social: [
      {
        icon: '/explore/x.svg',
        link: 'https://x.com/POWD3R_io',
      },
      // {
      //   icon: '/explore/tele.svg',
      //   link: 'https://twitter.com/octopusfinance',
      // },
      {
        icon: '/explore/web.svg',
        link: 'https://powd3r.io/',
      },
    ],
    tags: ['L2', 'ZK Rollup'],
  },
  {
    image: '/explore/octopus.jpg',
    title: 'Octopus Finance',
    description:
      'The first L3 on Bitcoin and next level bridge that connects Bitcoin to EVM.',
    social: [
      {
        icon: '/explore/x.svg',
        link: 'https://x.com/octopusbridge_',
      },
      // {
      //   icon: '/explore/tele.svg',
      //   link: 'https://t.me/octopusbridge',
      // },
      {
        icon: '/explore/web.svg',
        link: 'https://octopusbridge.xyz/',
      },
    ],
    tags: ['L3', 'ZK Rollup'],
  },
  {
    image: '/explore/StratoVM.jpg',
    title: 'StratoVM',
    description:
      'Modular layer 2 on Bitcoin. Empowering the future of DeFi on Bitcoin.',
    social: [
      {
        icon: '/explore/x.svg',
        link: 'https://x.com/StratoVM_',
      },
      // {
      //   icon: '/explore/tele.svg',
      //   link: 'https://x.com/StratoVM_',
      // },
      {
        icon: '/explore/web.svg',
        link: 'https://stratovm.io/',
      },
    ],
    tags: ['L2', 'Optimistic Rollup'],
  },
  {
    image: '/explore/Satz_Labs.jpg',
    title: 'Satz Labs',
    description:
      'A modular & trustless execution protocol on Bitcoin native chain.',
    social: [
      {
        icon: '/explore/x.svg',
        link: 'https://x.com/satzlabs',
      },
      // {
      //   icon: '/explore/tele.svg',
      //   link: 'https://twitter.com/octopusfinance',
      // },
      {
        icon: '/explore/web.svg',
        link: 'https://www.satz.one/',
      },
    ],
    tags: ['L1', 'ZK Rollup'],
  },
  {
    image: '/explore/iron.jpg',
    title: 'Iron Chain Bank',
    description: 'The first DeFi protocol utilizing BRC-20 on Bitcoin Layer 2.',
    social: [
      {
        icon: '/explore/x.svg',
        link: 'https://x.com/ironchainbank',
      },
      // {
      //   icon: '/explore/tele.svg',
      //   link: 'https://t.me/ironchainbank_chat',
      // },
      {
        icon: '/explore/web.svg',
        link: 'https://ironchainbank.io/',
      },
    ],
    tags: ['L2', 'ZK Rollup'],
  },
  {
    image: '/explore/bloom.jpg',
    title: 'Bloom',
    description:
      'A Bitcoin economic infrastructure designed to unlock your BTC with yield farming and restaking economy.',
    social: [
      {
        icon: '/explore/x.svg',
        link: 'https://x.com/bloom_btc',
      },
      // {
      //   icon: '/explore/tele.svg',
      //   link: 'https://twitter.com/octopusfinance',
      // },
      {
        icon: '/explore/web.svg',
        link: 'https://www.bloom.foundation/',
      },
    ],
    tags: ['L2', 'ZK Rollup'],
  },
  // {
  //   image: '/explore/xally.jpg',
  //   title: 'Xally Chain',
  //   description:
  //     'Xally ecosystem simplifies AI application development by providing cutting-edge AI models and pre-built modules, making your ideas a reality.',
  //   social: [
  //     {
  //       icon: '/explore/x.svg',
  //       link: 'https://x.com/xallyai',
  //     },
  //     // {
  //     //   icon: '/explore/tele.svg',
  //     //   link: 'https://t.me/xallyai_chat',
  //     // },
  //     {
  //       icon: '/explore/web.svg',
  //       link: 'https://xally.ai/',
  //     },
  //   ],
  //   tags: ['L2', 'ZK Rollup'],
  // },
];
