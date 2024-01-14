import { PERP_API_URL } from '@/config';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import createAxiosInstance from './http-client';
import AuthenStorage from '@/utils/storage/authen.storage';

const apiClient = createAxiosInstance({
  baseURL: `${PERP_API_URL}/api`,
});

// set authorization token
export const setBearerToken = (token: string) => {
  if (token && apiClient) {
    apiClient.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );
  }
};

setBearerToken(AuthenStorage.getAuthenKey() as string);

const getTopLeaderBoards = async (params: {
  page?: number;
  limit?: number;
}): Promise<{ data: ILeaderBoardPoint[], count: string }> => {
  const res = (await apiClient.get(`/bvm/leaderboards`, {
    params,
  })) as any;

  const data: ILeaderBoardPoint[] = res?.data
  const count: string = res?.count

  return {
    data: (data || []).map(item => ({
      ...item,
      boost: Number(item.boost || '0').toString(),
    })),
    count: count
  };
};

const verifySignature = async (params: {
  address: string,
  message: string,
  signature: string,
  pubKey: string,
}) => {
  const res = (await apiClient.post(`/bvm/verify-btc-address`, params)) as any;
  return res
}

export {
  getTopLeaderBoards,
  verifySignature
}
