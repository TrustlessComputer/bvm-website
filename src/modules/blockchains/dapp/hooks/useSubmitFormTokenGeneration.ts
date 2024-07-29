import { useAppSelector } from '@/stores/hooks';
import { dappSelector } from '@/stores/states/dapp/selector';
import { getError } from '@/utils/error';
import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import {
  formDappDropdownSignal,
  formDappInputSignal,
  formDappSignal,
  formDappToggleSignal,
} from '../signals/useFormDappsSignal';
import { FormDappUtil } from '../utils';
import { isEmpty } from 'lodash';
import CTokenGenerationAPI from '@/services/api/dapp/token_generation';
import { IBodyCreateToken } from '@/modules/apps/CreateToken/contract/interface';
import {
  getTokenomics,
  getTotalSupply,
} from '@/modules/apps/CreateToken/utils';
import { ITokenomics } from '@/modules/apps/CreateToken/states/types';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import TOKENABI from '@/modules/apps/CreateToken/contract/abis/Token.json';
import { ethers } from 'ethers';
import { extractedValue } from '@/modules/blockchains/dapp/hooks/utils';
import { showSuccess } from '@components/toast';
import { requestReload } from '@/stores/states/common/reducer';
import { useDispatch } from 'react-redux';
import BigNumber from 'bignumber.js';
import { formatCurrency } from '@utils/format';
import { draggedIds2DSignal } from '@/modules/blockchains/dapp/signals/useDragSignal';

