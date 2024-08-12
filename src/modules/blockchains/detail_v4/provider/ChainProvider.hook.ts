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
    let status = 'Ready';
    let statusColor = '#0ec00e';

    if (order) {
      switch (order.status) {
        case OrderStatus.Rejected:
          status = 'Failed';
          statusColor = '#FF4747';
          break;
        case OrderStatus.WaitingPayment:
          status = 'Waiting for payment';
          statusColor = '#FFA500';
          break;
        case OrderStatus.Processing:
          status = 'Setting up';
          statusColor = '#FFA500';
          break;
        case OrderStatus.Started:
          status = 'Healthy';
          statusColor = '#0ec00e';
          break;
        case OrderStatus.Resume:
          status = 'Please wait for service to resume';
          statusColor = '#0ec00e';
          break;
        case OrderStatus.InsufficientBalance:
          status = `Must top up to your account`;
          statusColor = '#FF4747';
          break;
        case OrderStatus.Ended:
          status = 'Ended';
          statusColor = '#FF4747';
          break;
        case OrderStatus.Canceled:
          status = 'Canceled';
          statusColor = '#FFA500';
          break;
      }
    }
    return {
      status,
      statusColor,
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
