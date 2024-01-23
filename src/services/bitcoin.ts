import { DEX_API } from '@/config';
import { apiClient } from '@/services/index';
import CacheManager from './cache';
import { BINANCE_PAIR } from '@/services/interfaces/bitcoin';
import { setCoinPrices } from '@/stores/states/common/reducer';
import { store } from '@/stores';

export type ListTokenRate = {
  [key in BINANCE_PAIR]: string | number;
};

export const getTokensRate = async (): Promise<ListTokenRate> => {
  let result: ListTokenRate = {
    ETH: '0.0',
    BTC: '0.0',
  } as any;
  try {
    result = await apiClient.get(`${DEX_API}/coin-prices`);
  } catch (err: unknown) {
    console.log('[getTokensRate] err ', err);
  } finally {
    return result;
  }
};

export const getCacheTokensRate = async (): Promise<ListTokenRate> => {
  const result: ListTokenRate = await CacheManager.cachePromise({
    key: CacheManager.KEYS.RATE_TOKENS,
    promiseFunc: () => getTokensRate(),
    expiredTime: CacheManager.EXPIRED_TIME.RATE_TOKENS_EXPIRED_TIME,
  });
  store.dispatch(setCoinPrices(result));

  return result;
};
