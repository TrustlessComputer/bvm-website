import CStakingAPI from '@/services/api/dapp/staking';
import { useAppSelector } from '@/stores/hooks';
import { dappSelector } from '@/stores/states/dapp/selector';
import { getError } from '@/utils/error';
import { formatCurrency } from '@/utils/format';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { TopUpDappInfor } from '../components/TopupModal';
import { formDappSignal } from '../signals/useFormDappsSignal';
import useDappsStore from '../stores/useDappStore';
import { FormDappUtil } from '../utils';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import useSubmitFormTokenGeneration from '@/modules/blockchains/dapp/hooks/useSubmitFormTokenGeneration';

const useSubmitForm = () => {
  const { dapps, currentIndexDapp } = useDappsStore();
  const dappState = useAppSelector(dappSelector);
  const { accountInforL2Service } = useAppSelector(getL2ServicesStateSelector);
  console.log('accountInforL2Service', accountInforL2Service);
  console.log('dappState', dappState);

  const [isShowError, setIsShowError] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [errorData, setErrorData] =
    useState<{ key: string; error: string }[]>();

  const [isShowTopup, setIsShowTopup] = useState(false);
  const [topupInfo, setTopupInfo] = useState<TopUpDappInfor>();

  const {onSubmit: onSubmitFormTokenGeneration} = useSubmitFormTokenGeneration({setErrorData, setLoading, setIsShowError})

  const thisDapp = React.useMemo(() => {
    return dapps[currentIndexDapp] || {};
  }, [dapps, currentIndexDapp]);

  async function extractedValue(
    keys: string[],
    data: Record<string, any>,
    result: Record<string, { key: string; value: string }[]>,
  ) {
    for (const key of keys) {
      const blockKey = FormDappUtil.getBlockKey(key);
      const getOriginalKey = FormDappUtil.getOriginalKey(key);
      const getIndex = FormDappUtil.getIndex(key);
      const value = data[key];

      if (blockKey) {
        let block = result[blockKey];
        if (!block) {
          result[blockKey] = [];
        }

        const blockItem = result[blockKey][getIndex];
        if (!blockItem) {
          const temp = {};
          // @ts-ignore
          temp[getOriginalKey] = value;
          // @ts-ignore
          result[blockKey][getIndex] = { ...temp };
        } else {
          const temp = { ...blockItem };
          // @ts-ignore
          temp[getOriginalKey] = value;
          result[blockKey][getIndex] = { ...temp };
        }
      } else {
        result[getOriginalKey] = value;
      }
    }

    return result;
  }

  const onSubmitFormStaking = async () => {
    try {
      let finalFormMapping: Record<string, { key: string; value: string }[]> =
        {};
      const formDapp = formDappSignal.value;
      const formDappInBase = Object.keys(formDapp).filter(
        (key) => !FormDappUtil.isInBlock(key) && !FormDappUtil.isInSingle(key),
      );

      finalFormMapping = await extractedValue(
        formDappInBase,
        formDapp,
        finalFormMapping,
      );

      setErrorData([]);
      let errors: any[] = [];
      if (Number(finalFormMapping?.rate) <= 0) {
        errors.push({ key: 'Rate', error: 'Rate is required!' });
      }
      if (Number(finalFormMapping?.apr) <= 0) {
        errors.push({ key: 'APR', error: 'APR is required!' });
      }
      if (Number(finalFormMapping?.amount) <= 0) {
        errors.push({
          key: 'Reward amount',
          error: 'Reward amount is required!',
        });
      }

      if (errors.length > 0) {
        setErrorData(errors);
        setIsShowError(true);
        return;
      }

      const cStakeAPI = new CStakingAPI();
      setLoading(true);

      const data = await cStakeAPI.createNewStakingPool({
        principle_token: '0x6739fFe5Ac4fe27d25B42CC28E7a40DF7a512a09', // finalFormMapping?.staking_token?.value,
        reward_token: '0x6739fFe5Ac4fe27d25B42CC28E7a40DF7a512a09', // finalFormMapping?.reward_token?.value,
        base_ratio: Number(finalFormMapping?.apr) / 100,
        token_price: 1 / Number(finalFormMapping?.rate),
      });

      if (data && data.reward_pool_address) {
        setTopupInfo({
          amount: formatCurrency(Number(finalFormMapping?.amount), 0, 0),
          tokenSymbol: data.reward_token?.symbol,
          tokenAddress: data.reward_token_address,
          paymentAddress: data.reward_pool_address,
          networkName: dappState.chain?.chainName || '',
        });
        setIsShowTopup(true);
      }
    } catch (error) {
      const { message } = getError(error);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

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
