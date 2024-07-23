import CStakingAPI from '@/services/api/dapp/staking';
import { useAppSelector } from '@/stores/hooks';
import { dappSelector } from '@/stores/states/dapp/selector';
import { getError } from '@/utils/error';
import { formatCurrency } from '@/utils/format';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { TopUpDappInfor } from '../components/TopupModal';
import {
  formDappDropdownSignal,
  formDappInputSignal,
} from '../signals/useFormDappsSignal';
import useDappsStore from '../stores/useDappStore';
import { FormDappUtil } from '../utils';

const useSubmitForm = () => {
  const { dapps, currentIndexDapp } = useDappsStore();
  const dappState = useAppSelector(dappSelector);

  const [isShowError, setIsShowError] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [errorData, setErrorData] =
    useState<{ key: string; error: string }[]>();

  const [isShowTopup, setIsShowTopup] = useState(false);
  const [topupInfo, setTopupInfo] = useState<TopUpDappInfor>();

  const thisDapp = React.useMemo(() => {
    return dapps[currentIndexDapp] || {};
  }, [dapps, currentIndexDapp]);

  const onSubmitFormStaking = async () => {
    try {
      const finalForm = JSON.parse(JSON.stringify(thisDapp)) as DappModel;

      const formDappInput = formDappInputSignal.value;
      const formDappInputInBase = Object.keys(formDappInput).filter(
        (key) =>
          !FormDappUtil.isInBlock(key) &&
          !FormDappUtil.isInSingle(key) &&
          !FormDappUtil.isExtendsField(key),
      );

      const formDappDropdown = formDappDropdownSignal.value;
      const formDappDropdownInBase = Object.keys(formDappDropdown).filter(
        (key) =>
          !FormDappUtil.isInBlock(key) &&
          !FormDappUtil.isInSingle(key) &&
          !FormDappUtil.isExtendsField(key),
      );

      const newInputInBase = formDappInputInBase.map((key) => {
        return {
          ...(thisDapp.baseBlock.fields.find(
            (item) => item.key === FormDappUtil.getOriginalKey(key),
          ) as FieldModel),
          value: formDappInput[key],
        };
      });
      const newDropdownInBase = formDappDropdownInBase.map((key) => {
        return {
          ...(thisDapp.baseBlock.fields.find(
            (item) => item.key === FormDappUtil.getOriginalKey(key),
          ) as FieldModel),
          value: formDappDropdown[key],
        };
      });

      finalForm.baseBlock.fields = [
        ...thisDapp.baseBlock.fields.filter(
          (item) =>
            !newInputInBase.find((i) => i.key === item.key) &&
            !newDropdownInBase.find((i) => i.key === item.key),
        ),
        ...newInputInBase,
        ...newDropdownInBase,
      ];

      const finalFormMapping: Record<string, FieldModel> = {};
      (finalForm?.baseBlock?.fields || []).forEach((item) => {
        finalFormMapping[item.key] = item;
      });

      setErrorData([]);
      let errors: any[] = [];
      if (Number(finalFormMapping?.rate?.value) <= 0) {
        errors.push({ key: 'Rate', error: 'Rate is required!' });
      }
      if (Number(finalFormMapping?.apr?.value) <= 0) {
        errors.push({ key: 'APR', error: 'APR is required!' });
      }
      if (Number(finalFormMapping?.amount?.value) <= 0) {
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
        principle_token: finalFormMapping?.staking_token?.value,
        reward_token: finalFormMapping?.reward_token?.value,
        base_ratio: Number(finalFormMapping?.apr?.value) / 100,
        token_price: 1 / Number(finalFormMapping?.rate?.value),
      });

      if (data && data.reward_pool_address) {
        setTopupInfo({
          amount: formatCurrency(Number(finalFormMapping?.amount?.value), 0, 0),
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
