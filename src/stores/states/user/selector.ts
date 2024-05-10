import { RootState } from '@/stores';
import { EVMFieldType, IAuthSetting, User } from '@/stores/states/user/types';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import { SignatureStatus } from '@/interfaces/whitelist';
import AuthenStorage from '@/utils/storage/authen.storage';
import { createSelector } from 'reselect';

export const userSelector = (state: RootState) =>
  state.user?.user as User | undefined;
export const userStateSelector = (state: RootState) => state.user;

export const userTokenSelector = (state: RootState) =>
  state.user?.userToken ||
  AuthenStorage.getAuthenKey() ||
  AuthenStorage.getGuestAuthenKey();
export const leaderBoardSelector = (state: RootState) => ({
  list: (state.user?.leaderBoard || []) as ILeaderBoardPoint[],
  count: (state.user?.leaderBoardCount || '') as string,
});

export const allowBTCSelector = (state: RootState) => ({
  status: (state.user?.allowBTC?.status || []) as SignatureStatus[],
  loaded: (state.user?.allowBTC?.loaded || false) as boolean,
});

export const allowCelestiaSelector = (state: RootState) => ({
  status: (state.user?.allowCelestia?.status || []) as SignatureStatus[],
  loaded: (state.user?.allowCelestia?.loaded || false) as boolean,
});

export const allowEVMSelector = (state: RootState) => (type: EVMFieldType) => {
  const data = (state.user as any)?.[type];
  return {
    status: (data?.status || []) as SignatureStatus[],
    loaded: (data?.allowCelestia?.loaded || false) as boolean,
  };
};

export const airdropAlphaUsersSelector = (state: RootState) =>
  state.user.airdropAlphaUsers;
export const airdropGMHoldersSelector = (state: RootState) =>
  state.user.airdropGMHolders;
export const airdropGenerativeUsersSelector = (state: RootState) =>
  state.user.airdropGenerativeUsers;
export const airdropPerceptronsHoldersSelector = (state: RootState) =>
  state.user.airdropPerceptronsHolders;

export const publicSaleLeaderBoardSelector = (state: RootState) => ({
  list: (state.user?.publicSaleLeaderBoard || []) as ILeaderBoardPoint[],
});

export const publicSaleLeaderBoardVisualSelector = (state: RootState) => ({
  list: (state.user?.publicSaleLeaderBoardVisual || []) as ILeaderBoardPoint[],
});

export const depositAddressSelector = createSelector(
  [userStateSelector, userTokenSelector],
  (user, token) => {
    if (!!token && typeof token === 'string' && !!user && user.depositAddress) {
      return user.depositAddress[token.toLowerCase()];
    }
  },
);

export const nakaAddressSelector = createSelector(
  [userStateSelector],
  (user): string => {
    return user?.nakaUser?.address || '';
  },
);

export const authSettingSelector = (state: RootState) =>
  state.user?.authSetting as IAuthSetting;

export const xUserSelector = (state: RootState) => state.user.x_token;

export const allow404Selector = (state: RootState) => ({
  status: (state.user?.allow404?.status || []) as SignatureStatus[],
  loaded: (state.user?.allow404?.loaded || false) as boolean,
});

export const stakingBVMSelector = (state: RootState) => ({
  status: (state.user?.stakingBVM?.status || []) as SignatureStatus[],
  loaded: (state.user?.stakingBVM?.loaded || false) as boolean,
});

export const holdingBTCSelector = (state: RootState) => ({
  status: (state.user?.holdingBTC?.status || []) as SignatureStatus[],
  loaded: (state.user?.holdingBTC?.loaded || false) as boolean,
});

export const allowSAVMSelector = (state: RootState) => ({
  status: (state.user?.allowSAVM?.status || []) as SignatureStatus[],
  loaded: (state.user?.allowSAVM?.loaded || false) as boolean,
});

export const holdingEAISelector = (state: RootState) => ({
  status: (state.user?.holdingEAI?.status || []) as SignatureStatus[],
  loaded: (state.user?.holdingEAI?.loaded || false) as boolean,
});

export const holdingRNDRSelector = (state: RootState) => ({
  status: (state.user?.holdingRDNR?.status || []) as SignatureStatus[],
  loaded: (state.user?.holdingRDNR?.loaded || false) as boolean,
});

export const holdingSWPL2Selector = (state: RootState) => ({
  status: (state.user?.holdingSWPL2?.status || []) as SignatureStatus[],
  loaded: (state.user?.holdingSWPL2?.loaded || false) as boolean,
});

export const holdingSWPSRC20Selector = (state: RootState) => ({
  status: (state.user?.holdingSWPSRC20?.status || []) as SignatureStatus[],
  loaded: (state.user?.holdingSWPSRC20?.loaded || false) as boolean,
});
