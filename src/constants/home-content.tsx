import { CDN_URL, CDN_URL_IMAGES_NBC } from '@/config';
import { CHAIN_DATA, DAPPS_DATA } from '@/modules/ExploreModule/data';
import { Research } from '@/modules/Lab/data';
import { BLOGS } from '@/modules/landingV3/Componets/Section_7/constant';

export const APPS_SECTION = {
  id: 'apps',
  tag: 'Launch your own Bitcoin chain with Bitcoin Raas Studio. ',
  title: '',
  desc: 'Bitcoin RaaS Studio allows you to launch a Bitcoin chain with a few clicks. Bitcoin chains are Bitcoin L2s that enable smart contracts and dapps to use Bitcoin as the secure base layer. Bitcoin chains extend the capabilities of Bitcoin without changing Bitcoin, unlocking trillions in capital.',
  item: DAPPS_DATA.map((item, idx) => {
    const tags = item.tags.map((tag) => {
      if (tag.split(' ').length < 2) return tag;

      if (tag.toLowerCase().includes('chain')) {
        // remove 'chain' from the tag
        return tag.split(' ')[0];
      }
    });

    return {
      title: item.title,
      description: item.description,
      homeImage: item.homeImage,
      bgColor: item.bgColor,
      link: {
        url: item.link.url,
        target: '_blank',
      },
      tags: tags,
      image: item.image,
      id: item.id,
    };
  }),
};

export const STEP_1_SECTION = {
  id: 'step-1',
  tag: '',
  title: (
    <p>
      Launch your own Bitcoin chain with <span>BVM Studio.</span>
    </p>
  ),
  desc: 'BVM Studio lets you launch a Bitcoin chain with just a few clicks. These Bitcoin L2s enable smart contracts and dapps to use Bitcoin as the secure base layer, extending its capabilities without altering the core protocol, and unlocking trillions in capital.',
  item: [
    {
      title: 'ZK RollUp',
      description: 'Bitcoin L2 with the power of ZK Proofs',
      homeImage: '/landing-v5/home-zk.png',

      bgColor:
        'linear-gradient(227deg, #FFC32A -7.83%, #F5E000 23.69%, #53B900 67.99%, #BDF710 100%)',
      link: {
        url: '/',
        target: '_blank',
      },
      tags: ['From $99/month'],
    },
    {
      title: 'optimistic Rollup',
      description: 'Bitcoin L2 with optimistic scaling.',
      homeImage: '/landing-v5/home-op.png',

      bgColor:
        'linear-gradient(227deg, #FF8D97 -7.83%, #FF6366 21.47%, #E40004 69.37%, #FFDEDE 118.41%)',
      link: {
        url: '/',
        target: '_blank',
      },
      tags: ['From $999/month'],
    },
    {
      title: 'SIDECHAIN',
      description: 'Bitcoin L2 with OP_CAT enabled.',
      homeImage: '/landing-v5/home-sidechain.png',

      bgColor: 'linear-gradient(180deg, #0071BC 0%, #1797D5 40%, #61FFF7 100%)',
      link: {
        url: '/',
        target: '_blank',
      },
      tags: ['From $499/month'],
    },
    {
      title: 'MEtaProtocol',
      description: 'Bitcoin L1 smart contract metaprotocol.',
      homeImage: '/landing-v5/home-alpha.png',

      bgColor: 'linear-gradient(0deg, #F15A24 0%, #F7931E 40%, #FBB03B 100%)',
      link: {
        url: '/',
        target: '_blank',
      },
      tags: ['From $1,999/month'],
    },
    {
      title: 'SVM',
      description: 'Bitcoin L2 powered by Solana VM.',
      homeImage: '/landing-v5/home-alpha.png',

      bgColor:
        'linear-gradient(227deg, #AE71FF -7.83%, #9456FF 23.69%, #6610E6 67.99%, #ED68FB 100%)',
      link: {
        url: '/',
        target: '_blank',
      },
      tags: ['From $99/month'],
    },
  ],
};

