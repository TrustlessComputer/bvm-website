import {ReactElement} from "react";

export type IRESOLUTION_HERO = {
  src: string,
  label?: string,
  subTitle: string,
  heading: string | ReactElement,
  btn1: {
    title: string,
    link: string
  },
  btn2?: {
    title: string,
    label: string,
    link: string,
    target: '_blank' | '_self',
  },
  isHadContact?: boolean
}

export type IRESOLUTION = {
  hero: IRESOLUTION_HERO,
  list: {
    title: string,
    contents: { title: string, desc: string }[],
  },
  why?: {
    title: string,
    content: string
  },
  case?: {
    icon: string,
    thumbnail: string
    heading: string | ReactElement,
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
      // label: 'Designed for Game builders',
      subTitle: 'ZK ROLLUP for GameFi',
      heading: <>Shape the Future of <span>Gaming on Bitcoin</span></>,
      btn1: {
        title: 'Create your own GameFi L2',
        link: '/rollups/customize',
      },
      // btn2: {
      //   title: 'Explore Bitcoin Arcade now',
      //   label: 'Need an example?',
      //   link: 'https://play.bitcoinarcade.xyz/',
      //   target: '_blank',
      // }
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
      subTitle: 'SOLUTION',
      heading: <>Specialized appchains <span>on Bitcoin</span></>,
      label: 'Appchains anyone can set up with just a few clicks.',
      btn1: {
        title: 'Get started',
        link: '/rollups/customize',
      },
      isHadContact: true
    },
    why: {
      title: 'Why appchains?',
      content: 'Appchains let you create a blockchain precisely for your application\'s needs. These specialized blockchains allow customization in various aspects, such as data availability layer and block size. Moreover, they inherit the security of Bitcoin.'
    },
    list: {
      title: 'Benefits of appchains',
      contents: [
        {
          title: 'Super-scaling',
          desc:
            "When you have your own appchain, you can rest assured with the dedicated throughput for your app, ensuring its smooth operation.",

        },
        {
          title: 'Customization',
          desc:
            'With BVM, you are free to modify the configuration of your appchain, including block size, latency, data availability, and more.',

        },
        {
          title: 'Cost efficiency',
          desc:
            'Appchains offer substantial cost reductions compared to L1s and L2s, making it economically feasible for indie devs and small teams to launch one.',
        },
      ],
    },
    hiw: {
      title: 'How it works',
      desc: 'BVM lets you launch your own Appchain on Bitcoin with just a few clicks and deploy your decentralized applications immediately. Appchains are designed as L3s on Bitcoin.',
      action: 'https://twitter.com/punk3700/status/1796119677577605380',
      thumbnail: '/images/appchains-hiw.jpeg',
    }
  },
  ecosystem: {
    hero: {
      src: '/ecosystems/hero.jpg',
      subTitle: 'SOLUTIONS',
      heading: 'General-purpose Bitcoin L2s and ecosystems',
      label: 'Bitcoin L2s anyone can set up with just a few clicks.',
      isHadContact: true,
      btn1: {
        title: 'Create your own Ecosystem',
        link: '/rollups/customize',
      },
    },
    why: {
      title: 'Why Bitcoin L2s?',
      content: 'Bitcoin L2s let you create a general-purpose blockchain backed by Bitcoin\'s security. These general-purpose blockchains allow customization in various aspects, such as the data availability layer, rollup method, and block size. Moreover, they inherit Bitcoin\'s security.',
    },
    list: {
      title: 'Benefits of Bitcoin L2s',
      contents: [
        {
          title: 'Super-scaling',
          desc:
            "When you have your own Bitcoin L2, you can rest assured of the dedicated throughput and lightning-fast transaction time for all the apps in your ecosystem, ensuring its smooth operation.",
        },
        {
          title: 'Customization',
          desc:
            'With BVM, you are free to modify the configuration of your Bitcoin L2, including block size, latency, data availability, and more.',
        },
        {
          title: 'Cost efficiency',
          desc:
            'Appchains offer substantial cost reductions compared to Bitcoin, making it economically feasible for you to launch one.',
        },
      ],
    },
    hiw: {
      title: 'How it works',
      desc: 'BVM lets you customize and launch your own Bitcoin L2 with just a few clicks and start building your own ecosystem.',
      action: 'https://twitter.com/punk3700/status/1703819001510682709',
      thumbnail: '/images/ecosystem-hiw.png',
    }
  },
};
