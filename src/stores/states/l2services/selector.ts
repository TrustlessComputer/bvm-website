import {
  NetworkEnum,
  RollupEnum,
} from '@/modules/blockchains/Buy/Buy.constanst';
import formatter from '@/modules/price/Pricing.helper';
import { PRICING_PACKGE } from '@/modules/PricingV2/constants';
import { IExploreItem } from '@/services/api/l2services/types';
import { RootState } from '@/stores';
import { IModelOption } from '@/types/customize-model';
import { createSelector } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import { APP_BLOCKCHAIN } from './constants';
import { L2ServicesState, OrderItem } from './types';

const BLACKLIST_CATEGORY_BY_TEMPLATE_PARAM_MAPPER: Record<string, string[]> = {
  '5': ['tools'],
  '6': ['bridge_apps'],
};

const BLACKLIST_CATEGORY_BY_DAPP_PARAM_MAPPER: Record<string, string[]> = {
  token_generation: ['tools', 'bridge_apps'],
  staking: ['tools', 'bridge_apps'],
  airdrop: ['tools', 'bridge_apps'],
  yologame: ['tools', 'bridge_apps'],
};

const getL2ServicesStateSelector = (state: RootState): L2ServicesState =>
  state.l2Services;

const orderSelectedSelector = createSelector(
  getL2ServicesStateSelector,
  (reducer) => reducer.orderSelected,
);

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
  if (!myOrderList) return [];
  return [...myOrderList].sort((a, b) => b.index - a.index);
});

const myOrderListWithNetworkSelector = createSelector(
  orderListSelector,
  (myOrderList) => {
    let result = {
      mainnetOrderList: [] as OrderItem[],
      testnetOrderList: [] as OrderItem[],
    };

    myOrderList.map((item) => {
      if (item.isMainnet) {
        result.mainnetOrderList.push(item);
      } else {
        result.testnetOrderList.push(item);
      }
    });

    result.mainnetOrderList = [...result.mainnetOrderList].sort(
      (a, b) => a.index - b.index,
    );

    result.testnetOrderList = [...result.testnetOrderList].sort(
      (a, b) => a.index - b.index,
    );

    return result;
  },
);

const myOrderListFilteredByNetwork = createSelector(
  [getL2ServicesStateSelector, myOrderListWithNetworkSelector],
  (state, myOrderListByNetwork) => {
    if (state.viewMode === 'Mainnet')
      return myOrderListByNetwork.mainnetOrderList;
    else return myOrderListByNetwork.testnetOrderList;
  },
);

const viewModeSelector = createSelector(
  getL2ServicesStateSelector,
  (reducer) => {
    const viewMode = reducer.viewMode;
    const isMainnet = viewMode === 'Mainnet';
    return isMainnet;
  },
);

// Template
const templateV2Selector = createSelector(
  getL2ServicesStateSelector,
  (reducer) => {
    const dataList = reducer.templateList || [];

    let templateList: IExploreItem[] = [];
    let mainnetList: IExploreItem[] = [];
    let testnetList: IExploreItem[] = [];

    dataList.map((item) => {
      switch (item.chainInfo.templateType) {
        case 'template':
          templateList.push(item);
          break;
        case 'mainnet':
          mainnetList.push(item);
          break;
        case 'testnet':
          testnetList.push(item);
          break;
        default:
          break;
      }
    });

    return {
      templateList,
      mainnetList,
      testnetList,
    };
  },
);

// All Orders
const allOrdersSelector = createSelector(
  getL2ServicesStateSelector,
  (reducer) => {
    const allOrders = reducer.allOrders || [];
    return [...allOrders].sort((a, b) => a.index - b.index);
  },
);

const allOrdersV2Selector = createSelector(
  getL2ServicesStateSelector,
  (reducer) => reducer.allOrdersV2 || [],
);

const ZKOrdersSelector = createSelector(
  [allOrdersV2Selector],
  (allOderList) => {
    let result = {
      MainnetList: [] as OrderItem[],
      TestnetList: [] as OrderItem[],
    };
    let orders =
      allOderList.filter((item) => item.serviceType === RollupEnum.Rollup_ZK) ||
      [];
    orders.map((item) => {
      if (!!item.isMainnet) {
        result.MainnetList.push(item);
      } else {
        result.TestnetList.push(item);
      }
    });

    return result;
  },
);