export const STEP_2_SECTION = {
  id: 'step-2',
  tag: '',
  title: (
    <p>
      Level up your Bitcoin chain with <span>Bitcoin apps.</span>
    </p>
  ),
  desc: 'Not sure where to begin? Jumpstart your Bitcoin chain with pre-installed apps that cover a wide range of your needs. Just drag and drop to unlock tools that boost engagement, TVL, and more.',
  item: [
    {
      title: 'Token Issuance',
      description: 'Issue your own token with drag and drop.',
      homeImage: '/landing-v5/home-token-issue.png',
      bgColor:
        'linear-gradient(138deg, rgba(120, 170, 143, 0.40) 1.72%, rgba(2, 47, 22, 0.32) 101.88%)',
      link: {
        url: '/',
        target: '_blank',
      },
      tags: [''],
    },
    {
      title: 'YOLO',
      description: 'Have some fun with your users.',
      homeImage: '/landing-v5/home-yolo.png',
      bgColor:
        'linear-gradient(171deg, rgba(255, 212, 103, 0.40) 4.5%, rgba(106, 57, 0, 0.32) 94.43%)',
      link: {
        url: '/',
        target: '_blank',
      },
      tags: [''],
    },
    {
      title: 'STAKING',
      description: 'Boost TVL & offer community rewards.',
      homeImage: '/landing-v5/home-yolo.png',
      bgColor: 'linear-gradient(#2E2E2E, #2E2E2E)',
      link: {
        url: '/',
        target: '_blank',
      },
      tags: [''],
    },
    {
      title: 'Bridge',
      description: 'Bring more assets to your chain & enhance liquidity.',
      homeImage: '/landing-v5/home-bridge.png',
      bgColor:
        'linear-gradient(198deg, rgba(40, 142, 185, 0.40) 7.57%, rgba(0, 57, 75, 0.32) 105.99%)',
      link: {
        url: '/',
        target: '_blank',
      },
      tags: [''],
    },
    {
      title: 'EXPLORER',
      description: 'Your block explorer & analytics site.',
      homeImage: '/landing-v5/home-explorer.png',
      bgColor:
        'linear-gradient(138deg, rgba(179, 179, 179, 0.40) 1.72%, rgba(43, 43, 43, 0.32) 101.88%)',
      link: {
        url: '/',
        target: '_blank',
      },
      tags: [''],
    },
  ],
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
        target: '_blank',
      },
      tags: ['Bitcoin Wars'],
    },

    {
      title: 'Key Merge (Soon)',
      description:
        'Combine matching keys to unlock higher levels. Strategically merge keys to progress and reach the ultimate goal.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-keymerge.png`,
      link: {
        url: '',
        target: '_blank',
      },
      tags: ['Bitcoin Arcade'],
    },
    {
      title: 'Bitcoin 21 (Soon)',
      description:
        'A classic card game where the objective is to reach a total of 21. Play smart and calculate your moves to win big!',
      homeImage: `${CDN_URL}/pages/landing-v4/home-btc21.png`,
      link: {
        url: '',
        target: '_blank',
      },
      tags: ['Bitcoin Arcade'],
    },
    {
      title: 'Blast (Soon)',
      description:
        'Match and blast in this fast-paced puzzle game. Clear the board and create powerful combos to score high!',
      homeImage: `${CDN_URL}/pages/landing-v4/home-blast.png`,
      link: {
        url: '',
        target: '_blank',
      },
      tags: ['Bitcoin Arcade'],
    },
    {
      title: 'Wombat (Soon)',
      description:
        'Deploy your units smartly in lines to face off against your opponent. Strategize carefully to ensure your lineup dominates the battlefield!',
      homeImage: `${CDN_URL}/pages/landing-v4/home-wombat.png`,
      link: {
        url: '',
        target: '_blank',
      },
      tags: ['Bitcoin Arcade'],
    },
    {
      title: 'ZK Battleship Duel (Soon)',
      description: `Engage in naval warfare by strategically placing your ships and guessing the locations of your opponent's fleet. Sink all their ships before they sink yours!`,
      homeImage: `${CDN_URL}/pages/landing-v4/home-battleship.png`,
      link: {
        url: '',
        target: '_blank',
      },
      tags: ['Bitcoin Arcade'],
    },
    {
      title: 'Zero-Knowledge Mines (Soon)',
      description:
        'Test your logic in this classic puzzle game. Mark all the mines on the board without triggering any of them. One wrong move, and it’s game over!',
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
  item: CHAIN_DATA.map((item, idx) => ({
    ...item,
    description: item.description.replace(/<br\s*\/?>/gi, ''),
  })),
};

