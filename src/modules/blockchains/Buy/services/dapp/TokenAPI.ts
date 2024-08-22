import CDappApiClient from '@/services/api/dapp/dapp.client';
import {
  IToken,
  ITokenVesting,
} from '@/services/api/dapp/token_generation/interface';

class TokenAPI extends CDappApiClient {
  private BASE_URL = 'tokens';

  tokenList = async (network_id: string): Promise<IToken[]> => {
    try {
      const rs: IToken[] = await this.api.get(`${this.BASE_URL}/list`, {
        params: { network_id: network_id },
      });

      return rs;
    } catch (error) {
      return [];
    }
  };

  tokenVesting = async ({
    token_address,
    network_id,
  }: {
    token_address: string;
    network_id: string;
  }): Promise<ITokenVesting[]> => {
    try {
      const rs: ITokenVesting[] = await this.api.get(
        `${this.BASE_URL}/vesting`,
        {
          params: {
            token_address,
            network_id,
          },
        },
      );

      return rs;
    } catch (error) {
      return [];
    }
  };
}

export default TokenAPI;
