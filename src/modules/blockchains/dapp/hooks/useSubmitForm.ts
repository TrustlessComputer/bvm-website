import React, { useState } from 'react';
import useDappsStore from '../stores/useDappStore';
import {
  formDappDropdownSignal,
  formDappInputSignal,
} from '../signals/useFormDappsSignal';
import { FormDappUtil } from '../utils';

const useSubmitForm = () => {
  const { dapps, currentIndexDapp } = useDappsStore();

  const [isShowError, setIsShowError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errorData, setErrorData] =
    useState<{ key: string; error: string }[]>();

  const thisDapp = React.useMemo(() => {
    return dapps[currentIndexDapp] || {};
  }, [dapps, currentIndexDapp]);

  const onSubmitFormStaking = () => {
    try {
      setErrorData([]);
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

      console.log(
        '🚀 -> file: index.tsx:122 -> handleLaunch -> finalForm ::',
        finalFormMapping,
      );

      let errors: any[] = [];
      if (Number(finalFormMapping?.rate?.value) <= 0) {
        errors.push({ key: 'Rate', error: 'Rate is required!' });
      }
      if (Number(finalFormMapping?.apr?.value) <= 0) {
        errors.push({ key: 'APR', error: 'APR is required!' });
      }

      if (errors.length > 0) {
        setErrorData(errors);
        setIsShowError(true);
        return;
      }

      setLoading(true);
    } catch (error) {
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
  };
};

export default useSubmitForm;
