import { OPENSOURCE_SECTION } from '@/constants/home-content';

import {
  CDN_URL,
  CDN_URL_IMAGES_NBC,
  CDN_URL_VIDEOS,
  CDN_URL_VIDEOS_NBC,
} from '@/config';

export interface ILabItemContent {
  image: string;
  video?: string;
  title: string;
  content: string;
  link: string;
  disabled?: boolean;
  tags?: string[];
  date?: string;
}

export const Portfolio: ILabItemContent[] = [
  {
    image: `${CDN_URL_IMAGES_NBC}/apps/bitcoin-virtual-machine.jpeg`,
    title: 'Bitcoin Virtual Machine',
    content: 'A network of modular Bitcoin L2 blockchains',
    link: 'https://bvm.network',
    tags: ['Smart Contracts', 'Bitcoin L2'],
  },
  {
    image: `${CDN_URL_IMAGES_NBC}/apps/alpha.jpeg`,
    title: 'Alpha',
    content: 'A Bitcoin L2 blockchain for decentralized social',
    link: 'https://alpha.wtf/',
    tags: ['SocialFi', 'Bitcoin L2'],
  },
  {
    image: `${CDN_URL_IMAGES_NBC}/apps/nakaswap.jpeg`,
    title: 'Naka',
    content: 'A Bitcoin L2 blockchain for decentralized finance',
    link: 'https://nakaswap.org',
    disabled: false,
    tags: ['DeFi', 'Bitcoin L2'],
  },
  {
    image: `${CDN_URL_IMAGES_NBC}/apps/bitcoin-arcade.jpeg`,
    title: 'Arcade',
    content: 'A Bitcoin L2 blockchain for fully onchain gaming',
    link: 'https://bitcoinarcade.xyz',
    disabled: false,
    tags: ['GameFi', 'Bitcoin L2'],
  },
  // {
  //   image: `${CDN_URL_IMAGES_NBC}/apps/generative.jpeg`,
  //   title: 'Generative',
  //   content: 'A marketplace for arts and collectibles on Bitcoin',
  //   link: 'https://generative.xyz/',
  //   tags: ['Ordinals'],
  // },
  // {
  //   image: `${CDN_URL_IMAGES_NBC}/perceptrons-v5.jpeg`,
  //   title: 'Perceptrons',
  //   content: 'A portrait of fully onchain neural networks',
  //   link: 'https://generative.xyz/ai',
  //   tags: ['Ordinals', 'Art', 'AI'],
  // },
  {
    image: `${CDN_URL_IMAGES_NBC}/ai.png`,
    title: 'Eternal Ai',
    content: 'A Bitcoin L2 blockchain for decentralized Deep Learning',
    link: 'https://eternalai.org/',
    disabled: false,
    tags: ['AI', 'Bitcoin L2'],
  },
  // {
  //   image: `${CDN_URL_IMAGES_NBC}/modular-img.jpeg`,
  //   video: `${CDN_URL_VIDEOS_NBC}/dragon_2-compress.mp4`,
  //   title: 'Modular',
  //   content: 'Build whatever on Bitcoin',
  //   link: 'https://playmodular.com/',
  //   disabled: false,
  //   tags: ['Education', 'Bitcoin L2'],
  // },
  // {
  //   image: `${CDN_URL_IMAGES_NBC}/protect_v2.jpg`,
  //   title: 'Protect',
  //   content: 'A Bitcoin L2 blockchain for privacy',
  //   link: '#',
  //   disabled: false,
  //   tags: ['Privacy', 'Bitcoin L2'],
  // },
];

