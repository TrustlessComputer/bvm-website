import { PERP_API_URL } from '@/config';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import createAxiosInstance from './http-client';
import AuthenStorage from '@/utils/storage/authen.storage';
import { SignatureStatus } from '@/interfaces/whitelist';

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
  const res = (await apiClient.post(`/bvm/verify-btc-address`, {
    address: params.address,
    message: params.message,
    signature: params.signature,
    pub_key: params.pubKey,
  })) as any;
  return res
};


const getSignatureStatus = async (): Promise<SignatureStatus[]> => {
  const res = (await apiClient.get(`/bvm/verify-btc-address`)) as SignatureStatus[];
  return res
}

const requestClaimBTCPoint = async (status: SignatureStatus[]) => {
  for (let i = 0; i < status.length; i++) {
    try {
      const item = status[i];
      if (item && item.status === 'unclaimed') {
        await apiClient.post(`/bvm/claim-btc-point/${item.id}`);
      }
    } catch (error) {
      // TODO: handle error
    }
  }
}

export {
  getTopLeaderBoards,
  verifySignature,
  getSignatureStatus,
  requestClaimBTCPoint
}
