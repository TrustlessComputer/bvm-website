import { extractedValue } from '@/modules/blockchains/dapp/hooks/utils';
import CStakingAPI from '@/services/api/dapp/staking';
import { useAppSelector } from '@/stores/hooks';
import { dappSelector } from '@/stores/states/dapp/selector';
import { getError } from '@/utils/error';
import { formatCurrency } from '@/utils/format';
import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { TopUpDappInfor } from '../components/TopupModal';
import { formDappSignal } from '../signals/useFormDappsSignal';
import { FormDappUtil } from '../utils';

interface IProps {
  setErrorData: Dispatch<
    SetStateAction<{ key: string; error: string }[] | undefined>
  >;
  setIsShowError: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setTopupInfo: Dispatch<SetStateAction<TopUpDappInfor | undefined>>;
  setIsShowTopup: Dispatch<SetStateAction<boolean>>;
}

const useSubmitFormStaking = ({
  setErrorData,
  setIsShowError,
  setLoading,
  setTopupInfo,
  setIsShowTopup,
}: IProps) => {
  const dappState = useAppSelector(dappSelector);

  const onSubmitFormStaking = async () => {
    try {
      let finalFormMapping: Record<string, { key: string; value: string }[]> =
        {};
      const formDapp = formDappSignal.value;
      const formDappInBase = Object.keys(formDapp).filter(
        (key) => !FormDappUtil.isInBlock(key) && !FormDappUtil.isInSingle(key),
      );

      finalFormMapping = extractedValue(
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
        principle_token: finalFormMapping?.staking_token,
        reward_token: finalFormMapping?.reward_token,
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

  return {
    onSubmit: onSubmitFormStaking,
  };
};

export default useSubmitFormStaking;
