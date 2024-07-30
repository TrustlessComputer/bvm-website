// import { PERP_API_URL } from '@/configs';

import CApiClient from '@/services/apiClient';
import {
  ILaunchpad,
  ILaunchpadClaimParams,
  WalletTokenDeposit,
} from './launchpad.interfaces';
import {
  ILeaderBoardEAI,
  IPublicSaleDepositInfo,
  IResUpdateTwitter,
} from './laupEAI-payment.interfaces';

class CPaymentSWPAPI {
  private apiClient = new CApiClient().api;
  private prefix = `/api/swamps/sale`;
  private prefixOriginal = `/api/swamps`;

  mapLeaderboard = (arr: any[]) => {
    return ((arr || []) as ILeaderBoardEAI[]).map((item) => {
      const address = item.address;
      return {
        ...item,
        twitter_username: item.twitter_username
          ? item.twitter_username
          : address,
        twitter_name: item.twitter_name ? item.twitter_name : address,
      } as ILeaderBoardEAI;
    });
  };

  getPublicSaleWalletInfo = async (): Promise<WalletTokenDeposit[]> => {
    try {
      const res = (await this.apiClient.get(
        `${this.prefix}/wallet`,
      )) as unknown as WalletTokenDeposit[];
      return res;
    } catch (error) {
      return [];
    }
  };

  getPublicSaleLeaderBoards = async (params: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<any> => {
    const res = (await this.apiClient.get(`${this.prefix}/leaderboards`, {
      params,
    })) as any;
    return {
      data: this.mapLeaderboard(res?.rows),
      ...res,
    };
  };

  getSummary = async (): Promise<IPublicSaleDepositInfo | undefined> => {
    try {
      const res = (await this.apiClient.get(
        `${this.prefix}/summary`,
      )) as IPublicSaleDepositInfo;
      return res;
    } catch (e) {
      return undefined;
    }
  };

  getPublicSaleTop = async (params: {
    page?: number;
    limit?: number;
  }): Promise<any> => {
    const res = await this.apiClient.get(`${this.prefix}/top`, { params });
    return { data: res };
  };

  getDepositNaka = async (): Promise<WalletTokenDeposit[]> => {
    try {
      const res = (await this.apiClient.get(
        `${this.prefix}/naka-wallet`,
      )) as WalletTokenDeposit[];
      return res || [];
    } catch (e) {
      return [];
    }
  };

  getPublicSaleContributionLatest = async (): Promise<ILeaderBoardEAI[]> => {
    const res = (await this.apiClient.get(
      `${this.prefix}/latest`,
    )) as unknown as ILeaderBoardEAI[];
    return res;
  };

  requestShareCode = async (): Promise<any> => {
    const res = await this.apiClient.post(
      `${this.prefixOriginal}/request-share-code`,
    );
    return res;
  };

  updateTwitterInfo = async (body: IResUpdateTwitter): Promise<any> => {
    const res = await this.apiClient.post(
      `${this.prefixOriginal}/update-twitter-info`,
      body,
    );
    return res;
  };

  requestSolWallet = async (): Promise<any> => {
    const res = await this.apiClient.post(`${this.prefix}/request-sol-wallet`);
    return res;
  };

  submitRequestScan = async () => {
    await this.apiClient.post(`${this.prefix}/manual-check`);
  };

  getTopBalance = async () => {
    return await this.apiClient.get(`${this.prefix}/top-balance`);
  };

  public requestClaimIDO = async (
    body: ILaunchpadClaimParams,
  ): Promise<ILaunchpad> => {
    try {
      const rs: any = this.apiClient.post(`${this.prefixOriginal}/claim`, body);
      return rs;
    } catch (error) {
      throw error;
    }
  };
}

export default CPaymentSWPAPI;
