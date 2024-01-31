import { createSlice } from '@reduxjs/toolkit';
import { Coin, CommonState } from './types';

const initialState: CommonState = {
  needReload: 0,
  coinPrices: {
    [Coin.BTC]: '0',
    [Coin.ETH]: '0',
    [Coin.TIA]: '0',
  } as any,
  leaderBoardMode: 1,
  needCheckDeposit: false,
  animatedLatestContributors: [],
};

const slice = createSlice({
  name: 'commonState',
  initialState,
  reducers: {
    requestReload: (state) => {
      state.needReload += 1;
    },
    setCoinPrices: (state, action) => {
      state.coinPrices = action.payload;
    },
    setLeaderBoardMode: (state, action) => {
      state.leaderBoardMode = action.payload;
    },
    setNeedCheckDeposit: (state, action) => {
      state.needCheckDeposit = action.payload;
    },
    setAnimatedLatestContributors: (state, action) => {
      state.animatedLatestContributors = action.payload;
    },
  },
});

export const {
  requestReload,
  setCoinPrices,
  setLeaderBoardMode,
  setNeedCheckDeposit,
  setAnimatedLatestContributors
} = slice.actions;

export default slice.reducer;
