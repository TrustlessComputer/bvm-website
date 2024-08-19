import { RootState } from '@/stores';
import { DappState } from '@/stores/states/dapp/types';

export const dappSelector = (state: RootState) => state.dapp as DappState;
