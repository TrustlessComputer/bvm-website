"use client";

import axios, {
  Axios,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { isProduction } from '@utils/common';
import { store } from '@/stores';
import LocalStorage from '@/libs/localStorage';
import { STORAGE_KEYS } from '@constants/storage-key';

export const IGNORE_ADDRESS_TEXT = '';

class CDappApiClient {
  protected requestConfig: AxiosRequestConfig = {
    baseURL: `https://generral.appstore${isProduction() ? '' : '.dev'}.bvm.network/api`,
    timeout: 5 * 60000,
    headers: {
      "Content-Type": "application/json",
    },
  };

  api: Axios;

  constructor() {
    const chain = store.getState().dapp.chain;
    this.api = axios.create(this.requestConfig);

    this.api.interceptors.request.use(
      (config: any) => {
        const _config = config;
        const accessToken: string = LocalStorage.getItem(STORAGE_KEYS.L2_SERVICE_ACCESS_TOKEN_V2);

        _config.headers.Authorization = `${accessToken}`;
        let params = _config?.params;
        if (!params) {
          params = {};
        }
        if (!params?.network_id && !!chain) {
          params.network_id = chain.chainId;
        }
        return {
          ..._config,
          params,
        };
      },
      (error: AxiosError) => {
        Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (res: AxiosResponse) => {
        let result = res?.data?.data || res?.data?.result;
        const error = res?.data?.error;
        if (error) {
          return Promise.reject(error);
        }
        if (res?.data?.count !== undefined) {
          result = {
            rows: result,
            count: res?.data?.count,
          };
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
      }
    );
  }
}

export default CDappApiClient;
