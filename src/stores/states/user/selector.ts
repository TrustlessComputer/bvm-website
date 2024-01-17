import { RootState } from '@/stores';
import { User } from '@/stores/states/user/types';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';

export const userSelector = (state: RootState) => state.user?.user as User | undefined;
export const leaderBoardSelector = (state: RootState) => ({
  list: (state.user?.leaderBoard || []) as ILeaderBoardPoint[],
  count: (state.user?.leaderBoardCount || '') as string
});
