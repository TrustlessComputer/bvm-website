import { CoinPrices } from '@/stores/states/common/types';
import CDappApiClient from './api/dapp/dapp.client';

const apiClient = new CDappApiClient().api;

const getCoinPrices = async (): Promise<CoinPrices | undefined> => {
  try {
    const coinPrices = (await apiClient.get('/coin-prices')) as CoinPrices;
    return coinPrices;
  } catch (error) {
    return undefined;
  }
};

const getConfigs = async (): Promise<CoinPrices | undefined> => {
  try {
    const res = (await apiClient.get('/configs')) as any;
    return res;
  } catch (error) {
    return undefined;
  }
};

export { getCoinPrices, getConfigs };
