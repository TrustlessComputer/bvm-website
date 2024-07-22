import React, { useState } from 'react';
import useDappsStore from '../stores/useDappStore';
import {
  formDappDropdownSignal,
  formDappInputSignal,
} from '../signals/useFormDappsSignal';
import { FormDappUtil } from '../utils';

const useSubmitForm = () => {
  const { dapps, currentIndexDapp } = useDappsStore();

  const [isDisabled, setIsDisabled] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [isLoading, setLoading] = useState(false);

  const thisDapp = React.useMemo(() => {
    return dapps[currentIndexDapp] || {};
  }, [dapps, currentIndexDapp]);

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

  const onSubmitFormStaking = () => {
    try {
      setLoading(true);

      const finalForm = JSON.parse(JSON.stringify(thisDapp)) as DappModel;
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
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getOnSubmitForm = () => {
    switch (thisDapp?.key) {
      case 'staking':
        return onSubmitFormStaking;
      default:
        return () => {};
    }
  };

  return {
    onSubmit: getOnSubmitForm(),
    isDisabled,
    errMessage,
    isLoading,
  };
};

export default useSubmitForm;