export const BOB_SECTION = {
  id: 'bob',
  tag: 'Build on Bitcoin. ',
  title: 'Build with ease with the leading Bitcoin infrastructure.',
  item: [
    {
      title: 'BVM RaaS Studio',
      description: 'A fun way to customize your blockchain to meet your needs.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-studio.png`,
      link: {
        url: '/studio',
        target: '_blank',
      },
      tags: ['', 'Studio'],
    },
    {
      title: 'Proof of Code',
      description:
        'Achieve victory, earn recognition, and unlock monetary rewards as you compete for glory.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-PoC.png`,
      link: {
        url: '/PoC',
        target: '_blank',
      },
      tags: ['', 'Competition'],
    },
    {
      title: 'BitZK',
      description:
        'ZK rollups on Bitcoin for virtually any decentralized applications.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-bitzk-1.png`,
      link: {
        url: '/module/bitzk',
        target: '_blank',
      },
      tags: ['', 'Rollups'],
    },
    {
      title: 'BitOP',
      description:
        'Optimistic rollups on Bitcoin for virtually any decentralized applications.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-bitop-1.png`,
      link: {
        url: '/module/bitop',
        target: '_blank',
      },
      tags: ['', 'Rollups'],
    },
    {
      title: 'Bitcoin x Celestia',
      description: 'A high-throughput DA verifiable with a light node.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-celestia-1.png`,
      link: {
        url: '/module/bitcoin-celestia',
        target: '_blank',
      },
      tags: ['', 'DaTA Availability'],
    },
    {
      title: 'Bitcoin x Eigen DA',
      description:
        'A scalable DA solution specialized in serving Ethereum rollups that leverage EigenLayer.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-eigen-1.png`,
      link: {
        url: '/module/bitcoin-eigen',
        target: '_blank',
      },
      tags: ['', 'DaTA Availability'],
    },
    {
      title: 'Bitcoin x Avail',
      description: 'Low-cost and expandable blobspace.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-avail-1.png`,
      link: {
        url: '/module/bitcoin-avail',
        target: '_blank',
      },
      tags: ['', 'DaTA Availability'],
    },
    {
      title: 'Bitcoin x Near DA',
      description: 'An efficient and robust data availability layer.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-near-1.png`,
      link: {
        url: '/module/bitcoin-near',
        target: '_blank',
      },
      tags: ['', 'DaTA Availability'],
    },
    {
      title: 'Bitcoin x Polygon',
      description: 'The most cost-effective storage solution.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-polygon-1.png`,
      link: {
        url: '/module/bitcoin-polygon',
        target: '_blank',
      },
      tags: ['', 'DaTA Availability'],
    },
    {
      title: 'Bitcoin x Filecoin',
      description:
        'The largest decentralized data storage marketplace, protocol, & cryptocurrency.',
      homeImage: `${CDN_URL}/pages/landing-v4/home-filecoin-1.png`,
      link: {
        url: '/module/bitcoin-filecoin',
        target: '_blank',
      },
      tags: ['', 'DaTA Availability'],
    },
    // {
    //   title: 'Ordinals',
    //   description: 'Roll up to Bitcoin as Ordinal Inscriptions',
    //   homeImage: `${CDN_URL}/pages/landing-v4/home-ordinals.png`,
    //   link: {
    //     url: '/module-detail',
    //     target: '_blank',
    //   },
    //   tags: ['', 'Data validity'],
    // },
    // {
    //   title: 'Bitcoin Taproot',
    //   description: 'Embed proofs in Taproot transactions',
    //   homeImage: `${CDN_URL}/pages/landing-v4/home-taproot.png`,
    //   link: {
    //     url: '/module-detail',
    //     target: '_blank',
    //   },
    //   tags: ['', 'Data validity'],
    // },
    // {
    //   title: 'Bitcoin Stamps',
    //   description: `Record data directly on Bitcoin's UTXO, ensuring data permanence and immutability`,
    //   homeImage: `${CDN_URL}/pages/landing-v4/home-stamps.png`,
    //   link: {
    //     url: '/module-detail',
    //     target: '_blank',
    //   },
    //   tags: ['', 'Data validity'],
    // },
  ],
};

// export const PARTNER_SECTION = {

