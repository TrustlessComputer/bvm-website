export enum WalletType {
  xverse = 'xverse-wallet',
  unisat = 'unisat-wallet',
  metamask = 'metamask-wallet',
}

export const WalletName = {
  [WalletType.unisat]: 'Unisat wallet',
  [WalletType.xverse]: 'Xverse wallet',
  [WalletType.metamask]: 'Metamask wallet',
};

export interface IConnectedInfo {
  address: string[];
  publicKey: string[];
}

export type WalletOperationReturn<T> = {
  isSuccess: boolean;
  isError: boolean;
  message: string;
  data?: T;
};

export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}
