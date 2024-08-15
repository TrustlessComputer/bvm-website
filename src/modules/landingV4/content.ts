import { CHAIN_DATA, DAPPS_DATA } from '../ExploreModule/data';
import { Research } from '../Lab/data';
import { CDN_URL, CDN_URL_IMAGES_NBC } from '@/config';
import { BLOGS } from '../landingV3/Componets/Section_7/constant';
import { id } from 'ethers/lib/utils';

export const APPS_SECTION = {
  id: 'apps',
  tag: 'Apps. ',
  title: 'Experience Bitcoin like never before.',
  item: DAPPS_DATA.filter((item) => {
    return (
      item.title !== 'Imagine' &&
      item.title !== 'Bitcoin Wars' &&
      item.title !== 'Runes.fun'
    );
  }),
};

export const GAME_SECTION = {
  id: 'games',
  tag: 'Games. ',
  title: 'Play incredibly fun games, fully on-chain.',
  item: [
    {
      title: 'Bitcoin Wars',
      description:
        'The first fully on-chain game built on a ZK Rollup on the Bitcoin network.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-bitcoinwar-org.png`,
      link: {
        url: '/bitcoin-wars',
        target: '',
      },
      tags: ['Bitcoin Wars'],
    },

    {
      title: 'Key Merge',
      description: 'Coming soon',
      homeImage: `${CDN_URL}/pages/landing-v4/home-keymerge.png`,
      link: {
        url: '',
        target: '_blank',
      },
      tags: ['Bitcoin Arcade'],
    },
    {
      title: 'Bitcoin 21',
      description: 'Coming soon',
      homeImage: `${CDN_URL}/pages/landing-v4/home-btc21.png`,
      link: {
        url: '',
        target: '_blank',
      },
      tags: ['Bitcoin Arcade'],
    },
    {
      title: 'Blast',
      description: 'Coming soon',
      homeImage: `${CDN_URL}/pages/landing-v4/home-blast.png`,
      link: {
        url: '',
        target: '_blank',
      },
      tags: ['Bitcoin Arcade'],
    },
    {
      title: 'Wombat',
      description: 'Coming soon',
      homeImage: `${CDN_URL}/pages/landing-v4/home-wombat.png`,
      link: {
        url: '',
        target: '_blank',
      },
      tags: ['Bitcoin Arcade'],
    },
    {
      title: 'Battleship',
      description: 'Coming soon',
      homeImage: `${CDN_URL}/pages/landing-v4/home-battleship.png`,
      link: {
        url: '',
        target: '_blank',
      },
      tags: ['Bitcoin Arcade'],
    },
    {
      title: 'Minesweepers',
      description: 'Coming soon',
      homeImage: `${CDN_URL}/pages/landing-v4/home-minesweeper.png`,
      link: {
        url: '',
        target: '_blank',
      },
      tags: ['Bitcoin Arcade'],
    },
  ],
};

export const ROLLUPS_SECTION = {
  id: 'rollups',
  tag: 'Rollups. ',
  title: `Explore chains backed by Bitcoin's security.`,
  item: CHAIN_DATA,
};

