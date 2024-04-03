import { useContext } from 'react';
import { INakaConnectContext, NakaConnectContext } from '@/Providers/NakaConnectProvider';
import { useAppSelector } from '@/stores/hooks';
import { nakaAddressSelector } from '@/stores/states/user/selector';

const useNakaAuthen = () => {
  const { requestAccount, loading } = useContext(NakaConnectContext) as INakaConnectContext;
  const nakaAddress = useAppSelector(nakaAddressSelector);
  return {
    nakaAddress,
    isAuthen: !!nakaAddress,
    requestAccount,
    buttonText: nakaAddress ? '' : 'Connect',
    loading: loading === 'account'
  }
}

export default useNakaAuthen;
