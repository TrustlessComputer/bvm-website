import {
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
  {
    image: `${CDN_URL_IMAGES_NBC}/apps/generative.jpeg`,
    title: 'Generative',
    content: 'A marketplace for arts and collectibles on Bitcoin',
    link: 'https://generative.xyz/',
    tags: ['Ordinals'],
  },
  {
    image: `${CDN_URL_IMAGES_NBC}/perceptrons-v5.jpeg`,
    title: 'Perceptrons',
    content: 'A portrait of fully onchain neural networks',
    link: 'https://generative.xyz/ai',
    tags: ['Ordinals', 'Art', 'AI'],
  },
  {
    image: `${CDN_URL_IMAGES_NBC}/ai.png`,
    title: 'Eternal Ai',
    content: 'A Bitcoin L2 blockchain for decentralized Deep Learning',
    link: 'https://eternalai.org/',
    disabled: false,
    tags: ['AI', 'Bitcoin L2'],
  },
  {
    image: `${CDN_URL_IMAGES_NBC}/modular-img.jpeg`,
    video: `${CDN_URL_VIDEOS_NBC}/dragon_2-compress.mp4`,
    title: 'Modular',
    content: 'Build whatever on Bitcoin',
    link: 'https://playmodular.com/',
    disabled: false,
    tags: ['Education', 'Bitcoin L2'],
  },
  {
    image: `${CDN_URL_IMAGES_NBC}/protect_v2.jpg`,
    title: 'Protect (STEALTH)',
    content: 'A Bitcoin L2 blockchain for privacy',
    link: '#',
    disabled: true,
    tags: ['Privacy', 'Bitcoin L2'],
  },
];

export const Modules: ILabItemContent[] = [
  {
    link: '',
    tags: [ 'Data Validity', 'Data Availability'],
    title: 'Ordinals',
    content: 'Roll up to Bitcoin as Ordinals, ensuring the integrity and reliability of data stored on the blockchain.',
    image: '/modules/ordinals.jpg',
  },
  {
    tags: ['Data Validity'],
    link: 'https://twitter.com/Stampchain',
    // target: '_blank',
    title: 'Stamps',
    image: '/modules/stamps.png',
    content: 'Roll up to Bitcoin as Stamps, ensuring perpetual storage that can\'t be altered or lost.',
  },
  {
    tags: ['Cross-chain bridges'],
    link: '',
    title: 'BRC-20',
    image: '/modules/brc-20.png',
    content: 'Bridge BRC-20 tokens from the mainnet to Bitcoin L2s powered by BVM and vice versa.',
  },
  {
    link: 'https://twitter.com/0xPolygonEco',
    title: 'Polygon',
    // target: '_blank',
    image: '/modules/polygon.png',
    content: 'Empowering builders to build anything on Bitcoin from DeFi, GameFi, to A.I.',
    tags: ['Data Availability'],
  },
  {
    tags: ['Data Availability'],
    link: 'https://twitter.com/filecoin',
    // target: '_blank',
    title: 'Filecoin',
    image: '/modules/filecoin.png',
    content: 'The largest decentralized data storage marketplace, protocol, & cryptocurrency.',
  },
  {
    tags: ['Data Availability'],
    link: 'https://twitter.com/NEARProtocol',
    // target: '_blank',
    title: 'NearDA',
    image: '/modules/near-da.png',
    content: 'Delivering on the promises of Web3, with Chain Abstraction.',
  },
  {
    tags: ['Data Availability' ],
    link: 'https://twitter.com/CelestiaOrg',
    title: 'Celestia',
    // target: '_blank',
    image: '/modules/celestia.png',
    content: 'Make it easy for anyone to securely launch their own blockchain.',
  },
  {
    tags: ['Cross-chain bridges'],
    link: '',
    title: 'Ethereum',
    image: '/modules/ethereum.png',
    content: 'Install a bridge for seamless asset transfers between Ethereum and Bitcoin L2s powered by BVM.',
  },
  {
    tags: ['Data Availability'],
    link: 'https://twitter.com/AvailProject',
    // target: '_blank',
    title: 'Avail',
    image: '/modules/avail.png',
    content: 'A powerful base layer for next generation trust-minimized applications.',
  },
  {
    tags: ['Rollup protocol'],
    link: 'https://twitter.com/Optimism',
    title: 'Optimism',
    image: '/modules/optimism.png',
    content: 'Optimistic Rollups allow transactions to be executed off-chain while still leveraging the security of the main chain.',
  },
  {
    tags: ['Rollup protocol'],
    link: 'https://twitter.com/zksync',
    // target: '_blank',
    title: 'ZK Sync',
    image: '/modules/zk-sync.png',
    content: 'Zero-Knowledge enables validity proofs to ensure the state can\'t be corrupted and invalid transactions can\'t exist.',
  },
  {
    tags: ['dApps'],
    link: 'https://twitter.com/Uniswap',
    // target: '_blank',
    title: 'Uniswap',
    image: '/modules/uniswap.png',
    content: 'Include a Dex as a pre-installed component in your layer 2 blockchain setup.',
  },
  {
    link: '',
    title: 'DAO',
    tags: ['dApps'],
    image: '/modules/dao.png',
    content: 'Include a DAO as a pre-installed component in your layer 2 blockchain setup.',
  },
  {
    tags: ['dApps'],
    link: 'https://twitter.com/GMX_IO',
    // target: '_blank',
    title: 'GMX',
    image: '/modules/gmx.png',
    content: 'Integrate a decentralized perpetual exchange as a pre-installed component  into your Bitcoin L2s.',
  },
  {
    tags: ['Cross-chain bridges' ],
    link: '',
    title: 'Bitcoin',
    image: '/modules/bitcoin.png',
    content: 'Install a bridge for seamless asset transfers between Bitcoin and Bitcoin L2s powered by BVM.',
  },
  {
    tags: ['Data Availability'],
    link: 'https://twitter.com/eigen_da',
    // target: '_blank',
    title: 'EigenDA',
    // backgroundImg: '',
    image: '/modules/eigenda.png',
    content: 'Provide low-cost, hyperscale data availability to rollups.',
  },
];

