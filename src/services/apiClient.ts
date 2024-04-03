'use client';

import axios, {
  Axios,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { PERP_API_URL } from '@/config';
import NakaUserStorage from '@utils/storage/naka.storage';

class CApiClient {
  private requestConfig: AxiosRequestConfig = {
    baseURL: PERP_API_URL,
    timeout: 5 * 60000,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  api: Axios;
  addressL2: string = NakaUserStorage.getUserAddress() || '';
  constructor() {
    this.api = axios.create(this.requestConfig);

    this.api.interceptors.request.use(
      (config: any) => {
        const _config = config;

        _config.headers.Authorization = `Bearer ${NakaUserStorage.getWalletToken()}`;
        let params = _config?.params;
        if (!params) {
          params = {};
        }
        if (!params?.network) {
          params.network = 'naka';
        }
        if (!params?.address) {
          params.address = this.addressL2;
        }

        return {
          ..._config,
          params,
        };
      },
      (error: AxiosError) => {
        Promise.reject(error);
      },
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
      },
    );
  }
}

export default CApiClient;
