import { createSlice } from '@reduxjs/toolkit';
import { DappState } from './types';

const initialState: DappState = {
  chain: undefined,
  loading: false,
  configs: [],
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
  },
});

export const {
  setChain,
  setLoading,
  setConfigs,
} = slice.actions;

export default slice.reducer;
