import { createSlice } from '@reduxjs/toolkit';
import { CommonState } from './types';

const initialState: CommonState = {
  needReload: 0,
};

const slice = createSlice({
  name: 'commonState',
  initialState,
  reducers: {
    requestReload: (state) => {
      state.needReload += 1;
    },
  },
});

export const {
  requestReload,
} = slice.actions;

export default slice.reducer;
