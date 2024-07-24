import CDappApiClient from '@/services/api/dapp/dapp.client';
import { ISTToken } from './interface';

class CStakingAPI {
  private api = new CDappApiClient().api;

  private getUrl = (url: string) => {
    return `/staking/${url}`;
  };

  createNewStakingPool = async (data: any): Promise<ISTToken> => {
    return await this.api.post(this.getUrl('create'), data);
  };
}

export default CStakingAPI;
