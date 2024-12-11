import useL2Service from '@/hooks/useL2Service';
import l2ServicesAPI, {
  IInstallAccountAbstractionByData,
} from '@/services/api/l2services';
import { useAppDispatch } from '@/stores/hooks';
import { setOrderSelected } from '@/stores/states/l2services/reducer';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { useAccountAbstractionStore } from '../../detail_v3/account-abstraction_v2/store/hook';
import { useChainProvider } from '../provider/ChainProvider.hook';
import {
  ModuleTypeIcon,
  getModuleIconUrlByType,
} from '../helper/moduleIconHelper';
import { OrderStatus } from '@/stores/states/l2services/types';

export type AAModuleStatusDetail =
  | 'drafting_modules'
  | 'need_config'
  | 'new'
  | 'processing'
  | 'done';

export type LineAAStatus = 'draft' | 'running' | 'down';

export const useAAModule = () => {
  const dispatch = useAppDispatch();
  const { order, getAAStatus, isUpdateFlow, getDAppInstalledByKey } =
    useChainProvider();
  const aaStatusData = getAAStatus();
  const {
    tokenContractAddress,
    tokenContractAddressErrMsg,
    feeRate,
    isValid,
    checkTokenContractAddress,
  } = useAccountAbstractionStore();

  const aaInstalledData = useMemo(() => {
    return getDAppInstalledByKey('general_idea');
  }, [getDAppInstalledByKey, order]);

  const isCanConfigAA = useMemo(() => {
    let canConfig = true;

    // console.log('[useAAModule] -- ', {
    //   order,
    //   isUpdateFlow,
    //   aaStatusData,
    //   isValid,
    // });

    if (!order || !isUpdateFlow) {
      canConfig = false;
    } else {
      if (
        aaStatusData?.statusCode === 'new' ||
        aaStatusData?.statusCode === 'procesing' ||
        aaStatusData?.statusCode === 'done'
      ) {
        canConfig = false;
      } else {
        if (!isValid) {
          canConfig = false;
        }
      }
    }
    return canConfig;
  }, [order, aaStatusData, isUpdateFlow, tokenContractAddressErrMsg]);

  const aaStatusDetail: AAModuleStatusDetail = useMemo(() => {
    return aaStatusData.statusCode as AAModuleStatusDetail;
  }, [order, aaStatusData, isUpdateFlow, tokenContractAddressErrMsg]);

  const isAAModuleLoading = useMemo(() => {
    return aaStatusDetail === 'new' || aaStatusDetail === 'processing';
  }, [aaStatusDetail]);

  const isCanNotEdit = useMemo(() => {
    return aaStatusDetail === 'done';
  }, [aaStatusDetail]);

  const isDone = useMemo(() => {
    return aaStatusDetail === 'done';
  }, [aaStatusDetail]);

  const configAAHandler = async () => {
    try {
      if (!order) {
        throw Error('[configAAHandler] Order is invalid');
      }
      const orderId = order.orderId;

      if (!orderId || !tokenContractAddress) {
        throw Error('[configAAHandler] Data is invalid');
      }

      const params: IInstallAccountAbstractionByData = {
        orderID: orderId,
        appName: 'general_idea',
        aaPaymasterTokenID: tokenContractAddress,
        aaTokenGas: feeRate
          ? new BigNumber(feeRate || 1).multipliedBy(1e18).toFixed()
          : '0',
      };

      console.log('InstallDAppAAByData --- params --- ', params);

      const result = await l2ServicesAPI.installDAppAAByData(params);

      console.log('InstallDAppAAByData --- result --- ', result);
    } catch (error) {
      throw error;
    }
  };

  const getAATypeIcon = (): ModuleTypeIcon => {
    if (!isUpdateFlow) {
      // Flow Create Chain
      return 'Drafting';
    } else {
      switch (aaStatusDetail) {
        case 'need_config':
        case 'new':
        case 'processing':
          return 'Setting_Up';

        case 'done':
          return 'Running';

        default:
          break;
      }
      return 'Drafting';
    }
  };

  const getAATypeIconUrl = () => {
    return getModuleIconUrlByType(getAATypeIcon());
  };

  const lineAAStatus: LineAAStatus = useMemo(() => {
    const typeIcon = getAATypeIcon();
    switch (typeIcon) {
      case 'Drafting':
      case 'Setting_Up':
        return 'draft';
      case 'Running':
        return 'running';
      default:
        return 'down';
    }
  }, [isUpdateFlow, aaStatusDetail]);

  return {
    lineAAStatus,
    aaStatusData,
    configAAHandler,
    isCanConfigAA,
    isCanNotEdit,
    isDone,
    aaStatusDetail,
    isAAModuleLoading,
    checkTokenContractAddress,
    aaInstalledData,
    getAATypeIconUrl,
  };
};
