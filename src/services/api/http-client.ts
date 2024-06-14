import web3AuthNoModal from '@/Providers/Web3Auth_vs2/Web3Auth.initNoModal';
import { STORAGE_KEYS } from '@/constants/storage-key';
import LocalStorage from '@/libs/localStorage';
import { store } from '@/stores';
import axios from 'axios';

export const TIMEOUT = 5 * 60000;
export const HEADERS = { 'Content-Type': 'application/json' };

const createAxiosInstance = ({ baseURL = '' }: { baseURL: string }) => {
  const instance = axios.create({
    baseURL,
    timeout: TIMEOUT,
    headers: {
      ...HEADERS,
    },
  });

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (res) => {
      // console.log('RESPONE OK: ', res);
      const result = res?.data?.data || res?.data?.result || res?.data;
      if (res?.data?.count !== undefined) {
        result.count = res.data.count;
      }

      const error = res?.data?.error;
      if (error && Object.keys(error).length) {
        return Promise.reject(error);
      }
      if (!result) {
        return Promise.resolve(result);
      }
      if (typeof result === 'object') {
        // return Promise.resolve(camelCaseKeys(result));
        return result;
      }
      return Promise.resolve(result);
    },
    async (error: any) => {
      // console.log('RESPONE ERROR: ', error);
      if (!error.response) {
        return Promise.reject(error);
      }
      const statusCode = error?.response?.status;
      if (statusCode >= 500) {
        return Promise.reject(`${statusCode}: Internal Server Error`);
      }
      if (statusCode === 401) {
        LocalStorage.removeItem(STORAGE_KEYS.L2_SERVICE_ACCESS_TOKEN_V2);
        await web3AuthNoModal?.logout();
        return Promise.reject(`${statusCode}: Unauthenticated`);
      }
      const response = error?.response?.data || error;
      const errorMessage =
        response?.error || error?.Message || JSON.stringify(error);
      return Promise.reject(errorMessage);
    },
  );

  return instance;
};

export default createAxiosInstance;
