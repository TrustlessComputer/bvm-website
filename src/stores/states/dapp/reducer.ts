import { createSlice } from '@reduxjs/toolkit';
import { DappState, WalletType } from './types';

const initialState: DappState = {
  chain: undefined,
  loading: false,
  configs: [],
  tokens: [],
  stakingPools: [],
  airdropTasks: [],
  airdrops: [],
  dappConfigs: undefined,
  appInfos: [],
  yoloGames: [],
  tokensAll: [],
  walletType: undefined,
  whitePapers: [],
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
    setAirdrops: (state, actions) => {
      state.airdrops = actions.payload;
    },
    setDappConfigs: (state, actions) => {
      state.dappConfigs = actions.payload;
    },
    setAppInfos: (state, actions) => {
      state.appInfos = actions.payload;
    },
    setYoloGames: (state, actions) => {
      state.yoloGames = actions.payload;
    },
    setTokensAll: (state, actions) => {
      state.tokensAll = actions.payload;
    },
    setWalletType: (state, actions) => {
      state.walletType = actions.payload;
    },
    setWhitePapers: (state, actions) => {
      state.whitePapers = actions.payload;
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
  setAirdrops,
  setDappConfigs,
  setAppInfos,
  setYoloGames,
  setTokensAll,
  setWalletType,
  setWhitePapers,
} = slice.actions;

export default slice.reducer;
