import { createSlice } from '@reduxjs/toolkit';
import { EVMFieldType, UserState } from './types';
import uniqueBy from '@popperjs/core/lib/utils/uniqueBy';
import AuthenStorage from '@/utils/storage/authen.storage';
import NakaUserStorage from '@utils/storage/naka.storage';

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
  userToken: null,
  depositAddress: null,
  nakaUser: undefined,
} as any;

const slice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      } as any;
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
      state.publicSaleLeaderBoardVisual = uniqueBy(
        [...action.payload.list],
        (item) => item.twitter_id,
      );
    },
    setGuestSecretCode: (state, action) => {
      state.user = {
        ...state.user,
        guest_code: action.payload,
      } as any;
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
      AuthenStorage.setAuthenKey(action.payload);
    },
    removeUserToken: (state) => {
      (state as any).userToken = undefined;
      (state as any).user = undefined;
      AuthenStorage.setAuthenKey("");
      AuthenStorage.setGuestAuthenKey("");
    },
    setDepositAddress: (state, action) => {
      const key = state.userToken || AuthenStorage.getAuthenKey() || AuthenStorage.getGuestAuthenKey();
      if(key && typeof key === 'string') {
        state.depositAddress = {
          ...(state.depositAddress || {}),
          [(key as string).toLowerCase()]: action.payload
        }
      }
    },
    setNakaUser: (state, action) => {
      const address = action?.payload?.address;
      const token = action?.payload?.token;
      if (!!address && !!token) {
        state.nakaUser = {
          address: address,
          token: token
        }
        NakaUserStorage.setWalletToken(token)
        NakaUserStorage.setUserAddress(address)
      }

    }
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
  setUserToken,
  removeUserToken,
  setDepositAddress,
  setNakaUser,
} = slice.actions;

export default slice.reducer;
