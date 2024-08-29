import CDappApiClient from './dapp.client';
import {
  IBalanceBitcoin,
  IBalanceBitcoinInfo,
  IBitcoinTokenTransaction,
  ITxBTC,
  ISummaryInfo,
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

  getTxBTC = async (
    address: string,
    params?: any,
  ): Promise<ITxBTC | undefined> => {
    try {
      const rs: any = await this.api.get(`/explorer/transaction/${address}`, {
        params,
      });
    } catch (error) {
      return undefined;
    }
  };

  getRollupL2BitcoinSummary = async (
    user_address: string,
    params: any,
  ): Promise<ISummaryInfo | undefined> => {
    try {
      const rs: any = await this.api.post(
        `/explorer/summary/${user_address}`,
        params,
      );
      return rs?.result;
    } catch (error) {
      return undefined;
    }
  };
}

export default CRollupL2DetailBitcoinAPI;
