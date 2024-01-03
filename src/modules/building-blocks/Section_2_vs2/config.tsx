export type BlockItemType = {
  key: string;
  label?: string;
  logoStack?: string[];
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
    logoStack: [
      '/icons/btc_logo.svg',
      '/icons/polygon_logo.svg',
      '/icons/chain1_logo.svg',
      '/icons/chain2_logo.svg',
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
    logoStack: ['/icons/btc_logo.svg'],
    bgColor: '#29892A',
    bgCircle: '#54A155',
    zIndex: 9,
    isLastItem: false,
    isHide: false,
  },
  {
    key: 'Execution',
    label: 'Execution',
    logoStack: [
      '/icons/op_logo.svg',
      '/icons/polygon_logo.svg',
      '/icons/chain3_logo.svg',
    ],
    bgColor: '#F7931A',
    bgCircle: '#F9A948',
    zIndex: 7,
    isLastItem: false,
    isHide: false,
  },
  {
    key: 'Interop',
    label: 'Interop',
    logoStack: [
      '/icons/btc_logo.svg',
      '/icons/wbtc_logo.svg',
      '/icons/eth_logo.svg',
      '/icons/sol_logo.svg',
    ],
    bgColor: '#FF5C5C',
    bgCircle: '#FF7D7D',
    zIndex: 6,
    isLastItem: true,
    isHide: false,
  },
].filter((item) => !item.isHide);
