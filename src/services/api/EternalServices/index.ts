import { IPagingParams } from '@/services/query';
import { apiEternalAIClient } from '../clients';
import {
  IGetListLeaderboardResponse,
  IUserContest,
  ISubmitProblemResponse,
  IContestStats,
} from './types';

export const getListLeaderboard = async (
  params: {} & IPagingParams,
): Promise<IUserContest[]> => {
  const res: IGetListLeaderboardResponse = await apiEternalAIClient.get(
    `/contest/leader-board`,
    {
      params,
    },
  );
  return res.user_contests || [];
};

export const submitProblem = async ({
  contractAddress,
  problemCode,
}: {
  contractAddress: string;
  problemCode: string;
}): Promise<ISubmitProblemResponse | null> => {
  try {
    const res: ISubmitProblemResponse = await apiEternalAIClient.post(
      `/contest/submit-problem`,
      {
        contract_address: contractAddress,
        problem_code: problemCode,
      },
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const registerCodeBattle = async (payload: any) => {
  const res = await apiEternalAIClient.post(`/contest/register`, payload);
  return res;
};

export const checkRegistered = async () => {
  const res: IUserContest = await apiEternalAIClient.get(
    `/contest/user-contest-info`,
  );
  return res;
};

export const getContestStats = async () => {
  const res: IContestStats = await apiEternalAIClient.get(`/contest/statistic`);
  return res;
};
