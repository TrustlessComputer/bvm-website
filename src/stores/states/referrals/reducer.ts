import { createSlice } from '@reduxjs/toolkit';
import { UserState } from './types';

const initialState: UserState = {
  userReferral: undefined,
} as any;


const _initialState: UserState = {
  ...initialState
}

const slice = createSlice({
  name: 'userState',
  initialState: _initialState,
  reducers: {
    setUserReferral: (state, action) => {
      state.userReferral = {
        ...state.userReferral,
        ...action.payload,
      } as any;
    },
  }
});

export const {
  setUserReferral,
} = slice.actions;

export default slice.reducer;
