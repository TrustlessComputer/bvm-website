import CDappApiClient from '@/services/api/dapp/dapp.client';
import { IGenerationTokenParams, IToken, ITokenVesting } from './interface';

class CTokenGenerationAPI {
  private api = new CDappApiClient().api;

  tokenList = async (network_id: string): Promise<IToken[]> => {
    try {
      const rs: IToken[] = await this.api.get(`/tokens/list`, {params: { network_id: network_id }});
      return rs;
    } catch (error) {
      return [];
    }
  };

  tokenVesting = async ({ token_address, network_id}: {
    token_address: string;
    network_id: string;
  }): Promise<ITokenVesting[]> => {
    try {
      const rs: ITokenVesting[] = await this.api.get(`/tokens/vesting`, {
        params: {
          token_address,
        },
      });
      return rs;
    } catch (error) {
      return [];
    }
  };

  generateNewToken = async (data: IGenerationTokenParams): Promise<any> => {
    return await this.api.post('/admin/deploy-contract', data);
  };
}

export default CTokenGenerationAPI;
