import React from 'react';

import { useAppSelector } from '@/stores/hooks';
import { dappSelector } from '@/stores/states/dapp/selector';
import { BlockModel, DappModel, FieldModel } from '@/types/customize-model';
import { useParams, usePathname } from 'next/navigation';
import DateTimeInput from '../component4/DateTimeInput';
import Dropdown from '../component4/Dropdown';
import ExtendsInput from '../component4/ExtendsInput';
import Input from '../component4/Input';
import Lego from '../component4/Lego';
import { accountAbstractionAsADapp, dappMockupData } from '../mockup_3';
import useDappsStore from '../stores/useDappStore';
import { FieldOption } from '../types';
import { adjustBrightness, cloneDeep, preDataAirdropTask } from '../utils';

const useDapps = () => {
  const pathname = usePathname();
  const params = useParams();
  const isUpdateChain = React.useMemo(() => !!params?.id, [params?.id]);

  const { dapps, setDapps } = useDappsStore();

  const dappState = useAppSelector(dappSelector);
  const { configs, tokens, airdropTasks } = dappState;

  const blockFieldMapping = React.useMemo(() => {
    return dapps.map((dapp) => {
      const thisDapp = dapp;

      const mapping: Record<string, BlockModel> = {};

      (thisDapp?.blockFields || []).forEach((item) => {
        mapping[item.key] = item;
      });

      return mapping;
    });
  }, [dapps]);

  const singleFieldMapping = React.useMemo(() => {
    return dapps.map((dapp) => {
      const thisDapp = dapp;

      const mapping: Record<string, BlockModel> = {};

      (thisDapp?.singleFields || []).forEach((item) => {
        mapping[item.key] = item;
      });

      return mapping;
    });
  }, [dapps]);

  const moduleFieldMapping = React.useMemo(() => {
    return dapps.map((dapp) => {
      const thisDapp = dapp;

      const mapping: Record<string, BlockModel> = {};

      (thisDapp?.moduleFields || []).forEach((item) => {
        mapping[item.key] = item;
      });

      return mapping;
    });
  }, [dapps]);

  const baseModuleFieldMapping = React.useMemo(() => {
    return dapps.map((dapp) => {
      const thisDapp = dapp;

      const mapping: Record<string, BlockModel> = {};

      (thisDapp?.baseModuleFields || []).forEach((item) => {
        mapping[item.key] = item;
      });

      return mapping;
    });
  }, [dapps]);

  const getInputWithLego = React.useCallback(
    (
      thisDapp: DappModel,
      { key: fieldKey, ...field }: FieldModel,
      fieldOpt: FieldOption,
      zIndex: number,
    ) => {
      const _zIndex = zIndex + 1;

      if (field.type === 'input') {
        return (
          <Lego
            first={false}
            last={false}
            titleInLeft={true}
            titleInRight={false}
            zIndex={_zIndex}
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
            zIndex={_zIndex}
          >
            <Dropdown
              {...field}
              {...fieldOpt}
              dappKey={thisDapp.key}
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
            thisDapp={thisDapp}
            key={fieldKey}
            name={fieldKey}
            dappKey={thisDapp.key}
            zIndex={_zIndex}
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
            zIndex={_zIndex}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {field.options.map((option, optIndex) =>
                getInputWithoutLego(thisDapp, option, fieldOpt),
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
            zIndex={_zIndex}
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
    [dapps],
  );

  const getInputWithoutLego = React.useCallback(
    (
      thisDapp: DappModel,
      { key: fieldKey, ...field }: FieldModel,
      fieldOpt: FieldOption,
    ) => {
      if (field.type === 'input') {
        return (
          <Input
            {...field}
            {...fieldOpt}
            dappKey={thisDapp.key}
            name={fieldKey}
            key={fieldKey}
          />
        );
      } else if (field.type === 'dropdown') {
        return (
          <Dropdown
            {...field}
            {...fieldOpt}
            dappKey={thisDapp.key}
            name={fieldKey}
            key={fieldKey}
            options={field.options}
          />
        );
      } else if (field.type === 'extends') {
        return (
          <ExtendsInput
            {...field}
            {...fieldOpt}
            key={fieldKey}
            name={fieldKey}
            dappKey={thisDapp.key}
            thisDapp={thisDapp}
          />
        );
      } else if (field.type === 'group') {
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {field.options.map((option, optIndex) =>
              getInputWithoutLego(thisDapp, option, fieldOpt),
            )}
          </div>
        );
      } else if (field.type === 'datetime') {
        return (
          <DateTimeInput
            {...field}
            {...fieldOpt}
            name={fieldKey}
            key={fieldKey}
            dappKey={thisDapp.key}
            placeholder={field.placeholder}
          />
        );
      }
    },
    [dapps],
  );

  const getLabelWithLego = React.useCallback(
    (
      thisDapp: DappModel,
      { key: fieldKey, ...field }: FieldModel,
      fieldOpt: FieldOption,
      zIndex: number,
    ) => {
      const _zIndex = zIndex + 1;

      if (field.type === 'input') {
        return (
          <Lego
            first={false}
            last={false}
            titleInLeft={true}
            titleInRight={false}
            zIndex={_zIndex}
            {...field}
            key={fieldKey}
          >
            <Input
              {...field}
              {...fieldOpt}
              dappKey={thisDapp.key}
              name={fieldKey}
              key={fieldKey}
              disabled
              onlyLabel
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
            zIndex={_zIndex}
          >
            <Dropdown
              {...field}
              {...fieldOpt}
              dappKey={thisDapp.key}
              name={fieldKey}
              key={fieldKey}
              options={field.options}
              disabled
              onlyLabel
            />
          </Lego>
        );
      } else if (field.type === 'extends') {
        return (
          <ExtendsInput
            {...field}
            {...fieldOpt}
            thisDapp={thisDapp}
            key={fieldKey}
            name={fieldKey}
            dappKey={thisDapp.key}
            zIndex={_zIndex}
            disabled
            onlyLabel
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
            zIndex={_zIndex}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {field.options.map((option, optIndex) =>
                getLabelWithoutLego(thisDapp, option, fieldOpt),
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
            zIndex={_zIndex}
          >
            <DateTimeInput
              {...field}
              {...fieldOpt}
              name={fieldKey}
              key={fieldKey}
              dappKey={thisDapp.key}
              placeholder={field.placeholder}
              disabled
              onlyLabel
            />
          </Lego>
        );
      }
    },
    [dapps],
  );

  const getLabelWithoutLego = React.useCallback(
    (
      thisDapp: DappModel,
      { key: fieldKey, ...field }: FieldModel,
      fieldOpt: FieldOption,
    ) => {
      if (field.type === 'input') {
        return (
          <Input
            {...field}
            {...fieldOpt}
            dappKey={thisDapp.key}
            name={fieldKey}
            key={fieldKey}
            disabled
            onlyLabel
          />
        );
      } else if (field.type === 'dropdown') {
        return (
          <Dropdown
            {...field}
            {...fieldOpt}
            dappKey={thisDapp.key}
            name={fieldKey}
            key={fieldKey}
            options={field.options}
            disabled
            onlyLabel
          />
        );
      } else if (field.type === 'extends') {
        return (
          <ExtendsInput
            {...field}
            {...fieldOpt}
            key={fieldKey}
            name={fieldKey}
            dappKey={thisDapp.key}
            thisDapp={thisDapp}
            disabled
            onlyLabel
          />
        );
      } else if (field.type === 'group') {
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {field.options.map((option, optIndex) =>
              getLabelWithoutLego(thisDapp, option, fieldOpt),
            )}
          </div>
        );
      } else if (field.type === 'datetime') {
        return (
          <DateTimeInput
            {...field}
            {...fieldOpt}
            name={fieldKey}
            key={fieldKey}
            dappKey={thisDapp.key}
            placeholder={field.placeholder}
            disabled
            onlyLabel
          />
        );
      }
    },
    [dapps],
  );

  const dappMapping = React.useMemo(() => {
    return dapps.reduce((acc, dapp) => {
      acc[dapp.key] = dapp;
      return acc;
    }, {} as Record<string, DappModel>);
  }, [dapps]);

  const fetchDapps = () => {
    const _dapps = [accountAbstractionAsADapp];
    const otherDapps = isUpdateChain
      ? cloneDeep(configs)
      : cloneDeep(dappMockupData); // defi_apps

    _dapps.push(...otherDapps);

    const sortedDapps = _dapps.sort((a, b) => a.order - b.order);

    setDapps(preDataAirdropTask(sortedDapps, tokens, airdropTasks));
  };

  React.useEffect(() => {
    fetchDapps();
  }, [pathname]);

  React.useEffect(() => {
    fetchDapps();
  }, [configs, tokens, airdropTasks]);

  return {
    dapps,
    dappMapping,
    blockFieldMapping,
    singleFieldMapping,
    moduleFieldMapping,
    baseModuleFieldMapping,
    getInputWithLego,
    getInputWithoutLego,
    getLabelWithLego,
    getLabelWithoutLego,
  };
};

export default useDapps;
