import { PERP_API_URL } from '@/config';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import createAxiosInstance from './http-client';
import AuthenStorage from '@/utils/storage/authen.storage';

const apiClient = createAxiosInstance({
  baseURL: `${PERP_API_URL}/api`,
});

// set authorization token
export const setBearerToken = (token: string | string[]) => {
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
setBearerToken(AuthenStorage.getAuthenKey());

export const getTopLeaderBoards = async (params: {
  page?: number;
  limit?: number;
  address?: string;
}): Promise<ILeaderBoardPoint[]> => {
  const res: ILeaderBoardPoint[] = await apiClient.get(`/users/leaderboards`, {
    params,
  });

  return res;
};

export const spreadToFaucet = async (address: string): Promise<any> => {
  try {
    const res = await apiClient.post(`/users/spread-to-faucet`, { address });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getFaucetHistory = async (address: string): Promise<any[]> => {
  const res: any[] = await apiClient.get(
    `users/faucet/histories?network=naka&address=${address}`,
  );
  return res;
};
