import { createSlice } from '@reduxjs/toolkit';
import { EVMFieldType, UserState } from './types';
import uniqueBy from '@popperjs/core/lib/utils/uniqueBy';

const initialState: UserState = {
  user: undefined,
  leaderBoard: [],
  leaderBoardCount: '',
  allowBTC: {
    status: [],
    loaded: false,
  },
  allowCelestia: {
    status: [],
    loaded: false,
  },
  publicSaleLeaderBoard: [],
  publicSaleLeaderBoardVisual: [],
  airdropAlphaUsers: null,
  airdropGMHolders: null,
  airdropGenerativeUsers: null,
  airdropPerceptronsHolders: null,
} as any;

const slice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLeaderBoard: (state, action) => {
      state.leaderBoard = uniqueBy(
        [...state.leaderBoard, ...action.payload.list],
        (item) => item.twitter_id,
      );
      state.leaderBoardCount = action.payload.count;
    },
    setAllowBTC: (state, action) => {
      state.allowBTC = {
        status: action.payload.status,
        loaded: action.payload.loaded,
      };
    },
    setAllowCelestia: (state, action) => {
      state.allowCelestia = {
        status: action.payload.status,
        loaded: action.payload.loaded,
      };
    },
    setAllowEVM: (state, action) => {
      const type: EVMFieldType = action.payload.actionType;
      if (type) {
        (state as any)[type] = {
          status: action.payload.status,
          loaded: action.payload.loaded,
        };
      }
    },
    setAirdropAlphaUsers: (state, action) => {
      state.airdropAlphaUsers = action.payload;
    },
    setAirdropGMHolders: (state, action) => {
      state.airdropGMHolders = action.payload;
    },
    setAirdropGenerativeUsers: (state, action) => {
      state.airdropGenerativeUsers = action.payload;
    },
    setAirdropPerceptronsHolders: (state, action) => {
      state.airdropPerceptronsHolders = action.payload;
    },
    setPublicSaleLeaderBoard: (state, action) => {
      state.publicSaleLeaderBoard = uniqueBy(
        [...state.publicSaleLeaderBoard, ...action.payload.list],
        (item) => item.twitter_id,
      );
    },
    clearPublicSaleLeaderBoard: (state) => {
      state.publicSaleLeaderBoard = [];
    },
    setPublicSaleLeaderBoardVisual: (state, action) => {
      state.publicSaleLeaderBoardVisual = uniqueBy([...action.payload.list], item => item.twitter_id);
    },
    setGuestSecretCode: (state, action) => {
      state.user = {
        ...state.user,
        guest_code: action.payload,
      } as any;
    },
  },
});

export const {
  setUser,
  setLeaderBoard,
  setAllowBTC,
  setAllowCelestia,
  setAllowEVM,
  setAirdropAlphaUsers,
  setAirdropGMHolders,
  setAirdropGenerativeUsers,
  setAirdropPerceptronsHolders,
  setPublicSaleLeaderBoard,
  clearPublicSaleLeaderBoard,
  setPublicSaleLeaderBoardVisual,
  setGuestSecretCode,
} = slice.actions;

export default slice.reducer;
