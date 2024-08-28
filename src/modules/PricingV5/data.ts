export type PriceItemType = {
  id: string;
  title: string;
  desc: string;
  note: string;
  link: string;
};

export const PRICE_DATA: PriceItemType[] = [
  {
    id: 'zk-hybrid',
    title: 'ZK Rollup Hybrid',
    desc: 'Bitcoin L2 with Hybrid DA.',
    note: 'Aggregate transactions off-chain, saving batches to an alternative DA layer. This enhances scalability, reduces fees, and offers flexible data storage—perfect for developers prioritizing high throughput and security.',
    link: '/studio?template=1',
  },
  {
    id: 'zk',
    title: 'ZK Rollup',
    desc: 'Bitcoin L2 with 100% Bitcoin DA.',
    note: 'Aggregate transactions off-chain and submits a single proof to Bitcoin, greatly improving scalability and reducing fees. Ideal for developers needing high transaction throughput with strong security guarantees.',
    link: '/studio?template=2',
  },
  {
    id: 'metaprotocol',
    title: 'Metaprotocol',
    desc: 'Bitcoin L1 scaling solution.',
    note: `Enable the deployment of EVM-compatible smart contracts while leveraging Bitcoin's security. Ideal for developers familiar with Ethereum tools who seek the stability and security of Bitcoin.`,
    link: '/studio?template=3',
  },
  {
    id: 'op',
    title: 'Optimistic Rollup Hybrid',
    desc: 'Bitcoin L2 powered by OP Stack.',
    note: 'Process transactions off-chain under the assumption of validity, which lowers costs and boosts scalability. Best suited for developers seeking efficient scaling with minimal delays in transaction finality.',
    link: '/studio?template=4',
  },
];