const OPOrdersSelector = createSelector(
  [allOrdersV2Selector],
  (allOderList) => {
    let result = {
      MainnetList: [] as OrderItem[],
      TestnetList: [] as OrderItem[],
    };
    let orders =
      allOderList.filter(
        (item) =>
          item.serviceType === RollupEnum.Rollup_OpStack ||
          item.serviceType === RollupEnum.Rollup_OpStack_OLD,
      ) || [];
    orders.map((item) => {
      if (!!item.isMainnet) {
        result.MainnetList.push(item);
      } else {
        result.TestnetList.push(item);
      }
    });
    return result;
  },
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

// Dapp Feature Selector

const getDAListSelector = createSelector(
  getL2ServicesStateSelector,
  (state) => {
    return state.daList || [];
  },
);

const getDADetailByIDSelector = createSelector(
  getDAListSelector,
  (dappsList) => (dappID: number) => {
    return dappsList.filter((dapp) => dapp.id === dappID);
  },
);

const getDappSelectedSelector = createSelector(
  getL2ServicesStateSelector,
  (state) => {
    return state.dAppSelected;
  },
);

const getOrderDetailSelected = createSelector(
  [getL2ServicesStateSelector, orderSelectedSelector],
  (state, orderDetail) => {
    const dAppConfigSelected = state.dAppConfigSelected;
    let dAppConfigList: IModelOption[] = [];

    orderDetail?.selectedOptions?.filter((item) => {
      item.options.map((dApp) => {
        if (dApp.needConfig) {
          dAppConfigList.push(dApp);
        }
      });
    }) || [];

    dAppConfigList = [APP_BLOCKCHAIN, ...dAppConfigList];

    return {
      orderDetail: state.orderDetail,
      dAppConfigList,
      dAppConfigSelected,
    };
  },
);

const getDappByAppNameIDSelector = createSelector(
  orderSelectedSelector,
  (orderDetail) => (appName: string) => {
    const dAppFinded = orderDetail?.dApps?.find(
      (item) => item.appCode?.toLowerCase() === appName?.toLowerCase(),
    );

    return dAppFinded;
  },
);

const getDAppConfigByKeySelector = createSelector(
  getOrderDetailSelected,
  (data) => (key: string) => {
    const { dAppConfigList } = data;
    return dAppConfigList.find(
      (item) => String(item.key).toLowerCase() === String(key).toLowerCase(),
    );
  },
);

const getAvailableListTemplateSelector = createSelector(
  getL2ServicesStateSelector,
  (state) => {
    const availableListTemplate = state.availableListTemplate || [];
    const param = state.dAppParam || state.templateParam;

    console.log('[getAvailableListTemplateSelector] param', param);
    //Sort
    let result = availableListTemplate;

    if (param in BLACKLIST_CATEGORY_BY_TEMPLATE_PARAM_MAPPER) {
      result = [...result];
      result[Number(param)] = result[Number(param)]?.filter((item) => {
        return !BLACKLIST_CATEGORY_BY_TEMPLATE_PARAM_MAPPER[param].includes(
          item.key,
        );
      });
    } else if (param in BLACKLIST_CATEGORY_BY_DAPP_PARAM_MAPPER) {
      result = [...result];
      result[0] = result[0]?.filter((item) => {
        return !BLACKLIST_CATEGORY_BY_DAPP_PARAM_MAPPER[param].includes(
          item.key,
        );
      });
    }

    return result;
  },
);

const getModelCategoriesSelector = createSelector(
  getL2ServicesStateSelector,
  (state) => {
    const modelCategories = state.modelCategories || [];

    //Sort
    const result = [...modelCategories].sort((a, b) => a.order - b.order);

    return result;
  },
);

export {
  accountInforSelector,
  allOrdersSelector,
  //
  getAvailableListTemplateSelector,
  getDADetailByIDSelector,
  getDAListSelector,
  getDappByAppNameIDSelector,
  //
  getDAppConfigByKeySelector,
  //Dapp
  getDappSelectedSelector,
  getL2ServicesStateSelector,
  getModelCategoriesSelector,
  getOrderByIDSelector,
  //Detail
  getOrderDetailSelected,
  historyInfoSelector,
  myOrderListFilteredByNetwork,
  myOrderListSelector,
  myOrderListWithNetworkSelector,
  OPOrdersSelector,
  orderListSelector,
  orderSelectedSelector,
  packageDataSelector,
  packageDetailByPackageEnumSelector,
  //Template
  templateV2Selector,
  withdrawableRewardSelector,
  //Monitor
  ZKOrdersSelector,
};
