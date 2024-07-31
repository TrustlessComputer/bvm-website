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
import CTokenAirdropAPI from '@/services/api/dapp/airdrop';
import { IBodySetupTask, ITask } from '@/services/api/dapp/airdrop/interface';
import dayjs from 'dayjs';
interface IProps {
  setErrorData: Dispatch<
    SetStateAction<{ key: string; error: string }[] | undefined>
  >;
  setIsShowError: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const useSubmitFormAirdrop = ({
  setErrorData,
  setIsShowError,
  setLoading,
}: IProps) => {
  const dappState = useAppSelector(dappSelector);
  const dispatch = useDispatch();
  const cAirdropAPI = new CTokenAirdropAPI();

  const handleReset = () => {
    formDappInputSignal.value = {};
    formDappDropdownSignal.value = {};
    formDappToggleSignal.value = {};
    draggedIds2DSignal.value = [];
  };

  const onSubmitFormAirdrop = async () => {
    try {
      let finalFormMappings: Record<string, any[]>[] = [];
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
        console.log('form', form);
        if (!(Number(form?.airdrop_amount) > 0)) {
          errors.push({ key: 'airdrop_amount', error: 'Reward is required!' });
        }
        if (!form?.reward_token) {
          errors.push({ key: 'reward_token', error: 'Token is required!' });
        }
        if (!form?.airdrop_tasks) {
          errors.push({ key: 'airdrop_tasks', error: 'Tasks is required!' });
        }

        const tasks: any = form.airdrop_tasks.find((item) => !!item);

        if (!(Number(tasks?.reward_amount) > 0)) {
          errors.push({
            key: 'reward_amount',
            error: 'Task Reward is required!',
          });
        }
        if (!tasks?.content) {
          errors.push({ key: 'content', error: 'Content is required!' });
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
        const tasks: ITask[] = form.airdrop_tasks.map((v) => ({
          id: v.task,
          amount: v.reward_amount,
          follow_twitter_username: v.content,
        }));

        const body: IBodySetupTask = {
          title: form.airdrop_title,
          token_address: form.reward_token,
          amount: form.airdrop_amount,
          is_bvm_shard: false,
          tasks,
          start_time: dayjs().format(),
        };

        const data = await cAirdropAPI.setupTask(body);

        // if (data && data.reward_pool_address) {
        //   pools = [
        //     ...pools,
        //     {
        //       title: `Pool ${data.principle_token?.symbol}/${data.reward_token?.symbol}`,
        //       amount: formatCurrency(Number(info?.amount), 0, 0),
        //       tokenSymbol: data.reward_token?.symbol,
        //       tokenAddress: data.reward_token_address,
        //       paymentAddress: data.reward_pool_address,
        //       networkName: dappState.chain?.chainName || '',
        //     },
        //   ];
        // }
      }

      if (pools.length > 0) {
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
    onSubmit: onSubmitFormAirdrop,
  };
};

export default useSubmitFormAirdrop;
