'use client';

import { IDAppInstalled, OrderStatus } from '@/stores/states/l2services/types';
import { DAppKeys, IModelOption } from '@/types/customize-model';
import { useContext, useMemo } from 'react';
import { ChainContext } from './ChainProvider';

export const useChainProvider = () => {
  const context = useContext(ChainContext);
  if (!context) {
    throw new Error(
      'ChainContext not found, useChainProvider must be used within the ChainProvider',
    );
  }

  const { order } = context;

  const isBlockChainReady = useMemo(() => {
    return order?.status === OrderStatus.Started;
  }, [order]);

  const getBlockChainStatus = () => {
    let statusStr = 'Ready';
    let statusColorStr = '#00AA6C';
    let borderStatusStr = '#EEFFF9';

    if (order) {
      switch (order.status) {
        case OrderStatus.Rejected:
          statusStr = 'Failed';
          statusColorStr = '#FA4E0E';
          borderStatusStr = '#FFF2EE';
          break;
        case OrderStatus.WaitingPayment:
          statusStr = 'Waiting for payment';
          statusColorStr = '#FFC700';
          borderStatusStr = '#FFF6D8';
          break;
        case OrderStatus.Processing:
          statusStr = 'Setting up';
          statusColorStr = '#FFC700';
          borderStatusStr = '#FFF6D8';
          break;
        case OrderStatus.Started:
          statusStr = 'Running';
          statusColorStr = '#00AA6C';
          borderStatusStr = '#EEFFF9';
          break;
        case OrderStatus.Resume:
          statusStr = 'Please wait for service to resume';
          statusColorStr = '#00AA6C';
          borderStatusStr = '#EEFFF9';
          break;
        case OrderStatus.InsufficientBalance:
          statusStr = `Must top up to your account`;
          statusColorStr = '#FA4E0E';
          borderStatusStr = '#FFF2EE';
          break;
        case OrderStatus.Ended:
          statusStr = 'Ended';
          statusColorStr = '#FA4E0E';
          borderStatusStr = '#FFF2EE';
          break;
        case OrderStatus.Canceled:
          statusStr = 'Canceled';
          statusColorStr = '#FFC700';
          borderStatusStr = '#FFF6D8';
          break;
        case OrderStatus.OrderStatus_IsDown:
          statusStr = 'Down';
          statusColorStr = '#ECECED';
          borderStatusStr = '#B6B6B6';
          break;
      }
    }
    return {
      statusStr,
      statusColorStr,
      borderStatusStr,
    };
  };

  const getDAppStatus = (dAppKey: DAppKeys) => {
    switch (dAppKey) {
      //
      case 'blockchain':
        return getBlockChainStatus();

      //
      case 'btc_bridge':
        break;
      case 'eth_bridge':
        break;

      //
      case 'account_abstraction':
        break;
      case 'create_token':
        break;
      case 'staking':
        break;
      case 'dex':
        break;
      case 'order_book':
        break;
      case 'perpetual':
        break;

      default:
        break;
    }
  };

  const getDAppInstalledByAppCode = (dAppName: DAppKeys) => {
    return order?.dApps?.find(
      (item) => item.appCode?.toLowerCase() === dAppName?.toLowerCase(),
    );
  };

  const statusMapper = (
    dAppInstalled?: IDAppInstalled,
    dAppName?: DAppKeys,
  ) => {
    let statusCode = 'need_config';
    let statusStr = 'Need config';
    let statusColor = '#FF4747';

    if (dAppName === 'blockchain') {
      statusCode = 'Running';
      statusStr = 'Running';
      statusColor = '#00AA6C';
    } else if (dAppInstalled) {
      switch (dAppInstalled.status) {
        case 'new':
          statusCode = 'new';
          statusStr = 'New'; // Map text if needed (Ex: Setting up)
          statusColor = '#F9D03F';
          break;
        case 'processing':
          statusCode = 'processing';
          statusStr = 'Processing'; // Map text if needed
          statusColor = '#F9D03F';
          break;

        case 'done':
          statusCode = 'done';
          statusStr = 'Done'; // Map text if needed
          statusColor = '#00AA6C';
          break;
        default:
          break;
      }
    } else {
      statusCode = 'need_config';
      statusStr = 'Need config';
      statusColor = '#FF4747';
    }

    return {
      statusCode,
      statusStr,
      statusColor,
    };
  };

  const dAppListAvailable = useMemo(() => {
    let dAppList: IModelOption[] = [];
    if (order) {
      order.selectedOptions?.filter((item: { options: IModelOption[] }) => {
        item.options.map((option: IModelOption) => {
          if (option.needConfig) {
            dAppList.push(option);
          }
        });
      }) || [];
      dAppList = [...dAppList];
    }

    return dAppList.map((item) => {
      const statusFactory = statusMapper(
        getDAppInstalledByAppCode(item.key as DAppKeys),
        item.key as DAppKeys,
      );

      return {
        ...item,
        ...statusFactory,
      };
    });
  }, [order]);

  return {
    ...context,
    chainData: order,
    order,
    dAppListAvailable,
    isBlockChainReady,

    //
    getDAppStatus,
    getBlockChainStatus,
  };
};
