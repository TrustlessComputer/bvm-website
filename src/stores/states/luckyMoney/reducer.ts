import { createSlice } from '@reduxjs/toolkit';
import { LuckyMoneyState } from './types';

const initialState: LuckyMoneyState = {
  lastPackageId: undefined,
  currentPackageId: undefined,
};

const slice = createSlice({
  name: 'luckyMoneyState',
  initialState,
  reducers: {
    setLastPackageId: (state, actions) => {
      state.lastPackageId = actions.payload as number;
    },
    setCurrentPackageId: (state, actions) => {
      state.currentPackageId = actions.payload as number;
    },
  },
});

export const { setLastPackageId, setCurrentPackageId } = slice.actions;

export default slice.reducer;
