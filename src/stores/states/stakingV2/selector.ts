import { RootState } from '@/stores';
import { StakingV2State } from './type';
import { createSelector } from '@reduxjs/toolkit';
import { HistoryType, StakeHistory } from '@/services/interfaces/stakeV2';
import dayjs from 'dayjs';
import BigNumberJS from 'bignumber.js';

export const stakingV2Selector = (state: RootState): StakingV2State =>
  state.stakingV2 as StakingV2State;

export const stakeUserSelector = createSelector(
  stakingV2Selector,
  (state: StakingV2State) => state.stakeUser,
);

export const isFetchedStakeUserSelector = createSelector(
  stakingV2Selector,
  (state: StakingV2State) => state.fetched,
);

export const membersSelector = createSelector(
  stakingV2Selector,
  (state: StakingV2State) => ({
    members: state.members,
    memberCount: state.memberCount,
  }),
);

export const historySelector = createSelector(
  stakingV2Selector,
  (state: StakingV2State) => state.history,
);

export const availForRestakeSelector = createSelector(
  stakingV2Selector,
  (state: StakingV2State) =>
    state.history.filter((item) => {
      try {
        const isValid =
          item.type === HistoryType.unStake &&
          !item.restake_at &&
          !Boolean(item.is_claimed) &&
          dayjs.utc(item.valid_at).isAfter();
        return isValid;
      } catch (error) {
        return false;
      }
    }),
);

export const restakeAmountSelector = createSelector(
  availForRestakeSelector,
  (restakes: StakeHistory[]) =>
    restakes.reduce((prev, curr) => {
      return new BigNumberJS(prev).plus(curr.principle_amount).toNumber();
    }, 0),
);

export const stakingPercentSelector = createSelector(
  stakingV2Selector,
  (state: StakingV2State) => ({
    stakingPercent: state.stakingPercent,
    totalStake: state.totalStake,
    supplyStake: state.supplyStake,
  }),
);

export const stakeLeaderBoards = createSelector(
  stakingV2Selector,
  (state: StakingV2State) => state.leaderBoards || [],
);
