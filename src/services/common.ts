import createAxiosInstance from '@/services/http-client';
import { PERP_API_URL } from '@/config';
import { CoinPrices } from '@/stores/states/common/types';

const apiClient = createAxiosInstance({
  baseURL: `${PERP_API_URL}/api`,
});

const getCoinPrices = async (): Promise<CoinPrices | undefined> => {
  try {
    const coinPrices = await apiClient.get('/coin-prices');
    return coinPrices as CoinPrices;
  } catch (error) {
    return undefined;
  }
};

export {
  getCoinPrices
}
