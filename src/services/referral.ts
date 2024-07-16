import createAxiosInstance from '@/services/http-client';
import { API_DGAMES } from '@/config';

const API_PATH = 'v1/referral';

const apiClient = createAxiosInstance({ baseURL: API_DGAMES });

export const getReferralCode = async () => {
  return ((await apiClient.get(`${API_DGAMES}/${API_PATH}/code`)) as any).code;
};

export const getReferralCodeByTwId = async (payload: {
  twitter_id: string;
}) => {
  return (
    (await apiClient.get(
      `${API_DGAMES}/${API_PATH}/get-referral-code?twitterId=${payload.twitter_id}`,
    )) as any
  ).code;
};
