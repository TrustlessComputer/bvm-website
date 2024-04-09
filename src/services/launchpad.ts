/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PERP_API_URL } from '@/config';
import CApiClient from './apiClient';

class CLaunchpadAPI {
  private apiClient = new CApiClient().api;
  private prefix = `${PERP_API_URL}/api/launchpad`;

  public getLaunchpadIDOAirdrop = async (id: number): Promise<any> => {
    try {
      const res = (await this.apiClient.get(
        `${this.prefix}/airdrop/${id}`,
      )) as any;
      return res;
    } catch (error) {
      throw error;
    }
  };
}

export default CLaunchpadAPI;
