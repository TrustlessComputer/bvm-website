import { PERP_API_URL } from '@/config';
import { VCInfo, VCWalletInfo } from '@/interfaces/vc';
import createAxiosInstance from '@/services/http-client';
import { camelCaseKeys } from '@/utils/normalize';
import AirdropStorage from '@/utils/storage/airdrop.storage';
import TimeChainStorage from '@/utils/storage/timechain.storage';
import axios from 'axios';

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

export const generateTokenWithTwPost = async (
  uuid: string,
  link?: string,
): Promise<any> => {
  try {
    const res = await apiClient.post(`/bvm/generate-token-with-twitter-post`, {
      secret_code: uuid,
      link: link,
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
    const res = await apiClient.post(`/bvm/request-auth-by-share-code`);
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

export const verifyNaka = async (params: any): Promise<any> => {
  try {
    const res = await apiClient.post(`/bvm/verify-naka`, params);
    return Object(camelCaseKeys(res));
  } catch (error) {
    throw error;
  }
};

export const getRaffleJoin = async (): Promise<any> => {
  try {
    const res = await apiClient.get(`/bvm/raffle/join`);
    return res;
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const joinRaffle = async (): Promise<any> => {
  try {
    const res = await apiClient.post(`/bvm/raffle/join`);
    AirdropStorage.setTimeChainClicked();
    TimeChainStorage.setTimeChainClicked();
    return res;
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const getRaffleUsers = async (params: any): Promise<any> => {
  try {
    const res = await apiClient.get(`/bvm/raffle/join`, { params });
    return res;
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const getVCWalletInfo = async ({
  vc_type,
  wallet_id,
}: any): Promise<VCWalletInfo> => {
  const res = (await apiClient.get(
    `/bvm/vc/wallet?vc_type=${vc_type}&wallet_id=${wallet_id}`,
  )) as unknown as VCWalletInfo;
  return res;
};

export const getVCInformation = async ({ vc_type }: any): Promise<VCInfo> => {
  const res = (await apiClient.get(
    `/bvm/vc/info?vc_type=${vc_type}`,
  )) as unknown as VCInfo;
  return res;
};

export const getBVMAirdrop = async (params: any): Promise<any> => {
  try {
    const res = await apiClient.get(`/bvm/airdrop`, { params });
    return res;
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const getGenerativeProfile = async (address: string): Promise<any> => {
  try {
    const res = await axios.get(
      `https://generative.xyz/generative/api/profile/wallet/${address}`,
    );
    return res?.data;
  } catch (error) {
    console.log(error);
  }

  return null;
};
