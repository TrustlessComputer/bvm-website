export type BlockItemType = {
  key: string;
  label?: string;
  networkList?: {
    logoUrl: string;
    name: string;
    isComingSoon?: boolean;
  }[];
  bgColor?: string;
  bgCircle?: string;
  zIndex?: number;
  isLastItem?: boolean;
  isHide?: boolean;
};

export const BlockDataList: BlockItemType[] = [
  {
    key: 'AI Module',
    label: 'AI Module',
    networkList: [
      {
        logoUrl: '/images/lego_tensors.svg',
        name: 'Tensors',
      },
      {
        logoUrl: '/images/lego_cnn.svg',
        name: 'CNN',
      },
      {
        logoUrl: '/images/lego_dense.svg',
        name: 'DENSE',
      },
      {
        logoUrl: '/images/lego_lstm.svg',
        name: 'LSTM',
      },
      {
        logoUrl: '/images/lego_transformer.svg',
        name: 'Transformer',
      },
    ],
    // bgColor: '#29892A',
    bgColor: 'transparent',
    bgCircle: '#54A155',
    zIndex: 3,
    isLastItem: true,
    isHide: false,
  },
  {
    key: 'Data Availability',
    label: 'Data Availability',
    networkList: [
      {
        logoUrl: '/images/lego_ordinals.svg',
        name: 'Ordinals',
      },
      {
        logoUrl: '/images/lego_polygon.svg',
        name: 'Polygon',
      },
      {
        logoUrl: '/images/lego_celestia.svg',
        name: 'Celestia',
      },
      {
        logoUrl: '/images/lego_eigen.svg',
        name: 'Eigen',
      },
      {
        logoUrl: '/images/lego_nearDA.svg',
        name: 'NearDA',
      },
      {
        logoUrl: '/images/lego_avail.svg',
        name: 'Avail',
      },
    ],
    // bgColor: '#7069DC',
    bgColor: 'transparent',
    bgCircle: '#8D87E3',
    zIndex: 10,
    isLastItem: false,
    isHide: false,
  },
  {
    key: 'Settlement',
    label: 'Settlement',
    networkList: [
      {
        logoUrl: '/images/lego_bitcoin.svg',
        name: 'Bitcoin',
      },
    ],
    // bgColor: '#29892A',
    bgColor: 'transparent',
    bgCircle: '#54A155',
    zIndex: 4,
    isLastItem: false,
    isHide: false,
  },
  {
    key: 'Execution',
    label: 'Execution',
    networkList: [
      {
        logoUrl: '/images/lego_optimism.svg',
        name: 'Optimism',
      },
      {
        logoUrl: '/images/lego_polygon.svg',
        name: 'Polygon',
        isComingSoon: false,
      },
      {
        logoUrl: '/images/zksync_zkvm_coming_soon.png',
        name: 'ZKSync ZKVM',
        isComingSoon: true,
      },
      {
        logoUrl: '/images/arbitrum_coming_soon.png',
        name: 'Arbitrum',
        isComingSoon: true,
      },
      {
        logoUrl: '/images/starknet_coming_soon.png',
        name: 'Starknet',
        isComingSoon: true,
      },
    ],
    // bgColor: '#F7931A',
    bgColor: 'transparent',
    bgCircle: '#F9A948',
    zIndex: 8,
    isLastItem: false,
    isHide: false,
  },
  {
    key: 'Rollup Framework',
    label: 'Rollup Framework',
    networkList: [
      {
        logoUrl: '/images/lego_optimism.svg',
        name: 'Optimism',
      },
      {
        logoUrl: '/images/rollkit_coming_soon.png',
        name: 'Rollkit',
        isComingSoon: true,
      },
    ],
    // bgColor: '#25C0EF',
    bgColor: 'transparent',
    bgCircle: '#51CDF2',
    zIndex: 7,
    isLastItem: false,
    isHide: false,
  },
  {
    key: 'Cross-chain bridges',
    label: 'Cross-chain bridges',
    networkList: [
      // {
      //   logoUrl: '/images/lego_bitcoin.svg',
      //   name: 'Bitcoin',
      // },
      {
        logoUrl: '/images/lego_brc20.svg',
        name: 'BRC20',
      },
      {
        logoUrl: '/images/lego_eth.svg',
        name: 'Ethereum',
      },
      {
        logoUrl: '/images/lego_solana.svg',
        name: 'Solana',
      },
    ],
    // bgColor: '#FF5C5C',
    bgColor: 'transparent',
    bgCircle: '#FF7D7D',
    zIndex: 6,
    isLastItem: false,
    isHide: false,
  },
  {
    key: 'Applications',
    label: 'Applications',
    networkList: [
      {
        logoUrl: '/images/lego_uniswap.png',
        name: 'Uniswap',
      },
      {
        logoUrl: '/images/lego_gmx.svg',
        name: 'GMX',
      },
      {
        logoUrl: '/images/lego_compound.svg',
        name: 'Compound',
      },
    ],
    // bgColor: '#FF5C5C',
    bgColor: 'transparent',
    bgCircle: '#FF7D7D',
    zIndex: 5,
    isLastItem: false,
    isHide: false,
  },
].filter((item) => !item.isHide);
