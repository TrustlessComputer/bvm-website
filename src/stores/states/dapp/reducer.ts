import { createSlice } from '@reduxjs/toolkit';
import { DappState } from './types';

const initialState: DappState = {
  chain: undefined,
  loading: false,
  configs: [],
  tokens: [],
};

const slice = createSlice({
  name: 'dapp',
  initialState,
  reducers: {
    setLoading: (state, actions) => {
      state.loading = Boolean(actions.payload);
    },
    setChain: (state, actions) => {
      state.chain = actions.payload;
    },
    setConfigs: (state, actions) => {
      state.configs = actions.payload;
    },
    setTokens: (state, actions) => {
      state.tokens = actions.payload;
    },
  },
});

export const {
  setChain,
  setLoading,
  setConfigs,
  setTokens,
} = slice.actions;

export default slice.reducer;