import {
  IBlockScout,
  ILaunchpadCreateBody,
  ILaunchpadFeeOption,
} from '../services/launchpad.interfaces';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';

export interface LaunchpadState {
  create_step: number;
  create_body: ILaunchpadCreateBody;
  create_fee_options: ILaunchpadFeeOption[];
  created_launchpad_id?: number | undefined;
  oldCountCurrentLeaderboard: number;
  countCurrentLeaderboard: number;
  oldCountTotalTickets: number;
  countTotalTickets: number;
  leaderBoards: ILeaderBoardPoint[];
  oldBlockScout: IBlockScout;
  blockScout: IBlockScout;
  myDataLeaderBoard: ILeaderBoardPoint;
}
