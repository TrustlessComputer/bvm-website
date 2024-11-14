'use client';
import { CDN_URL, CDN_URL_IMAGES_NBC } from '@/config';
import { CHAIN_DATA, DAPPS_DATA } from '@/modules/ExploreModule/data';
import { Research } from '@/modules/Lab/data';
import { BLOGS } from '@/modules/landingV3/Componets/Section_7/constant';
import { Flex, Text } from '@chakra-ui/react';

export const ETERNAL_TITLE = 'Eternals';

export const ETERNAL_URL = 'https://eternalai.org/';

export const APPS_SECTION = {
  id: 'apps',
  tag: 'Launch your own Bitcoin L2 with Bitcoin Raas Studio. ',
  title: '',
  desc: 'Bitcoin RaaS Studio allows you to launch a Bitcoin L2 with a few clicks. Bitcoin L2s are Bitcoin L2s that enable smart contracts and dapps to use Bitcoin as the secure base layer. Bitcoin L2s extend the capabilities of Bitcoin without changing Bitcoin, unlocking trillions in capital.',
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
    <Flex alignItems={'center'} flexWrap={'wrap'} gap="8px">
      <p>AI on Bitcoin. </p>{' '}
      <Text color="#5B5B5B !important" fontWeight="500">
        Engage with the world’s first onchain AIs.
      </Text>
    </Flex>
  ),
  desc: <></>,
  item: [
    // {
    //   title: 'DAPP',
    //   description: 'Deploy your dapp on an existing Bitcoin L2.',
    //   homeImage: '/landing-v5/home-dapp.png',

    //   bgColor:
    //     'linear-gradient(227deg, #C488E0 -7.83%, #B93ECC 21.47%, #8E28A8 69.37%, #DF93EB 118.41%)',
    //   link: {
    //     url: 'https://docs.bvm.network/bvm/getting-started/deploy-your-own-bitcoin-dapp',
    //     target: '_blank',
    //   },
    //   tags: ['Free'],
    // },
    {
      title: ETERNAL_TITLE,
      description: 'Unstoppable onchain AI agents.',
      homeImage: '/landing-v7/home-eternal-2.png',
      // bgColor: 'linear-gradient(180deg, #0071BC 0%, #1797D5 40%, #61FFF7 100%)',
      link: {
        url: ETERNAL_URL,
        target: '_blank',
      },
      // popular: true,
      // tags: ['$39/day'],
    },
    {
      title: 'Onchain Llama 3.1 405B ',
      description: 'Chat for free. Permissionless.',
      homeImage: '/landing-v7/home-llama-3.png',
      link: {
        url: 'https://eternalai.org/agi',
        target: '_blank',
      },
      // tags: ['$149/day'],
    },

    // {
    //   title: 'SIDECHAIN (Coming soon)',
    //   description: 'Bitcoin L2 with OP_CAT enabled.',
    //   homeImage: '/landing-v5/home-sidechain-1.png',

    //   bgColor: 'linear-gradient(180deg, #0071BC 0%, #1797D5 40%, #61FFF7 100%)',
    //   link: {
    //     url: '',
    //     target: '_blank',
    //   },
    //   tags: ['From $499/month'],
    // },
    {
      title: 'Onchain FLUX.1 [dev]',
      description: 'Image generation for free. Censorship-resistant.',
      homeImage: '/landing-v7/home-flux-2.png',

      link: {
        url: 'https://eternalai.org/imagine',
        target: '_blank',
      },
      // tags: ['$199/day'],
    },
    {
      title: 'Perceptrons',
      description: 'The first onchain neural networks.',
      homeImage: '/landing-v7/home-perp-3.png',

      // bgColor:
      //   'linear-gradient(227deg, #FF8D97 -7.83%, #FF6366 21.47%, #E40004 69.37%, #FFDEDE 118.41%)',
      link: {
        url: 'https://eternalai.org/perceptrons',
        target: '_blank',
      },
      // tags: ['$69/day'],
    },

    // {
    //   title: 'SVM (Coming soon)',
    //   description: 'Bitcoin L2 powered by Solana VM.',
    //   homeImage: '/landing-v5/home-svm.png',

    //   bgColor:
    //     'linear-gradient(227deg, #AE71FF -7.83%, #9456FF 23.69%, #6610E6 67.99%, #ED68FB 100%)',
    //   link: {
    //     url: '',
    //     target: '_blank',
    //   },
    //   tags: ['From $99/month'],
    // },
    // {
    //   title: 'GPU ROLLUP (Coming soon)',
    //   description: 'Bitcoin L2 with GPU-accelerated VM.',
    //   homeImage: '/landing-v5/home-gpu.png',

    //   bgColor:
    //     'linear-gradient(227deg, #C488E0 -7.83%, #B93ECC 21.47%, #8E28A8 69.37%, #DF93EB 118.41%)',
    //   link: {
    //     url: '',
    //     target: '_blank',
    //   },
    //   tags: ['From $99/month'],
    // },
  ],
};

