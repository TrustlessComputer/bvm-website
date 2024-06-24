/* eslint-disable @typescript-eslint/no-explicit-any */
import { L2ServiceAPI as httpClient } from '@/services/api/clients';
import {
  IOrderBuyEstimateRespone,
  IOrderBuyEstimateRespone_V2,
  SubmitFormParams,
} from './types';
import { IAvailableList } from '@/modules/blockchains/Buy/Buy.types';
import {
  AccountInfo,
  AccountInfoResp,
  HistoryItemResp,
  IGetNonceReq,
  IGetNonceResp,
  IOrderBuyReq,
  IOrderUpdate,
  IQuickStart,
  IVerifySignatureReq,
  IVerifySignatureResp,
  IVerifyTokenReq,
  IVerifyTokenResp,
  OrderItem,
  OrderItemResp,
  OrderStatus,
  WebsiteConfig,
} from '@/stores/states/l2services/types';
import { builderAccountInfo, builderOrderList } from './helper';
import { COMPUTERS } from './constants';
import L2ServiceAuthStorage from '@/utils/storage/authV3.storage';
import {
  NativeTokenPayingGasEnum,
  NetworkEnum,
} from '@/modules/blockchains/Buy/Buy.constanst';
import LocalStorage from '@/libs/localStorage';
import { STORAGE_KEYS } from '@/constants/storage-key';

// ------------------------------------------------------------------------
// Access Token
// ------------------------------------------------------------------------

const getAPIAccessToken = () => {
  return LocalStorage.getItem(STORAGE_KEYS.L2_SERVICE_ACCESS_TOKEN_V2);
};

// ------------------------------------------------------------------------
// Public API
// ------------------------------------------------------------------------
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
    throw error;
  }
};

export const estimateTotalCostAPI_V2 = async (
  params: IOrderBuyReq,
): Promise<IOrderBuyEstimateRespone_V2> => {
  try {
    const data = (await httpClient.post(
      `/order/estimate-total-cost`,
      params,
    )) as IOrderBuyEstimateRespone_V2;
    return data;
  } catch (error: any) {
    console.log('[estimateTotalCostAPI_V2] error ', error);
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

export const validateChainIdAPI = async (chainId: string): Promise<any> => {
  try {
    const data = (await httpClient.get(
      `/validate/chainid?id=${chainId}`,
    )) as any;
    return data && data.valid;
  } catch (error: any) {
    throw error;
  }
};

export const validateSubDomainAPI = async (subdomain: string): Promise<any> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = (await httpClient.get(
      `/validate/subdomain?domain=${subdomain + '.l2aas.trustless.computer'}`,
    )) as any;
    return data && data.valid;
  } catch (error: any) {
    throw error;
  }
};

// ------------------------------------------------------------------------
// Auth API
// ------------------------------------------------------------------------

