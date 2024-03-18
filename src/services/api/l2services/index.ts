/* eslint-disable @typescript-eslint/no-explicit-any */
import { L2ServiceAPI as apiClient } from '@/services/api/clients';
import {
  IOrderBuyEstimateRespone,
  IOrderBuyReq,
  SubmitFormParams,
} from './types';

export const estimateTotalCostAPI = async (
  params: IOrderBuyReq,
): Promise<IOrderBuyEstimateRespone> => {
  try {
    const data = (await apiClient.post(
      `api/order/estimate-total-cost`,
      params,
    )) as IOrderBuyEstimateRespone;
    return data;
  } catch (error: any) {
    console.log('[estimateTotalCostAPI] error ', error);
    throw error;
  }
};

export const contactAPI = async (
  params: IOrderBuyReq,
): Promise<IOrderBuyEstimateRespone> => {
  try {
    const data = (await apiClient.post(
      `api/order/estimate-total-cost`,
      params,
    )) as IOrderBuyEstimateRespone;
    return data;
  } catch (error: any) {
    console.log('[estimateTotalCostAPI] error ', error);
    throw error;
  }
};

export const submitContact = async (params: SubmitFormParams) => {
  try {
    const data = await apiClient.post(`api/service/contact`, params);
    return data;
  } catch (error: any) {
    console.log('[submitContact] error ', error);
    throw error;
  }
};
