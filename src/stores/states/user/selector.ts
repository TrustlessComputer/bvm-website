import { RootState } from '@/stores';

export const userSelector = (state: RootState) => state.user?.user;
