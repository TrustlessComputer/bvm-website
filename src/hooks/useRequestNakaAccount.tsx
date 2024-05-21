import React, { useCallback, useContext } from 'react';
import {
  INakaConnectContext,
  NakaConnectContext,
} from '@/Providers/NakaConnectProvider';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { nakaAddressSelector } from '@/stores/states/user/selector';
import { resetUser } from '@/stores/states/user/reducer';
import { resetStake } from '@/stores/states/stakingV2/reducer';
import useL2ServiceAuth from '@hooks/useL2ServiceAuth';
import { resetOrders } from '@/stores/states/l2services/reducer';
import { onRemoveAuthen } from '@hooks/useL2ServiceAuth_V2';

const useNakaAuthen = () => {
  const { requestAccount, loading, requestSignMessage } = useContext(
    NakaConnectContext,
  ) as INakaConnectContext;
  const nakaAddress = useAppSelector(nakaAddressSelector);

  const dispatch = useAppDispatch();

  const onLogout = React.useCallback(() => {
    dispatch(resetUser());
    dispatch(resetStake());
    setTimeout(() => {
      dispatch(resetUser());
      dispatch(resetStake());
    }, 200);
    onRemoveAuthen(nakaAddress);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }, []);

  return {
    nakaAddress,
    isAuthen: !!nakaAddress,
    requestAccount,
    requestSignMessage,
    buttonText: nakaAddress ? '' : 'Connect',
    loading: loading === 'account',
    onLogout,
  };
};

export default useNakaAuthen;
