/* eslint-disable @typescript-eslint/no-explicit-any */
import { L2ServiceAPI as httpClient } from '@/services/api/clients';
import {
  IOrderBuyEstimateRespone,
  IOrderBuyReq,
  SubmitFormParams,
} from './types';
import { IAvailableList } from '@/modules/blockchains/Buy/Buy.types';
import {
  AccountInfo,
  AccountInfoResp,
  IQuickStart,
  OrderItem,
  OrderItemResp,
  OrderStatus,
} from '@/stores/states/l2services/types';
import { builderAccountInfo, builderOrderList } from './helper';
import { COMPUTERS } from './constants';

export const estimateTotalCostAPI = async (
  params: IOrderBuyReq,
): Promise<IOrderBuyEstimateRespone> => {
  try {
    const data = (await httpClient.post(
      `/order/estimate-total-cost`,
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
    const data = await httpClient.post(`/service/contact`, params);
    return data;
  } catch (error: any) {
    console.log('[submitContact] error ', error);
    throw error;
  }
};

export const fetchAvailableList = async (): Promise<IAvailableList> => {
  try {
    let data = (await httpClient.get(
      `/order/available-list`,
    )) as IAvailableList;
    return data;
  } catch (error) {
    // console.log('[fetchAvailableList] ERROR: ', error);
    throw error;
  }
};

export const submitContactVS2 = async (params: SubmitFormParams) => {
  await httpClient.post(`/service/contact`, params);
};

export const orderBuyAPI = async (params: IOrderBuyReq): Promise<any> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = (await httpClient.post(`/order/register`, params)) as any;
    // console.log('[orderBuyAPI] data ', data);
    return data;
  } catch (error: any) {
    // console.log('[orderBuyAPI] error  ', error);
    throw error;
  }
};

export const validateChainIdAPI = async (chainId: string): Promise<any> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = (await httpClient.get(
      `/validate/chainid?id=${chainId}`,
    )) as any;
    // console.log('[validateChainIdAPI] data ', data);
    return data && data.valid;
  } catch (error: any) {
    // console.log('[validateChainIdAPI] error ', error);
    throw error;
  }
};

export const validateSubDomainAPI = async (subdomain: string): Promise<any> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = (await httpClient.get(
      `/validate/subdomain?domain=${subdomain + '.l2aas.trustless.computer'}`,
    )) as any;
    // console.log('[validateSubDomainAPI] data ', data);
    return data && data.valid;
  } catch (error: any) {
    // console.log('[validateSubDomainAPI] error ', error);
    throw error;
  }
};

export const fetchOrderListAPI = async (): Promise<OrderItem[]> => {
  const orders = (await httpClient.get(`/order/get-list`)) as OrderItemResp[];
  return builderOrderList(
    (orders || []).filter(
      (order) =>
        order.status !== OrderStatus.Canceled &&
        order.status !== OrderStatus.Timeout,
    ),
    true,
  );
};

const cancelOrder = async (orderID: string) => {
  await httpClient.post(`/order/cancel`, {
    orderId: orderID,
  });
};

const getAllOrders = async (): Promise<OrderItem[]> => {
  const orders = (await httpClient.get(`/order/list`)) as OrderItemResp[];
  return builderOrderList(
    COMPUTERS.concat(orders || []).filter(
      (order) => order.status === OrderStatus.Started,
    ),
    false,
  );
};

const accountGetInfo = async (): Promise<AccountInfo> => {
  const account = (await httpClient.get(
    `/account/get-info`,
  )) as AccountInfoResp;
  // TODO: remove this
  return builderAccountInfo({
    ...account,
  });
};

const getQuickStart = async (): Promise<Array<IQuickStart> | undefined> => {
  const data = (await httpClient.get(`/service/quick-start`)) as
    | Array<IQuickStart>
    | undefined;
  return data;
};

const l2ServicesAPI = {
  fetchOrderListAPI,
  orderBuyAPI,
  validateChainIdAPI,
  validateSubDomainAPI,

  fetchAvailableList,
  estimateTotalCostAPI,
  submitContact,
  submitContactVS2,

  getAllOrders,
  accountGetInfo,
  getQuickStart,
};

export default l2ServicesAPI;
