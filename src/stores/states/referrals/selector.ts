import { RootState } from '@/stores';
import { IUserReferralInfo } from '@/interfaces/referral';

export const userReferralSelector = (state: RootState) =>
  state.referrals?.userReferral as IUserReferralInfo | undefined;
