import { createSlice } from '@reduxjs/toolkit';
import { LaupEAIState } from './types';
import { defaultSummary } from '../../services/laupEAI-payment.interfaces';
import uniqueBy from '@popperjs/core/lib/utils/uniqueBy';
import uniq from 'lodash/uniq';

const initialState: LaupEAIState = {
  depositExternal: undefined,
  depositNaka: undefined,
  birthEternal: undefined,
  birthEternalAddress: [],
  needCheckDeposit: false,
  animatedLatestContributors: [],
  publicSaleDailyReward: undefined,
  luckyMoneyList: [],
  currentLuckyMoney: undefined,
  publicSaleSummary: defaultSummary,
  oldPublicSaleSummary: defaultSummary,
  userContributeInfo: undefined,
  publicSaleLeaderBoardVisual: [],
  publicSaleLeaderBoard: [],
  hasSpreadTheLove: false,
};

const slice = createSlice({
  name: 'lpEAIPayment',
  initialState,
  reducers: {
    setWalletDeposit: (state, actions) => {
      const payload = actions?.payload;
      const address = (payload?.address || '') as string;
      // depositExternal,
      // depositNaka,
      const depositExternal = payload?.depositExternal || [];
      const depositNaka = payload?.depositNaka || [];
      if (!address || !depositExternal || !depositNaka) return;

      state.depositExternal = {
        ...(actions.payload || {}),
        [address.toLowerCase()]: depositExternal,
      };
      state.depositNaka = {
        ...(actions.payload || {}),
        [address.toLowerCase()]: depositNaka,
      };
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
    setPublicSaleSummary: (state, action) => {
      state.oldPublicSaleSummary = state.publicSaleSummary;
      state.publicSaleSummary = action.payload;
    },
    setUserContributeInfo: (state, action) => {
      state.userContributeInfo = action.payload;
    },
    setPublicSaleLeaderBoardVisual: (state, action) => {
      state.publicSaleLeaderBoardVisual = uniqueBy(
        [...action.payload.list],
        (item) => item.id,
      );
    },
    setPublicSaleLeaderBoard: (state, action) => {
      state.publicSaleLeaderBoard = uniqueBy(
        [...state.publicSaleLeaderBoard, ...action.payload.list],
        (item) => item.id,
      );
    },
    clearPublicSaleLeaderBoard: (state) => {
      state.publicSaleLeaderBoard = [];
    },
    setHasSpreadTheLove: (state, action) => {
      state.hasSpreadTheLove = action.payload;
    },
    setBirthEternal: (state, actions) => {
      const payload = actions?.payload;
      const address = (payload?.address || '') as string;
      // depositExternal,
      // depositNaka,
      const birthEternal = payload?.birthEternal;
      if (!address) return;

      state.birthEternal = {
        [address.toLowerCase()]: {
          ...birthEternal,
        },
      };
    },
    setBirthEternalAddress: (state, actions) => {
      const address = actions?.payload;
      if (address) {
        state.birthEternalAddress = uniq([
          ...state.birthEternalAddress,
          address,
        ]);
      }
    },
  },
});

export const {
  setWalletDeposit,
  setNeedCheckDeposit,
  setAnimatedLatestContributors,
  setPublicSaleDailyReward,
  setLuckyMoneyList,
  setCurrentLuckyMoney,
  setPublicSaleSummary,
  setUserContributeInfo,
  setPublicSaleLeaderBoardVisual,
  setPublicSaleLeaderBoard,
  clearPublicSaleLeaderBoard,
  setHasSpreadTheLove,
  setBirthEternal,
  setBirthEternalAddress,
} = slice.actions;

export default slice.reducer;
