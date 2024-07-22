import React from 'react';
import Image from 'next/image';

import { FormDappUtil } from '../../utils';
import { FieldKeyPrefix } from '../../contants';
import useDappsStore from '../../stores/useDappStore';
import {
  formDappDropdownSignal,
  formDappInputSignal,
} from '../../signals/useFormDappsSignal';

import styles from './styles.module.scss';
import useSubmitForm from '../../hooks/useSubmitForm';
import { Button } from '@chakra-ui/react';

type Props = {};

const LaunchButton = () => {
  const { dapps, currentIndexDapp } = useDappsStore();

  const { onSubmit, isDisabled, isLoading } = useSubmitForm();

  const thisDapp = React.useMemo(() => {
    return dapps[currentIndexDapp];
  }, [dapps, currentIndexDapp]);

  const blockFieldMapping = React.useMemo(() => {
    const mapping: Record<string, DappModel['blockFields'][2]> = {};

    (thisDapp?.blockFields || []).forEach((item) => {
      mapping[item.key] = item;
    });

    return mapping;
  }, [thisDapp]);

  const singleFieldMapping = React.useMemo(() => {
    const mapping: Record<string, DappModel['singleFields'][2]> = {};

    (thisDapp?.singleFields || []).forEach((item) => {
      mapping[item.key] = item;
    });

    return mapping;
  }, [thisDapp]);

  // base-<key>-<level>
  // block-<key>-<level>-<index>-<blockKey>
  // single-<key>-<level>-<index>
  // level: 0 -> n
  // index: 0 -> n
  // If level greater than 0, it's in the 'extends' field
  // prettier-ignore
  const handleLaunch = () => {
    const finalForm = JSON.parse(JSON.stringify(thisDapp)) as DappModel;

    const formDappInput = formDappInputSignal.value;
    const formDappInputInBase = Object.keys(formDappInput).filter((key) => !FormDappUtil.isInBlock(key) && !FormDappUtil.isInSingle(key) && !FormDappUtil.isExtendsField(key));
    const formDappInputInBlock = Object.keys(formDappInput).filter(FormDappUtil.isInBlock);
    const formDappInputInSingle = Object.keys(formDappInput).filter(FormDappUtil.isInSingle);
    const formDappInputInExtendsField = Object.keys(formDappInput).filter(FormDappUtil.isExtendsField);

    const formDappDropdown = formDappDropdownSignal.value;
    const formDappDropdownInBase = Object.keys(formDappDropdown).filter((key) => !FormDappUtil.isInBlock(key) && !FormDappUtil.isInSingle(key) && !FormDappUtil.isExtendsField(key));
    const formDappDropdownInBlock = Object.keys(formDappDropdown).filter(FormDappUtil.isInBlock);
    const formDappDropdownInSingle = Object.keys(formDappDropdown).filter(FormDappUtil.isInSingle);
    const formDappDropdownInExtendsField = Object.keys(formDappDropdown).filter(FormDappUtil.isExtendsField);

    // Separate block fields by <index>
    const blockMapping: Record<string, { key: string; value: string }[]> = {};

    // ==================================================
    const newInputInBase = formDappInputInBase.map((key) => {
      return {
        ...thisDapp.baseBlock.fields.find((item) => item.key === FormDappUtil.getOriginalKey(key)) as FieldModel,
        value: formDappInput[key],
      };
    });
    const newDropdownInBase = formDappDropdownInBase.map((key) => {
      return {
        ...thisDapp.baseBlock.fields.find((item) => item.key === FormDappUtil.getOriginalKey(key)) as FieldModel,
        value: formDappDropdown[key],
      };
    });
    // const newInputInBlock = formDappInputInBlock.map((key) => {
    //   const block = blockFieldMapping[FormDappUtil.getBlockKey(key)];
    //   return {
    //     ...block.fields.find((item) => item.key === FormDappUtil.getOriginalKey(key)) as FieldModel,
    //     value: formDappInput[key],
    //   };
    // });
    // const newDropdownInBlock = formDappDropdownInBlock.map((key) => {
    //   const block = blockFieldMapping[FormDappUtil.getBlockKey(key)];
    //   return {
    //     ...block.fields.find((item) => item.key === FormDappUtil.getOriginalKey(key)) as FieldModel,
    //     value: formDappDropdown[key],
    //   };
    // });
    const newInputInSingle = formDappInputInSingle.map((key) => {
      return {
        ...singleFieldMapping[FormDappUtil.getOriginalKey(key)],
        value: formDappInput[key],
      };
    });
    const newDropdownInSingle = formDappDropdownInSingle.map((key) => {
      return {
        ...singleFieldMapping[FormDappUtil.getOriginalKey(key)],
        value: formDappDropdown[key],
      };
    });
    // ==================================================

    finalForm.baseBlock.fields = [
      ...thisDapp.baseBlock.fields.filter((item) => !newInputInBase.find((i) => i.key === item.key) && !newDropdownInBase.find((i) => i.key === item.key)),
      ...newInputInBase,
      ...newDropdownInBase,
    ];
    // finalForm.blockFields = [
    //   ...thisDapp.blockFields.map((item) => {
    //     return {
    //       ...item,
    //       fields: [
    //         ...item.fields.filter((field) => !newInputInBlock.find((i) => i.key === field.key) && !newDropdownInBlock.find((i) => i.key === field.key)),
    //         ...newInputInBlock,
    //         ...newDropdownInBlock,
    //       ],
    //     } as DappModel['blockFields'][2];
    //   }),
    // ];
    finalForm.singleFields = [
      ...newInputInSingle,
      ...newDropdownInSingle,
    ];

    console.log("🚀 -> file: index.tsx:122 -> handleLaunch -> finalForm ::", finalForm)
  };

  return (
    <Button
      disabled={isDisabled}
      isLoading={isLoading}
      className={styles.button}
      onClick={onSubmit}
    >
      Launch <Image src="/launch.png" alt="launch" width={24} height={24} />
    </Button>
  );
};

export default LaunchButton;
