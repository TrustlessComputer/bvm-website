export enum WalletType {
  xverse = 'xverse-wallet',
  unisat = 'unisat-wallet',
}

export const WalletName = {
  [WalletType.unisat]: 'Unisat wallet',
  [WalletType.xverse]: 'Xverse wallet',
};

export interface IConnectedInfo {
  address: string[];
  publicKey: string[];
}
