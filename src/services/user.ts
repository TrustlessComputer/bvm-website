import createAxiosInstance from '@/services/http-client';
import { PERP_API_URL } from '@/config';
import { User } from '@/stores/states/user/types';
import ReferralStorage from '@/utils/storage/referral.storage';

const apiClient = createAxiosInstance({
  baseURL: `${PERP_API_URL}/api/bvm`,
});

const submitReferralCode = async () => {
  try {
    const code = ReferralStorage.getReferralCode();
    if (code) {
      await apiClient.put('/user/update-referrer', {
        referral_code: code,
      });
    }
  } catch (error) {}
};

const getUser = async (): Promise<User | undefined> => {
  try {
    const userInfo = (await apiClient.get('/user/info')) as User | undefined;
    submitReferralCode();
    return userInfo;
  } catch (e) {
    return undefined;
  }
};

const submitReferralModularCode = async () => {
  try {
    const code = ReferralStorage.getReferralModular();
    if (code) {
      await apiClient.post('/user/modular-refer', {
        referral_code: code,
      });
    }
  } catch (error) {}
};

const userServices = {
  getUser,
  submitReferralModularCode,
};

export default userServices;
