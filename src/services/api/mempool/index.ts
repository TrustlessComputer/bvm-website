import { Axios, AxiosError, AxiosResponse } from 'axios';
import { IMempoolBlock, IMempoolTransactionStatus } from './interface';

class CMempoolApi {
  #api = new Axios({ baseURL: 'https://mempool.space/api' });

  constructor() {
    this.#api.interceptors.request.use(
      (config: any) => {
        return config;
      },
      (error: AxiosError) => {
        Promise.reject(error);
      },
    );

    this.#api.interceptors.response.use(
      (res: AxiosResponse) => {
        let result = res?.data || res?.data?.result;
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
        return Promise.resolve(JSON.parse(result));
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

  getBlocks = async (): Promise<IMempoolBlock[]> => {
    try {
      const rs: IMempoolBlock[] = await this.#api.get(
        '/v1/fees/mempool-blocks',
      );

      return rs || [];
    } catch (error) {
      return [];
    }
  };

  getTransactionTime = async (txHash: string): Promise<number[]> => {
    try {
      const rs: any = await this.#api.get('/v1/transaction-times', {
        params: {
          'txId[]': txHash,
        },
      });

      return rs || [];
    } catch (error) {
      return [];
    }
  };

  getTransactionStatus = async (
    txHash: string,
  ): Promise<IMempoolTransactionStatus | undefined> => {
    try {
      const rs: any = await this.#api.get(`/tx/${txHash}/status`);

      return rs;
    } catch (error) {
      return undefined;
    }
  };
}

export default CMempoolApi;