export const BOB_SECTION = {
  tag: 'Build on Bitcoin. ',
  title: 'Build with ease with the leading Bitcoin infrastructure.',
  item: [
    {
      title: 'BVM Raas Studio',
      description: 'A fun way to customize your blockchain to meet your needs.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-studio.png`,
      link: {
        url: '/studio',
        target: '_self',
      },
      tags: ['', 'Studio'],
    },
    {
      title: 'Project Bitcoin Heartbeat',
      description:
        'A ZK rollup on BitcoiProvide transparent and verifiable insights into Bitcoin rollups.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-heartbeat.png`,
      link: {
        url: '/heartbeats',
        target: '_self',
      },
      tags: ['', 'Analytics'],
    },
    {
      title: 'BitZK',
      description:
        'ZK rollups on Bitcoin for virtually any decentralized applications.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-bitzk-1.png`,
      link: {
        url: '/module/bitzk',
        target: '_self',
      },
      tags: ['', 'Rollups'],
    },
    {
      title: 'BitOP',
      description:
        'ZOptimistic rollups on Bitcoin for virtually any decentralized applications.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-bitop-1.png`,
      link: {
        url: '/module/bitop',
        target: '_self',
      },
      tags: ['', 'Rollups'],
    },
    {
      title: 'Bitcoin x Celestia',
      description: 'A high-throughput DA verifiable with a light node.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-celestia-1.png`,
      link: {
        url: '/module/bitcoin-celestia',
        target: '_self',
      },
      tags: ['', 'Rollups'],
    },
    {
      title: 'Bitcoin x Eigen DA',
      description:
        'A scalable DA solution specialized in serving Ethereum rollups that leverage EigenLayer.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-eigen-1.png`,
      link: {
        url: '/module/bitcoin-eigen',
        target: '_self',
      },
      tags: ['', 'DaTA Availability'],
    },
    {
      title: 'Bitcoin x Avail',
      description: 'Low-cost and expandable blobspace',
      homeImage: `${CDN_URL}/pages/landing-v4/home-avail-1.png`,
      link: {
        url: '/module/bitcoin-avail',
        target: '_self',
      },
      tags: ['', 'DaTA Availability'],
    },
    {
      title: 'Bitcoin x Near DA',
      description: 'An efficient and robust data availability layer',
      homeImage: `${CDN_URL}/pages/landing-v4/home-near-1.png`,
      link: {
        url: '/module/bitcoin-near',
        target: '_self',
      },
      tags: ['', 'DaTA Availability'],
    },
    {
      title: 'Bitcoin x Polygon',
      description: 'The most cost-effective storage solution',
      homeImage: `${CDN_URL}/pages/landing-v4/home-polygon-1.png`,
      link: {
        url: '/module/bitcoin-polygon',
        target: '_self',
      },
      tags: ['', 'DaTA Availability'],
    },
    {
      title: 'Bitcoin x Filecoin',
      description:
        'The largest decentralized data storage marketplace, protocol, & cryptocurrency',
      homeImage: `${CDN_URL}/pages/landing-v4/home-filecoin-1.png`,
      link: {
        url: '/module/bitcoin-filecoin',
        target: '_self',
      },
      tags: ['', 'DaTA Availability'],
    },
    {
      title: 'Ordinals',
      description: 'Roll up to Bitcoin as Ordinal Inscriptions',
      homeImage: `${CDN_URL}/pages/landing-v4/home-ordinals.png`,
      link: {
        url: '/module-detail',
        target: '_self',
      },
      tags: ['', 'Data validity'],
    },
    {
      title: 'Bitcoin Taproot',
      description: 'Embed proofs in Taproot transactions',
      homeImage: `${CDN_URL}/pages/landing-v4/home-taproot.png`,
      link: {
        url: '/module-detail',
        target: '_self',
      },
      tags: ['', 'Data validity'],
    },
    {
      title: 'Bitcoin Stamps',
      description: `Record data directly on Bitcoin's UTXO, ensuring data permanence and immutability`,
      homeImage: `${CDN_URL}/pages/landing-v4/home-stamps.png`,
      link: {
        url: '/module-detail',
        target: '_self',
      },
      tags: ['', 'Data validity'],
    },
  ],
};

