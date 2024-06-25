export const MODULE_DATAS = {
  bitzk: {

    hero: {
      theme: 'linear-gradient(180deg, rgba(174, 245, 255, 0.8) -5.57%, rgba(167, 255, 239, 0) 98.47%)',
      title: 'BitZK',
      subTitle: 'ROLLUP',
      desc: 'ZK rollups on Bitcoin for virtually any decentralized applications.',
      start: {
        text: 'Get started',
        link: '/pricing',
      },
    },
    why: {
      title: 'Why BitZK?',
      desc: `Bitcoin Zero Knowledge (BitZK) is the first modular ZK rollup platform on Bitcoin. It offers the broadest and deepest choices, with the latest data availability layers, hardware nodes, pre-installed apps, and pricing models to help you best match your app requirements.`
    },
    benefit: {
      title: 'Benefits of BitZK',
      contents: [
        {
          title: '1-click deploy',
          desc: 'Our intuitive UI makes deploying and managing a Bitcoin ZK rollup simple.',
        },
        {
          title: 'Scale as your usage grows',
          desc: 'Optimize performance and cost with flexible plans. You could start with the Bootstrap plan and upgrade to the Growth as your app grows.',
        },
        {
          title: 'SLA commitment',
          desc: 'Access reliable, scalable infrastructure on demand. Scale capacity within minutes with an SLA commitment of 99.99% availability.',
        }
      ]
    },
    hiw: {
      title: 'How it works',
      desc: 'BitZK lets you deploy your own ZK rollup on Bitcoin with a few clicks and start building decentralized applications for Bitcoin.',
      action: 'https://twitter.com/punk3700/status/1796119677577605380',
      thumbnail: '/bvm/hiw-bitzk.png',
    }
  },
  bitop: {
    hero: {
      theme: 'linear-gradient(180deg, rgba(255, 174, 174, 0.8) -5.57%, rgba(255, 174, 174, 0) 98.47%)',
      title: 'BitOP',
      subTitle: 'ROLLUP',
      desc: 'Optimistic rollups on Bitcoin increase its computation and storage capacity without sacrificing security or decentralization.',
    },
    why: {
      title: 'Why BitOP?',
      desc: `BVM is an EVM-equivalent and BitOP module allows developers to write and deploy smart contracts on Bitcoin. `
    },
    benefit: {
      title: 'Benefits of BitOP',
      contents: [
        {
          title: 'Smart Contract Capability',
          desc: 'Adds advanced smart contract functionality to Bitcoin, enabling DeFi, dApps, and automated processes.',
        },
        {
          title: 'Enhanced Data Integration',
          desc: 'Seamlessly integrates various Data Availability (DA) Layers, allowing chain operators to choose their preferred DA Layer for higher throughput while maintaining stability and minimizing security and decentralization trade-offs.',
        },
        {
          title: 'Sustainably Low Costs',
          desc: 'Increases throughput and massively reduces data costs.',
        }
      ]
    },
    hiw: {
      title: 'How it works',
      desc: 'BitOP lets you deploy your own Optimistic rollup on Bitcoin with a few clicks and start building decentralized applications for Bitcoin.',
      action: 'https://docs.bvm.network/bvm/more/optimistic-rollups-on-bitcoin',
      thumbnail: '/bvm/hiw-bitop-07.png',
    }
  },
  bitcoin_celestia: {
    hero: {
      theme: 'linear-gradient(180deg, rgba(174, 245, 255, 0.8) -5.57%, rgba(167, 255, 239, 0) 98.47%)',
      title: 'Bitcoin Celestia',
      subTitle: 'DaTA Availability',
      desc: 'Use Celestia as the DA layer for your Bitcoin L2.',
    },
    why: {
      title: 'Why Celestia?',
      desc: `Celestia provides high-throughput DA that can be verified easily with a light node.`
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
        }
      ]
    },
    hiw: {
      title: 'How it works',
      desc: 'With Celestia underneath, a customizable blockchain becomes as easy to deploy as a smart contract.',
      action: 'https://x.com/BVMnetwork/status/1788585112076226936',
      thumbnail: '/bvm/hiw-bitcoin-celestia.png',
    }
  },
  bitcoin_avail: {
    hero: {
      theme: 'linear-gradient(180deg, rgba(174, 245, 255, 0.8) -5.57%, rgba(167, 255, 239, 0) 98.47%)',
      title: 'Bitcoin Avail',
      subTitle: 'DaTA Availability',
      desc: 'Use Celestia as the DA layer for your Bitcoin L2.',
    },
    why: {
      title: 'Why Avail?',
      desc: `Avail DA combines validity proofs with data availability sampling to enhance scalability, security, and interoperability for blockchain networks built on top. It provides low-cost and expandable blobspace.`
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
        }
      ]
    },
    hiw: {
      title: 'How it works',
      desc: 'Avail shifts data availability off-chain, reducing the burden on the mainnet, which leads to faster transaction confirmations and lower gas fees for users.',
      action: 'https://x.com/BVMnetwork/status/1793607975380349309',
      thumbnail: '/bvm/hiw-bitcoin-avail.png',
    }
  }
}
