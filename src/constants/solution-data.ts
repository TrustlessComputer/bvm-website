export type IRESOLUTION_HERO = {
  src: string,
  label?: string,
  subTitle: string,
  heading: string,
  btn1: {
    title: string,
    link: string
  },
  btn2?: {
    title: string,
    label: string,
    link: string,
    target: '_blank' | '_self',
  }
}

export type IRESOLUTION = {
  hero: IRESOLUTION_HERO,
  list: {
    title: string,
    contents: { title: string, desc: string }[],
  },
  case?: {
    icon: string,
    thumbnail: string
    heading: string,
    title: string,
    desc: string,
    btn: {
      title: string,
      link: string,
      target: '_blank' | '_self',
    },
  }
  hiw?: {
    title: string,
    desc: string,
    action?: string,
    thumbnail?: string
  }
}

export const RESOLUTION_DATAS: Record<string, IRESOLUTION> = {
  gamefi: {
    hero: {
      src: '/gamefi/gamefiHero.png',
      label: 'Designed for Game builders',
      subTitle: 'Bitcoin L2 for GameFi',
      heading: 'ZK rollups for virtually any decentralized applications.',
      btn1: {
        title: 'Create your own GameFi L2',
        link: '/rollups/customize',
      },
      btn2: {
        title: 'Explore Bitcoin Arcade now',
        label: 'Need an example?',
        link: 'https://play.bitcoinarcade.xyz/',
        target: '_blank',
      }
    },
    list: {
      title: 'Learn what BVM products can do for you ',
      contents: [
        {
          title: 'Unlock unparalleled performance',
          desc: 'Experience lightning-fast 2-second block times and ultra-low gas fees (less than $0.001 per transaction).',
        },
        {
          title: 'Migrate games seamlessly',
          desc: 'Effortlessly transition existing games from EVM-compatible chains like Ethereum, BSC, or Fantom to your new Bitcoin L2 without the need for a new toolkit.',
        },
        {
          title: 'Enhance Scalability and Security',
          desc: 'Leverage optimistic rollup technology for massive scalability and Bitcoin-grade security.',
        },
      ],
    },
    case: {
      title: 'Case Study',
      heading: 'Ushering the new golden era of Gaming on Bitcoin',
      desc: 'The first ever Fully On-Chain blockchain on Bitcoin',
      icon: '/images/ic-gamefi-case.png',
      thumbnail: '/retro/imageRight.png',
      btn: {
        title: 'Explore Bitcoin Arcade now!',
        link: 'https://play.bitcoinarcade.xyz',
        target: '_blank',
      }
    },
  },
  defi: {
    hero: {
      src: '/defi/defi-hero.png',
      label: 'Unlocking Bitcoin\'s $250B treasury chest',
      subTitle: 'Bitcoin L2 for DeFi',
      heading: 'Making DeFi on Bitcoin possible and accessible to everyone',
      btn1: {
        title: 'Create your own DeFi L2',
        link: '/rollups/customize',
      },
      btn2: {
        title: 'Explore Nakachain now',
        label: 'Need an example?',
        link: 'https://nakachain.xyz',
        target: '_blank',
      }
    },
    list: {
      title: 'Learn what BVM products can do for you',
      contents: [
        {
          title: 'Enhance DeFi Efficiency',
          desc:
            "With a 2-second block time and transaction costs of less than $0.001, it is substantially faster and cheaper than Bitcoin's mainnet, providing great efficiency.",
        },
        {
          title: 'Zero effort to migrate from Ethereum',
          desc:
            'It enables developers to transfer dApps from Ethereum to Bitcoin with little or no change.',
        },
        {
          title: 'Flexible Gas Fee Options:',
          desc:
            'Enjoy the flexibility of paying gas fees in either Bitcoin or your native tokens.',
        },
      ],
    },
    case: {
      title: 'Case Study',
      heading: 'Making DeFi on Bitcoin possible and accessible to everyone',
      desc: '',
      icon: '/images/ic-defi-case.png',
      thumbnail: '/defi/case-study.png',
      btn: {
        title: 'Explore NakaChain now',
        link: 'https://nakachain.xyz',
        target: '_blank',
      }
    },
  },
  socialfi: {
    hero: {
      src: '/socialfi/socialFiHero.png',
      label: 'Optimized for content creators.',
      subTitle: 'Bitcoin L2 for SocialFi',
      heading: 'Connect, hang out, have fun, and earn.',
      btn1: {
        title: 'Create your own SocialFi L2',
        link: '/rollups/customize',
      },
      btn2: {
        title: 'Explore Alpha now! ',
        label: 'Need an example?',
        link: 'https://alpha.wtf/',
        target: '_blank',
      }
    },
    list: {
      title: 'Learn what BVM products can do for you',
      contents: [
        {
          title: 'Personalize your social experiences',
          desc:
            'Connect with others through chats, posts, and community activities',
        },
        {
          title: 'Integrate games for fun',
          desc:
            'Easily integrate games or other kinds of engaging activities with 2-second block time and low transaction fees (less than $0.001 per transaction)',
        },
        {
          title: 'Earn rewards along the way',
          desc:
            'Profit from referring more people to join, trading, and engaging in games and other activities.',
        },
      ],
    },
    case: {
      title: 'Case Study',
      heading: 'The first social app on Bitcoin',
      desc: '',
      icon: '/images/ic-social-case.png',
      thumbnail: '/socialfi/case-study.png',
      btn: {
        title: 'Explore Alpha now!',
        link: 'https://alpha.wtf/',
        target: '_blank',
      }
    },
  },
  appchains: {
    hero: {
      src: '/appChains/hero.jpg',
      subTitle: 'appchainS',
      heading: 'Build a customizable appchain aligned with your product roadmap',
      btn1: {
        title: 'Create your own Appchain',
        link: '/rollups/customize',
      },
    },
    list: {
      title: 'Learn what BVM products can do for you',
      contents: [
        {
          title: 'Independent Blockchain Network',
          desc:
            "Each appchain runs on its own blockchain, ensuring faster transactions and a stable environment free from unrelated congestion.",

        },
        {
          title: 'Customized Consensus Mechanisms',
          desc:
            'Implement consensus mechanisms best suited for specific applications, rather than relying on generic solutions.',

        },
        {
          title: 'Specialized Smart Contracts',
          desc:
            'Design smart contracts to meet the specific needs of the application, enhancing functionality and efficiency.',
        },
      ],
    },
    hiw: {
      title: 'How it works',
      desc: 'Choose a plan that fits your team’s needs and development stage. Configure your blockchain by selecting data storage, prover usage, block gas limit, withdrawal period, and pre-installed dapps.',
      action: 'https://x.com/punk3700/status/1796119677577605380'
    }
  },
  ecosystem: {
    hero: {
      src: '/ecosystems/hero.jpg',
      subTitle: 'ecosystemS',
      heading: 'Deploy a fully functional blockchain ecosystem',
      btn1: {
        title: 'Create your own Ecosystem',
        link: '/rollups/customize',
      },
    },
    list: {
      title: 'Learn what BVM products can do for you',
      contents: [
        {
          title: 'Customizable Functions',
          desc:
            "Tailor functions as needed, with all essential features installed right away, including token issuance, staking, bridges, and more.",
        },
        {
          title: 'Scalable Infrastructure',
          desc:
            'Achieve better resource management and scalability, accommodating growing user bases and increasing transaction volumes across a wide range of activities.',
        },
        {
          title: 'Optimized Performance',
          desc:
            'Fine-tune performance for specific use cases, enhancing efficiency and speeding up transaction processing.',
        },
      ],
    },
    hiw: {
      title: 'How it works',
      desc: 'You can select common dApps like bridges, DEXs, NFT marketplaces, or DAOs to come pre-installed on your blockchain ecosystem. This ensures your users have a production-ready platform to start using immediately.',
      action: 'https://x.com/punk3700/status/1796119677577605380'
    }
  },
};
