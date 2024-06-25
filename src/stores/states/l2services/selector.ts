import { createSelector } from '@reduxjs/toolkit';
import { OrderItem, L2ServicesState } from './types';
import BigNumber from 'bignumber.js';
import { RootState } from '@/stores';
import formatter from '@/modules/price/Pricing.helper';
import { NetworkEnum } from '@/modules/blockchains/Buy/Buy.constanst';
import { PRICING_PACKGE } from '@/modules/PricingV2/constants';

const getL2ServicesStateSelector = (state: RootState): L2ServicesState =>
  state.l2Services;

const accountInforSelector = createSelector(
  getL2ServicesStateSelector,
  (reducer) => {
    const accountInfor = reducer.accountInforL2Service;
    if (!accountInfor) return undefined;

    let result = {
      ...accountInfor,
    };

    const addressFormatted = accountInfor.tcAddress?.substring(0, 7) || '--';

    return {
      ...result,
      addressFormatted,
    };
  },
);

// My Orders
const orderListSelector = createSelector(
  getL2ServicesStateSelector,
  (reducer) => {
    const result = reducer.orderList || [];
    return result;
  },
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

const historyInfoSelector = createSelector(
  getL2ServicesStateSelector,
  (state) => {
    const { historyList } = state;
    return {
      historyList,
    };
  },
);

const packageDataSelector = createSelector(
  getL2ServicesStateSelector,
  (state) => {
    const availableList = state.availableList;
    if (!availableList) return undefined;
    const dataMainnet = availableList.package[NetworkEnum.Network_Mainnet];
    return dataMainnet;
  },
);

const packageDetailByPackageEnumSelector = createSelector(
  packageDataSelector,
  (data) => (packageEnum: PRICING_PACKGE) => {
    if (!data) return undefined;
    return data?.find((item) => item.value === Number(packageEnum));
  },
);

export {
  getL2ServicesStateSelector,
  orderListSelector,
  orderSelectedSelector,
  withdrawableRewardSelector,
  getOrderByIDSelector,
  allOrdersSelector,
  historyInfoSelector,
  myOrderListSelector,
  accountInforSelector,
  packageDataSelector,
  packageDetailByPackageEnumSelector,
};