export const Research: ILabItemContent[] = [
  {
    image: `${CDN_URL_IMAGES_NBC}/apps/bitcoin-virtual-machine.jpeg`,
    title: 'Recursive Rollups on Bitcoin',
    content: 'Scale Bitcoin indefinitely',
    link: 'https://twitter.com/punk3700/status/1703819001510682709',
  },
  {
    image: `${CDN_URL_IMAGES_NBC}/apps/metamask-for-bitcoin.jpeg`,
    title: 'MetaMask for Bitcoin',
    content: 'Use MetaMask to manage Ordinal Inscriptions',
    link: 'https://twitter.com/punk3700/status/1628424255171096577',
  },
  {
    image: `${CDN_URL_IMAGES_NBC}/apps/psbt.jpeg`,
    title: 'Smart Contracts for Bitcoin',
    content: 'Build unstoppable applications on Bitcoin',
    link: 'https://twitter.com/punk3700/status/1650524119136628736',
  },
  {
    image: `${CDN_URL_IMAGES_NBC}/apps/smart-contracts.jpeg`,
    title: 'Bitcoin File System',
    content: 'Decentralized onchain storage system',
    link: 'https://twitter.com/punk3700/status/1669014135206731776',
  },
  {
    image: `${CDN_URL_IMAGES_NBC}/apps/bitcoin-arcade.jpeg`,
    title: 'Fully Onchain Games',
    content: 'Unstoppable games',
    link: 'https://twitter.com/punk3700/status/1672259824191512576',
  },
];
export const OpenSource: ILabItemContent[] = [
  {
    image: `${CDN_URL_IMAGES_NBC}/apps/metamask-for-bitcoin.jpeg`,
    title: 'MetaMask for Bitcoin',
    content: 'Use MetaMask to manage Ordinal Inscriptions',
    link: 'https://github.com/NewBitcoinLabs/metamask-for-bitcoin',
  },
  {
    image: `${CDN_URL_IMAGES_NBC}/apps/psbt.jpeg`,
    title: 'PSBT',
    content: 'Sweep, buy, and sell Ordinal Inscriptions trustlessly',
    link: 'https://github.com/NewBitcoinLabs/ord-inscriptions-sweep',
  },
];
