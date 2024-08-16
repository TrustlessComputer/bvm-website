import React from 'react';

import { DappModel, FieldModel } from '@/types/customize-model';
import {
  formDappSignal,
  formTemplateDappSignal,
} from '../../signals/useFormDappsSignal';
import { FieldOption } from '../../types';
import { adjustBrightness, FormDappUtil } from '../../utils';
import DateTimeInput from '../DateTimeInput';
import Dropdown from '../Dropdown';
import Input from '../Input';
import Lego from '../Lego';
import Toggle from '../Toggle';

type Props = FieldModel &
  FieldOption & {
    name: string;
    dappKey: string;
    background?: string;
    onlyLabel?: boolean;
    disabled?: boolean;
    zIndex?: number;
    thisDapp: DappModel;
  };

const ExtendsInput = ({
  onlyLabel = false,
  disabled = false,
  zIndex = 0,
  ...props
}: Props) => {
  const {
    background = '#A041FF',
    dappKey,
    title,
    type,
    name,
    options,
    inBaseField,
    inBlockField,
    inSingleField,
    dappIndex,
    index,
    level,
    blockKey,
    baseIndex,
    value,
    thisDapp,
  } = props;

  const fieldOption: any = {
    inBaseField,
    inBlockField,
    inSingleField,
    index,
    level,
    blockKey,
    baseIndex,
  };

  const [toggle, setToggle] = React.useState(Boolean(value));

  const getInputWithoutLego = React.useCallback(
    ({ key: fieldKey, ...field }: FieldModel, fieldOpt: FieldOption) => {
      if (field.type === 'input') {
        return (
          <Input
            {...field}
            {...fieldOpt}
            dappKey={thisDapp.key}
            name={fieldKey}
            key={fieldKey}
            disabled={disabled}
            onlyLabel={onlyLabel}
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
            disabled={disabled}
            onlyLabel={onlyLabel}
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
            disabled={disabled}
            onlyLabel={onlyLabel}
          />
        );
      } else if (field.type === 'group') {
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {field.options.map((option, optIndex) =>
              getInputWithoutLego(option, fieldOpt),
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
            disabled={disabled}
            onlyLabel={onlyLabel}
          />
        );
      }
    },
    [thisDapp],
  );

  const handleToggle = () => {
    if (disabled || onlyLabel) return;

    setToggle(!toggle);
    const key = FormDappUtil.getKeyForm(props, props, name);
    formDappSignal.value = {
      ...formDappSignal.value,
      [key]: !toggle,
    };
  };

  React.useEffect(() => {
    if (type !== 'extends') return;

    let formDappToggle = onlyLabel
      ? formTemplateDappSignal.value
      : formDappSignal.value;
    const key = FormDappUtil.getKeyForm(props, props, name);

    if (typeof formDappToggle[key] !== 'undefined') {
      setToggle(formDappToggle[key]);
    } else {
      formDappToggle = {
        ...formDappToggle,
        [key]: Boolean(value),
      };
    }
  }, [value]);

  if (type !== 'group' && type !== 'extends') {
    return (
      <React.Fragment>
        <Lego
          background={background}
          first={false}
          last={false}
          title={title}
          titleInLeft={true}
          titleInRight={false}
          zIndex={zIndex}
        >
          {getInputWithoutLego(props, fieldOption)}
        </Lego>
      </React.Fragment>
    );
  } else if (type !== 'extends') {
    return (
      <React.Fragment>
        <Lego
          background={background}
          first={false}
          last={false}
          title={title}
          titleInLeft={true}
          titleInRight={false}
          zIndex={zIndex}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {options.map((option) => getInputWithoutLego(option, fieldOption))}
          </div>
        </Lego>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Lego
        background={background}
        first={false}
        last={false}
        title={title}
        titleInLeft={true}
        titleInRight={false}
        zIndex={zIndex}
      >
        <Toggle
          background={adjustBrightness(background, -20)}
          handleToggle={handleToggle}
          toggle={toggle}
        />
      </Lego>

      {toggle
        ? options.map((option, optIndex) => (
            <ExtendsInput
              name={option.key}
              dappKey={dappKey}
              dappIndex={dappIndex}
              background={background}
              inBaseField={inBaseField}
              inBlockField={inBlockField}
              inSingleField={inSingleField}
              blockKey={blockKey}
              index={index}
              {...option}
              {...fieldOption}
              level={level + 1}
              key={option.key}
              disabled={disabled}
              onlyLabel={onlyLabel}
              zIndex={zIndex - optIndex}
              thisDapp={thisDapp}
            />
          ))
        : null}
    </React.Fragment>
  );
};

export default ExtendsInput;