export const Modules: ILabItemContent[] = [
  {
    link: '',
    tags: ['Data Validity', 'Data Availability'],
    title: 'Ordinals',
    content:
      'Roll up to Bitcoin as Ordinals, ensuring the integrity and reliability of data stored on the blockchain.',
    image: '/modules/ordinals.jpg',
  },
  {
    tags: ['Data Validity'],
    link: 'https://twitter.com/Stampchain',
    // target: '_blank',
    title: 'Stamps',
    image: '/modules/stamps.png',
    content:
      "Roll up to Bitcoin as Stamps, ensuring perpetual storage that can't be altered or lost.",
  },
  {
    tags: ['Cross-chain bridges'],
    link: '',
    title: 'BRC-20',
    image: '/modules/brc-20.png',
    content:
      'Bridge BRC-20 tokens from the mainnet to Bitcoin L2s powered by BVM and vice versa.',
  },
  {
    link: 'https://twitter.com/0xPolygonEco',
    title: 'Polygon',
    // target: '_blank',
    image: '/modules/polygon.png',
    content:
      'Allow developers to store data hashes on Bitcoin and data on Polygon PoS, optimizing costs by 7,500x and enabling Bitcoin L2s with 2-sec block times and near-zero transaction fees.',
    tags: ['Data Availability'],
  },
  {
    tags: ['Data Availability'],
    link: 'https://twitter.com/filecoin',
    // target: '_blank',
    title: 'Filecoin',
    image: '/modules/filecoin.png',
    content:
      'By leveraging Filecoin’s decentralized storage, BVM can store transaction archives after they leave a DA layer, simplifying indexing for Bitcoin builders via Lighthouse Node Aggregators.',
  },
  {
    tags: ['Data Availability'],
    link: 'https://twitter.com/NEARProtocol',
    // target: '_blank',
    title: 'NEAR DA',
    image: '/modules/near-da.png',
    content:
      'Enable developers to store state roots on Bitcoin and transactions on Near, cutting costs by 10,000x and enabling Bitcoin L2s with 2-sec block times and near-zero fees.',
  },
  {
    tags: ['Data Availability'],
    link: 'https://twitter.com/CelestiaOrg',
    title: 'Celestia',
    // target: '_blank',
    image: '/modules/celestia.png',
    content:
      'Unlock massive scalability for Bitcoin by offering the DA solution for not only one, Rbut many Bitcoin L2s!',
  },
  {
    tags: ['Cross-chain bridges'],
    link: '',
    title: 'Ethereum',
    image: '/modules/ethereum.png',
    content:
      'Install a bridge for seamless asset transfers between Ethereum and Bitcoin L2s powered by BVM.',
  },
  {
    tags: ['Data Availability'],
    link: 'https://twitter.com/AvailProject',
    // target: '_blank',
    title: 'Avail',
    image: '/modules/avail.png',
    content:
      'Avail DA ensures fast and reliable data integrity, scaling rollups with cutting-edge KZG Polynomial commitments.',
  },
  {
    tags: ['Rollup protocol'],
    link: 'https://twitter.com/Optimism',
    title: 'Optimism',
    image: '/modules/optimism.png',
    content:
      'BVM uses the proven Optimism codebase to bring smart contract capabilities to Bitcoin, enabling high-speed, low-gas Bitcoin L2s.',
  },
  {
    tags: ['Rollup protocol'],
    link: 'https://twitter.com/zksync',
    // target: '_blank',
    title: 'ZK Sync',
    image: '/modules/zk-sync.png',
    content:
      'Opt for ZK Rollups to reduce block time to 1s, validate transactions with zero-knowledge proofs, avoid contest delays, and publish proofs on-chain.',
  },
  // {
  //   tags: ['dApps'],
  //   link: 'https://twitter.com/Uniswap',
  //   // target: '_blank',
  //   title: 'Uniswap',
  //   image: '/modules/uniswap.png',
  //   content:
  //     'Include a decentralized exchange (DEX) as a pre-installed component in your Layer 2 blockchain setup.',
  // },
  // {
  //   link: '',
  //   title: 'DAO',
  //   tags: ['dApps'],
  //   image: '/modules/dao.png',
  //   content:
  //     'Include a DAO as a pre-installed component in your layer 2 blockchain setup.',
  // },
  // {
  //   tags: ['dApps'],
  //   link: 'https://twitter.com/GMX_IO',
  //   // target: '_blank',
  //   title: 'GMX',
  //   image: '/modules/gmx.png',
  //   content:
  //     'Integrate a decentralized perpetual exchange as a pre-installed component  into your Bitcoin L2s.',
  // },
  {
    tags: ['Cross-chain bridges'],
    link: '',
    title: 'Bitcoin',
    image: '/modules/bitcoin.png',
    content:
      'Install a bridge for seamless asset transfers between Bitcoin and Bitcoin L2s powered by BVM.',
  },
  {
    tags: ['Data Availability'],
    link: 'https://twitter.com/eigen_da',
    // target: '_blank',
    title: 'Eigen DA',
    // backgroundImg: '',
    image: '/modules/eigenda.png',
    content: 'Provide low-cost, hyperscale data availability to rollups.',
  },
];

