import { PERP_API_URL } from '@/config';

import {
  StakeHistory,
  StakeLeaderBoard,
  StakeMember,
} from '@/services/interfaces/stakeV2';

import CApiClient from '@/services/apiClient';

class CStakingAPI {

  private apiClient = new CApiClient().api;
  private prefix = PERP_API_URL + '/api';

  getTeamMembers = async (params: {
    teamCode: string;
  }): Promise<StakeMember[]> => {
    try {
      const members = (await this.apiClient.get(
        `${this.prefix}/sttoken/team-members?network=naka&team_code=${params.teamCode}&page=1&limit=999999`,
      )) as StakeMember[];

      return members || [];
    } catch (error) {
      return [];
    }
  };

  getStakeHistory = async (params: {
    address: string;
  }): Promise<StakeHistory[]> => {
    try {
      //stake%2Cunstake
      const history = (await this.apiClient.get(
        `${this.prefix}/sttoken/transactions?network=naka&address=${params.address}&type=stake%2Cunstake`,
      )) as StakeHistory[];

      return history || [];
    } catch (error) {
      return [];
    }
  };

  getLeaderBoard = async (params: { page: number; limit: number }) => {
    const leaderBoards = (await this.apiClient.get(
      `${this.prefix}/sttoken/leaderboards?page=${params.page}&limit=${params.limit}`,
    )) as StakeLeaderBoard[];
    return leaderBoards || [];
  };
}

export default CStakingAPI;
