import useSubmitFormTokenGeneration from '@/modules/blockchains/dapp/hooks/useSubmitFormTokenGeneration';
import { formDappSignal } from '@/modules/blockchains/dapp/signals/useFormDappsSignal';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { useAppSelector } from '@/stores/hooks';
import { dappSelector } from '@/stores/states/dapp/selector';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { cloneDeep } from '../../Buy/utils';
import { TopUpDappInfor } from '../components/TopupModal';
import useDappsStore from '../stores/useDappStore';
import { DappType } from '../types';
import useSubmitFormAirdrop from './useSubmitFormAirdrop';
import useSubmitFormStaking from './useSubmitFormStaking';

const useSubmitForm = () => {
  const { dapps, currentIndexDapp } = useDappsStore();
  const dappState = useAppSelector(dappSelector);
  const { accountInforL2Service } = useAppSelector(getL2ServicesStateSelector);
  // console.log('accountInforL2Service', accountInforL2Service);
  // console.log('dappState', dappState);

  const [isShowError, setIsShowError] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [errorData, setErrorData] =
    useState<{ key: string; error: string }[]>();

  const [isShowTopup, setIsShowTopup] = useState(false);
  const [topupInfo, setTopupInfo] = useState<TopUpDappInfor[]>();

  const { loggedIn, login } = useWeb3Auth();

  const { onSubmit: onSubmitFormTokenGeneration } =
    useSubmitFormTokenGeneration({ setErrorData, setLoading, setIsShowError });

  const { onSubmit: onSubmitFormAirdrop } = useSubmitFormAirdrop({
    setErrorData,
    setLoading,
    setIsShowError,
  });

  const { onSubmit: onSubmitFormStaking } = useSubmitFormStaking({
    setErrorData,
    setLoading,
    setIsShowError,
    setTopupInfo,
    setIsShowTopup,
  });

  const thisDapp = React.useMemo(() => {
    return dapps[currentIndexDapp] || {};
  }, [dapps, currentIndexDapp]);

  const handleConnect = async () => {
    try {
      login();
    } catch (err: unknown) {
      toast.error(
        (err as Error).message ||
          'Something went wrong. Please try again later.',
      );
    }
  };

  const onSubmitForm = () => {
    if (!loggedIn) {
      handleConnect();
      return;
    }
    const formDapp = cloneDeep(formDappSignal?.value || {});
    if (!formDapp || !Object.keys(formDapp)?.length) {
      return;
    }

    switch (thisDapp?.key) {
      case DappType.staking:
        onSubmitFormStaking();
        return;
      case DappType.token_generation:
        onSubmitFormTokenGeneration();
        return;
      case DappType.airdrop:
        onSubmitFormAirdrop();
        return;
      default:
        return;
    }
  };

  return {
    onSubmit: onSubmitForm,
    isShowError,
    setIsShowError,
    errorData,
    isLoading,
    isShowTopup,
    setIsShowTopup,
    topupInfo,
  };
};

export default useSubmitForm;
