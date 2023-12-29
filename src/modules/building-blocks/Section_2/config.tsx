export type BlockItemType = {
  key: string;
  label?: string;
  logoStack?: string[];
  isHide?: false;
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
    isHide: false,
  },
  {
    key: 'Settlement',
    label: 'Settlement',
    logoStack: ['/icons/btc_logo.svg'],
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
    isHide: false,
  },
];
