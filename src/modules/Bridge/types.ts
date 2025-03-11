import { CHAIN_TYPE } from '@constants/chains';

export interface BridgeNetwork {
  name: CHAIN_TYPE;
  chainId: number;
  explorerUrl: string;
  logoURI: string;
  displayName: string;
  nativeCurrency: {
    symbol: string;
  };
}

export interface BridgeToken {
  id: string;
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  chainId: number;
  logoURI: string;
  network: BridgeNetwork;
  bridgeContractAddress: string;
  tokenType: TokenType;
  tokenAddress: {
    [key: string]: string;
  };
  bridgeAddress: {
    [key: string]: string;
  };
}

export interface IFormValues {
  fromToken: BridgeToken;
  toToken?: BridgeToken;
  isNeedApprove: boolean;

  fromNetwork: BridgeNetwork;
  toNetwork?: BridgeNetwork;

  balance?: string;

  fromAmount: string;
  toAmount: string;
  recipient?: string;

  isQRCode?: boolean;
}

export type NetworkType = 'from' | 'to';

export enum TokenType {
  EVM = 'EVM',
  SOLANA = 'SOLANA',
  RIPPLE = 'RIPPLE',
  DOGE = 'DOGE',
}

export interface IDepositQRCode {
  depositAddress: string;
  minDepositAmount: string;
  depositFee: string;
  tcAddress: string;
}
