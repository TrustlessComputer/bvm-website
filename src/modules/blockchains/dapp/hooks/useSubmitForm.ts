import useSubmitFormTokenGeneration from '@/modules/blockchains/dapp/hooks/useSubmitFormTokenGeneration';
import { useAppSelector } from '@/stores/hooks';
import { dappSelector } from '@/stores/states/dapp/selector';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import React, { useState } from 'react';
import { TopUpDappInfor } from '../components/TopupModal';
import useDappsStore from '../stores/useDappStore';
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

  const { onSubmit: onSubmitFormTokenGeneration } =
    useSubmitFormTokenGeneration({ setErrorData, setLoading, setIsShowError });

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

  const onSubmitForm = () => {
    switch (thisDapp?.key) {
      case 'staking':
        onSubmitFormStaking();
        return;
      case 'token_generation':
        onSubmitFormTokenGeneration();
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
