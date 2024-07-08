import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchAllOrders,
  fetchOrderList,
  orderBuy,
  fetchAccountInfo,
  fetchL2ServiceHistory,
  fetchAvailableList,
  fetchAllOrdersV2,
  fetchDAList,
} from './actions';
import { PREFIX } from './constants';
import {
  L2ServicesState,
  OrderItem,
  ViewMode,
  ViewPage,
  MonitorViewPage,
  IDappItem,
} from './types';
import uniqBy from 'lodash/uniqBy';

export const initialState: L2ServicesState = {
  isMyOrderListFetched: false,
  isMyOrderListFetching: false,
  orderList: [],

  isFetchingAllOrders: false,
  isFetchedAllOrders: false,
  allOrders: [],
  orderSelected: undefined,

  historyList: [],

  isAccountInforFetching: false,
  isAccountInforFetched: false,
  accountInforL2Service: undefined,
  isL2ServiceLogged: false,

  availableListFetching: false,
  availableListFetched: false,
  availableList: undefined,

  viewPage: 'ManageChains',
  viewMode: 'Mainnet',
  showOnlyMyOrder: true,
  showAllChain: false,

  isFetchingAllOrdersV2: false,
  isFetchedAllOrdersV2: false,
  allOrdersV2: [],

  monitorViewPage: 'OP',

  //DA
  isDAListFetching: false,
  isDAListFetched: false,
  daList: [],
};

const slice = createSlice({
  name: PREFIX,
  initialState,
  reducers: {
    setViewMode(state, action: PayloadAction<ViewMode>) {
      state.viewMode = action.payload;
    },
    setL2ServiceAuth(state, action: PayloadAction<boolean>) {
      state.isL2ServiceLogged = action.payload;
    },
    setShowOnlyMyOrder(state, action: PayloadAction<boolean>) {
      state.showOnlyMyOrder = action.payload;
    },
    setOrderSelected(state, action: PayloadAction<OrderItem>) {
      state.orderSelected = action.payload;
    },
    resetOrders(state) {
      state.isMyOrderListFetched = false;
      state.isMyOrderListFetching = false;
      state.orderList = [];
      state.orderSelected = undefined;
      state.accountInforL2Service = undefined;
      state.isL2ServiceLogged = false;
      state.allOrders = [];
      state.allOrdersV2 = [];
    },
    setViewPage(state, action: PayloadAction<ViewPage>) {
      state.viewPage = action.payload;
    },
    setMonitorViewPage(state, action: PayloadAction<MonitorViewPage>) {
      state.monitorViewPage = action.payload;
    },
    setShowAllChains(state, action: PayloadAction<boolean>) {
      state.showAllChain = action.payload;
    },
    updateOrderByNewOrder(state, action: PayloadAction<OrderItem>) {
      let newList = [action.payload, ...state.orderList];
      newList = uniqBy(newList, 'orderId');
      state.orderList = [...newList];
    },
    setL2ServiceLogout(state) {
      state.orderSelected = undefined;
      state.accountInforL2Service = undefined;
      state.isL2ServiceLogged = false;
    },
    setDAppSelected(state, action: PayloadAction<IDappItem>) {
      state.dAppSelected = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountInfo.pending, (state) => {
        state.isAccountInforFetching = true;
      })
      .addCase(fetchAccountInfo.fulfilled, (state, action) => {
        state.isAccountInforFetching = false;
        state.isAccountInforFetched = true;
        state.accountInforL2Service = action.payload;
      })
      .addCase(fetchAccountInfo.rejected, (state, _) => {
        state.isMyOrderListFetching = false;
        state.isAccountInforFetched = true;
        state.accountInforL2Service = undefined;
      })

      .addCase(fetchL2ServiceHistory.pending, (state) => {})
      .addCase(fetchL2ServiceHistory.fulfilled, (state, action) => {
        state.historyList = action.payload;
      })
      .addCase(fetchL2ServiceHistory.rejected, (state, _) => {
        state.historyList = [];
      })

      .addCase(fetchOrderList.pending, (state) => {
        state.isMyOrderListFetching = true;
      })
      .addCase(fetchOrderList.fulfilled, (state, action) => {
        state.isMyOrderListFetching = false;
        state.isMyOrderListFetched = true;
        state.orderList = action.payload;
      })
      .addCase(fetchOrderList.rejected, (state, _) => {
        state.isMyOrderListFetching = false;
        state.isMyOrderListFetched = true;
        state.orderList = [];
      })

      .addCase(orderBuy.pending, (state) => {})
      .addCase(orderBuy.fulfilled, (state, action) => {})
      .addCase(orderBuy.rejected, (state, _) => {})

      .addCase(fetchAllOrders.pending, (state) => {
        state.isFetchingAllOrders = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.isFetchingAllOrders = false;
        state.isFetchedAllOrders = true;
        state.allOrders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, _) => {
        state.isFetchingAllOrders = false;
        state.isFetchedAllOrders = true;
        state.allOrders = [];
      })

      .addCase(fetchAllOrdersV2.pending, (state) => {
        state.isFetchingAllOrdersV2 = true;
      })
      .addCase(fetchAllOrdersV2.fulfilled, (state, action) => {
        state.isFetchingAllOrdersV2 = false;
        state.isFetchedAllOrdersV2 = true;
        state.allOrdersV2 = action.payload;
      })
      .addCase(fetchAllOrdersV2.rejected, (state, _) => {
        state.isFetchingAllOrdersV2 = false;
        state.isFetchedAllOrdersV2 = true;
        state.allOrdersV2 = [];
      })

      .addCase(fetchAvailableList.pending, (state) => {
        state.availableListFetching = true;
      })
      .addCase(fetchAvailableList.fulfilled, (state, action) => {
        state.availableListFetching = false;
        state.availableListFetched = true;
        state.availableList = action.payload;
      })
      .addCase(fetchAvailableList.rejected, (state, _) => {
        state.availableListFetching = false;
        state.availableListFetched = true;
        state.availableList = undefined;
      })

      .addCase(fetchDAList.pending, (state) => {
        state.isDAListFetching = true;
      })
      .addCase(fetchDAList.fulfilled, (state, action) => {
        state.isDAListFetching = false;
        state.isDAListFetched = true;
        state.daList = action.payload || [];
      })
      .addCase(fetchDAList.rejected, (state, _) => {
        state.isDAListFetching = false;
        state.isDAListFetched = true;
        state.daList = [];
      });
  },
});

export const {
  setOrderSelected,
  resetOrders,
  setViewMode,
  setViewPage,
  setShowAllChains,
  setShowOnlyMyOrder,
  setL2ServiceAuth,
  updateOrderByNewOrder,
  setL2ServiceLogout,
  setMonitorViewPage,
  setDAppSelected,
} = slice.actions;
export default slice.reducer;
