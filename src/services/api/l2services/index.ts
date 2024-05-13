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
  HistoryItemResp,
  IGetNonceReq,
  IGetNonceResp,
  IQuickStart,
  IVerifySignatureReq,
  IVerifySignatureResp,
  IVerifyTokenReq,
  IVerifyTokenResp,
  OrderItem,
  OrderItemResp,
  OrderStatus,
} from '@/stores/states/l2services/types';
import { builderAccountInfo, builderOrderList } from './helper';
import { COMPUTERS } from './constants';
import L2ServiceAuthStorage from '@/utils/storage/authV3.storage';
import {
  NativeTokenPayingGasEnum,
  NetworkEnum,
} from '@/modules/blockchains/Buy/Buy.constanst';

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

    // HARD CODE, CUSTOME Native Token BTC, because API not support BTC
    return {
      ...data,
      nativeTokenPayingGas: {
        [NetworkEnum.Network_Testnet]: [
          ...data.nativeTokenPayingGas[NetworkEnum.Network_Testnet],
          {
            intervalChargeTime: 0,
            price: '',
            priceNote: '',
            value: NativeTokenPayingGasEnum.NativeTokenPayingGas_BTC,
            valueStr: 'BTC',
          },
        ],
        [NetworkEnum.Network_Mainnet]: [
          ...data.nativeTokenPayingGas[NetworkEnum.Network_Mainnet],
          {
            intervalChargeTime: 0,
            price: '',
            priceNote: '',
            value: NativeTokenPayingGasEnum.NativeTokenPayingGas_BTC,
            valueStr: 'BTC',
          },
        ],
      },
    };
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

const verifySignature = async (
  params: IVerifySignatureReq,
): Promise<IVerifySignatureResp> => {
  const result = (await httpClient.post(`/auth/verify`, {
    tcAddress: params.tcAddress,
    signature: params.signature,
  })) as IVerifySignatureResp;
  return result;
};

const verifyAccessToken = async (
  params: IVerifyTokenReq,
): Promise<IVerifyTokenResp> => {
  const storageToken = L2ServiceAuthStorage.getToken(params.tcAddress);
  const isValid =
    storageToken?.tcAddress.toLowerCase() === params.tcAddress.toLowerCase();
  if (!isValid || !storageToken?.accessToken) {
    return {
      isValid: false,
    };
  }
  const result = (await httpClient.post(
    `/auth/verify-access-token`,
    {
      tcAddress: params.tcAddress,
    },
    {
      headers: {
        Authorization: `Bearer ${storageToken.accessToken}`,
      },
    },
  )) as IVerifyTokenResp;
  return result;
};

const getNonce = async (params: IGetNonceReq): Promise<IGetNonceResp> => {
  const data = (await httpClient.get(
    `/auth/nonce?tcAddress=${params.tcAddress}`,
  )) as IGetNonceResp;
  return data;
};

const fetchHistoryAPI = async (): Promise<any> => {
  try {
    const histories = (await httpClient.get(
      `/account/history`,
    )) as HistoryItemResp[];
    return histories?.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  } catch (error) {
    return [];
  }
};

export const getInstanceDetailByID = async (
  id: string,
): Promise<OrderItem | undefined> => {
  try {
    const data = (await httpClient.get(`/order/instance/${id}`)) as any;
    if (data && data.status === false) return undefined;
    return data as OrderItem;
  } catch (error: any) {
    console.log('[getInstanceDetailByID] ERROR ', error);
    return undefined;
  }
};

const setAccesTokenHeader = (accessToken: string) => {
  httpClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
};

const removeAccesTokenHeader = () => {
  httpClient.defaults.headers.Authorization = ``;
};

const l2ServicesAPI = {
  fetchOrderListAPI,
  orderBuyAPI,
  validateChainIdAPI,
  validateSubDomainAPI,

  fetchAvailableList,
  fetchHistoryAPI,
  estimateTotalCostAPI,
  submitContact,
  submitContactVS2,

  getAllOrders,
  accountGetInfo,
  getQuickStart,

  getNonce,
  verifySignature,
  verifyAccessToken,

  setAccesTokenHeader,
  removeAccesTokenHeader,
  getInstanceDetailByID,
};

export default l2ServicesAPI;
