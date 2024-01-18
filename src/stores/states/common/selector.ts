import { RootState } from '@/stores';

export const commonSelector = (state: RootState) => state.common;
export const coinPricesSelector = (state: RootState) => state.common.coinPrices;
