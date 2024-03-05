/* eslint-disable @typescript-eslint/no-explicit-any */
import { L2ServiceAPI as apiClient } from '@/services/api/clients';

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
