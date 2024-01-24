import { IPublicSaleDepositInfo, PublicSaleWalletInfo } from '@/interfaces/vc';
import createAxiosInstance from '@/services/http-client';
import { PERP_API_URL } from '@/config';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import axios from 'axios';

const apiClient = createAxiosInstance({
  baseURL: `${PERP_API_URL}/api`,
});

export const getPublicsaleWalletInfo = async (): Promise<PublicSaleWalletInfo> => {
  const res = (await apiClient.get(`/bvm/sale/wallet`)) as unknown as PublicSaleWalletInfo;
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

export const getPublicSaleLeaderBoards = async (params: {
  page?: number;
  limit?: number;
}): Promise<any> => {
  const res = await apiClient.get(`/bvm/sale/leaderboards`);
  return res;
};

export const getPublicSaleSummary = async (): Promise<IPublicSaleDepositInfo> => {
  const res = (await apiClient.get(`/bvm/sale/summary`)) as unknown as IPublicSaleDepositInfo;
  return res;
};
