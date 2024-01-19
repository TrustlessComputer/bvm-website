import { RootState } from '@/stores';
import { User } from '@/stores/states/user/types';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import { SignatureStatus } from '@/interfaces/whitelist';

export const userSelector = (state: RootState) => state.user?.user as User | undefined;
export const leaderBoardSelector = (state: RootState) => ({
  list: (state.user?.leaderBoard || []) as ILeaderBoardPoint[],
  count: (state.user?.leaderBoardCount || '') as string
});

export const allowBTCSelector = (state: RootState) => ({
  status: (state.user?.allowBTC?.status || []) as SignatureStatus[],
  loaded: (state.user?.allowBTC?.loaded || false) as boolean
});

export const allowCelestiaSelector = (state: RootState) => ({
  status: (state.user?.allowCelestia?.status || []) as SignatureStatus[],
  loaded: (state.user?.allowCelestia?.loaded || false) as boolean
});
