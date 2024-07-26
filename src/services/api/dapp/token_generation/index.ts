import CDappApiClient from '@/services/api/dapp/dapp.client';
import { IGenerationTokenParams, IToken, ITokenVesting } from './interface';
import { setTokens } from '@/stores/states/dapp/reducer';
import { useDispatch } from 'react-redux';

class CTokenGenerationAPI {
  private api = new CDappApiClient().api;
  dispatch = useDispatch();

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
          network_id
        },
      });
      return rs;
    } catch (error) {
      return [];
    }
  };

  getListToken = async (network_id: string) => {
    try {
      const tokens = await this.tokenList(network_id);
      const tasks = tokens?.map(t => this.tokenVesting({token_address: t.contract_address as string, network_id: network_id}));
      const vestings = await Promise.all(tasks);

      const ts = tokens?.map((t, i) => ({...t, vestings: vestings[i]}));
      this.dispatch(setTokens(ts));
      return vestings;
    } catch (error) {
      console.log('error', error);
    } finally {

    }
  }

  generateNewToken = async (data: IGenerationTokenParams): Promise<any> => {
    return await this.api.post('/admin/deploy-contract', data);
  };
}

export default CTokenGenerationAPI;
