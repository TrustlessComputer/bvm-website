import { PERP_API_URL } from '@/config';
import { IPagingParams } from './query';
import createAxiosInstance from './httpclient';

export const apiClient = createAxiosInstance({ baseURL: PERP_API_URL });

export const getListProposal = (params: {} & IPagingParams): Promise<any[]> => {
  return apiClient.get(`${PERP_API_URL}/api/proposal`, {
    params,
  });
};

export const getProposalDetail = (id: string): Promise<any> => {
  return apiClient.get(`${PERP_API_URL}/api/proposal/${id}`);
};
