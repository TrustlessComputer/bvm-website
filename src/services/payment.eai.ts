import { PERP_API_URL } from '@/config';
import CApiClient from './apiClient';
import { ILeaderBoardEAI } from '@/services/interfaces/laupEAI-payment';


class CPaymentEAIAPI {
  private apiClient = new CApiClient().api;
  private prefix = `${PERP_API_URL}/api/eternal-ai/sale`;

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

}

export default CPaymentEAIAPI;
