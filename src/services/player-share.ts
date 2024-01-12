import { camelCaseKeys } from '@/utils/normalize';
import { PERP_API_URL } from '@/config';
import createAxiosInstance from '@/services/http-client';

const apiClient = createAxiosInstance({
  baseURL: `${PERP_API_URL}/api`,
});

export const generateToken = async (uuid: string | string[]): Promise<any> => {
  try {
    const res = await apiClient.post(`/user/generate-token`, {
      uuid,
    });
    return Object(camelCaseKeys(res));
  } catch (error) {
    console.log(error);
  }
  return;
};

export const generateTokenWithTwPost = async (uuid: string): Promise<any> => {
  try {
    const res = await apiClient.post(`/bvm/generate-token-with-twitter-post`, {
      secret_code: uuid,
    });
    return Object(camelCaseKeys(res));
  } catch (error) {
    console.log(error);
  }
  return;
};

export const requestAuthenByUserName = async (uuid: string): Promise<any> => {
  try {
    const res = await apiClient.post(
      `/user/request-auth-by-username?twitter_name=${uuid}`,
    );
    return res;
  } catch (error) {
    console.log(error);
  }
  return;
};

export const requestAuthenByShareCode = async (): Promise<any> => {
  try {
    const res = await apiClient.post(
      `/bvm/request-auth-by-share-code`,
    );
    return res;
  } catch (error) {
    console.log(error);
  }
  return;
};
