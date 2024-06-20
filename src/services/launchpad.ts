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

  public getLaunchpadSwampAirdrop = async (address: string): Promise<any> => {
    try {
      const prefix = `${PERP_API_URL}/api/`;
      const res = (await this.apiClient.get(`${prefix}swamps/airdop`, {
        params: {
          address,
        },
      })) as any;
      return res;
    } catch (error) {
      throw error;
    }
  };

  public requestClaimSwampAirdrop = async (
    id: number,
    body: any,
  ): Promise<any> => {
    try {
      const prefix = `${PERP_API_URL}/api/`;
      const rs: any = this.apiClient.post(`${prefix}swamps/airdop/${id}`, body);
      return rs;
    } catch (error) {
      throw error;
    }
  };

  public getLaunchpadNakaAirdrop = async (address: string): Promise<any> => {
    try {
      const prefix = `${PERP_API_URL}/api/`;
      const res = (await this.apiClient.get(
        `${prefix}launchpad/airdrop/claimed/1`,
        {
          params: {
            address,
          },
        },
      )) as any;
      return res;
    } catch (error) {
      throw error;
    }
  };

  public requestClaimNakaAirdrop = async (
    id: number,
    body: any,
  ): Promise<any> => {
    try {
      const prefix = `${PERP_API_URL}/api/`;
      const rs: any = this.apiClient.post(
        `${prefix}launchpad/airdrop/claimed/${id}`,
        body,
      );
      return rs;
    } catch (error) {
      throw error;
    }
  };
}

export default CLaunchpadAPI;
