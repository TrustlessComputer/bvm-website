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

export type AAModuleStatusDetail =
  | 'drafting_modules'
  | 'new'
  | 'processing'
  | 'done';

export const useAAModule = () => {
  const dispatch = useAppDispatch();
  const { order, getAAStatus, isUpdateFlow, getDAppInstalledByKey } =
    useChainProvider();
  const aaStatusData = getAAStatus();
  const { getOrderDetailByID } = useL2Service();
  const {
    tokenContractAddress,
    tokenContractAddressErrMsg,
    feeRate,
    isValid,
    checkTokenContractAddress,
  } = useAccountAbstractionStore();

  const aaInstalledData = useMemo(() => {
    return getDAppInstalledByKey('account_abstraction');
  }, [getDAppInstalledByKey, order]);

  const isCanConfigAA = useMemo(() => {
    let canConfig = true;

    console.log('[useAAModule] -- ', {
      order,
      isUpdateFlow,
      aaStatusData,
      isValid,
    });
    if (!order || !isUpdateFlow) {
      canConfig = false;
    } else {
      if (aaStatusData?.statusCode !== 'need_config') {
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
        appName: 'account_abstraction',
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

  return {
    aaStatusData,
    configAAHandler,
    isCanConfigAA,
    aaStatusDetail,
    isAAModuleLoading,
    checkTokenContractAddress,
    aaInstalledData,
  };
};
