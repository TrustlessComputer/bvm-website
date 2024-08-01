import { extractedValue } from '@/modules/blockchains/dapp/hooks/utils';
import CStakingAPI from '@/services/api/dapp/staking';
import { useAppSelector } from '@/stores/hooks';
import { dappSelector } from '@/stores/states/dapp/selector';
import { getError } from '@/utils/error';
import { formatCurrency } from '@/utils/format';
import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { requestReload } from '@/stores/states/common/reducer';
import { TopUpDappInfor } from '../components/TopupModal';
import { formDappSignal } from '../signals/useFormDappsSignal';
import { FormDappUtil } from '../utils';
import { draggedIds2DSignal } from '../signals/useDragSignal';
import {
  formDappDropdownSignal,
  formDappInputSignal,
  formDappToggleSignal,
} from '../signals/useFormDappsSignal';
interface IProps {
  setErrorData: Dispatch<
    SetStateAction<{ key: string; error: string }[] | undefined>
  >;
  setIsShowError: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setTopupInfo: Dispatch<SetStateAction<TopUpDappInfor[] | undefined>>;
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
  const dispatch = useDispatch();
  const cStakeAPI = new CStakingAPI();

  const handleReset = () => {
    formDappInputSignal.value = {};
    formDappDropdownSignal.value = {};
    formDappToggleSignal.value = {};
    draggedIds2DSignal.value = [];
  };

  const onSubmitFormStaking = async () => {
    try {
      let finalFormMappings: Record<
        string,
        { key: string; value: string }[]
      >[] = [];
      const formDapp = formDappSignal.value;
      const formDappInBase = Object.keys(formDapp).filter(
        (key) => !FormDappUtil.isInBlock(key) && !FormDappUtil.isInSingle(key),
      );
      const formDappInModule = Object.keys(formDapp).filter(
        (key) => !FormDappUtil.isInModule(key),
      );
      const formDappInSingle = Object.keys(formDapp).filter(
        FormDappUtil.isInSingle,
      );

      finalFormMappings = extractedValue(
        formDappInBase,
        formDapp,
        finalFormMappings,
      );
      finalFormMappings = extractedValue(
        formDappInModule,
        formDapp,
        finalFormMappings,
      );
      finalFormMappings = extractedValue(
        formDappInSingle,
        formDapp,
        finalFormMappings,
      );

      setErrorData([]);
      let errors: any[] = [];

      for (const form of finalFormMappings) {
        const info: any = form.info.find((item) => !!item);

        if (Number(info?.rate) <= 0) {
          errors.push({ key: 'Rate', error: 'Rate is required!' });
        }
        if (Number(info?.apr) <= 0) {
          errors.push({ key: 'APR', error: 'APR is required!' });
        }
        if (Number(info?.amount) <= 0) {
          errors.push({
            key: 'Reward amount',
            error: 'Reward amount is required!',
          });
        }
      }

      if (errors.length > 0) {
        setErrorData(errors);
        setIsShowError(true);
        return;
      }

      setLoading(true);
      let pools: TopUpDappInfor[] = [];

      for (const form of finalFormMappings) {
        const info: any = form.info.find((item) => !!item);

        const data = await cStakeAPI.createNewStakingPool({
          principle_token: form?.staking_token,
          reward_token: form?.reward_token,
          base_ratio: Number(info?.apr?.replaceAll('%', '')) / 100,
          token_price: 1 / Number(info?.rate),
        });

        if (data && data.reward_pool_address) {
          pools = [
            ...pools,
            {
              title: `Pool ${data.principle_token?.symbol}/${data.reward_token?.symbol}`,
              amount: formatCurrency(Number(info?.amount), 0, 0),
              tokenSymbol: data.reward_token?.symbol,
              tokenAddress: data.reward_token_address,
              paymentAddress: data.reward_pool_address,
              networkName: dappState.chain?.chainName || '',
            },
          ];
        }
      }

      if (pools.length > 0) {
        setTopupInfo(pools);
        setIsShowTopup(true);
        dispatch(requestReload());
        handleReset();
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
