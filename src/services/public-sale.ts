import {
  IGenerateTOkenWithSecretCode,
  IPublicSaleDepositInfo,
  PublicSaleWalletInfo,
  PublicSaleWalletTokenDeposit,
} from '@/interfaces/vc';
import createAxiosInstance from '@/services/http-client';
import { PERP_API_URL } from '@/config';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import axios from 'axios';

const apiClient = createAxiosInstance({
  baseURL: `${PERP_API_URL}/api`,
});

export const getPublicsaleWalletInfo = async (): Promise<
  PublicSaleWalletTokenDeposit[]
> => {
  const res = (await apiClient.get(
    `/bvm/sale/wallet`,
  )) as unknown as PublicSaleWalletTokenDeposit[];
  return res;
};

export const postPublicsaleWalletInfo =
  async (): Promise<PublicSaleWalletInfo> => {
    const res = (await apiClient.post(
      `/bvm/sale/wallet`,
    )) as unknown as PublicSaleWalletInfo;
    return res;
  };

export const postPublicsaleWalletInfoManualCheck =
  async (): Promise<PublicSaleWalletInfo> => {
    const res = (await apiClient.post(
      `/bvm/sale/manual-check`,
    )) as unknown as PublicSaleWalletInfo;
    return res;
  };

export const generateTOkenWithSecretCode = async (
  secret_code: string,
  _recaptcha: string,
): Promise<IGenerateTOkenWithSecretCode> => {
  const res = (await apiClient.post(
    `/bvm/generate-token-with-secret-code`,
    { secret_code },
    {
      headers: {
        // recaptcha,
        'user-data': JSON.stringify({
          screen: window?.location?.pathname,
          timezone: new Date().toString(),
        }),
      },
    },
  )) as unknown as IGenerateTOkenWithSecretCode;
  return res;
};

export const generateTokenWithOauth = async (
  uuid: string,
): Promise<IGenerateTOkenWithSecretCode> => {
  const res = (await apiClient.post(`/bvm/generate-token-with-oauth`, {
    token: uuid,
  })) as unknown as IGenerateTOkenWithSecretCode;
  return res;
};

export const getPublicSaleLeaderBoards = async (params: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<any> => {
  const res = await apiClient.get(`/bvm/sale/leaderboards`, { params });
  return res;
};

export const getPublicSaleTop = async (params: {
  page?: number;
  limit?: number;
}): Promise<any> => {
  const res = await apiClient.get(`/bvm/sale/top`, { params });
  return { data: res };
};

export const getPublicSaleSummary =
  async (): Promise<IPublicSaleDepositInfo> => {
    const res = (await apiClient.get(
      `/bvm/sale/summary`,
    )) as unknown as IPublicSaleDepositInfo;
    return res;
  };

export const getPublicSaleContributionLatest = async (): Promise<
  ILeaderBoardPoint[]
> => {
  const res = (await apiClient.get(
    `/bvm/sale/latest`,
  )) as unknown as ILeaderBoardPoint[];
  return res;
};

export const saleManualCheck = async (recaptcha: string): Promise<any> => {
  const res = (await apiClient.post(
    `/bvm/sale/manual-check`,
    {},
    {
      headers: {
        recaptcha,
        'user-data': JSON.stringify({
          screen: window?.location?.pathname,
          timezone: new Date().toString(),
        }),
      },
    },
  )) as unknown as any;
  return res;
};

export const getLocation = async (): Promise<any> => {
  const res = (await axios.get(
    `https://api.bvm.network/api/ip-country`,
  )) as unknown as any;
  return res;
};

export interface IPublicSalePrograme {
  id: number;
  title: string;
  description: string;
  button_name: string;
  link: string;
  image: string;
  reward: string;
  start_date: string;
  end_date: string;
}

export const getPublicSaleProgram = async (): Promise<IPublicSalePrograme> => {
  const res = (await apiClient.get(
    `/bvm/sale-raffle/programes`,
  )) as unknown as IPublicSalePrograme;
  return res;
};

export const getRaffleJoinProgame = async (id: number): Promise<any> => {
  try {
    const res = await apiClient.get(`/bvm/sale-raffle/join?program_id=${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const joinRafflePrograme = async (id: number): Promise<any> => {
  try {
    const res = await apiClient.post(`/bvm/sale-raffle/join?program_id=${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }

  return null;
};
