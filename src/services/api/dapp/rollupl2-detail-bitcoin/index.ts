import CDappApiClient from './dapp.client';
import { IBalanceBitcoin } from './interface';

class CRollupL2DetailBitcoinAPI extends CDappApiClient {
  getRollupL2BitcoinBalances = async (
    params: any,
  ): Promise<IBalanceBitcoin[]> => {
    try {
      const rs: any = await this.api.get(
        `/explorer/balance/${params.user_address}?page=${params.page}&limit=${params.limit}&type=${params.type}`,
      );
      return rs;
    } catch (error) {
      return [];
    }
  };
}

export default CRollupL2DetailBitcoinAPI;
