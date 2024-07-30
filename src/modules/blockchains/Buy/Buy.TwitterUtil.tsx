import { PERP_API_URL } from '@/config';
import createAxiosInstance from '@/services/http-client';

const apiClient = createAxiosInstance({
  baseURL: `${PERP_API_URL}/api/bvm`,
});

export interface User {
  id: string;
  network: string;
  twitter_id: string;
  twitter_username: string;
  twitter_name: string;
  twitter_avatar: string;
  ranking: string;
  need_active: boolean;
  point: string;
  bvm_point: string;
  gas_point: string;
  content_point: string;
  referral_code: string;
  referrer_twitter_id: string;
  num_view: string;
  num_retweet: string;
  num_like: string;
  num_quote: string;
  num_post: string;
  boost: string;
}

export const getUser = async (
  twitterAccessToken: string,
): Promise<User | undefined> => {
  apiClient.defaults.headers.Authorization = `Bearer ${twitterAccessToken}`;
  try {
    const userInfo = (await apiClient.get('/user/info')) as User | undefined;
    return userInfo;
  } catch (e) {
    return undefined;
  }
};
