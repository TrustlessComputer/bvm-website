export enum TAB_ENUM {
  MANAGE_CHAINS = 0,
  BILLING = 1,
}

export const TAB_ENUM_MAP = {
  [TAB_ENUM.MANAGE_CHAINS]: 'OP',
  [TAB_ENUM.BILLING]: 'ZK',
};

export enum TAB_NETWORK_ENUM {
  TESTNET = 0,
  MAINNET = 1,
}

export const TAB_NETWORK_MAP = {
  [TAB_NETWORK_ENUM.TESTNET]: 'Testnet',
  [TAB_NETWORK_ENUM.MAINNET]: 'Mainnet',
};
