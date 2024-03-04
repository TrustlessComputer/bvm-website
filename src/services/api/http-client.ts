/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import { STORAGE_KEYS } from '@/constants/storage-key';
import LocalStorage from '@/libs/localStorage';
import { L2Service } from './auth';
import { store } from '@/stores';
import { setUserInfo } from '@/stores/states/auth/reducer';

export const TIMEOUT = 5 * 60000;
export const HEADERS = { 'Content-Type': 'application/json' };
export const RETRY_AUTH_MAX = 3;

let retryAuthCount = 0;

const retryAuth = async () => {
  const web3AuthToken = LocalStorage.getItem(STORAGE_KEYS.WEB3_AUTH_TOKEN);
  const apiAccessToken = await L2Service.register(web3AuthToken);
  if (apiAccessToken) {
    LocalStorage.setItem(STORAGE_KEYS.API_ACCESS_TOKEN, apiAccessToken);
    LocalStorage.setItem(STORAGE_KEYS.WEB3_AUTH_TOKEN, web3AuthToken);
    const userProfileWeb3 = await L2Service.getProfile();
    store.dispatch(setUserInfo(userProfileWeb3));
  }
};

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
      const authToken = LocalStorage.getItem(STORAGE_KEYS.API_ACCESS_TOKEN);
      const token = LocalStorage.getItem(STORAGE_KEYS.WEB3_AUTH_TOKEN);
      // if (authToken || token) {
      //   config.headers.Authorization = `${authToken || token}`;
      // }
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
        result.count = res.data.count;
      }
      const error = res?.data?.error;
      if (error && Object.keys(error).length) {
        return Promise.reject(error);
      }
      if (!result) {
        retryAuthCount = 0;
        return Promise.resolve(result);
      }
      if (typeof result === 'object') {
        // return Promise.resolve(camelCaseKeys(result));
        return result;
      }
      retryAuthCount = 0;
      return Promise.resolve(result);
    },
    (error: any) => {
      if (!error.response) {
        return Promise.reject(error);
      }
      let response = error.response;
      if (response && response.status === 401) {
        if (retryAuthCount < RETRY_AUTH_MAX) {
          retryAuthCount++;
          retryAuth();
        } else {
          // LocalStorage.removeItem(STORAGE_KEYS.API_ACCESS_TOKEN);
        }
      } else {
        response = error?.response?.data || error;
        const errorMessage =
          response?.error || error?.Message || JSON.stringify(error);
        return Promise.reject(errorMessage);
      }
    },
  );

  return instance;
};

export default createAxiosInstance;
