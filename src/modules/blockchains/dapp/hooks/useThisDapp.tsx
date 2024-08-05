import React from 'react';

import { FieldOption } from '../types';
import { adjustBrightness } from '../utils';
import Lego from '../components/Lego';
import ExtendsInput from '../components/ExtendsInput';
import Dropdown from '../components/Dropdown';
import DateTimeInput from '../components/DateTimeInput';
import Input from '../components/Input';

import { BlockModel, FieldModel } from '@/types/customize-model';
import useDappsStore from '@/modules/blockchains/dapp/stores/useDappStore';

export const useThisDapp = () => {
  const { dapps, currentIndexDapp } = useDappsStore();

  const thisDapp = React.useMemo(() => {
    return dapps[currentIndexDapp];
  }, [dapps, currentIndexDapp]);

  const blockFieldMapping = React.useMemo(() => {
    const mapping: Record<string, BlockModel> = {};

    (thisDapp?.blockFields || []).forEach((item) => {
      mapping[item.key] = item;
    });

    return mapping;
  }, [thisDapp]);

  const singleFieldMapping = React.useMemo(() => {
    const mapping: Record<string, BlockModel> = {};

    (thisDapp?.singleFields || []).forEach((item) => {
      mapping[item.key] = item;
    });

    return mapping;
  }, [thisDapp]);

  const moduleFieldMapping = React.useMemo(() => {
    const mapping: Record<string, BlockModel> = {};

    (thisDapp?.moduleFields || []).forEach((item) => {
      mapping[item.key] = item;
    });

    return mapping;
  }, [thisDapp]);

  const baseModuleFieldMapping = React.useMemo(() => {
    const mapping: Record<string, BlockModel> = {};

    (thisDapp?.baseModuleFields || []).forEach((item) => {
      mapping[item.key] = item;
    });

    return mapping;
  }, [thisDapp]);

  const getInput = React.useCallback(
    (
      { key: fieldKey, ...field }: FieldModel,
      fieldOpt: FieldOption,
      zIndex: number,
    ) => {
      if (field.type === 'input') {
        return (
          <Lego
            first={false}
            last={false}
            titleInLeft={true}
            titleInRight={false}
            zIndex={zIndex}
            {...field}
            key={fieldKey}
          >
            <Input
              {...field}
              {...fieldOpt}
              dappKey={thisDapp.key}
              name={fieldKey}
              key={fieldKey}
            />
          </Lego>
        );
      } else if (field.type === 'dropdown') {
        return (
          <Lego
            key={fieldKey}
            background={adjustBrightness(thisDapp.color, -20)}
            first={false}
            last={false}
            title={field.title}
            titleInLeft={true}
            titleInRight={false}
            zIndex={zIndex}
          >
            <Dropdown
              {...field}
              {...fieldOpt}
              keyDapp={thisDapp.key}
              name={fieldKey}
              key={fieldKey}
              options={field.options}
            />
          </Lego>
        );
      } else if (field.type === 'extends') {
        return (
          <ExtendsInput
            {...field}
            {...fieldOpt}
            key={fieldKey}
            name={fieldKey}
            keyDapp={thisDapp.key}
            zIndex={zIndex}
          />
        );
      } else if (field.type === 'group') {
        return (
          <Lego
            {...field}
            key={fieldKey}
            first={false}
            last={false}
            titleInLeft={true}
            titleInRight={false}
            zIndex={zIndex}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {field.options.map((option, optIndex) =>
                getInput(option, fieldOpt, field.options.length - optIndex),
              )}
            </div>
          </Lego>
        );
      } else if (field.type === 'datetime') {
        return (
          <Lego
            {...field}
            key={fieldKey}
            first={false}
            last={false}
            titleInLeft={true}
            titleInRight={false}
            zIndex={zIndex}
          >
            <DateTimeInput
              {...field}
              {...fieldOpt}
              name={fieldKey}
              key={fieldKey}
              dappKey={thisDapp.key}
              placeholder={field.placeholder}
            />
          </Lego>
        );
      }
    },
    [thisDapp],
  );

  return {
    thisDapp,
    blockFieldMapping,
    singleFieldMapping,
    moduleFieldMapping,
    baseModuleFieldMapping,
    getInput,
  };
};
