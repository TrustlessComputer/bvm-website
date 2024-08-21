import CDappApiClient from './dapp.client';
import {
  IRollupDetail,
  IRollupTokenTransfer,
  IRollupTransaction,
  RollupTokenRate,
} from './interface';

class CRollupL2DetailAPI extends CDappApiClient {
  getRollupL2Detail = async (
    user_address: string,
  ): Promise<IRollupDetail[]> => {
    try {
      const rs: any = await this.api.get(
        `/rollup/balances?user_address=${user_address}`,
      );
      return rs;
    } catch (error) {
      return [];
    }
  };

  getRollupTokensRate = async (): Promise<RollupTokenRate> => {
    let result: RollupTokenRate = {
      ETH: '0.0',
      BTC: '0.0',
    } as any;
    try {
      result = await this.api.get(`/coin-prices`);
      result = { ...result, USDT: '1.0' };
    } catch (err: unknown) {
    } finally {
      return result;
    }
  };

  getRollupL2Transactions = async (
    params: any,
  ): Promise<IRollupTransaction[]> => {
    try {
      const rs: any = await this.api.get(
        `/rollup/transactions?user_address=${params.user_address}&page=${params.page}&limit=${params.limit}`,
      );
      return rs;
    } catch (error) {
      return [];
    }
  };

  getRollupL2TokenTransfers = async (
    params: any,
  ): Promise<IRollupTokenTransfer[]> => {
    try {
      const rs: any = await this.api.get(
        `/rollup/token-transfer?user_address=${params.user_address}&page=${params.page}&limit=${params.limit}`,
      );
      return rs;
    } catch (error) {
      return [];
    }
  };
}

export default CRollupL2DetailAPI;
