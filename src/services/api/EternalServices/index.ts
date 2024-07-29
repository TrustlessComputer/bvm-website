import { IPagingParams } from '@/services/query';
import { apiEternalAIClient } from '../clients';
import { IGetListLeaderboardResponse, IUserContest } from './types';

export const getListLeaderboard = async (
  params: {} & IPagingParams,
): Promise<IUserContest[]> => {
  const res: IGetListLeaderboardResponse = await apiEternalAIClient.get(`/contest/leader-board`, {
    params,
  });
  return res.user_contests || []
};
