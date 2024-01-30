import { RootState } from '@/stores';
import { ActivitiesState } from '@/stores/states/activities/types';

export const activitiesSelector = (state: RootState) => state.activities;
export const daySecondSelector = (state: RootState) => (state.activities as ActivitiesState).daySecond;