interface IProps {
  setErrorData: Dispatch<
    SetStateAction<{ key: string; error: string }[] | undefined>
  >;
  setIsShowError: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const useSubmitFormTokenGeneration = ({
  setErrorData,
  setIsShowError,
  setLoading,
}: IProps) => {
  const dappState = useAppSelector(dappSelector);
  const { accountInforL2Service } = useAppSelector(getL2ServicesStateSelector);
  const dispatch = useDispatch();

  const handleReset = () => {
    formDappInputSignal.value = {};
    formDappDropdownSignal.value = {};
    formDappToggleSignal.value = {};
    draggedIds2DSignal.value = [];
  };

  function validate(
    dataMapping: Record<string, { key: string; value: string }[]>[],
  ) {
    let errors: any[] = [];

    for (const data of dataMapping) {
      if (!data?.token_name || isEmpty(data?.token_name)) {
        errors.push({ key: 'token_name', error: 'Token Name is required!' });
      }
      if (!data?.token_symbol || isEmpty(data?.token_symbol)) {
        errors.push({
          key: 'token_symbol',
          error: 'Symbol is required!',
        });
      }
      if (!data?.token_supply || isEmpty(data?.token_supply)) {
        errors.push({
          key: 'token_supply',
          error: 'Total Supply is required!',
        });
      } else if (isNaN(Number(data?.token_supply))) {
        errors.push({ key: 'token_supply', error: 'Token supply is number!' });
      } else if (Number(data?.token_supply) <= 0) {
        errors.push({ key: 'token_supply', error: 'Token supply > 0!' });
      }

      if (!data?.receiver_address || isEmpty(data?.receiver_address)) {
        errors.push({
          key: 'receiver_address',
          error: 'Receiver Address is required!',
        });
      }

      const blocks = data.allocation || [];
      let totalAmount = new BigNumber(0);

      for (const block of blocks) {
        const blockTemp = block as unknown as ITokenomics;
        const index = blocks.indexOf(block) + 1;
        console.log('blockTemp', blockTemp);
        totalAmount = totalAmount.plus(blockTemp?.total_amount || 0);

        if (!blockTemp?.name || isEmpty(blockTemp?.name)) {
          errors.push({
            key: 'tokenomic_name',
            error: `Allocation #${index} name is required!`,
          });
        }
        if (!blockTemp?.total_amount || isEmpty(blockTemp?.total_amount)) {
          errors.push({
            key: 'tokenomic_amount',
            error: `Allocation #${index} amount is required!`,
          });
        }
        if (!blockTemp?.address || isEmpty(blockTemp?.address)) {
          errors.push({
            key: 'tokenomic_address',
            error: `Allocation #${index} Receiver Address is required!`,
          });
        }

        if (blockTemp?.is_vesting) {
          if (!blockTemp?.cliff || isEmpty(blockTemp?.cliff)) {
            errors.push({
              key: 'tokenomic_cliff',
              error: `Allocation #${index} Cliff is required!`,
            });
          }
          if (!blockTemp?.duration || isEmpty(blockTemp?.duration)) {
            errors.push({
              key: 'tokenomic_duration',
              error: `Allocation #${index} Duration is required!`,
            });
          }
        }
      }

      if (
        Number(data?.token_supply) > 0 &&
        Number(data?.token_supply) > totalAmount.toNumber() &&
        blocks?.length > 0
      ) {
        const remainingSupply = new BigNumber(
          data?.token_supply as unknown as string,
        )
          .minus(totalAmount)
          .toNumber();

        errors.push({
          key: 'amount_remaining',
          error: `Remaining ${formatCurrency(remainingSupply, 0)} ${
            data?.token_symbol
          }`,
        });
      } else if (
        totalAmount.toNumber() > 0 &&
        totalAmount.toNumber() > Number(data?.token_supply)
      ) {
        const remainingSupply = new BigNumber(totalAmount)
          .minus(data?.token_supply as unknown as string)
          .toNumber();

        errors.push({
          key: 'amount_remaining',
          error: `Sum Allocation Amount larger than Total Supply ${formatCurrency(
            remainingSupply,
            0,
          )} ${data?.token_symbol}`,
        });
      }
    }
    return errors;
  }

  const onSubmitForm = async () => {
    try {
      setLoading(true);

      let dataMapping: Record<string, { key: string; value: string }[]>[] = [];

      const formDapp = formDappSignal.value;
      const formDappInBase = Object.keys(formDapp).filter(
        (key) => !FormDappUtil.isInBlock(key) && !FormDappUtil.isInSingle(key),
      );
      const formDappInBlock = Object.keys(formDapp).filter(
        FormDappUtil.isInBlock,
      );
      const formDappInSingle = Object.keys(formDapp).filter(
        FormDappUtil.isInSingle,
      );

      dataMapping = extractedValue(formDappInBase, formDapp, dataMapping);
      dataMapping = extractedValue(formDappInBlock, formDapp, dataMapping);
      dataMapping = extractedValue(formDappInSingle, formDapp, dataMapping);

      setErrorData([]);
      let errors = validate(dataMapping);

      if (errors.length > 0) {
        setErrorData(errors);
        setIsShowError(true);
        setLoading(false);
        return;
      }

      for (const data of dataMapping) {
        // @ts-ignore
        const getTokenomicsDefault: ITokenomics[] = () => {
          if (
            getTotalSupply(
              (data?.allocation || []) as unknown as ITokenomics[],
            ) === 0
          ) {
            return [
              {
                name: 'Foundation',
                address: data?.receiver_address,
                total_amount: data.token_supply as unknown as string,
              } as unknown as ITokenomics,
            ] as ITokenomics[];
          }

          return (data?.allocation || []) as unknown as ITokenomics[];
        };

        // @ts-ignore
        const defaultTokenomics = getTokenomicsDefault();

        const body: IBodyCreateToken = {
          name: data?.token_name as unknown as string,
          symbol: data.token_symbol as unknown as string,
          ...getTokenomics(defaultTokenomics),
        };

        const {
          name,
          symbol,
          beneficiaries,
          beneficiaryNames,
          starts,
          durations,
          durationUnits,
          amountTotals,
          unvestAmounts,
          cliffs,
          cliffUnits,
        } = body;

        let iface = new ethers.utils.Interface(TOKENABI.abi);

        const calldata = iface.encodeDeploy([
          name,
          symbol,
          beneficiaries,
          beneficiaryNames,
          starts,
          durations,
          durationUnits,
          amountTotals,
          unvestAmounts,
          cliffs,
          cliffUnits,
        ]);

        console.log('body', body);
        console.log('calldata', calldata);

        const api = new CTokenGenerationAPI();
        await api.generateNewToken({
          data_hex: calldata,
          type: 'token',
          network_id: Number(dappState?.chain?.chainId),
        });
      }

      showSuccess({ message: 'Generate token successfully!' });
      dispatch(requestReload());
      handleReset();
    } catch (error) {
      const { message } = getError(error);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    onSubmit: onSubmitForm,
  };
};

export default useSubmitFormTokenGeneration;
