import { createSlice } from '@reduxjs/toolkit';
import { Coin, CommonState } from './types';
import { IPublicSaleLuckyMoney } from '@/services/public-sale';

const initialState: CommonState = {
  needReload: 0,
  coinPrices: {
    [Coin.BTC]: '0',
    [Coin.ETH]: '0',
    [Coin.TIA]: '0',
  } as any,
  configs: null,
  leaderBoardMode: 1,
  needCheckDeposit: false,
  animatedLatestContributors: [],
  publicSaleDailyReward: undefined,
  luckyMoneyList: [],
  currentLuckyMoney: undefined
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
    setConfigs: (state, action) => {
      state.configs = action.payload;
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
    setPublicSaleDailyReward: (state, action) => {
      state.publicSaleDailyReward = action.payload;
    },
    setLuckyMoneyList: (state, action) => {
      state.luckyMoneyList = action.payload;
    },
    setCurrentLuckyMoney: (state, action) => {
      state.currentLuckyMoney = action.payload;
    },
  },
});

export const {
  requestReload,
  setCoinPrices,
  setConfigs,
  setLeaderBoardMode,
  setNeedCheckDeposit,
  setAnimatedLatestContributors,
  setPublicSaleDailyReward,
  setLuckyMoneyList,
  setCurrentLuckyMoney
} = slice.actions;

export default slice.reducer;
