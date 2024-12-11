import { OrderItem } from '@/stores/states/l2services/types';
import { IToken } from '@/services/api/dapp/token_generation/interface';

export type IChainProviderActions = {};

export type IChainProviderProps = {
  order: OrderItem | undefined;
  chainID: number | undefined;
  tokenIssueList: IToken[];
};

export type IChainProvider = IChainProviderActions & IChainProviderProps;
