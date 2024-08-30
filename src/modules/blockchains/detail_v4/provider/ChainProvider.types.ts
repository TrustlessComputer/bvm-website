import { OrderItem } from '@/stores/states/l2services/types';

export type IChainProviderActions = {};

export type IChainProviderProps = {
  order: OrderItem | undefined;
  chainID: number | undefined;
};

export type IChainProvider = IChainProviderActions & IChainProviderProps;
