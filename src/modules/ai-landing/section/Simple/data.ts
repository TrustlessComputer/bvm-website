export type ISimpleData = {
  id: number;
  label: string;
  title: string;
  image: string;
  content: string;
  link: string;
};

export const SimpleData: ISimpleData[] = [
  {
    id: 0,
    label: 'NFT-721 & DAPPs',
    title: 'NFT-721 & DAPPs',
    image: '/ai-landing/6.png',
    content:
      "EternalAI innovates by tokenizing AI models as NFTs, revolutionizing AI ownership and trading. This approach grants creators full control of their work and ensures secure, transparent blockchain transactions. Unique NFT-represented AI models create a new marketplace focused on AI development, enhancing accessibility and innovation in the field.",
    link: '#',
  },
  {
    id: 1,
    label: 'SMART CONTRACT MODULE',
    title: 'Smart Contract Module: EternalAI Library',
    image: '/ai-landing/5.png',
    content:
      'EternalAI revolutionizes with a robust library module providing essential tools for seamless on-chain model deployment and inference. Its adaptable architecture accommodates diverse neural network types, facilitating the development of advanced dApps utilizing both existing and custom models. This expansion enriches the ecosystem, inviting broader innovation and application possibilities.',
    link: '#',
  },
  {
    id: 2,
    label: 'VIRTUAL MACHINE MODULE',
    title: 'Virtual Machine Module: EVM',
    image: '/ai-landing/4.png',
    content:
      "EternalAI is EVM-equivalent, meaning it supports the Solidity programming language, enabling developers to integrate neural networks and AI functionalities directly into their smart contracts.",
    link: '#',
  },
  {
    id: 3,
    label: 'ROLLUP MODULE',
    title: 'Rollup Strategy: Optimism',
    image: '/ai-landing/3.png',
    content:
      'EternalAI incorporates the battle-tested codebase of Optimism in its Rollup Strategy, enhancing the system’s efficiency and scalability. By adapting the Bitcoin Virtual Machine, EternalAI introduces an enhanced OP stack compatible with Bitcoin, thereby reinforcing the system’s robustness and functionality.',
    link: '#',
  },
  {
    id: 4,
    label: 'DATA AVAILABILITY MODULE',
    title: 'Data Availability Module: Near, Filecoin, Eigen and Avail',
    image: '/ai-landing/2.png',
    content:
      'EternalAI adopts a pragmatic approach by storing only transaction hashes on Bitcoin, with actual data on DA platforms like Near, Filecoin, Eigen, and Avail. This strategy leverages Bitcoin’s top-notch security and the cost efficiency of DA platforms, ensuring a balanced blend of security and economic feasibility.',
    link: '#',
  },
  {
    id: 5,
    label: 'DATA VALIDATION MODULE',
    title: 'Data Validation Module: Bitcoin',
    image: '/ai-landing/1.png',
    content:
      'At the core of EternalAI’s architecture lies the Data Validation Component, which establishes a secure, reliable, and decentralized foundation for the entire stack. This pivotal component is the bedrock from which all other elements of the stack are developed.',
    link: '#',
  },
];
