import { createSlice } from '@reduxjs/toolkit';
import { EVMFieldType, IAuthSetting, UserState } from './types';
import uniqueBy from '@popperjs/core/lib/utils/uniqueBy';
import AuthenStorage from '@/utils/storage/authen.storage';
import NakaUserStorage from '@utils/storage/naka.storage';
import { stateMethods } from '@walletconnect/legacy-types';

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

  x_token: undefined,
  authSetting: {
    naka_fee_enabled: false,
  },
  allow404: {
    status: [],
    loaded: false,
  },
  stakingBVM: {
    status: [],
    loaded: false,
  },
  holdingBTC: {
    status: [],
    loaded: false,
  },
  allowSAVM: {
    status: [],
    loaded: false,
  },
  holdingEAI: {
    status: [],
    loaded: false,
  },
  holdingRDNR: {
    status: [],
    loaded: false,
  },
  holdingSWPL2: {
    status: [],
    loaded: false,
  },
  holdingSWPSRC20: {
    status: [],
    loaded: false,
  },
} as any;


const _initialState: UserState = {
  ...initialState
}

const slice = createSlice({
  name: 'userState',
  initialState: _initialState,
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
      AuthenStorage.setAuthenKey('');
      AuthenStorage.setGuestAuthenKey('');
    },
    setDepositAddress: (state, action) => {
      const key =
        state.userToken ||
        AuthenStorage.getAuthenKey() ||
        AuthenStorage.getGuestAuthenKey();
      if (key && typeof key === 'string') {
        state.depositAddress = {
          ...(state.depositAddress || {}),
          [(key as string).toLowerCase()]: action.payload,
        };
      }
    },
    setNakaUser: (state, action) => {
      const address = action?.payload?.address;
      const token = action?.payload?.token;
      if (!!address && !!token) {
        state.nakaUser = {
          address: address,
          token: token,
        };
        NakaUserStorage.setWalletToken(token);
        NakaUserStorage.setUserAddress(address);
      }
    },
    setAuthSetting: (state, action) => {
      state.authSetting = {
        ...state.authSetting,
        ...action.payload,
      } as IAuthSetting;
    },
    setXToken: (state, action) => {
      state.x_token = action.payload;
    },
    setAllow404: (state, action) => {
      state.allow404 = {
        status: action.payload.status,
        loaded: action.payload.loaded,
      };
    },
    setStakingBVM: (state, action) => {
      state.stakingBVM = {
        status: action.payload.status,
        loaded: action.payload.loaded,
      };
    },
    setHoldingBTC: (state, action) => {
      state.holdingBTC = {
        status: action.payload.status,
        loaded: action.payload.loaded,
      };
    },
    setAllowSAVM: (state, action) => {
      state.allowSAVM = {
        status: action.payload.status,
        loaded: action.payload.loaded,
      };
    },
    setHoldingEAI: (state, action) => {
      state.holdingEAI = {
        status: action.payload.status,
        loaded: action.payload.loaded,
      };
    },
    setHoldingRNDR: (state, action) => {
      state.holdingRDNR = {
        status: action.payload.status,
        loaded: action.payload.loaded,
      };
    },
    setHoldingSWPL2: (state, action) => {
      state.holdingSWPL2 = {
        status: action.payload.status,
        loaded: action.payload.loaded,
      };
    },
    setHoldingSWPSRC20: (state, action) => {
      state.holdingSWPSRC20 = {
        status: action.payload.status,
        loaded: action.payload.loaded,
      };
    },
    resetUser: (state) => {
      state.nakaUser = undefined;
      NakaUserStorage.removeWalletToken();
      NakaUserStorage.removeUserAddress();
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
  setXToken,
  setAllow404,
  setStakingBVM,
  setHoldingBTC,
  setAllowSAVM,
  setHoldingEAI,
  setHoldingRNDR,
  setHoldingSWPL2,
  setHoldingSWPSRC20,
  setAuthSetting,
  resetUser,
} = slice.actions;

export default slice.reducer;
