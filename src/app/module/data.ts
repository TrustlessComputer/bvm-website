export type IMODULE_HERO = {
  theme: string,
  title: string,
  subTitle: string,
  desc: string,
  start: {
    text: string,
    link: string
  }
}

export type IMODULE = {
  hero: IMODULE_HERO,
  why: {
    title: string,
    desc: string,
  },
  benefit: {
    title: string,
    contents: { title: string, desc: string }[],
  },
  hiw: {
    title: string,
    desc: string,
    action: string,
    thumbnail: string
  }
}

export const MODULE_DATAS = {
  zk_rollup: {

    hero: {
      theme: 'linear-gradient(180deg, rgba(174, 245, 255, 0.8) -5.57%, rgba(167, 255, 239, 0) 98.47%)',
      title: 'ZK rollups',
      subTitle: 'ROLLUP',
      desc: 'ZK rollups for virtually any decentralized applications.',
      start: {
        text: 'Get started',
        link: '/pricing',
      },
    },
    why: {
      title: 'Why ZK rollups?',
      desc: `BVM ZK is the first modular ZK rollup platform. It offers the broadest and deepest choices, with the latest data availability layers, hardware nodes, pre-installed apps, and pricing models to help you best match your app requirements.`,
    },
    benefit: {
      title: 'Benefits of ZK rollups',
      contents: [
        {
          title: '1-click deploy',
          desc: 'Our intuitive UI makes deploying and managing a ZK rollup simple.',
        },
        {
          title: 'Scale as your usage grows',
          desc: 'Optimize performance and cost with flexible plans. You could start with the Bootstrap plan and upgrade to the Growth as your app grows.',
        },
        {
          title: 'SLA commitment',
          desc: 'Access reliable, scalable infrastructure on demand. Scale capacity within minutes with an SLA commitment of 99.99% availability.',
        },
      ],
    },
    hiw: {
      title: 'How it works',
      desc: 'BVM lets you deploy your own ZK rollup with a few clicks and start building decentralized applications.',
      action: 'https://twitter.com/punk3700/status/1796119677577605380',
      thumbnail: '/bvm/hiw-bitzk.png',
    },
  },
  pptimistic_rollups: {
    hero: {
      theme: 'linear-gradient(180deg, rgba(255, 174, 174, 0.8) -5.57%, rgba(255, 174, 174, 0) 98.47%)',
      title: 'Optimistic rollups',
      subTitle: 'ROLLUP',
      desc: 'Optimistic rollups for virtually any decentralized applications.',
      start: {
        text: 'Get started',
        link: '/pricing',
      },
    },
    why: {
      title: 'Why Optimistic rollups?',
      desc: `Optimistic rollups increase its computation and storage capacity without sacrificing security or decentralization.`,
    },
    benefit: {
      title: 'Benefits of Optimistic rollups',
      contents: [
        {
          title: 'Smart Contract Capability',
          desc: 'Adds advanced smart contract functionality, enabling DeFi, dApps, and automated processes.',
        },
        {
          title: 'Enhanced Data Integration',
          desc: 'Seamlessly integrates various Data Availability (DA) Layers, allowing chain operators to choose their preferred DA Layer for higher throughput while maintaining stability and minimizing security and decentralization trade-offs.',
        },
        {
          title: 'Sustainably Low Costs',
          desc: 'Increases throughput and massively reduces data costs.',
        },
      ],
    },
    hiw: {
      title: 'How it works',
      desc: 'BVM lets you deploy your own Optimistic rollup with a few clicks and start building decentralized applications.',
      action: 'https://docs.bvm.network/bvm/more/optimistic-rollups-on-bitcoin',
      thumbnail: '/bvm/hiw-bitop-07.png',
    },
  },
  bvm_celestia: {
    hero: {
      theme: 'linear-gradient(180deg, rgba(253, 174, 255, 0.8) -5.57%, rgba(253, 174, 255, 0) 98.47%)',
      title: 'BVM Celestia',
      subTitle: 'DaTA Availability',
      desc: 'Use Celestia as the DA layer for your layer-2 blockchain.',
      start: {
        text: 'Get started',
        link: '/pricing',
      },
    },
    why: {
      title: 'Why Celestia?',
      desc: `Celestia provides high-throughput DA that can be verified easily with a light node.`,
    },
    benefit: {
      title: 'Benefits of Celestia',
      contents: [
        {
          title: 'Deploy fast',
          desc: 'Deploy your own customizable blockchain as easily as a smart contract.',
        },
        {
          title: 'Use any VM',
          desc: 'Transform nearly any virtual machine into your own sovereign chain.',
        },
        {
          title: 'Access abundant throughput',
          desc: 'Unlock dynamic throughput that scales with the number of users.',
        },
      ],
    },
    hiw: {
      title: 'How it works',
      desc: 'With Celestia underneath, a customizable blockchain becomes as easy to deploy as a smart contract.',
      action: 'https://x.com/BVMnetwork/status/1788585112076226936',
      thumbnail: '/bvm/hiw-bitcoin-celestia.png',
    },
  },
  bvm_avail: {
    hero: {
      theme: 'linear-gradient(180deg, rgba(174, 245, 255, 0.8) -5.57%, rgba(167, 255, 239, 0) 98.47%)',
      title: 'BVM Avail',
      subTitle: 'DaTA Availability',
      desc: 'Use Avail as the DA layer for your  layer-2 blockchain.',
      start: {
        text: 'Get started',
        link: '/pricing',
      },
    },
    why: {
      title: 'Why Avail?',
      desc: `Avail DA combines validity proofs with data availability sampling to enhance scalability, security, and interoperability for blockchain networks built on top. It provides low-cost and expandable blobspace.`,
    },
    benefit: {
      title: 'Benefits of Avail',
      contents: [
        {
          title: 'Cost-Efficient',
          desc: 'Securely transition data availability off-chain, significantly cutting costs, and boosting L2 scalability and efficiency.',
        },
        {
          title: 'Scalable',
          desc: 'Designed to scale as user activity increases, allowing higher throughput without sacrificing performance or reliability.',
        },
        {
          title: 'Efficient',
          desc: 'Spin up blockchains the way you want in minutes. Avail’s robust DA API lets sovereign rollups iterate fast without compromise.',
        },
      ],
    },
    hiw: {
      title: 'How it works',
      desc: 'Avail shifts data availability off-chain, reducing the burden on the mainnet, which leads to faster transaction confirmations and lower gas fees for users.',
      action: 'https://x.com/BVMnetwork/status/1793607975380349309',
      thumbnail: '/bvm/hiw-bitcoin-avail.png',
    },
  },


  bvm_polygon: {
    hero: {
      theme: 'linear-gradient(180deg, rgba(190, 169, 255, 0.8) -5.57%, rgba(190, 169, 255, 0) 98.47%)',
      title: 'BVM Polygon',
      subTitle: 'DaTA Availability',
      desc: 'Use Polygon as the DA layer for your layer-2 blockchain.',
      start: {
        text: 'Get started',
        link: '/pricing',
      },
    },
    why: {
      title: 'Why Polygon?',
      desc: `Polygon PoS enables the launch of L2s with high speed (2-sec block time) and near-zero transaction fees.`,
    },
    benefit: {
      title: 'Benefits of Polygon',
      contents: [
        {
          title: 'Reduced Gas Fees',
          desc: 'Allow developers to store the data hash on the mainnet and the data on Polygon PoS, optimizing costs by 7,500x',
        },
        {
          title: 'Scalability and Performance',
          desc: 'Enhance transaction speed and can be multiplied to achieve an elastically scalable ecosystem.',
        },
        {
          title: 'Independent data availability',
          desc: 'With a dedicated data availability layer and a data availability committee, Polygon provides robust off-chain data access and reliability. This structure ensures substantial data resilience and integrity.',
        },
      ],
    },
    hiw: {
      title: 'How it works',
      desc: 'Polygon PoS is the first Data Availability Layer for L2 blockchains powered by BVM and also the most cost-effective storage solution.',
      action: 'https://x.com/BVMnetwork/status/1745750669318144051',
      thumbnail: '/bvm/hiw-bitcoin-polygon.png',
    },
  },

  bvm_eigen: {
    hero: {
      theme: 'linear-gradient(180deg, rgba(214, 97, 255, 0.8) -5.57%, rgba(214, 97, 255, 0) 98.47%)',
      title: 'BVM Eigen',
      subTitle: 'DaTA Availability',
      desc: 'Use Eigen as the DA layer for your  layer-2 blockchain.',
      start: {
        text: 'Get started',
        link: '/pricing',
      },
    },
    why: {
      title: 'Why Eigen?',
      desc: `EigenDA offers the ability to scale linearly, increasing block size and decreasing block times without sacrificing security or decentralization.`,
    },
    benefit: {
      title: 'Benefits of Eigen',
      contents: [
        {
          title: 'Scalable',
          desc: 'EigenDA write throughput scales linearly with the number of operators, providing 10 MB/s of write throughput, which is 5x greater than the nearest competitor.',
        },
        {
          title: 'Secure',
          desc: 'EigenDA is decentralized, consisting of hundreds of operators in EigenLayer whose delegated stakes impose economic costs for misbehavior.',
        },
        {
          title: 'Dencentralized',
          desc: 'EigenDA avoids trust assumptions on another chain\'s light client, which can be compromised by dishonest validator sets.',
        },
      ],
    },
    hiw: {
      title: 'How it works',
      desc: 'EigenDA addresses data availability by using the mainnet for coordination while its operators handle data storage, eliminating the need for independent consensus. This approach allows linear scalability by moving data availability off-chain, processing only metadata and accountability on-chain, thus increasing throughput without compromising security or decentralization.',
      action: '',
      thumbnail: '',
    },
  },

  bvm_near: {
    hero: {
      theme: 'linear-gradient(180deg, rgba(219, 219, 219, 0.8) -5.57%, rgba(219, 219, 219, 0) 98.47%)',
      title: 'BVM Near',
      subTitle: 'DaTA Availability',
      desc: 'Use Near as the DA layer for your  layer-2 blockchain.',
      start: {
        text: 'Get started',
        link: '/pricing',
      },
    },
    why: {
      title: 'Why Near?',
      desc: `Leverage NEAR's DA for your L2s to publish transaction data on a blockchain with a proven trajectory of 100% uptime over its lifetime.`,
    },
    benefit: {
      title: 'Benefits of Near',
      contents: [
        {
          title: 'Drastically reduce your costs',
          desc: 'Near\'s DA allows developers to store the state root on the mainnet and the batch of transactions on Near, optimizing costs by 10,000x.',
        },
        {
          title: 'Easily validate proofs',
          desc: 'A trustless off-chain light client for NEAR provides easy access to validate that rollup data was stored on-chain.',
        },
        {
          title: 'Simple to interact with',
          desc: 'NEAR readily provides an RPC to easily retrieve the on-chain data from anywhere.',
        },
      ],
    },
    hiw: {
      title: 'How it works',
      desc: 'Near\'s DA facilitates the launch of L2s with high speed (2-sec block time) and near-zero transaction fees. Through Near\'s integration, dAppchains on BVM have the potential to optimize their operations with one of the most efficient DA layers, complemented by rollup fees subsidized by Near.',
      action: 'https://x.com/BVMnetwork/status/1750841776427221255',
      thumbnail: '',
    },
  },

  bvm_filecoin: {
    hero: {
      theme: 'linear-gradient(180deg, rgba(143, 208, 255, 0.8) -5.57%, rgba(143, 208, 255, 0) 98.47%)',
      title: 'BVM FileCoin',
      subTitle: 'DaTA Availability',
      desc: 'Use FileCoin as a storage layer for your  layer-2 blockchain via Lighthouse. ',
      start: {
        text: 'Get started',
        link: '/pricing',
      },
    },
    why: {
      title: 'Why FileCoin?',
      desc: `Filecoin is the largest decentralized data storage marketplace, protocol, & cryptocurrency.  `,
    },
    benefit: {
      title: 'Benefits of FileCoin',
      contents: [
        {
          title: 'Global open-source storage',
          desc: 'A network that’s built and owned by everyone.',
        },
        {
          title: 'Customized to your specific needs',
          desc: 'Tune strategies to suit your needs in redundancy, retrieval speed, and cost.',
        },
        {
          title: 'A developer’s playground',
          desc: 'A rapidly growing ecosystem of tools, libraries, integrations, and providers.',
        },
      ],
    },
    hiw: {
      title: 'How it works',
      desc: 'By leveraging Filecoin’s decentralized storage capabilities, BVM has the unique ability to store transaction archives after they fall out of a DA layer, making indexing easier for builders via the Lighthouse Node Aggregators.',
      action: 'https://x.com/BVMnetwork/status/1766043822486966576',
      thumbnail: '',
    },
  },
};
