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