export const PARTNER_SECTION = {
  tag: 'Partners. ',
  title: 'Work with the best tech.',
  item: [
    {
      title: 'BitZK',
      description:
        'ZK rollups on Bitcoin for virtually any decentralized applications.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-bitzk.png`,
      link: {
        url: '/module/bitzk',
        target: '',
      },
    },
    {
      title: 'BitOP',
      description:
        'Optimistic rollups on Bitcoin for virtually any decentralized applications.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-bitop.png`,
      link: {
        url: '/module/bitop',
        target: '',
      },
    },
    {
      title: 'Celestia',
      description: 'A high-throughput DA verifiable with a light node.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-celestia.png`,
      link: {
        url: '/module/bitcoin-celestia',
        target: '',
      },
    },
    {
      title: 'Eigen DA',
      description:
        'A scalable DA solution specialized in serving Ethereum rollups that leverage EigenLayer.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-eigen.png`,
      link: {
        url: '/module/bitcoin-eigen',
        target: '',
      },
    },
    {
      title: 'Avail',
      description: 'Low-cost and expandable blobspace',
      homeImage: `${CDN_URL}/pages/landing-v4/home-avail.png`,
      link: {
        url: '/module/bitcoin-avail',
        target: '',
      },
    },
    {
      title: 'Near DA',
      description: 'An efficient and robust data availability layer',
      homeImage: `${CDN_URL}/pages/landing-v4/home-near.png`,
      link: {
        url: '/module/bitcoin-near',
        target: '',
      },
    },
    {
      title: 'Polygon',
      description: 'The most cost-effective storage solution',
      homeImage: `${CDN_URL}/pages/landing-v4/home-polygon.png`,
      link: {
        url: '/module/bitcoin-polygon',
        target: '',
      },
    },
    {
      title: 'Filecoin',
      description:
        'The largest decentralized data storage marketplace, protocol, & cryptocurrency',
      homeImage: `${CDN_URL}/pages/landing-v4/home-filecoin.png`,
      link: {
        url: '/module/bitcoin-filecoin',
        target: '',
      },
    },
    {
      title: 'Ordinals',
      description: 'Roll up to Bitcoin as Ordinal Inscriptions',
      homeImage: `${CDN_URL}/pages/landing-v4/home-ordinals.png`,
      link: {
        url: '/module-detail',
        target: '',
      },
    },
    {
      title: 'Bitcoin Taproot',
      description: 'Embed proofs in Taproot transactions',
      homeImage: `${CDN_URL}/pages/landing-v4/home-taproot.png`,
      link: {
        url: '/module-detail',
        target: '',
      },
    },
    {
      title: 'Bitcoin Stamps',
      description: `Record data directly on Bitcoin's UTXO, ensuring data permanence and immutability`,
      homeImage: `${CDN_URL}/pages/landing-v4/home-stamps.png`,
      link: {
        url: '/module-detail',
        target: '',
      },
    },
  ],
};

export const RESEARCH_SECTION = {
  tag: 'Research. ',
  title: 'Pioneer research on Bitcoin utilities.',
  item: Research.map((item, idx) => {
    return {
      title: item.title,
      description: item.content,
      homeImage: item.image,
      link: {
        url: item.link,
        target: '_blank',
      },
    };
  }),
};

export const OPENSOURCE_SECTION = {
  tag: 'Open source. ',
  title: 'Reuse our code and build whatever you want.',
  item: [
    {
      title: 'MetaMask for Bitcoin',
      description: `Use MetaMask to manage Ordinal Inscriptions`,
      homeImage: `${CDN_URL_IMAGES_NBC}/apps/metamask-for-bitcoin.jpeg`,
      link: {
        url: 'https://github.com/NewBitcoinLabs/metamask-for-bitcoin',
        target: '_blank',
      },
    },
    {
      title: 'PSBT',
      description: `Sweep, buy, and sell Ordinal Inscriptions trustlessly`,
      homeImage: `${CDN_URL_IMAGES_NBC}/apps/psbt.jpeg`,
      link: {
        url: 'https://github.com/NewBitcoinLabs/ord-inscriptions-sweep',
        target: '_blank',
      },
    },
  ],
};

export const NEWS_SECTION = {
  id: 'news',
  tag: 'News. ',
  title: 'Follow our progress.',
  item: BLOGS.map((item, idx) => {
    return {
      title: item.title,
      description: item.desc,
      homeImage: item.imageUrl,
      link: {
        url: item.link,
        target: item.linkTarget,
      },
      logoUrl: item.logoUrl,
      logo: item.logo,
    };
  }),
};
