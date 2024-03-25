import { createSlice } from '@reduxjs/toolkit';
import { StakingV2State } from './type';
import { StakeMember } from '@/services/interfaces/stakeV2';

export const initialState: StakingV2State = {
  stakeUser: undefined,
  fetched: false,
  memberCount: 0,
  members: [],
  history: [],
  stakingPercent: '',
  supplyStake: '',
  totalStake: '',
  leaderBoards: [],
};

const stakingV2Slice = createSlice({
  name: 'stakingV2',
  initialState,
  reducers: {
    setStakeUser: (state, action) => {
      state.stakeUser = action.payload;
      state.fetched = true;
    },
    removeStakeUser: (state) => {
      state.stakeUser = undefined;
    },
    setFetched: (state, action) => {
      state.fetched = action.payload;
    },
    setMembers: (state, action) => {
      const members = (action.payload || []) as StakeMember[];
      state.members = members;
      state.memberCount = members.length;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
    setStakingPercent: (state, action) => {
      state.stakingPercent = action.payload?.stakingPercent;
      state.supplyStake = action.payload?.supplyStake;
      state.totalStake = action.payload?.totalStake;
    },
    setStakeLeaderBoard: (state, action) => {
      state.leaderBoards = action.payload;
    },
  },
});

export const {
  setStakeUser,
  removeStakeUser,
  setFetched,
  setMembers,
  setHistory,
  setStakingPercent,
  setStakeLeaderBoard,
} = stakingV2Slice.actions;

export default stakingV2Slice.reducer;
