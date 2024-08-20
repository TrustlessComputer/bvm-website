import CDappApiClient from '@/services/api/dapp/dapp.client';
import { IGenerationTokenParams, IToken, ITokenVesting } from './interface';
import { isLocalhost } from '@utils/helpers';
import { orderBy } from 'lodash';
import { setTokens, setTokensAll } from '@/stores/states/dapp/reducer';
import { useAppDispatch } from '@/stores/hooks';

class CTokenGenerationAPI {
  private api = new CDappApiClient().api;
  private dispatch = useAppDispatch();

  getListTokenAll = async (network_id: string): Promise<IToken[]> => {
    try {
      const rs: IToken[] = await this.api.get(`/tokens/all`, {params: { network_id: network_id }});
      const ts = orderBy(
        rs,
        [(token) => token.id],
        ['asc'],
      );

      this.dispatch(setTokensAll(ts));
      return ts;
    } catch (error) {
      return [];
    }
  };

  getListToken = async (network_id: string) => {
    try {
      let tokens = await this.tokenList(network_id);
      if (isLocalhost()) {
        // tokens = tokens.slice(tokens?.length - 3, tokens?.length);
      }
      const tasks = tokens?.map((t) =>
        this.tokenVesting({
          token_address: t.contract_address as string,
          network_id: network_id,
        }),
      );
      const vestings = await Promise.all(tasks);

      const ts = orderBy(
        tokens?.map((t, i) => ({ ...t, vestings: vestings[i] })),
        [(token) => token.id],
        ['asc'],
      );

      this.dispatch(setTokens(ts));
      return vestings;
    } catch (error) {
      console.log('error', error);
    } finally {
    }
  };

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

  generateNewToken = async (data: IGenerationTokenParams): Promise<any> => {
    return await this.api.post('/admin/deploy-contract', data);
  };

  uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const imageURL = (await this.api.post("/user/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })) as string;

    return imageURL;
  };

  updateTokenLogo = async (params: { logo_url: string, token_address: string, network_id: number }) => {
    return await this.api.put('/tokens/update-logo', params);
  }
}

export default CTokenGenerationAPI;
