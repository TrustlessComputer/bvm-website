'use client';
import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { IDAppInstalled, OrderStatus } from '@/stores/states/l2services/types';
import {
  DAppKeys,
  IModelCategory,
  IModelOption,
} from '@/types/customize-model';
import { ResponsiveValue } from '@chakra-ui/react';
import * as CSS from 'csstype';
import { useContext, useMemo } from 'react';
import useCheckAllFilled from '../../Buy/hooks/useCheckAllFilled';
import {
  ModuleTypeIcon,
  getModuleIconUrlByType,
} from '../helper/moduleIconHelper';
import { ChainContext } from './ChainProvider';

export const useChainProvider = () => {
  const context = useContext(ChainContext);

  if (!context) {
    throw new Error(
      'ChainContext not found, useChainProvider must be used within the ChainProvider',
    );
  }

  const { accountInforL2Service } = useAppSelector(getL2ServicesStateSelector);
  const { allFilled } = useCheckAllFilled();
  const { order } = context;

  const isOwnerChain = useMemo(() => {
    return (
      order?.tcAddress?.toLowerCase() ===
      accountInforL2Service?.tcAddress?.toLowerCase()
    );
  }, [order, accountInforL2Service]);

  const isUpdateFlow = useMemo(() => {
    return !!order;
  }, [order]);

  const isCreateChainFlow = useMemo(() => {
    return !isUpdateFlow;
  }, [isUpdateFlow]);

  const isChainLoading = useMemo(() => {
    return (
      isUpdateFlow &&
      (order?.status === OrderStatus.Processing ||
        order?.status === OrderStatus.Updating ||
        order?.status === OrderStatus.WaitingPayment)
    );
  }, [order, isUpdateFlow]);

  const isChainNeedAction = useMemo(() => {
    return (
      isUpdateFlow &&
      (order?.status === OrderStatus.Ended ||
        order?.status === OrderStatus.InsufficientBalance ||
        order?.status === OrderStatus.Rejected ||
        order?.status === OrderStatus.IsDown)
    );
  }, [order]);

  const isInsufficientBalance = useMemo(() => {
    return isUpdateFlow && order?.status === OrderStatus.InsufficientBalance;
  }, [order]);

  const textCTA = useMemo(() => {
    if (isUpdateFlow) {
      if (isInsufficientBalance) {
        return 'Deposit BVM';
      }
      return 'Contact us';
    }

    return '';
  }, [isUpdateFlow, isInsufficientBalance]);

  const isBlockChainReady = useMemo(() => {
    return order?.status === OrderStatus.Started;
  }, [order]);

  const getBlockChainStatus = () => {
    let statusStr = 'Ready';
    let statusColorStr = '#4185EC';
    let borderStatusStr = '#eef5ff';
    let bgColorStr = '#eef5ff';

    if (order) {
      switch (order.status) {
        //
        case OrderStatus.Started:
          statusStr = 'Running';
          statusColorStr = '#00AA6C';
          borderStatusStr = '#00AA6C';
          bgColorStr = '#EEFFF9';
          break;

        //
        case OrderStatus.WaitingPayment:
          statusStr = 'Waiting for payment';
          statusColorStr = '#E59700';
          borderStatusStr = '#FFC700';
          bgColorStr = '#FFF6D8';
          break;
        case OrderStatus.Processing:
          statusStr = 'Setting up';
          statusColorStr = '#E59700';
          borderStatusStr = '#FFC700';
          bgColorStr = '#FFF6D8';
          break;
        case OrderStatus.Updating:
          statusStr = 'Updating';
          statusColorStr = '#E59700';
          borderStatusStr = '#FFC700';
          bgColorStr = '#FFF6D8';
          break;

        //

        case OrderStatus.Resume:
          statusStr = 'Please wait for service to resume';
          statusColorStr = '#00AA6C';
          borderStatusStr = '#00AA6C';
          break;
        case OrderStatus.InsufficientBalance:
          statusStr = `Insufficient Balance`;
          statusColorStr = '#FA4E0E';
          borderStatusStr = '#FFF2EE';
          bgColorStr = '#FFF2EE';
          break;

        case OrderStatus.Canceled:
          statusStr = 'Canceled';
          statusColorStr = '#E59700';
          borderStatusStr = '#FFC700';
          bgColorStr = '#FFF6D8';
          break;

        //
        case OrderStatus.Rejected:
          statusStr = 'Rejected';
          statusColorStr = '#333333';
          borderStatusStr = '#B6B6B6';
          bgColorStr = '#ECECED';
          break;

        case OrderStatus.Ended:
          statusStr = 'Ended';
          statusColorStr = '#333333';
          borderStatusStr = '#B6B6B6';
          bgColorStr = '#ECECED';
          break;

        case OrderStatus.IsDown:
          statusStr = 'Down';
          statusColorStr = '#333333';
          borderStatusStr = '#B6B6B6';
          bgColorStr = '#ECECED';
          break;
      }
    } else {
      if (allFilled) {
        statusStr = 'Ready';
      } else {
        statusStr = 'Drafting Modules';
        statusColorStr = '#E59700';
        borderStatusStr = '#FFC700';
        bgColorStr = '#FFF6D8';
      }
    }
    return {
      statusStr,
      statusColorStr,
      borderStatusStr,
      bgColorStr,
    };
  };

  const getDAppConfiguredByKey = (key: DAppKeys) => {
    return order?.dApps?.find(
      (item) => item.appCode?.toLowerCase() === key?.toLowerCase(),
    );
  };

  const statusMapper = (dAppInstalled?: IDAppInstalled) => {
    let statusCode = 'need_config'; //Payment OK, But not config yet!
    let statusStr = 'Need config';
    let statusColorStr = '#FF4747';
    let borderColorStr = '#FF4747';
    let bgColorStr = '#FFF2EE';
    let fontStyle: CSS.Property.FontStyle = 'italic';
    let textDecorationLine: ResponsiveValue<CSS.Property.TextDecorationLine> =
      'underline';

    if (dAppInstalled) {
      fontStyle = 'normal';
      textDecorationLine = 'none';
      switch (dAppInstalled.status) {
        case 'new':
          statusCode = 'new';
          statusStr = 'Setting up';
          statusColorStr = '#E59700';
          borderColorStr = '#FFC700';
          bgColorStr = '#FFF6D8';

          break;
        case 'processing':
          statusCode = 'processing';
          statusStr = 'Processing';
          statusColorStr = '#E59700';
          borderColorStr = '#FFC700';
          bgColorStr = '#FFF6D8';
          break;

        case 'done':
          statusCode = 'done';
          statusStr = 'Done';
          statusColorStr = '#00AA6C';
          borderColorStr = '#00AA6C';
          bgColorStr = '#EEFFF9';
          break;
        default:
          break;
      }
    }

    return {
      statusCode,
      statusStr,
      statusColorStr,
      bgColorStr,
      borderColorStr,
      fontStyle,
      textDecorationLine,
    };
  };

  const getChainTypeIcon = (): ModuleTypeIcon => {
    if (!isUpdateFlow) {
      // Flow Create Chain (Hard code Icon Ready To Launch, need check required category when drag)
      if (allFilled) {
        return 'Ready_To_Launch';
      } else {
        return 'Drafting';
      }
    } else {
      if (order) {
        switch (order.status) {
          case OrderStatus.Started:
            return 'Running';
          case OrderStatus.WaitingPayment:
          case OrderStatus.Processing:
            return 'Setting_Up';
          case OrderStatus.Updating:
            return 'Updating';

          case OrderStatus.Resume:
            return 'Resuming';
          case OrderStatus.InsufficientBalance:
            return 'Insufficient_Balance';
          case OrderStatus.Rejected:
          case OrderStatus.Ended:
          case OrderStatus.Canceled:
          case OrderStatus.IsDown:
            return 'Down';
        }
      }
      return 'Ready_To_Launch';
    }
  };

  const getChainTypeIconUrl = () => {
    return getModuleIconUrlByType(getChainTypeIcon());
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
        getDAppConfiguredByKey(item.key as DAppKeys),
      );

      return {
        ...item,
        ...statusFactory,
      };
    });
  }, [order]);

  const selectedCategoryMapping = useMemo(() => {
    if (!order?.selectedOptions) return undefined;

    const mapping: Record<string, IModelCategory> = {};

    order.selectedOptions.forEach((category) => {
      mapping[category.key] = category;
    });

    return mapping;
  }, [order?.selectedOptions]);

  const getDAppStatusByKey = (dAppName: DAppKeys) => {
    return dAppListAvailable?.find(
      (item) => item.key?.toLowerCase() === dAppName?.toLowerCase(),
    );
  };

  const getDAppInstalledByKey = (key: DAppKeys) => {
    return order?.dApps?.find(
      (item) => item.appCode?.toLowerCase() === key?.toLowerCase(),
    );
  };

  const getAAStatus = () => {
    const result = getDAppStatusByKey('account_abstraction');
    if (result) {
      return {
        ...result,
        statusStr: result.statusCode === 'done' ? 'Running' : result.statusStr,
      };
    } else {
      let statusCode = 'drafting_modules';
      let statusStr = 'Drafting Modules';
      let statusColorStr = '#E59700';
      let borderColorStr = '#FFC700';
      let bgColorStr = '#FFF6D8';
      let fontStyle: CSS.Property.FontStyle = 'italic';
      let textDecorationLine: ResponsiveValue<CSS.Property.TextDecorationLine> =
        'none';

      return {
        statusCode,
        statusStr,
        statusColorStr,
        borderColorStr,
        bgColorStr,
        fontStyle,
        textDecorationLine,
      };
    }
  };

  const isAAInstalled = useMemo(
    () => !!order?.selectedOptions?.some((opt) => opt.key === 'wallet'),
    [order?.selectedOptions],
  );

  const isGamingAppsInstalled = useMemo(
    () => !!order?.selectedOptions?.some((opt) => opt.key === 'gaming_apps'),
    [order?.selectedOptions],
  );

  const isBridgeInstalled = useMemo(
    () => !!order?.selectedOptions?.some((opt) => opt.key === 'bridge_apps'),
    [order?.selectedOptions],
  );

  return {
    ...context,
    isUpdateFlow,
    isCreateChainFlow,
    isChainLoading,
    isChainNeedAction,
    chainData: order,
    order,
    dAppListAvailable,
    isBlockChainReady,
    selectedCategoryMapping,
    isAAInstalled,
    isGamingAppsInstalled,
    isBridgeInstalled,
    isOwnerChain,
    isInsufficientBalance,
    textCTA,

    //
    getBlockChainStatus,
    getDAppStatusByKey,
    getAAStatus,
    getDAppInstalledByKey,
    getChainTypeIconUrl,
  };
};
