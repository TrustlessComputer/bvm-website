import { createSlice } from '@reduxjs/toolkit';
import type { Wallet } from 'ethers';

import type { AuthState } from './types';
import { UserProfile } from '@/services/api/auth/types';

export const initialState: AuthState = {
  wallet: undefined,
  address: undefined,
  isAutoReconnecting: true,
  userInfo: undefined,
  walletBalance: '0',
  isLogged: false,
};

const chatSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setWallet: (
      state,
      actions: {
        payload: {
          wallet: Wallet;
          address: string;
        };
      },
    ) => {
      state.wallet = actions.payload.wallet;
      state.address = actions.payload.address;
    },
    setUserInfo: (
      state,
      actions: {
        payload: UserProfile;
      },
    ) => {
      state.userInfo = actions.payload;
    },

    setAutoReconnecting: (
      state,
      actions: {
        payload: boolean;
      },
    ) => {
      state.isAutoReconnecting = actions.payload;
    },
    setLogout: (state) => {
      state.wallet = undefined;
      state.address = undefined;
      state.userInfo = undefined;
    },
    setWalletBalance: (
      state,
      actions: {
        payload: string;
      },
    ) => {
      state.walletBalance = actions.payload;
    },
  },
});

export const {
  setWallet,
  setAutoReconnecting,
  setUserInfo,
  setLogout,
  setWalletBalance,
} = chatSlice.actions;

export default chatSlice.reducer;