export const STEP_2_SECTION = {
  id: 'step-2',
  tag: '',
  title: (
    <Flex alignItems={'center'} flexWrap={'wrap'} gap="8px">
      <p>DeFi on Bitcoin.</p>
      <Text color="#5B5B5B !important" fontWeight="500">
        Enjoy trading spot and futures markets permissionlessly.
      </Text>
    </Flex>
  ),
  // desc: 'Get up and running instantly with pre-installed apps or easily add new ones from BVM Studio. Simply drag, drop, and enhance engagement, TVL, and more—no coding required.',
  item: [
    {
      title: 'Rune Dex',
      description: 'Buy & sell Bitcoin permisionlessly.',
      homeImage: '/landing-v7/home-rundex-2.png',
      link: {
        url: 'https://runechain.com/',
        target: '_blank',
      },
    },
    {
      title: 'NAKA Dex',
      description: 'Trade Bitcoin futures permisionlessly.',
      homeImage: '/landing-v7/home-naka-3.png',
      link: {
        url: 'https://nakachain.xyz/perpetual',
        target: '_blank',
      },
    },
  ],
};

export const GAME_SECTION = {
  id: 'games',
  tag: 'Games. ',
  title: (
    <Flex alignItems={'center'} flexWrap={'wrap'} gap="8px">
      <p>Games on Bitcoin.</p>
      <Text color="#5B5B5B !important" fontWeight="500">
        {' '}
        Have a blast with your friends.
      </Text>
    </Flex>
  ),
  // title: 'Play incredibly fun games, fully on-chain.',
  item: [
    {
      title: 'Bitcoin Wars',
      description:
        'The first fully onchain game built on a ZK Rollup on Bitcoin.',
      homeImage: `/landing-v7/home-bitcoinwar-5.png`,
      link: {
        url: '/bitcoin-wars',
        target: '_blank',
      },
      // tags: ['Bitcoin Wars'],
    },

    {
      title: 'Bitcoin ARCADE',
      description: 'Endless fun with onchain Bitcoin games.',
      homeImage: `/landing-v7/home-arcade-3.png`,
      link: {
        url: '',
        target: '_blank',
      },
      // tags: ['Bitcoin Arcade'],
    },
  ],
};

export const TOOLS_SECTION = {
  id: 'tools',
  tag: 'Tools. ',
  title: (
    <Flex alignItems={'center'} flexWrap={'wrap'} gap="8px">
      <p>Developer tools on Bitcoin.</p>
      <Text color="#5B5B5B !important" fontWeight="500">
        {' '}
        Unlock Bitcoin's potential beyond currency.
      </Text>
    </Flex>
  ),
  // title: 'Play incredibly fun games, fully on-chain.',
  item: [
    {
      title: 'BVM Studio',
      description: 'Customize your blockchain with drag-and-drop.',
      homeImage: `/landing-v7/home-studio-2.png`,
      link: {
        url: '/studio',
        target: '_blank',
      },
      // tags: ['Bitcoin Wars'],
    },

    {
      title: 'Heartbeats',
      description: 'Insights into Bitcoin chains.',
      homeImage: `/landing-v7/home-heartbeats-4.png`,
      link: {
        url: '/heartbeats',
        target: '_blank',
      },
      // tags: ['Bitcoin Arcade'],
    },
  ],
};

