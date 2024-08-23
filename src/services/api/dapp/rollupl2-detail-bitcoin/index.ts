import CDappApiClient from './dapp.client';
import {
  IBalanceBitcoin,
  IBalanceBitcoinInfo,
  IBitcoinTokenTransaction,
} from './interface';

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

  getRollupL2BitcoinBalanceInfo = async (
    user_address: string,
  ): Promise<IBalanceBitcoinInfo | undefined> => {
    try {
      const rs: any = await this.api.get(`/explorer/info/${user_address}`);
      return rs;
    } catch (error) {
      return undefined;
    }
  };

  getRollupL2BitcoinTokenTransactions = async (
    params: any,
  ): Promise<IBitcoinTokenTransaction[]> => {
    try {
      if (params.type === 'bitcoin') {
        const rs: any = await this.api.get(
          `/explorer/transaction-list/${params.user_address}?page=${params.page}&limit=${params.limit}&type=${params.type}`,
        );
        return rs;
      }
      const rs: any = await this.api.get(
        `/explorer/token-transaction-list/${params.user_address}?page=${params.page}&limit=${params.limit}&type=${params.type}`,
      );
      return rs;
    } catch (error) {
      return [];
    }
  };
}

export default CRollupL2DetailBitcoinAPI;
