import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchAllOrders,
  fetchOrderList,
  orderBuy,
  fetchAccountInfo,
  fetchL2ServiceHistory,
} from './actions';
import { PREFIX } from './constants';
import { L2ServicesState, OrderItem, ViewMode } from './types';

export const initialState: L2ServicesState = {
  isFetching: false,
  isFetched: false,
  orderList: [],

  isFetchingAllOrders: false,
  isFetchedAllOrders: false,
  allOrders: [],
  orderSelected: undefined,

  historyList: [],

  viewMode: 'Mainnet',
  showOnlyMyOrder: false,

  accountInforL2Service: undefined,
  isL2ServiceLogged: false,
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
      state.isFetching = false;
      state.isFetched = false;
      state.orderList = [];
      state.orderSelected = undefined;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountInfo.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchAccountInfo.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isFetched = true;
        state.accountInforL2Service = action.payload;
      })
      .addCase(fetchAccountInfo.rejected, (state, _) => {
        state.isFetching = false;
        state.isFetched = true;
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
        state.isFetching = true;
      })
      .addCase(fetchOrderList.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isFetched = true;
        state.orderList = action.payload;
      })
      .addCase(fetchOrderList.rejected, (state, _) => {
        state.isFetching = false;
        state.isFetched = true;
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
      });
  },
});

export const {
  setOrderSelected,
  resetOrders,
  setViewMode,
  setShowOnlyMyOrder,
  setL2ServiceAuth,
} = slice.actions;
export default slice.reducer;
