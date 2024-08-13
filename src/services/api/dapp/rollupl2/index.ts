import CDappApiClient from '../dapp.client';
import { IRollupL2Info } from './interface';

class CRollupL2API extends CDappApiClient {
  getRollupL2Info = async (): Promise<IRollupL2Info[]> => {
    try {
      const rs: any = await this.api.get('rollup/list');
      return rs;
    } catch (error) {
      return [];
    }
  };
}

export default CRollupL2API;
