import { TDappCardProps } from '@/modules/ExploreModule/components/DappCard';
import { TChainCard } from '@/modules/ExploreModule/components/ChainCard';

export const DAPPS_DATA: Omit<TDappCardProps, 'idx'>[] = [
  {
    image: '/explore/dapp01.png',
    title: 'Imagine',
    description: 'Turn your thoughts into visuals directly on your phone in various styles!',
    bgColor: 'linear-gradient(0deg, #0071BC 0%, #1797D5 36%, #61FFF7 100%)',
    tags: [
      'EternalAI Chain',
      'Mobile',
      'L2',
      'Optimistic Rollup',
    ]
  },
  {
    image: '/explore/dapp2.png',
    title: 'Bitcoin Wars',
    description: 'The first fully on-chain game built on a ZK Rollup on the Bitcoin network.',
    bgColor: 'linear-gradient(0deg, #F15A24 0%, #F7931E 40%, #FBB03B 100%);',
    tags: [
      'Bitcoin Wars Chain',
      'Mobile',
      'L3',
      'ZK Rollup',
    ]
  },
  {
    image: '/explore/dapp3.png',
    title: 'RuneDex - Order book',
    bgColor: "linear-gradient(226.59deg, #FFC32A -7.83%, #F5E000 23.69%, #53B900 67.99%, #BDF710 100%)",
    description: 'Experience trading on a Dex with the same seamless experience as a Cex using an order book system.',
    tags: [
      'RuneChain',
      'Web',
      'L2',
      'Optimistic Rollup',
    ]
  },
  {
    image: '/explore/dapp4.png',
    title: 'NakaDex - AMM',
    bgColor: "linear-gradient(226.66deg, #FF8D97 -7.83%, #FF6366 21.47%, #E40004 69.37%, #FFDEDE 118.41%)",
    description: 'The first Dex on Bitcoin using an Automated Market Maker (AMM) approach.',
    tags: [
      'NakaChain',
      'Mobile',
      'L2',
      'Optimistic Rollup',
    ]
  },
]

export const CHAIN_DATA: Omit<TChainCard, 'idx'>[] = [
  {
    image: '/explore/octopus.jpg',
    title: 'Octopus Finance',
    description: 'The first L3 on Bitcoin and next level bridge that connects Bitcoin to EVM.',
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
      }
    ],
    tags: [
      'L3',
      'ZK Rollup',
    ]
  },
  {
    image: '/explore/StratoVM.jpg',
    title: 'StratoVM',
    description: 'Modular layer 2 on Bitcoin. Empowering the future of DeFi on Bitcoin.',
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
      }
    ],
    tags: [
      'L2',
      'Optimistic Rollup',
    ]
  },
  {
    image: '/explore/Satz_Labs.jpg',
    title: 'Satz Labs',
    description: 'A modular & trustless execution protocol on Bitcoin native chain.',
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
      }
    ],
    tags: [
      'L1',
      'ZK Rollup',
    ]
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
      }
    ],
    tags: [
      'L2',
      'ZK Rollup',
    ]
  },
  {
    image: '/explore/bloom.jpg',
    title: 'Bloom',
    description: 'A Bitcoin economic infrastructure designed to unlock your BTC with yield farming and restaking economy.',
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
      }
    ],
    tags: [
      'L2',
      'ZK Rollup',
    ]
  },
  {
    image: '/explore/xally.jpg',
    title: 'Xally Chain',
    description: 'Xally ecosystem simplifies AI application development by providing cutting-edge AI models and pre-built modules, making your ideas a reality.',
    social: [
      {
        icon: '/explore/x.svg',
        link: 'https://x.com/xallyai',
      },
      // {
      //   icon: '/explore/tele.svg',
      //   link: 'https://t.me/xallyai_chat',
      // },
      {
        icon: '/explore/web.svg',
        link: 'https://xally.ai/',
      }
    ],
    tags: [
      'L2',
      'ZK Rollup',
    ]
  },
  {
    image: '/explore/powd3r.jpg',
    title: 'POWD3R',
    description: 'The first and only Bitcoin mining offered on Bitcoin blockchain through a Web3-enabled Bitcoin Layer 2.',
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
      }
    ],
    tags: [
      'L2',
      'ZK Rollup',
    ]
  }
]
