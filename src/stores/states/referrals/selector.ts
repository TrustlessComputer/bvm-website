import { RootState } from '@/stores';
import { UserReferral } from '@/stores/states/referrals/types';

export const userSelector = (state: RootState) =>
  state.referrals?.userReferral as UserReferral | undefined;
