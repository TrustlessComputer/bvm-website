'use client';

import { APP_BLOCKCHAIN } from '@/stores/states/l2services/constants';
import { IDAppInstalled } from '@/stores/states/l2services/types';
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

  const getDAppInstalledByAppCode = (dAppName: DAppKeys) => {
    return order?.dApps?.find(
      (item) => item.appCode?.toLowerCase() === dAppName?.toLowerCase(),
    );
  };

  const statusMapper = (
    dAppInstalled?: IDAppInstalled,
    dAppName?: DAppKeys,
  ) => {
    let statusStr = '';
    let statusColor = 'transparent';

    if (dAppName === 'blockchain') {
      statusStr = 'Running';
      statusColor = '#00AA6C';
    } else if (dAppInstalled) {
      switch (dAppInstalled.status) {
        case 'new':
          statusStr = 'New'; // Map text if needed (Ex: Setting up)
          statusColor = '#F9D03F';
          break;
        case 'processing':
          statusStr = 'Processing'; // Map text if needed
          statusColor = '#F9D03F';
          break;

        case 'done':
          statusStr = 'Done'; // Map text if needed
          statusColor = '#00AA6C';
          break;
        default:
          break;
      }
    } else {
      statusStr = 'Need config';
      statusColor = '#FF4747';
    }

    return {
      statusStr,
      statusColor,
    };
  };

  const dAppListAvailable = useMemo(() => {
    let dAppList: IModelOption[] = [APP_BLOCKCHAIN];
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
        getDAppInstalledByAppCode(item.key),
        item.key,
      );

      return {
        ...item,
        ...statusFactory,
      };
    });
  }, [order]);

  return {
    ...context,
    dAppListAvailable,
  };
};
