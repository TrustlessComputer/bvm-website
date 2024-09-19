import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchIssueTokenListByChainID } from './actions';
import { PREFIX } from './constants';

import { IDAService } from './types';

export const initialState: IDAService = {
  isIssueTokenListFetched: false,
  isIssueTokenListFetching: false,
  issueTokenList: [],
};

const slice = createSlice({
  name: PREFIX,
  initialState,
  reducers: {
    setABC(state, action: PayloadAction<any>) {
      state.abc = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchIssueTokenListByChainID.pending, (state) => {
        state.isIssueTokenListFetching = true;
      })
      .addCase(fetchIssueTokenListByChainID.fulfilled, (state, action) => {
        state.isIssueTokenListFetching = false;
        state.isIssueTokenListFetched = true;
        state.issueTokenList = action.payload;
      })
      .addCase(fetchIssueTokenListByChainID.rejected, (state, _) => {
        state.isIssueTokenListFetching = false;
        state.isIssueTokenListFetched = true;
        state.issueTokenList = [];
      });
  },
});

export const { setABC } = slice.actions;

export default slice.reducer;
