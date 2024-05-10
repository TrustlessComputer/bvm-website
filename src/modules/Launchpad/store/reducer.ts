import { createSlice } from '@reduxjs/toolkit';
import { LaunchpadState } from './types';
import { RootState } from '@/stores';

const initialState: LaunchpadState = {
  create_step: 0,
  create_body: {},
  create_fee_options: [],
  created_launchpad_id: undefined,
  oldCountCurrentLeaderboard: 0,
  countCurrentLeaderboard: 0,
  oldCountTotalTickets: 0,
  countTotalTickets: 0,
  leaderBoards: [],
  blockScout: {
    address: 0,
    total_blocks: 0,
    total_transactions: 0,
    tvl: '0',
  },
  oldBlockScout: {
    address: 0,
    total_blocks: 0,
    total_transactions: 0,
    tvl: '0',
  },
  myDataLeaderBoard: {},
};

const slice = createSlice({
  name: 'launchpad',
  initialState,
  reducers: {
    setCreateStep: (state, actions) => {
      state.create_step = actions.payload as number;
    },
    setCreateBody: (state, actions) => {
      state.create_body = {
        ...state.create_body,
        ...actions.payload,
      };
    },
    setCreateFeeOptions: (state, actions) => {
      state.create_fee_options = actions.payload;
    },
    setCreatedLaunchpadId: (state, actions) => {
      state.created_launchpad_id = actions.payload;
    },
    setCountCurrentLeaderboard: (state, actions) => {
      state.countCurrentLeaderboard = actions.payload;
    },
    setOldCountCurrentLeaderboard: (state, actions) => {
      state.oldCountCurrentLeaderboard = actions.payload;
    },
    setCountTotalTickets: (state, actions) => {
      state.countTotalTickets = actions.payload;
    },
    setOldCountTotalTickets: (state, actions) => {
      state.oldCountTotalTickets = actions.payload;
    },
    setLeaderboards: (state, actions) => {
      state.leaderBoards = actions.payload;
    },
    setBlockScout: (state, actions) => {
      state.blockScout = actions.payload;
    },
    setOldBlockScout: (state, actions) => {
      state.oldBlockScout = actions.payload;
    },
    setMyDataLeaderBoard: (state, actions) => {
      state.myDataLeaderBoard = actions.payload;
    },
  },
});

export const {
  setCreateStep,
  setCreateBody,
  setCreateFeeOptions,
  setCreatedLaunchpadId,
  setCountCurrentLeaderboard,
  setOldCountCurrentLeaderboard,
  setCountTotalTickets,
  setOldCountTotalTickets,
  setLeaderboards,
  setOldBlockScout,
  setBlockScout,
  setMyDataLeaderBoard,
} = slice.actions;

export const launchpadSelector = (state: RootState) => state.launchpad;

export default slice.reducer;
