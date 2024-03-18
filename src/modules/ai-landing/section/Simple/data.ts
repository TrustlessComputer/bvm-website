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
    label: 'TOKENIZED AI MODELS',
    title: 'TOKENIZED AI MODELS',
    image: '/ai-landing/6.png',
    content:
      'BVM lets you tokenize your AI models as NFTs, enabling AI ownership and AI trading.',
    link: '#',
  },
  {
    id: 1,
    label: 'BVM AI CONTRACTS LIBRARY',
    title: 'BVM AI CONTRACTS LIBRARY',
    image: '/ai-landing/5.png',
    content:
      'BVM provides developers with a powerful smart contracts library to build and deploy fully onchain AI models.',
    link: '#',
  },
  {
    id: 2,
    label: 'BITCOIN VIRTUAL MACHINE',
    title: 'BITCOIN VIRTUAL MACHINE',
    image: '/ai-landing/4.png',
    content:
      'BVM is EVM-compatible. Developers can integrate neural networks and AI functionalities directly into their smart contracts.',
    link: '#',
  },
  {
    id: 3,
    label: 'ROLLUP MODULE',
    title: 'ROLLUP MODULE',
    image: '/ai-landing/3.png',
    content:
      'BVM incorporates the battle-tested codebase of Optimism.',
    link: '#',
  },
  {
    id: 4,
    label: 'DATA AVAILABILITY MODULE',
    title: 'DATA AVAILABILITY MODULE',
    image: '/ai-landing/2.png',
    content:
      'BVM adopts a pragmatic approach by storing only transaction hashes on Bitcoin, with actual data on DA networks like Near, Filecoin, Eigen, and Avail. This strategy leverages Bitcoin’s top-notch security and the cost efficiency of DA platforms, ensuring a balanced blend of security and economic feasibility.',
    link: '#',
  },
  {
    id: 5,
    label: 'DATA VALIDATION MODULE',
    title: 'DATA VALIDATION MODULE',
    image: '/ai-landing/1.png',
    content:
      'At the core of BVM’s architecture lies the Data Validation module, which establishes a secure, reliable, and decentralized foundation for the entire stack.',
    link: '#',
  },
];
