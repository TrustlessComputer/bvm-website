import { camelCaseKeys } from '@/utils/normalize';
import { PERP_API_URL } from '@/config';
import createAxiosInstance from '@/services/http-client';
import { SignatureStatus } from '@/interfaces/whitelist';
import { VCInfo } from '@/interfaces/vc';

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

export const generateTokenWithTwPost = async (uuid: string, link?: string): Promise<any> => {
  try {
    const res = await apiClient.post(`/bvm/generate-token-with-twitter-post`, {
      secret_code: uuid,
      link: link
    });
    return Object(camelCaseKeys(res));
  } catch (error) {
    throw error;
    // console.log(error);
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

export const addAllowList = async (uuid: string): Promise<any> => {
  try {
    const res = await apiClient.post(`/bvm/add-allow-list`, {
      twitter_info: uuid,
    });
    return Object(camelCaseKeys(res));
  } catch (error) {
    console.log(error);
  }
  return;
};

export const getVCWalletInfo = async ({vc_type, wallet_id}: any): Promise<VCInfo> => {
  const res = (await apiClient.get(`/bvm/vc/wallet?vc_type=${vc_type}&wallet_id=${wallet_id}`)) as unknown as VCInfo;
  return res;
}
