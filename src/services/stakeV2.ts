import createAxiosInstance from './http-client';
import { StakeHistory, StakeLeaderBoard, StakeMember } from '@/services/interfaces/stakeV2';

const API_PATH = 'https://api.nakachain.xyz' + '/api';

const apiClient = createAxiosInstance({
  baseURL: API_PATH,
});

const getTeamMembers = async (params: {
  teamCode: string;
}): Promise<StakeMember[]> => {
  try {
    const members = (await apiClient.get(
      `/sttoken/team-members?network=naka&team_code=${params.teamCode}&page=1&limit=999999`,
    )) as StakeMember[];

    return members || [];
  } catch (error) {
    return [];
  }
};

const getStakeHistory = async (params: {
  address: string;
}): Promise<StakeHistory[]> => {
  try {
    //stake%2Cunstake
    const history = (await apiClient.get(
      `sttoken/transactions?network=naka&address=${params.address}&type=stake%2Cunstake`,
    )) as StakeHistory[];

    return history || [];
  } catch (error) {
    return [];
  }
};

const getLeaderBoard = async (params: { page: number; limit: number }) => {
  const leaderBoards = (await apiClient.get(
    `sttoken/leaderboards?page=${params.page}&limit=${params.limit}`,
  )) as StakeLeaderBoard[];
  return leaderBoards || [];
};

const stakeV2Services = {
  getTeamMembers,
  getStakeHistory,
  getLeaderBoard,
};

export default stakeV2Services;
