import { PERP_API_URL } from '@/config';
import createAxiosInstance from './http-client';
import AuthenStorage from '@/utils/storage/authen.storage';
import { TopWinner } from '@/services/interfaces/activities';

const apiClient = createAxiosInstance({
  baseURL: `${PERP_API_URL}/api/bvm`,
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

setBearerToken((AuthenStorage.getAuthenKey() || AuthenStorage.getGuestAuthenKey()) as string);


const getTopWinnersNaka = async () => {
  const topWinners = (await apiClient.get("future/winner?page=&limit=")) as TopWinner[];
  return topWinners || [];
};

const activitiesAPI = {
  getTopWinnersNaka,
};

export default activitiesAPI;
