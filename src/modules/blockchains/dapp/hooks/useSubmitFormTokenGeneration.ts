import { useAppSelector } from '@/stores/hooks';
import { dappSelector } from '@/stores/states/dapp/selector';
import { getError } from '@/utils/error';
import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { formDappSignal } from '../signals/useFormDappsSignal';
import { FormDappUtil } from '../utils';
import { isEmpty } from 'lodash';
import CTokenGenerationAPI from '@/services/api/dapp/token_generation';
import { IBodyCreateToken } from '@/modules/apps/CreateToken/contract/interface';
import { getTokenomics, getTotalSupply } from '@/modules/apps/CreateToken/utils';
import { ITokenomics } from '@/modules/apps/CreateToken/states/types';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import TOKENABI from '@/modules/apps/CreateToken/contract/abis/Token.json';
import { ethers } from 'ethers';
import { extractedValue } from '@/modules/blockchains/dapp/hooks/utils';
import { showSuccess } from '@components/toast';
import { requestReload } from '@/stores/states/common/reducer';
import { useDispatch } from 'react-redux';

interface IProps {
  setErrorData: Dispatch<SetStateAction<{ key: string; error: string }[]>>,
  setIsShowError: Dispatch<SetStateAction<boolean>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
}

const useSubmitFormTokenGeneration = ({setErrorData, setIsShowError, setLoading}: IProps) => {
  const dappState = useAppSelector(dappSelector);
  const { accountInforL2Service } = useAppSelector(getL2ServicesStateSelector);
  const dispatch = useDispatch();

  const onSubmitForm = () => {
    try {
      let baseMapping: Record<string, { key: string; value: string }[]> = {};
      let blockMapping: Record<string, { key: string; value: string }[]> = {};

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

      baseMapping = extractedValue(formDappInBase, formDapp, baseMapping);
      blockMapping = extractedValue(
        formDappInBlock,
        formDapp,
        blockMapping,
      );
      blockMapping = extractedValue(
        formDappInSingle,
        formDapp,
        blockMapping,
      );

      setErrorData([]);
      let errors: any[] = [];
      if (!baseMapping?.token_name || isEmpty(baseMapping?.token_name)) {
        errors.push({ key: 'token_name', error: 'Token name is required!' });
      }
      if (!baseMapping?.token_symbol || isEmpty(baseMapping?.token_symbol)) {
        errors.push({
          key: 'token_symbol',
          error: 'Token symbol is required!',
        });
      }
      if (!baseMapping?.token_supply || isEmpty(baseMapping?.token_supply)) {
        errors.push({
          key: 'token_supply',
          error: 'Token supply is required!',
        });
      } else if (isNaN(Number(baseMapping?.token_supply))) {
        errors.push({ key: 'token_supply', error: 'Token supply is number!' });
      } else if (Number(baseMapping?.token_supply) <= 0) {
        errors.push({ key: 'token_supply', error: 'Token supply > 0!' });
      }

      const keys = Object.keys(blockMapping);

      for (const key of keys) {
        const blocks = blockMapping[key];

        for (const block of blocks) {
          const blockTemp = block as unknown as ITokenomics;
          const index = blocks.indexOf(block) + 1;

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
              error: `Allocation #${index} address is required!`,
            });
          }

          if (blockTemp?.is_vesting) {
            if (!blockTemp?.cliff || isEmpty(blockTemp?.cliff)) {
              errors.push({
                key: 'tokenomic_cliff_amount',
                error: `Allocation #${index} cliff amount is required!`,
              });
            }
            if (!blockTemp?.duration || isEmpty(blockTemp?.duration)) {
              errors.push({
                key: 'tokenomic_duration_amount',
                error: `Allocation #${index} duration amount is required!`,
              });
            }
          }
        }
      }

      console.log('baseMapping', baseMapping);
      console.log('blockMapping', blockMapping);

      if (errors.length > 0) {
        setErrorData(errors);
        setIsShowError(true);
        return;
      }

      setLoading(true);
      const api = new CTokenGenerationAPI();

      // @ts-ignore
      const getTokenomicsDefault: ITokenomics[] = () => {
        if (
          getTotalSupply(
            blockMapping?.allocation as unknown as ITokenomics[],
          ) === 0
        ) {
          return [
            {
              name: 'Foundation',
              address: accountInforL2Service?.tcAddress,
              total_amount: baseMapping.token_supply as unknown as string,
            } as unknown as ITokenomics,
          ] as ITokenomics[];
        }

        return blockMapping.allocation as unknown as ITokenomics[];
      };

      // @ts-ignore
      const defaultTokenomics = getTokenomicsDefault();

      const body: IBodyCreateToken = {
        name: baseMapping?.token_name as unknown as string,
        symbol: baseMapping.token_symbol as unknown as string,
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
      ]);

      console.log('body', body);
      console.log('calldata', calldata);

      api.generateNewToken({
        data_hex: calldata,
        type: 'token',
        network_id: Number(dappState?.chain?.chainId),
      });

      showSuccess({message: 'Generate token successfully!'});
      dispatch(requestReload());
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
