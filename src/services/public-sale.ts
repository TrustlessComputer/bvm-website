import { IGenerateTOkenWithSecretCode, IPublicSaleDepositInfo, PublicSaleWalletInfo, PublicSaleWalletTokenDeposit } from '@/interfaces/vc';
import createAxiosInstance from '@/services/http-client';
import { PERP_API_URL } from '@/config';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import axios from 'axios';

const apiClient = createAxiosInstance({
  baseURL: `${PERP_API_URL}/api`,
});

export const getPublicsaleWalletInfo = async (): Promise<PublicSaleWalletTokenDeposit[]> => {
  const res = (await apiClient.get(`/bvm/sale/wallet`)) as unknown as PublicSaleWalletTokenDeposit[];
  return res;
}

export const postPublicsaleWalletInfo = async (): Promise<PublicSaleWalletInfo> => {
  const res = (await apiClient.post(`/bvm/sale/wallet`)) as unknown as PublicSaleWalletInfo;
  return res;
}

export const postPublicsaleWalletInfoManualCheck = async (): Promise<PublicSaleWalletInfo> => {
  const res = (await apiClient.post(`/bvm/sale/manual-check`)) as unknown as PublicSaleWalletInfo;
  return res;
}

export const generateTOkenWithSecretCode = async (secret_code: string, recaptcha: string): Promise<IGenerateTOkenWithSecretCode> => {
  const res = (await apiClient.post(`/bvm/generate-token-with-secret-code`, {secret_code}, {
    headers: {
      recaptcha
    }
  })) as unknown as IGenerateTOkenWithSecretCode;
  return res;
}

export const getPublicSaleLeaderBoards = async (params: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<any> => {
  const res = await apiClient.get(`/bvm/sale/leaderboards`, {params});
  return res;
};

export const getPublicSaleTop = async (params: {
  page?: number;
  limit?: number;
}): Promise<any> => {
  const res = await apiClient.get(`/bvm/sale/top`, {params});
  return { data: res };
};

export const getPublicSaleSummary = async (): Promise<IPublicSaleDepositInfo> => {
  const res = (await apiClient.get(`/bvm/sale/summary`)) as unknown as IPublicSaleDepositInfo;
  return res;
};
