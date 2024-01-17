import { createSlice } from '@reduxjs/toolkit';
import { CommonState } from './types';

const initialState: CommonState = {
  needReload: 0,
  coinPrices: {
    BTC: '0',
    ETH: '0',
  },
};

const slice = createSlice({
  name: 'commonState',
  initialState,
  reducers: {
    requestReload: (state) => {
      state.needReload += 1;
    },
    updateCoinPrices: (state, actions) => {
      state.coinPrices = actions.payload;
    },
  },
});

export const {
  requestReload,
  updateCoinPrices,
} = slice.actions;

export default slice.reducer;
