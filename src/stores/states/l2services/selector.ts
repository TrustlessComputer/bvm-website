import { createSelector } from '@reduxjs/toolkit';
import { OrderItem, L2ServicesState } from './types';
import BigNumber from 'bignumber.js';
import { RootState } from '@/stores';
import formatter from '@/modules/price/Pricing.helper';

const getL2ServicesStateSelector = (state: RootState): L2ServicesState =>
  state.l2Services;

// My Orders
const orderListSelector = createSelector(
  getL2ServicesStateSelector,
  (reducer) => reducer.orderList || [],
);

const myOrderListSelector = createSelector(orderListSelector, (myOrderList) => {
  return myOrderList
    .filter((order) => order.isMainnet)
    .sort((a, b) => b.index - a.index);
});

const orderSelectedSelector = createSelector(
  getL2ServicesStateSelector,
  (reducer) => reducer.orderSelected,
);

// All Orders
const allOrdersSelector = createSelector(
  getL2ServicesStateSelector,
  (reducer) => reducer.allOrders || [],
);

const withdrawableRewardSelector = createSelector(
  orderListSelector,
  (orders) => {
    const amount = orders.reduce((prev: BigNumber, curr: OrderItem) => {
      if (curr.isWithdrawableReward) {
        return prev.plus(curr.reward || 0);
      }
      return prev;
    }, new BigNumber(0));

    const amountFormatted = formatter.shorterAmount({
      originalAmount: amount.toNumber(),
      decimals: 18,
    });

    const isWithdrawableReward = amount.gt(0);

    return {
      amount: amount.toFixed(),
      formatted: amountFormatted,
      isWithdrawableReward,
    };
  },
);

const getOrderByIDSelector = createSelector(
  getL2ServicesStateSelector,
  (orders) => (orderId: string) => {
    const { orderList, allOrders } = orders;
    return (
      orderList.find((order) => order.orderId === orderId) ||
      allOrders.find((order) => order.orderId === orderId)
    );
  },
);

const isFetchingAllDataSelector = createSelector(
  getL2ServicesStateSelector,
  (state) => {
    const { isFetching, isFetched, isFetchingAllOrders, isFetchedAllOrders } =
      state;
    return (
      !!isFetching &&
      !!isFetched &&
      !!isFetchingAllOrders &&
      !!isFetchedAllOrders
    );
  },
);
const historyInfoSelector = createSelector(
  getL2ServicesStateSelector,
  (state) => {
    const { historyList } = state;
    return {
      historyList,
    };
  },
);

export {
  getL2ServicesStateSelector,
  orderListSelector,
  orderSelectedSelector,
  withdrawableRewardSelector,
  getOrderByIDSelector,
  allOrdersSelector,
  isFetchingAllDataSelector,
  historyInfoSelector,
  myOrderListSelector,
};