export const ART_SECTION = {
  id: 'art',
  tag: 'Art. ',
  title: (
    <Flex alignItems={'center'} flexWrap={'wrap'} gap="8px">
      <p>Art on Bitcoin.</p>
      <Text color="#5B5B5B !important" fontWeight="500">
        {' '}
        Experience fully onchain generative art on Bitcoin.
      </Text>
    </Flex>
  ),
  // title: 'Play incredibly fun games, fully on-chain.',
  item: [
    {
      title: 'Perceptrons',
      description: 'The first on-chain neural networks.',
      homeImage: `/landing-v7/home-perp-3.png`,
      link: {
        url: 'https://eternalai.org/perceptrons',
        target: '_blank',
      },
      // tags: ['Bitcoin Wars'],
    },

    {
      title: 'Timechain',
      description: 'The first long-form gen art collection.',
      homeImage: `/landing-v7/home-timechain-5.png`,

      link: {
        url: 'https://generative.xyz/generative/1000001',
        target: '_blank',
      },
      // tags: ['Bitcoin Arcade'],
    },
  ],
};

export const SOCIALFI_SECTION = {
  id: 'socialfi',
  tag: 'Socialfi. ',
  title: (
    <Flex alignItems={'center'} flexWrap={'wrap'} gap="8px">
      <p>SoFi on Bitcoin.</p>
      <Text color="#5B5B5B !important" fontWeight="500">
        A new way to interact with humans and AIs on Bitcoin.
      </Text>
    </Flex>
  ),
  // title: 'Play incredibly fun games, fully on-chain.',
  item: [
    {
      title: 'Alpha',
      description: 'The first social app on Bitcoin.',
      homeImage: `/landing-v7/home-alpha-2.png`,

      link: {
        url: 'https://alpha.wtf/',
        target: '_blank',
      },
    },

    {
      title: 'X AI Agents',
      description: 'Fully on-chain. Fully autonomous.',
      homeImage: `/landing-v7/home-eternal-2.png`,

      link: {
        url: ETERNAL_URL,
        target: '_blank',
      },
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

export const OPENSOURCE_SECTION = {
  id: 'opensource',
  tag: '',
  title: (
    <p>
      <span>Open source. </span>
    </p>
  ),
  desc: 'We believe our open-source projects will help transform Bitcoin into more than just a currency. Leverage our codebase to get started fast. Customize and build as you need.',
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

export const RESEARCH_SECTION = {
  id: 'research',
  tag: '',
  title: (
    <p>
      Fastest pace of{' '}
      <span className="whitespace-nowrap">applied research.</span>
    </p>
  ),
  desc: 'With BVM, you can experiment and innovate rapidly using the latest technologies. We’re constantly accelerating our innovation to create new ways of building on Bitcoin.',
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

export const NEWS_SECTION = {
  id: 'news',
  tag: '',
  title: (
    <p>
      <span>Follow our progress.</span>
    </p>
  ),

  desc: (
    <p>
      Stay updated on our latest developments.{' '}
      <a
        href="https://x.com/BVMnetwork"
        target="_blank"
        className="text-orange flex-link"
        rel="noreferrer"
      >
        Follow BVM on
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M12.6007 0.769531H15.054L9.694 6.8962L16 15.2315H11.0627L7.196 10.1755L2.77067 15.2315H0.316L6.04933 8.6782L0 0.770198H5.06267L8.558 5.39153L12.6007 0.769531ZM11.74 13.7635H13.0993L4.324 2.16086H2.86533L11.74 13.7635Z"
            fill="#FA4E0E"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M3.33317 12.666L12.6665 3.33268"
            stroke="#FA4E0E"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.6665 3.33398L12.6665 3.33398L12.6665 11.334"
            stroke="#FA4E0E"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
    </p>
  ),
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
