interface IField {
  title: string;
  value: string;
}

export interface IChain {
  name: IField;
  rollup: IField;
  block_time: IField;
  withdraw_period: IField;
  network_type: IField;
  native_token: IField;
  rpc_url: IField;
  chain_id: IField;
  explorer_url: IField;
  status: IField;
}

export const DATA_CHAINS: any[] = [
  {
    name: {
      title: 'Bitcoin L2 Name',
      value: 'Naka Chain'
    },
    rollup: {
      title: 'Rollup protocol',
      value: 'Optimistic rollups'
    },
    block_time: {
      title: 'Block time',
      value: '2 seconds'
    },
    withdraw_period: {
      title: 'Withdrawal Period',
      value: '7 days'
    },
    network_type: {
      title: 'Network type',
      value: 'Bitcoin Mainnet',
    },
    native_token: {
      title: 'Native token',
      value: '--'
    },
    rpc_url: {
      title: 'RPC URL',
      value: 'https://node.nakachain.xyz/'
    },
    chain_id: {
      title: 'Chain ID',
      value: '42223',
    },
    explorer_url: {
      title: 'Block explorer URL',
      value: 'https://explorer.nakachain.xyz/'
    },
    status: {
      title: 'Status',
      value: 'Healthy'
    }
  },
  {
    name: {
      title: 'Bitcoin L2 Name',
      value: 'Naka Chain'
    },
    rollup: {
      title: 'Rollup protocol',
      value: 'Optimistic rollups'
    },
    block_time: {
      title: 'Block time',
      value: '2 seconds'
    },
    withdraw_period: {
      title: 'Withdrawal Period',
      value: '7 days'
    },
    network_type: {
      title: 'Network type',
      value: 'Bitcoin Mainnet',
    },
    native_token: {
      title: 'Native token',
      value: '--'
    },
    rpc_url: {
      title: 'RPC URL',
      value: 'https://node.nakachain.xyz/'
    },
    chain_id: {
      title: 'Chain ID',
      value: '42223',
    },
    explorer_url: {
      title: 'Block explorer URL',
      value: 'https://explorer.nakachain.xyz/'
    },
    status: {
      title: 'Status',
      value: 'Healthy'
    }
  },
  undefined,
  {
    name: {
      title: 'Bitcoin L2 Name',
      value: 'Alpha Chain'
    },
    rollup: {
      title: 'Rollup protocol',
      value: 'Optimistic rollups'
    },
    block_time: {
      title: 'Block time',
      value: '2 seconds'
    },
    withdraw_period: {
      title: 'Withdrawal Period',
      value: '7 days'
    },
    network_type: {
      title: 'Network type',
      value: 'Bitcoin Mainnet',
    },
    native_token: {
      title: 'Native token',
      value: '--'
    },
    rpc_url: {
      title: 'RPC URL',
      value: 'https://node.l2.trustless.computer/'
    },
    chain_id: {
      title: 'Chain ID',
      value: '42213',
    },
    explorer_url: {
      title: 'Block explorer URL',
      value: 'https://explorer.l2.trustless.computer/'
    },
    status: {
      title: 'Status',
      value: 'Healthy'
    }
  },
  {
    name: {
      title: 'Bitcoin L2 Name',
      value: 'Naka Chain'
    },
    rollup: {
      title: 'Rollup protocol',
      value: 'Optimistic rollups'
    },
    block_time: {
      title: 'Block time',
      value: '2 seconds'
    },
    withdraw_period: {
      title: 'Withdrawal Period',
      value: '7 days'
    },
    network_type: {
      title: 'Network type',
      value: 'Bitcoin Mainnet',
    },
    native_token: {
      title: 'Native token',
      value: '--'
    },
    rpc_url: {
      title: 'RPC URL',
      value: 'https://node.nakachain.xyz/'
    },
    chain_id: {
      title: 'Chain ID',
      value: '42223',
    },
    explorer_url: {
      title: 'Block explorer URL',
      value: 'https://explorer.nakachain.xyz/'
    },
    status: {
      title: 'Status',
      value: 'Healthy'
    }
  },
]