//   tag: 'Partners. ',
//   title: 'Work with the best tech.',
//   item: [
//     {
//       title: 'BitZK',
//       description:
//         'ZK rollups on Bitcoin for virtually any decentralized applications.',
//       homeImage: `${CDN_URL}/pages/landing-v4/home-bitzk.png`,
//       link: {
//         url: '/module/bitzk',
//         target: '',
//       },
//     },
//     {
//       title: 'BitOP',
//       description:
//         'Optimistic rollups on Bitcoin for virtually any decentralized applications.',
//       homeImage: `${CDN_URL}/pages/landing-v4/home-bitop.png`,
//       link: {
//         url: '/module/bitop',
//         target: '',
//       },
//     },
//     {
//       title: 'Celestia',
//       description: 'A high-throughput DA verifiable with a light node.',
//       homeImage: `${CDN_URL}/pages/landing-v4/home-celestia.png`,
//       link: {
//         url: '/module/bitcoin-celestia',
//         target: '',
//       },
//     },
//     {
//       title: 'Eigen DA',
//       description:
//         'A scalable DA solution specialized in serving Ethereum rollups that leverage EigenLayer.',
//       homeImage: `${CDN_URL}/pages/landing-v4/home-eigen.png`,
//       link: {
//         url: '/module/bitcoin-eigen',
//         target: '',
//       },
//     },
//     {
//       title: 'Avail',
//       description: 'Low-cost and expandable blobspace',
//       homeImage: `${CDN_URL}/pages/landing-v4/home-avail.png`,
//       link: {
//         url: '/module/bitcoin-avail',
//         target: '',
//       },
//     },
//     {
//       title: 'Near DA',
//       description: 'An efficient and robust data availability layer',
//       homeImage: `${CDN_URL}/pages/landing-v4/home-near.png`,
//       link: {
//         url: '/module/bitcoin-near',
//         target: '',
//       },
//     },
//     {
//       title: 'Polygon',
//       description: 'The most cost-effective storage solution',
//       homeImage: `${CDN_URL}/pages/landing-v4/home-polygon.png`,
//       link: {
//         url: '/module/bitcoin-polygon',
//         target: '',
//       },
//     },
//     {
//       title: 'Filecoin',
//       description:
//         'The largest decentralized data storage marketplace, protocol, & cryptocurrency',
//       homeImage: `${CDN_URL}/pages/landing-v4/home-filecoin.png`,
//       link: {
//         url: '/module/bitcoin-filecoin',
//         target: '',
//       },
//     },
//     {
//       title: 'Ordinals',
//       description: 'Roll up to Bitcoin as Ordinal Inscriptions',
//       homeImage: `${CDN_URL}/pages/landing-v4/home-ordinals.png`,
//       link: {
//         url: '/module-detail',
//         target: '',
//       },
//     },
//     {
//       title: 'Bitcoin Taproot',
//       description: 'Embed proofs in Taproot transactions',
//       homeImage: `${CDN_URL}/pages/landing-v4/home-taproot.png`,
//       link: {
//         url: '/module-detail',
//         target: '',
//       },
//     },
//     {
//       title: 'Bitcoin Stamps',
//       description: `Record data directly on Bitcoin's UTXO, ensuring data permanence and immutability`,
//       homeImage: `${CDN_URL}/pages/landing-v4/home-stamps.png`,
//       link: {
//         url: '/module-detail',
//         target: '',
//       },
//     },
//   ],
// };

export const RESEARCH_SECTION = {
  id: 'research',
  tag: '',
  title: (
    <p>
      Research.
      <br />
      <span className="whitespace-nowrap">
        Pioneer research on Bitcoin utilities.
      </span>
    </p>
  ),
  desc: 'Lead the way in exploring and developing innovative uses for Bitcoin.',
  item: Research.map((item, idx) => {
    return {
      title: item.title,
      description: item.content,
      homeImage: item.image,
      link: {
        url: item.link,
        target: '_blank',
      },
      date: item.date,
    };
  }),
};

