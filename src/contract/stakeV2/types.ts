export enum StakeV2Role {
  empty,
  captain,
  member,
}

export interface CreateStakeParams {
  role: StakeV2Role;
  code?: string;
  amount: string;
}

export interface CreateUnStakeParams {
  amount: string;
}

export interface ClaimUnStakeParams {
  unstakeID: string;
}

export interface TeamRewardRatio {
  captainRewardRatio: string;
  memberRewardRatio: string;
}

export interface StakeUser {
  userTeamCode: string;
  teamRole: StakeV2Role;
  principleBalance: string;
  rewardAmount: string;
  multiplierPoint: string;
  teamRewardRatio: TeamRewardRatio;
  teamPrincipleBalance: string;
  isStaked: boolean;
  isHaveTeam: boolean;
  stakingPercent: string;
  shardMined: string;
  shardMining: string;
}
