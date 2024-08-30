import CDappApiClient from './dapp.client';
import {
  IRollupDetail,
  IRollupExplorer,
  IRollupNFT,
  IRollupNFTDetail,
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

  getRollupL2NFTs = async (params: any): Promise<IRollupNFT[]> => {
    try {
      const rs: any = await this.api.get(
        `/rollup/nft-balances?user_address=${params.user_address}&page=${params.page}&limit=${params.limit}`,
      );
      return rs;
    } catch (error) {
      return [];
    }
  };

  getRollupL2NFTsList = async (params: any): Promise<IRollupNFTDetail[]> => {
    try {
      const rs: any = await this.api.get(
        `/rollup/nft/list?rollup_id=${params.rollup_id}&user_address=${params.user_address}&token_address=${params.token_address}&page=${params.page}&limit=${params.limit}`,
      );
      return rs;
    } catch (error) {
      return [];
    }
  };

  getRollupL2Txs = async (params: {
    tx_hash: string;
  }): Promise<IRollupExplorer | undefined> => {
    try {
      const rs: any = await this.api.get(`/rollup/transactions`, { params });
      return rs?.[0];
    } catch (error) {
      return undefined;
    }
  };
}

export default CRollupL2DetailAPI;
