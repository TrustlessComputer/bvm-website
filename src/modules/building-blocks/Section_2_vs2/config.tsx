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
    key: 'Data Availability',
    label: 'Data Availability',
    networkList: [
      {
        logoUrl: '/icons/btc_logo.svg',
        name: 'Bitcoin',
      },
      {
        logoUrl: '/icons/polygon_logo.svg',
        name: 'Polygon',
      },
      {
        logoUrl: '/icons/celestia_logo.svg',
        name: 'Celestia',
      },
      {
        logoUrl: '/icons/eigen_logo.svg',
        name: 'Eigen',
      },
      {
        logoUrl: '/icons/avail_logo.svg',
        name: 'Avail',
        isComingSoon: true,
      },
      {
        logoUrl: '/icons/near_logo.svg',
        name: 'NearDA',
        isComingSoon: true,
      },
    ],
    bgColor: '#7069DC',
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
        logoUrl: '/icons/btc_logo.svg',
        name: 'Bitcoin',
      },
    ],
    bgColor: '#29892A',
    bgCircle: '#54A155',
    zIndex: 9,
    isLastItem: false,
    isHide: false,
  },
  {
    key: 'Execution',
    label: 'Execution',
    networkList: [
      {
        logoUrl: '/icons/op_logo.svg',
        name: 'Optimism',
      },
      {
        logoUrl: '/icons/polygon_logo.svg',
        name: 'Polygon ZKEVM',
        isComingSoon: true,
      },
      {
        logoUrl: '/icons/zksync_logo.svg',
        name: 'ZKSync ZKVM',
        isComingSoon: true,
      },
      {
        logoUrl: '/icons/arbitrum_logo.svg',
        name: 'Arbitrum',
        isComingSoon: true,
      },
      {
        logoUrl: '/icons/starknet_logo.svg',
        name: 'Starknet',
        isComingSoon: true,
      },
    ],
    bgColor: '#F7931A',
    bgCircle: '#F9A948',
    zIndex: 7,
    isLastItem: false,
    isHide: false,
  },
  {
    key: 'Rollup Framework',
    label: 'Rollup Framework',
    networkList: [
      {
        logoUrl: '/icons/op_logo.svg',
        name: 'Optimism',
      },
      {
        logoUrl: '/icons/rollkit_logo.svg',
        name: 'Rollkit',
        isComingSoon: true,
      },
    ],
    bgColor: '#25C0EF',
    bgCircle: '#51CDF2',
    zIndex: 6,
    isLastItem: false,
    isHide: false,
  },
  {
    key: 'Interop',
    label: 'Interop',
    networkList: [
      {
        logoUrl: '/icons/btc_logo.svg',
        name: 'Bitcoin Bridge',
      },
      {
        logoUrl: '/icons/brc20_logo.svg',
        name: 'BRC20 Bridge',
      },
      {
        logoUrl: '/icons/eth_logo.svg',
        name: 'Ethereum Bridge',
      },
      {
        logoUrl: '/icons/sol_logo.svg',
        name: 'Solana Bridge',
      },
    ],
    bgColor: '#FF5C5C',
    bgCircle: '#FF7D7D',
    zIndex: 5,
    isLastItem: true,
    isHide: false,
  },
].filter((item) => !item.isHide);
