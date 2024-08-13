import { CHAIN_DATA, DAPPS_DATA } from '../ExploreModule/data';
import { Research } from '../Lab/data';
import { CDN_URL, CDN_URL_IMAGES_NBC } from '@/config';
import { BLOGS } from '../landingV3/Componets/Section_7/constant';

export const APPS_SECTION = {
  tag: 'Apps and games. ',
  title: 'Experience Bitcoin like never before.',
  item: DAPPS_DATA,
};

export const ROLLUPS_SECTION = {
  tag: 'Rollups. ',
  title: `Explore chains backed by Bitcoin's security.`,
  item: CHAIN_DATA,
};

export const BOB_SECTION = {
  tag: 'Build on Bitcoin. ',
  title: 'Deploy rollups and build dapps on Bitcoin.',
  item: [
    {
      title: 'BVM Raas Studio',
      description: 'A fun way to customize your blockchain to meet your needs.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-studio.png`,
      link: {
        url: 'https://bvm.network/studio',
        target: '_blank',
      },
    },
    {
      title: 'Project Bitcoin Heartbeat',
      description:
        'A ZK rollup on BitcoiProvide transparent and verifiable insights into Bitcoin rollups.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-heartbeat.png`,
      link: {
        url: 'https://bvm.network/heartbeat',
        target: '_blank',
      },
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
        url: 'https://bvm.network/module/bitzk',
        target: '_blank',
      },
    },
    {
      title: 'BitOP',
      description:
        'ZOptimistic rollups on Bitcoin for virtually any decentralized applications.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-bitop.png`,
      link: {
        url: 'https://bvm.network/module/bitop',
        target: '_blank',
      },
    },
    {
      title: 'Celestia',
      description: 'A high-throughput DA verifiable with a light node.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-celestia.png`,
      link: {
        url: 'https://bvm.network/module/bitcoin-celestia',
        target: '_blank',
      },
    },
    {
      title: 'Eigen DA',
      description:
        'A scalable DA solution specialized in serving Ethereum rollups that leverage EigenLayer.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-eigen.png`,
      link: {
        url: 'https://bvm.network/module/bitcoin-eigen',
        target: '_blank',
      },
    },
    {
      title: 'Avail',
      description: 'Low-cost and expandable blobspace',
      homeImage: `${CDN_URL}/pages/landing-v4/home-avail.png`,
      link: {
        url: 'https://bvm.network/module/bitcoin-avail',
        target: '_blank',
      },
    },
    {
      title: 'Near DA',
      description: 'An efficient and robust data availability layer',
      homeImage: `${CDN_URL}/pages/landing-v4/home-near.png`,
      link: {
        url: 'https://bvm.network/module/bitcoin-near',
        target: '_blank',
      },
    },
    {
      title: 'Polygon',
      description: 'The most cost-effective storage solution',
      homeImage: `${CDN_URL}/pages/landing-v4/home-polygon.png`,
      link: {
        url: 'https://bvm.network/module/bitcoin-polygon',
        target: '_blank',
      },
    },
    {
      title: 'Filecoin',
      description:
        'The largest decentralized data storage marketplace, protocol, & cryptocurrency',
      homeImage: `${CDN_URL}/pages/landing-v4/home-filecoin.png`,
      link: {
        url: 'https://bvm.network/module/bitcoin-filecoin',
        target: '_blank',
      },
    },
    {
      title: 'Ordinals',
      description: 'Roll up to Bitcoin as Ordinal Inscriptions',
      homeImage: `${CDN_URL}/pages/landing-v4/home-ordinals.png`,
      link: {
        url: 'https://bvm.network/module-detail',
        target: '_blank',
      },
    },
    {
      title: 'Bitcoin Taproot',
      description: 'Embed proofs in Taproot transactions',
      homeImage: `${CDN_URL}/pages/landing-v4/home-taproot.png`,
      link: {
        url: 'https://bvm.network/module-detail',
        target: '_blank',
      },
    },
    {
      title: 'Bitcoin Stamps',
      description: `Record data directly on Bitcoin's UTXO, ensuring data permanence and immutability`,
      homeImage: `${CDN_URL}/pages/landing-v4/home-stamps.png`,
      link: {
        url: 'https://bvm.network/module-detail',
        target: '_blank',
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
    };
  }),
};
