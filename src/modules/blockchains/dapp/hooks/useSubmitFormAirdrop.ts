import { showSuccess } from '@/components/toast';
import { extractedValue } from '@/modules/blockchains/dapp/hooks/utils';
import CTokenAirdropAPI from '@/services/api/dapp/airdrop';
import { IBodySetupTask, ITask } from '@/services/api/dapp/airdrop/interface';
import { useAppSelector } from '@/stores/hooks';
import { requestReload } from '@/stores/states/common/reducer';
import { dappSelector } from '@/stores/states/dapp/selector';
import { getError } from '@/utils/error';
import { compareString } from '@/utils/string';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { draggedIds2DSignal } from '../signals/useDragSignal';
import {
  formDappDropdownSignal,
  formDappInputSignal,
  formDappSignal,
  formDappToggleSignal,
} from '../signals/useFormDappsSignal';
import { FormDappUtil, getAirdropTaskKey } from '../utils';
// @ts-ignore
import Papa from 'papaparse';

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
  const airdropTask = dappState.airdropTasks;
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

      console.log('airdropTask', airdropTask);

      const _tasks: any[] = [];

      for (const form of finalFormMappings) {
        console.log('form', form);
        if (!(Number(form?.airdrop_amount) > 0)) {
          errors.push({ key: 'airdrop_amount', error: 'Reward is required!' });
        }
        if (!form?.end_date) {
          errors.push({ key: 'end_date', error: 'End date is required!' });
        }

        for (const _airdropTask of airdropTask) {
          const findTask = form?.[getAirdropTaskKey(_airdropTask)];
          if (findTask) {
            if (findTask) {
              const __task = findTask.find((item) => item);

              _tasks.push({
                ...__task,
                type: _airdropTask.type,
                id: _airdropTask.id,
              });
            }
          }
        }
      }

      if (_tasks.length === 0) {
        errors.push({
          key: 'tasks',
          error: 'Task Reward is required!',
        });
      } else if (_tasks.length > 0) {
        for (const task of _tasks) {
          if (compareString(task.type, 'follow')) {
            if (!task?.follow_twitter_username) {
              errors.push({
                key: 'follow_twitter_username',
                error: 'Your X URL is required!',
              });
            }
            if (!(Number(task.reward_amount) > 0)) {
              errors.push({
                key: 'reward_amount',
                error: 'Task Reward is required!',
              });
            }
          } else if (compareString(task.type, 'share')) {
            if (!task?.share_post_link) {
              errors.push({
                key: 'share_post_link',
                error: 'Link Share X is required!',
              });
            }
            if (!(Number(task.reward_amount) > 0)) {
              errors.push({
                key: 'reward_amount',
                error: 'Task Reward is required!',
              });
            }
          } else if (compareString(task.type, 'whitelist')) {
            if (!task?.whitelist) {
              errors.push({
                key: 'whitelist',
                error: 'Receivers is required!',
              });
            }
          }
        }
      }

      if (errors.length > 0) {
        setErrorData(errors);
        setIsShowError(true);
        return;
      }

      setLoading(true);

      for (const form of finalFormMappings) {
        // @ts-ignore
        const tasks: ITask[] = _tasks
          .filter((v) => !compareString(v.type, 'whitelist'))
          .map((v) => ({
            ...v,
            amount: v.reward_amount,
          }));

        const body: IBodySetupTask = {
          title: form.airdrop_title as unknown as string,
          token_address: form.reward_token as unknown as string,
          amount: form.airdrop_amount as unknown as string,
          is_bvm_shard: Boolean(form.is_bvm_shard),
          start_time: form.start_date
            ? dayjs(form.start_date as unknown as string).unix()
            : dayjs().unix(),
          end_time: dayjs(form.end_date as unknown as string).unix(),
        };

        if (tasks.length > 0) {
          body.tasks = tasks;
          await cAirdropAPI.setupTask(body);
          showSuccess({ message: 'Airdrop created successfully!.' });
          dispatch(requestReload());
          handleReset();
          setLoading(false);
        } else {
          const files = (document?.getElementById?.('whitelist') as any)?.files;
          if (files?.length > 0) {
            const file = files[0];

            Papa.parse(file, {
              complete: async (result: any) => {
                body.receivers = result.data;
                await cAirdropAPI.setupTask(body);
                showSuccess({ message: 'Airdrop created successfully!.' });
                dispatch(requestReload());
                handleReset();
                setLoading(false);
              },
              header: true,
              dynamicTyping: true,
              skipEmptyLines: true,
            });
          }
        }
      }
    } catch (error) {
      const { message } = getError(error);
      toast.error(message);
      setLoading(false);
    } finally {
    }
  };

  return {
    onSubmit: onSubmitFormAirdrop,
  };
};

export default useSubmitFormAirdrop;
