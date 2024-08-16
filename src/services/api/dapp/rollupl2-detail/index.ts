import CDappApiClient from './dapp.client';
import { IRollupDetail, RollupTokenRate } from './interface';

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
    } catch (err: unknown) {
    } finally {
      return result;
    }
  };
}

export default CRollupL2DetailAPI;
