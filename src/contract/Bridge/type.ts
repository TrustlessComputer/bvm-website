import { CHAIN_TYPE } from '@constants/chains';

export interface IBridgeTokenParams {
  humanAmount: string;
  tokenAddress: string;
  bridgeAddress: string;
  receiver: string;
  fromChainId: number | string;
  toChainId: number | string;
  destinationChainId: number;
}
