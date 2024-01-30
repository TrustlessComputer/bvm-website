import { createSlice } from '@reduxjs/toolkit';
import { ActivitiesState, IDaySecond } from './types';

const initialState: ActivitiesState = {
  daySecond: {
    topWinners: [],
  }
};

const slice = createSlice({
  name: 'activitiesState',
  initialState,
  reducers: {
    setDaySecondActivities: (state, actions) => {
      state.daySecond = actions.payload as IDaySecond;
    },
  },
});

export const {
  setDaySecondActivities
} = slice.actions;

export default slice.reducer;
