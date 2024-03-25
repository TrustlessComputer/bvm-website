import { StakeUser } from '@/contract/stakeV2/types';
import {
  StakeHistory,
  StakeLeaderBoard,
  StakeMember,
} from '@/services/interfaces/stakeV2';

export interface StakingV2State {
  stakeUser: StakeUser | undefined;
  fetched: boolean;
  memberCount: number;
  members: Array<StakeMember>;
  history: Array<StakeHistory>;
  stakingPercent: string;
  supplyStake: string;
  totalStake: string;
  leaderBoards: StakeLeaderBoard[];
}
