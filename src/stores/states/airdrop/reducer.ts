import { createSlice } from '@reduxjs/toolkit';
import { CommonState } from './types';
import { RootState } from '@/stores';
import { compareString } from '@/utils/string';

const initialState: CommonState = {
  airdrops: [],
};

const slice = createSlice({
  name: 'airdrop',
  initialState,
  reducers: {
    setAirdrop: (state, actions) => {
      const airdrop = state.airdrops.findIndex((v) =>
        compareString(v.type, actions.payload?.type),
      );

      if (airdrop >= 0) {
        state.airdrops[airdrop] = actions.payload;
      } else {
        state.airdrops = [...state.airdrops, actions.payload];
      }
    },
  },
});

export const { setAirdrop } = slice.actions;

export const airdropSelector = (state: RootState) => state.airdrop;

export default slice.reducer;
