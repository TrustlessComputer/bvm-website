import CDappApiClient from '@/services/api/dapp/dapp.client';
import { IGenerationTokenParams } from './interface';

class CTokenGenerationAPI {
  private api = new CDappApiClient().api;

  private getUrl = (url: string) => {
      return `/admin/${url}`;
  };

  generateNewToken = async (data: IGenerationTokenParams): Promise<any> => {
    return await this.api.post(this.getUrl('deploy-contract'), data);
  };
}

export default CTokenGenerationAPI;
