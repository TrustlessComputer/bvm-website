import { createSlice } from '@reduxjs/toolkit';
import { DappState } from './types';

const initialState: DappState = {
  chain: undefined,
  loading: false,
  configs: [],
  tokens: [],
  stakingPools: [],
  airdropTasks: [],
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
    setStakingPools: (state, actions) => {
      state.stakingPools = actions.payload;
    },
    setAirdropTasks: (state, actions) => {
      state.airdropTasks = actions.payload;
    },
  },
});

export const {
  setChain,
  setLoading,
  setConfigs,
  setTokens,
  setStakingPools,
  setAirdropTasks,
} = slice.actions;

export default slice.reducer;
