import React from 'react';
import Image from 'next/image';

import { FormDappUtil } from '../../utils';
import { FieldKeyPrefix } from '../../contants';
import useDappsStore from '../../stores/useDappStore';
import {
  formDappDropdownSignal,
  formDappInputSignal,
  formDappToggleSignal,
} from '../../signals/useFormDappsSignal';

import s from './styles.module.scss';
import useSubmitForm from '../../hooks/useSubmitForm';
import { Button } from '@chakra-ui/react';
import ErrorModal from '../ErrorModal';
import TopupModal from '../TopupModal';

type Props = {};

const LaunchButton = () => {
  const { dapps, currentIndexDapp } = useDappsStore();

  const {
    onSubmit,
    isLoading,
    errorData,
    isShowError,
    setIsShowError,
    topupInfo,
    isShowTopup,
    setIsShowTopup,
  } = useSubmitForm();

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
  const handleLaunch = async () => {
    const finalForm = thisDapp;

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

    const formDappToogle = formDappToggleSignal.value;
    const formDappToogleInBlock = Object.keys(formDappToogle).filter(FormDappUtil.isInBlock);

    // Separate block fields by <index>
    let blockMapping: Record<string, { key: string; value: string }[]> = {};

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
    const newInputInBlock = formDappInputInBlock.map((key) => {
      const block = blockFieldMapping[FormDappUtil.getBlockKey(key)];
      // console.log('block', block);
      // console.log('formDappInputInBlock', formDappInputInBlock);
      // console.log('formDappInput', formDappInput);
      // console.log('key', key);
      return {
        ...block.fields.find((item) => item.key === FormDappUtil.getOriginalKey(key)) as FieldModel,
        value: formDappInput[key],
      };
    });


    async function extractedValue(keys: string[], data: Record<string, any>, result: Record<string, { key: string; value: string }[]>) {
      for (const key of keys) {
        const blockKey = FormDappUtil.getBlockKey(key);
        const getOriginalKey = FormDappUtil.getOriginalKey(key);
        const getIndex = FormDappUtil.getIndex(key);
        const value = data[key];

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
      }

      return result;
      // keys.forEach((key => {
      //   const blockKey = FormDappUtil.getBlockKey(key);
      //   const getOriginalKey = FormDappUtil.getOriginalKey(key);
      //   const getIndex = FormDappUtil.getIndex(key);
      //   const value = data[key];
      //
      //   let block = blockMapping[blockKey];
      //   if (!block) {
      //     blockMapping[blockKey] = [];
      //   }
      //
      //   const blockItem = blockMapping[blockKey][getIndex];
      //   if (!blockItem) {
      //     const temp = {};
      //     // @ts-ignore
      //     temp[getOriginalKey] = value;
      //     // @ts-ignore
      //     blockMapping[blockKey][getIndex] = { ...temp };
      //   } else {
      //     const temp = { ...blockItem };
      //     // @ts-ignore
      //     temp[getOriginalKey] = value;
      //     blockMapping[blockKey][getIndex] = { ...temp };
      //   }
      // }));
    }

    // formDappInputInBlock.forEach((key => {
    //   const blockKey = FormDappUtil.getBlockKey(key);
    //   const getOriginalKey = FormDappUtil.getOriginalKey(key);
    //   const getIndex = FormDappUtil.getIndex(key);
    //   const value = formDappInput[key];
    //
    //   extractedValue(blockKey, getIndex, getOriginalKey, value);
    // }));

    blockMapping = await extractedValue(formDappInputInBlock, formDappInput, blockMapping);

    console.log('blockMapping 1', blockMapping);

    // formDappDropdownInBlock.forEach((key => {
    //   const blockKey = FormDappUtil.getBlockKey(key);
    //   const getOriginalKey = FormDappUtil.getOriginalKey(key);
    //   const getIndex = FormDappUtil.getIndex(key);
    //   const value = formDappDropdown[key];
    //
    //   console.log('formDappDropdownInBlock', formDappDropdownInBlock);
    //   console.log('blockKey', blockKey);
    //   console.log('getOriginalKey', getOriginalKey);
    //   console.log('getIndex', getIndex);
    //   console.log('value', value);
    //   console.log('----------')
    //
    //   extractedValue(blockKey, getIndex, getOriginalKey, value);
    // }));

    blockMapping = await extractedValue(formDappDropdownInBlock, formDappDropdown, blockMapping);

    console.log('blockMapping 2', blockMapping);
    console.log('====')

    // formDappToogleInBlock.forEach((key => {
    //   const blockKey = FormDappUtil.getBlockKey(key);
    //   const getOriginalKey = FormDappUtil.getOriginalKey(key);
    //   const getIndex = FormDappUtil.getIndex(key);
    //   const value = formDappToogle[key];
    //
    //   extractedValue(blockKey, getIndex, getOriginalKey, value);
    // }));

    console.log('formDappToogleInBlock', formDappToogleInBlock);
    console.log('formDappToogle', formDappToogle);

    blockMapping = await extractedValue(formDappToogleInBlock, formDappToogle, blockMapping);

    console.log('blockMapping 3', blockMapping);


    const newDropdownInBlock = formDappDropdownInBlock.map((key) => {
      const block = blockFieldMapping[FormDappUtil.getBlockKey(key)];
      return {
        ...block.fields.find((item) => item.key === FormDappUtil.getOriginalKey(key)) as FieldModel,
        value: formDappDropdown[key],
      };
    });
    // const newInputInSingle = formDappInputInSingle.map((key) => {
    //   return {
    //     ...singleFieldMapping[FormDappUtil.getOriginalKey(key)],
    //     value: formDappInput[key],
    //   };
    // });
    // const newDropdownInSingle = formDappDropdownInSingle.map((key) => {
    //   return {
    //     ...singleFieldMapping[FormDappUtil.getOriginalKey(key)],
    //     value: formDappDropdown[key],
    //   };
    // });
    // ==================================================

    finalForm.baseBlock.fields = [
      ...thisDapp.baseBlock.fields.filter((item) => !newInputInBase.find((i) => i.key === item.key) && !newDropdownInBase.find((i) => i.key === item.key)),
      ...newInputInBase,
      ...newDropdownInBase,
    ];

    finalForm.blockFields = [
      ...thisDapp.blockFields.map((item) => {
        return {
          ...item,
          fields: [
            ...item.fields.filter((field) => !newInputInBlock.find((i) => i.key === field.key) && !newDropdownInBlock.find((i) => i.key === field.key)),
            ...newInputInBlock,
            ...newDropdownInBlock,
          ],
        } as DappModel['blockFields'][2];
      }),
    ];
    // finalForm.singleFields = [
    //   ...newInputInSingle,
    //   ...newDropdownInSingle,
    // ];

    // console.log('finalForm', finalForm);
    // console.log('formDappInput', formDappInput);
    // console.log('formDappInputInBase', formDappInputInBase);
    // console.log('formDappInputInBlock', formDappInputInBlock);
    // console.log('formDappInputInSingle', formDappInputInSingle);
    // console.log('formDappInputInExtendsField', formDappInputInExtendsField);

    // console.log('formDappDropdown', formDappDropdown);
    // console.log('formDappDropdownInBlock', formDappDropdownInBlock);
    // console.log('formDappInputInExtendsField', formDappInputInExtendsField);
    // console.log('formDappDropdownInExtendsField', formDappDropdownInExtendsField);
    // console.log('formDappDropdownInBase', formDappDropdownInBase);
    // console.log('formDappDropdownInBlock', formDappDropdownInBlock);
    // console.log('formDappDropdownInSingle', formDappDropdownInSingle);
    // console.log('formDappDropdownInExtendsField', formDappDropdownInExtendsField);

    // console.log('formDappToogle', formDappToogle);
    // console.log('blockMapping', blockMapping);
    // console.log('newInputInBlock', newInputInBlock);
    // console.log('newDropdownInBlock', newDropdownInBlock);
    // console.log('blockFieldMapping', blockFieldMapping);

    console.log("🚀 -> file: index.tsx:122 -> handleLaunch -> finalForm ::", finalForm)
  };

  return (
    <>
      <Button
        isLoading={isLoading}
        className={s.button}
        type={'submit'}
        onClick={handleLaunch}
      >
        Launch <Image src="/launch.png" alt="launch" width={24} height={24} />
      </Button>
      <ErrorModal
        title="Missing Required"
        show={isShowError}
        onHide={() => setIsShowError(false)}
        closeText="Retry"
        className={s.modalError}
      >
        <ul className={s.fields}>
          {errorData &&
            errorData?.length > 0 &&
            errorData?.map((item) => {
              return (
                <li key={item.key} className={s.fields__field}>
                  {item.error}
                </li>
              );
            })}
        </ul>
      </ErrorModal>
      <TopupModal
        show={isShowTopup}
        infor={topupInfo}
        onClose={() => {
          setIsShowTopup(false);
        }}
      />
    </>
  );
};

export default LaunchButton;
