import { createSlice } from '@reduxjs/toolkit';
import { UserState } from './types';
import uniqueBy from '@popperjs/core/lib/utils/uniqueBy';

const initialState: UserState = {
  user: undefined,
  leaderBoard: [],
  leaderBoardCount: ''
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
  },
});

export const {
  setUser,
  setLeaderBoard
} = slice.actions;

export default slice.reducer;
