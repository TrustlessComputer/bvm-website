import CDappApiClient from '../dapp.client';
import {
  IRollupActiveAddressChart1D,
  IRollupChart1D,
  IRollupL2Info,
} from './interface';

class CRollupL2API extends CDappApiClient {
  getRollupL2Info = async (): Promise<IRollupL2Info[]> => {
    try {
      const rs: any = await this.api.get('rollup/list');
      return rs;
    } catch (error) {
      return [];
    }
  };
  getFeeAddress1D = async (): Promise<IRollupChart1D[]> => {
    try {
      const rs: any = await this.api.get('rollup/chart-1d');
      return rs;
    } catch (error) {
      return [];
    }
  };
  getActiveAddress1D = async (): Promise<IRollupActiveAddressChart1D> => {
    try {
      const rs: any = await this.api.get('rollup/active-address-chart-1d');
      return rs;
    } catch (error) {
      return {
        rollup_datas: [],
        charts: [],
      };
    }
  };
}

export default CRollupL2API;
