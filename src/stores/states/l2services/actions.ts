import { createAsyncThunk } from '@reduxjs/toolkit';
import { PREFIX } from './constants';
import { IOrderBuyReq, OrderItem } from './types';
import l2ServicesAPI from '@/services/api/l2services';
import { RootState } from '@/stores';
import dAppServicesAPI from '@/services/api/DAServices';

const fetchAvailableList = createAsyncThunk(
  `${PREFIX}/fetchAvailableList`,
  async (_, { getState }) => {
    try {
      const state = getState() as RootState;
      const { availableListFetched, availableList, availableListFetching } =
        state.l2Services;
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

const fetchDAList = createAsyncThunk(`${PREFIX}/fetchDAList`, async () => {
  try {
    const data = await dAppServicesAPI.fetchDAList();
    return data;
  } catch (error) {
    return undefined;
  }
});

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

const fetchOrderDetailByID = createAsyncThunk(
  `${PREFIX}/fetchOrderDetailByID`,
  async (orderId: string, { getState }) => {
    try {
      const state = getState() as RootState;
      const { orderDetail, isOrderDetailFetched } = state.l2Services;
      if (!isOrderDetailFetched && !orderDetail) {
        const data = await l2ServicesAPI.orderDetailByID(orderId);
        return data;
      } else {
        return orderDetail;
      }
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

const fetchAllOrdersV2 = createAsyncThunk(
  `${PREFIX}/fetchAllOrdersV2`,
  async (): Promise<OrderItem[]> => {
    try {
      const orders = await l2ServicesAPI.getAllOrdersV2();
      return orders;
    } catch (error) {
      return [];
    }
  },
);

const fetchModelCategories = createAsyncThunk(
  `${PREFIX}/fetchModelCategories`,
  async (tcAddres: string, { getState }) => {
    try {
      const state = getState() as RootState;
      const { modelCategories, isModelCategoriesFetched } = state.l2Services;
      if (!isModelCategoriesFetched && !modelCategories) {
        const data = await l2ServicesAPI.getModalCategories(tcAddres);
        return data;
      } else {
        return modelCategories;
      }
    } catch (error) {
      return undefined;
    }
  },
);

const fetchAvailableListTemplate = createAsyncThunk(
  `${PREFIX}/fetchAvailableListTemplate`,
  async (_, { getState }) => {
    try {
      const state = getState() as RootState;
      const { isAvailableListTemplateFetched, availableListTemplate } =
        state.l2Services;
      if (!isAvailableListTemplateFetched && !availableListTemplate) {
        const data = await l2ServicesAPI.getAvailableListTemplate();
        return data;
      } else {
        return availableListTemplate;
      }
    } catch (error) {
      return undefined;
    }
  },
);

const fetchTemplateV2 = createAsyncThunk(
  `${PREFIX}/fetchTemplateV2`,
  async () => {
    try {
      const data = await l2ServicesAPI.getTemplateV2();
      return data;
    } catch (error) {
      return undefined;
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
  fetchAllOrdersV2,
  fetchOrderDetailByID,

  //DA
  fetchDAList,
  fetchTemplateV2,
  fetchAvailableListTemplate,
  fetchModelCategories,
};
