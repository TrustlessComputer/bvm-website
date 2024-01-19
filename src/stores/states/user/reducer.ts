import { createSlice } from '@reduxjs/toolkit';
import { UserState } from './types';
import uniqueBy from '@popperjs/core/lib/utils/uniqueBy';

const initialState: UserState = {
  user: undefined,
  leaderBoard: [],
  leaderBoardCount: '',
  allowBTC: {
    status: [],
    loaded: false
  },
  allowCelestia: {
    status: [],
    loaded: false
  }
};

const slice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLeaderBoard: (state, action) => {
      state.leaderBoard = uniqueBy([...state.leaderBoard, ...action.payload.list], item => item.twitter_id);
      state.leaderBoardCount = action.payload.count;
    },
    setAllowBTC: (state, action) => {
      state.allowBTC = {
        status: action.payload.status,
        loaded: action.payload.loaded,
      };
    },
    setAllowCelestia: (state, action) => {
      state.allowCelestia = {
        status: action.payload.status,
        loaded: action.payload.loaded,
      };
    },
  },
});

export const {
  setUser,
  setLeaderBoard,
  setAllowBTC,
  setAllowCelestia
} = slice.actions;

export default slice.reducer;
