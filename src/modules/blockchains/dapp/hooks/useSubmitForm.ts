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
  formDappSignal,
  formDappToggleSignal,
} from '../signals/useFormDappsSignal';
import useDappsStore from '../stores/useDappStore';
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

  const onSubmitFormTokenGeneration = async () => {
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

      baseMapping = await extractedValue(formDappInBase, formDapp, baseMapping);
      blockMapping = await extractedValue(
        formDappInBlock,
        formDapp,
        blockMapping,
      );
      blockMapping = await extractedValue(
        formDappInSingle,
        formDapp,
        blockMapping,
      );

      // const formDappInput = formDappInputSignal.value;
      // const formDappInputInBase = Object.keys(formDappInput).filter((key) => !FormDappUtil.isInBlock(key) && !FormDappUtil.isInSingle(key) && !FormDappUtil.isExtendsField(key));
      // const formDappInputInBlock = Object.keys(formDappInput).filter(FormDappUtil.isInBlock);

      // const formDappDropdown = formDappDropdownSignal.value;
      // const formDappDropdownInBlock = Object.keys(formDappDropdown).filter(FormDappUtil.isInBlock);

      // const formDappToogle = formDappToggleSignal.value;
      // const formDappToogleInBlock = Object.keys(formDappToogle).filter(FormDappUtil.isInBlock);

      // baseMapping = await extractedValue(formDappInputInBase, formDappInput, baseMapping);

      // blockMapping = await extractedValue(formDappInputInBlock, formDappInput, blockMapping);
      // blockMapping = await extractedValue(formDappDropdownInBlock, formDappDropdown, blockMapping);
      // blockMapping = await extractedValue(formDappToogleInBlock, formDappToogle, blockMapping);

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
