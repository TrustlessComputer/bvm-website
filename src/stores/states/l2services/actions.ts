import { createAsyncThunk } from '@reduxjs/toolkit';
import { PREFIX } from './constants';
import { IOrderBuyReq, OrderItem } from './types';
import l2ServicesAPI from '@/services/api/l2services';
import { RootState } from '@/stores';

const fetchAvailableList = createAsyncThunk(
  `${PREFIX}/fetchAvailableList`,
  async (_, { getState }) => {
    try {
      const state = getState() as RootState;
      const l2ServicesState = state.l2Services;
      const { availableListFetched, availableList, availableListFetching } =
        l2ServicesState;
      if (!availableListFetched && !availableList) {
        return await l2ServicesAPI.fetchAvailableList();
      } else {
        return availableList;
      }
    } catch (error) {
      return undefined;
    }
  },
);

const fetchAccountInfo = createAsyncThunk(
  `${PREFIX}/fetchAccountInfo`,
  async () => {
    try {
      const data = await l2ServicesAPI.accountGetInfo();
      return data;
    } catch (error) {
      return undefined;
    }
  },
);

const fetchOrderList = createAsyncThunk(
  `${PREFIX}/fetchOrderList`,
  async (): Promise<OrderItem[]> => {
    try {
      const orders = await l2ServicesAPI.fetchOrderListAPI();
      return orders;
    } catch (error) {
      return [];
    }
  },
);

const fetchAllOrders = createAsyncThunk(
  `${PREFIX}/fetchAllOrders`,
  async (): Promise<OrderItem[]> => {
    try {
      const orders = await l2ServicesAPI.getAllOrders();
      return orders;
    } catch (error) {
      return [];
    }
  },
);

const orderBuy = createAsyncThunk(
  `${PREFIX}/orderBuy`,
  async (params: IOrderBuyReq): Promise<any> => {
    try {
      const result = await l2ServicesAPI.orderBuyAPI(params);
      return result;
    } catch (error) {
      return [];
    }
  },
);

const getQuickStart = createAsyncThunk(`${PREFIX}/getQuickStart`, async () => {
  try {
    const data = await l2ServicesAPI.getQuickStart();
    return data;
  } catch (error) {
    return undefined;
  }
});

const fetchL2ServiceHistory = createAsyncThunk(
  `${PREFIX}/fetchHistory`,
  async () => {
    try {
      const data = await l2ServicesAPI.fetchHistoryAPI();
      return data;
    } catch (error) {
      // console.log('[fetchHistory] ERROR ', error);
      return [];
    }
  },
);

// const actionCreators = {
//   setOrderSelected,
// };

// Export Pure Actions
// export { actionCreators };

// Export Async Actions
export {
  fetchOrderList,
  orderBuy,
  fetchAllOrders,
  fetchAccountInfo,
  fetchL2ServiceHistory,
  getQuickStart,
  fetchAvailableList,
};
