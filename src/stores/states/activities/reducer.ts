import { createSlice } from '@reduxjs/toolkit';
import { ActivitiesState, IDaySecond, NumberReport } from './types';

const initialState: ActivitiesState = {
  daySecond: {
    topWinners: [],
    bestPNL: undefined
  },
  numberReport: undefined,
};

const slice = createSlice({
  name: 'activitiesState',
  initialState,
  reducers: {
    setDaySecondActivities: (state, actions) => {
      state.daySecond = actions.payload as IDaySecond;
    },
    setNumberReport: (state, actions) => {
      state.numberReport = actions.payload as NumberReport;
    },
  },
});

export const {
  setDaySecondActivities,
  setNumberReport
} = slice.actions;

export default slice.reducer;