export const orderBuyAPI = async (params: IOrderBuyReq): Promise<any> => {
  try {
    const data = (await httpClient.post(`/order/register`, params, {
      headers: {
        Authorization: `${getAPIAccessToken()}`,
      },
    })) as any;
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const orderUpdateAPI = async (
  params: IOrderUpdate,
  orderId: string,
): Promise<any> => {
  try {
    const data = (await httpClient.put(`/order/update/${orderId}`, params, {
      headers: {
        Authorization: `${getAPIAccessToken()}`,
      },
    })) as any;
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const orderDetailByID = async (orderId: string): Promise<OrderItem> => {
  try {
    const data = (await httpClient.get(
      `/order/detail/${orderId}`,
    )) as OrderItem;
    return data;
  } catch (error: any) {
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

export const submitContactVS2 = async (params: SubmitFormParams) => {
  await httpClient.post(`/service/contact`, params);
};

export const fetchOrderListAPI = async (): Promise<OrderItem[]> => {
  const accessToken = getAPIAccessToken();
  if (!accessToken) return [];

  const orders = (await httpClient.get(`/order/get-list`, {
    headers: {
      Authorization: `${getAPIAccessToken()}`,
    },
  })) as OrderItemResp[];
  return builderOrderList(
    (orders || []).filter(
      (order) =>
        order.status !== OrderStatus.Canceled &&
        order.status !== OrderStatus.Timeout,
    ),
    true,
  );
};

export const cancelOrder = async (orderID: string) => {
  await httpClient.post(
    `/order/cancel`,
    {
      orderId: orderID,
    },
    {
      headers: {
        Authorization: `${getAPIAccessToken()}`,
      },
    },
  );
};

export const getAllOrders = async (): Promise<OrderItem[]> => {
  let orders = (await httpClient.get(`/order/list`)) as OrderItemResp[];

  // console.log('Orders: Before Filter ', orders);
  // return builderOrderList(
  //   COMPUTERS.concat(orders || []).filter(
  //     (order) => order.status === OrderStatus.Started && !!order.thumb,
  //   ),
  //   false,
  // );

  orders = orders.filter((order) => order.status === OrderStatus.Started);

  // console.log('Orders: After Filter ', orders);

  return builderOrderList(orders, false);
};

export const accountGetInfo = async (): Promise<AccountInfo | undefined> => {
  const accessToken = getAPIAccessToken();

  if (!accessToken) return undefined;
  try {
    const account = (await httpClient.get(`/account/get-info`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    })) as AccountInfoResp;
    return builderAccountInfo({
      ...account,
    });
  } catch (error) {
    throw error;
  }
};

export const getQuickStart = async (): Promise<
  Array<IQuickStart> | undefined
> => {
  const data = (await httpClient.get(`/service/quick-start`)) as
    | Array<IQuickStart>
    | undefined;
  return data;
};

export const verifySignature = async (
  params: IVerifySignatureReq,
): Promise<IVerifySignatureResp> => {
  const result = (await httpClient.post(`/auth/verify`, {
    tcAddress: params.tcAddress,
    signature: params.signature,
  })) as IVerifySignatureResp;
  return result;
};

export const verifyAccessToken = async (
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

export const getNonce = async (
  params: IGetNonceReq,
): Promise<IGetNonceResp> => {
  const data = (await httpClient.get(
    `/auth/nonce?tcAddress=${params.tcAddress}`,
  )) as IGetNonceResp;
  return data;
};

export const fetchHistoryAPI = async (): Promise<any> => {
  const accessToken = getAPIAccessToken();
  if (!accessToken) return [];
  try {
    const histories = (await httpClient.get(`/account/history`, {
      headers: {
        Authorization: `${getAPIAccessToken()}`,
      },
    })) as HistoryItemResp[];
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

export const getConfigInfor = async (
  networkName: string,
): Promise<WebsiteConfig | undefined> => {
  try {
    const data = (await httpClient.get(
      `/config/bridge-site/${networkName}`,
    )) as any;

    if (data && data.status === false) return undefined;
    return data as WebsiteConfig;
  } catch (error: any) {
    console.log('[getConfigInfor] ERROR ', error);
    throw error;
  }
};

export const updateConfigInfor = async (
  networkName: string,
  configData: WebsiteConfig,
): Promise<WebsiteConfig | undefined> => {
  try {
    const data = (await httpClient.put(
      `/config/bridge-site/${networkName}`,
      configData,
    )) as any;
    if (data && data.status === false) return undefined;
    return data as WebsiteConfig;
  } catch (error: any) {
    console.log('[updateConfigInfor] ERROR ', error);
    return undefined;
  }
};

export const revokeAuthentication = async (): Promise<void> => {
  try {
    const res = await httpClient.post(`/auth/revoke`, undefined, {
      headers: {
        Authorization: `${getAPIAccessToken()}`,
      },
    });
    console.log('revokeAuthentication', res);
  } catch (error) {
    console.log('revokeAuthentication error', error);
    throw error;
  }
};

export const uploadLogoFile = async (
  file: File,
): Promise<string | undefined> => {
  const accessToken = getAPIAccessToken();
  if (!accessToken) return undefined;
  try {
    let formData = new FormData();
    formData.append('file', file);
    const result: string = await httpClient.post(
      `/order/upload/file`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${getAPIAccessToken()}`,
        },
      },
    );
    return result;
  } catch (error) {
    throw error;
  }
};

type L2serviceTrackingParams = {
  eventLabel: string;
  tcAddress?: string;
};

export const L2ServiceTracking = async (
  params: L2serviceTrackingParams,
): Promise<void> => {
  try {
    const res = await httpClient.post(
      `/log-events?tcAddress=${params.tcAddress}`,
      {
        event: 'click',
        lebel: params.eventLabel,
      },
    );
  } catch (error) {
    // console.log('L2serviceTracking error', error);
  }
};

const setAccesTokenHeader = (accessToken: string) => {
  // httpClient.defaults.headers.Authorization = `${accessToken}`;
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
  estimateTotalCostAPI_V2,
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

  getConfigInfor,
  updateConfigInfor,
  cancelOrder,

  orderUpdateAPI,
  orderDetailByID,

  L2ServiceTracking,
  uploadLogoFile,
};

export default l2ServicesAPI;