export const OPENSOURCE_SECTION = {
  id: 'opensource',
  tag: '',
  title: (
    <p>
      Open source.
      <br />
      <span>
        Reuse our code and build <br /> whatever you want.
      </span>
    </p>
  ),
  desc: 'Use our existing codebase to accelerate your development process. Customize, innovate, and develop anything you want while saving time and resources.',
  item: [
    {
      title: 'MetaMask for Bitcoin',
      description: `Use MetaMask to manage Ordinal Inscriptions.`,
      homeImage: `${CDN_URL_IMAGES_NBC}/apps/metamask-for-bitcoin.jpeg`,
      link: {
        url: 'https://github.com/NewBitcoinLabs/metamask-for-bitcoin',
        target: '_blank',
      },
    },
    {
      title: 'PSBT',
      description: `Sweep, buy, and sell Ordinal Inscriptions trustlessly.`,
      homeImage: `${CDN_URL_IMAGES_NBC}/apps/psbt.jpeg`,
      link: {
        url: 'https://github.com/NewBitcoinLabs/ord-inscriptions-sweep',
        target: '_blank',
      },
    },
    {
      title: 'Proof of Code',
      description: `Sharpen your Solidity coding skills and tackle practice problems.`,
      homeImage: `${CDN_URL}/pages/landing-v4/home-PoC.png`,
      link: {
        url: 'https://github.com/TrustlessComputer/poc-practice',
        target: '_blank',
      },
    },
    // {
    //   title: 'EternalAI',
    //   description: `Fully on-chain AI deployment.`,
    //   homeImage: `${CDN_URL}/pages/landing-v4/home-ops-eai.png`,
    //   link: {
    //     url: 'https://github.com/eternalai-org/eternalai',
    //     target: '_blank',
    //   },
    // },
    {
      title: 'Light Node',
      description: `Run a Supersonic Light Node.`,
      homeImage: `${CDN_URL}/pages/landing-v4/home-lightnode.png`,

      link: {
        url: 'https://github.com/TrustlessComputer/lightnode',
        target: '_blank',
      },
    },
    {
      title: 'Light Node Website',
      description: `Display the batch details, including links to the zk proof and commitment data stored on Bitcoin and DA.`,
      homeImage: `${CDN_URL}/pages/landing-v4/home-lightnode-website.png`,

      link: {
        url: 'https://github.com/TrustlessComputer/lightnode-website',
        target: '_blank',
      },
    },
  ],
};

export const NEWS_SECTION = {
  id: 'news',
  tag: '',
  title: (
    <p>
      News.
      <br />
      <span>Follow our progress.</span>
    </p>
  ),

  desc: 'Stay informed with the latest updates and developments from our ecosystem. Get the inside scoop on breakthroughs, features, and more.',
  item: BLOGS.map((item, idx) => {
    return {
      title: item.title,
      description: item.desc,
      homeImage: item.imageUrl,
      link: {
        url: item.link,
        target: item.linkTarget,
      },
      //   logoUrl: item?.logoUrl,
      logo: item.logo,
    };
  }),
};

export const TECH_STACKS = [
  {
    title: 'ZKsync',
    logo: '/landing-v5/ic-zkSync.svg',
    link: {
      url: '/module/bitzk',
      target: '',
    },
  },
  {
    title: 'OP Stack',
    logo: '/landing-v5/ic-bitop.svg',
    link: {
      url: '/module/bitop',
      target: '',
    },
  },
  {
    title: 'Celestia',
    logo: '/landing-v5/ic-celestia.svg',
    link: {
      url: '/module/bitcoin-celestia',
      target: '',
    },
  },
  {
    title: 'Eigen',
    logo: '/landing-v5/ic-eigen.svg',
    link: {
      url: '/module/bitcoin-eigen',
      target: '',
    },
  },
  {
    title: 'Avail',
    logo: '/landing-v5/ic-avail.svg',
    link: {
      url: '/module/bitcoin-avail',
      target: '',
    },
  },
  {
    title: 'Near',
    logo: '/landing-v5/ic-near.svg',
    link: {
      url: '/module/bitcoin-near',
      target: '',
    },
  },
  {
    title: 'Polygon',
    logo: '/landing-v5/ic-polygon.svg',
    link: {
      url: '/module/bitcoin-polygon',
      target: '',
    },
  },
  {
    title: 'Filecoin',
    logo: '/landing-v5/ic-filecoin.svg',
    link: {
      url: '/module/bitcoin-filecoin',
      target: '',
    },
  },
  {
    title: 'Ordinal',
    logo: '/landing-v5/ic-ordinal.svg',
    link: {
      url: '',
      target: '',
    },
  },
  {
    title: 'Bitcoin Taproot',
    logo: '/landing-v5/ic-taproot.svg',
    link: {
      url: '',
      target: '',
    },
  },
];
