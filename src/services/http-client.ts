import axios from 'axios';
import AuthenStorage from '@/utils/storage/authen.storage';
import { userAgent } from 'next/server';

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
      const token =
        AuthenStorage.getAuthenKey() || AuthenStorage.getGuestAuthenKey();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      const userInfo = {
        screen: window.location.pathname,
        timezone: new Date().toString(),
      };
      config.headers['user-data'] = JSON.stringify(userInfo);
      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (res) => {
      const result = res?.data?.data || res?.data?.result;
      if (res?.data?.count !== undefined) {
        return Promise.resolve({
          data: result,
          count: res.data.count,
        } as any);
      }
      const error = res?.data?.error;
      if (error && Object.keys(error).length) {
        return Promise.reject(error);
      }
      return Promise.resolve(result);
    },
    (error: any) => {
      if (!error.response) {
        return Promise.reject(error);
      } else {
        const response = error?.response?.data || error;
        const errorMessage =
          response?.error || error?.Message || JSON.stringify(error);
        return Promise.reject(errorMessage);
      }
    },
  );

  return instance;
};

export default createAxiosInstance;