export const Research: ILabItemContent[] = [
  {
    image: `/bvm/zk-bvm.jpg`,
    title: 'zkBVM Light Nodes',
    content:
      'Validate that the state transitions of Bitcoin L2s, committed on the Bitcoin and DA layers, are accurate.',
    link: 'https://x.com/punk3700/status/1800132735807410681',
    date: 'Jun 10, 2024', //10/6/2024
  },
  {
    image: `/bvm/btc-l3.jpg`,
    title: 'ZK Bitcoin L3s',
    content: 'Decentralized virtual machines for any dapp',
    link: 'https://x.com/punk3700/status/1796119677577605380',
    date: 'May 30, 2024', //30/5/2024
  },
  {
    image: `/bvm/trbtc.jpg`,
    title: 'Trustless Bitcoin Bridge',
    content: 'Bridge BTC to Bitcoin L2s trustlessly',
    link: 'https://twitter.com/punk3700/status/1787868153181081794',
    date: 'May 7, 2024', //7/5/2024
  },
  {
    image: `/bvm/whitepagper.jpg`,
    title: 'Bitcoin Optimistic (BitOP)',
    content: 'Optimistic rollups on Bitcoin',
    link: 'https://bvm.network/whitepaper.pdf',
    date: 'Jan 15, 2024', //15/1/2024
  },
  {
    image: `${CDN_URL_IMAGES_NBC}/apps/bitcoin-virtual-machine.jpeg`,
    title: 'Recursive Rollups on Bitcoin',
    content: 'Scale Bitcoin indefinitely',
    link: 'https://twitter.com/punk3700/status/1703819001510682709',
    date: 'Sep 19, 2023', //19/9/2023
  },
  {
    image: `${CDN_URL_IMAGES_NBC}/apps/bitcoin-arcade.jpeg`,
    title: 'Fully Onchain Games',
    content: 'Unstoppable games',
    link: 'https://twitter.com/punk3700/status/1672259824191512576',
    date: 'Jun 23, 2023', //23/6/2023
  },
  {
    image: `${CDN_URL_IMAGES_NBC}/apps/smart-contracts.jpeg`,
    title: 'Bitcoin File System',
    content: 'Decentralized onchain storage system',
    link: 'https://twitter.com/punk3700/status/1669014135206731776',
    date: 'Jun 14, 2023', //14/6/2023
  },
  {
    image: `${CDN_URL_IMAGES_NBC}/apps/psbt.jpeg`,
    title: 'Smart Contracts for Bitcoin',
    content: 'Build unstoppable applications on Bitcoin',
    link: 'https://twitter.com/punk3700/status/1650524119136628736',
    date: 'Apr 24, 2023', //24/4/2023
  },
  {
    image: `${CDN_URL_IMAGES_NBC}/apps/metamask-for-bitcoin.jpeg`,
    title: 'MetaMask for Bitcoin',
    content: 'Use MetaMask to manage Ordinal Inscriptions',
    link: 'https://twitter.com/punk3700/status/1628424255171096577',
    date: 'Feb 22, 2023', //22/2/2023
  },
];

// export const OpenSource: ILabItemContent[] = [
//   {
//     image: `${CDN_URL_IMAGES_NBC}/apps/metamask-for-bitcoin.jpeg`,
//     title: 'MetaMask for Bitcoin',
//     content: 'Use MetaMask to manage Ordinal Inscriptions',
//     link: 'https://github.com/NewBitcoinLabs/metamask-for-bitcoin',
//   },
//   {
//     image: `${CDN_URL_IMAGES_NBC}/apps/psbt.jpeg`,
//     title: 'PSBT',
//     content: 'Sweep, buy, and sell Ordinal Inscriptions trustlessly',
//     link: 'https://github.com/NewBitcoinLabs/ord-inscriptions-sweep',
//   },
// ];

export const OpenSource: ILabItemContent[] = [
  {
    title: 'MetaMask for Bitcoin',
    content: `Use MetaMask to manage Ordinal Inscriptions.`,
    image: `${CDN_URL_IMAGES_NBC}/apps/metamask-for-bitcoin.jpeg`,
    link: 'https://github.com/NewBitcoinLabs/metamask-for-bitcoin',
  },
  {
    title: 'PSBT',
    content: `Sweep, buy, and sell Ordinal Inscriptions trustlessly.`,
    image: `${CDN_URL_IMAGES_NBC}/apps/psbt.jpeg`,
    link: 'https://github.com/NewBitcoinLabs/ord-inscriptions-sweep',
  },
  {
    title: 'Proof of Code',
    content: `Sharpen your Solidity coding skills and tackle practice problems.`,
    image: `${CDN_URL}/pages/landing-v4/home-PoC.png`,
    link: 'https://github.com/TrustlessComputer/poc-practice',
  },
  // {
  //   title: 'EternalAI',
  //   content: `Fully on-chain AI deployment.`,
  //   image: `${CDN_URL}/pages/landing-v4/home-ops-eai.png`,
  //   link:
  //    'https://github.com/eternalai-org/eternalai',
  //
  //
  // },
  {
    title: 'Light Node',
    content: `Run a Supersonic Light Node.`,
    image: `${CDN_URL}/pages/landing-v4/home-lightnode.png`,

    link: 'https://github.com/TrustlessComputer/lightnode',
  },
  {
    title: 'Light Node Website',
    content: `Display the batch details, including links to the zk proof and commitment data stored on Bitcoin and DA.`,
    image: `${CDN_URL}/pages/landing-v4/home-lightnode-website.png`,

    link: 'https://github.com/TrustlessComputer/lightnode-website',
  },
];
