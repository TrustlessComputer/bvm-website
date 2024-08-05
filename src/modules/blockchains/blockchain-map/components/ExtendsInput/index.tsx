import React from 'react';

import Lego from '../Lego';
import Toggle from '../Toggle';
import Label from '../Label';
import Input from '../Input';
import Dropdown from '../Dropdown';
import useDappsStore from '../../stores/useDappStore';
import { FieldOption } from '../../types';
import { adjustBrightness, FormDappUtil } from '../../utils';
import {
  formDappSignal,
  formDappToggleSignal,
  formTemplateDappSignal,
} from '../../signals/useFormDappsSignal';
import { useThisDapp } from '../../hooks/useThisDapp';
import DateTimeInput from '../DateTimeInput';
import { FieldModel } from '@/types/customize-model';

type Props = FieldModel &
  FieldOption & {
    name: string;
    keyDapp: string;
    background?: string;
    onlyLabel?: boolean;
    disabled?: boolean;
  };

const ExtendsInput = ({
  onlyLabel = false,
  disabled = false,
  ...props
}: Props) => {
  const {
    background = '#A041FF',
    keyDapp,
    title,
    type,
    name,
    options,
    inBaseField,
    inBlockField,
    inSingleField,
    index,
    level,
    blockKey,
    baseIndex,
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

  const { thisDapp } = useThisDapp();

  const [toggle, setToggle] = React.useState(false);

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

    const formDappToggle = onlyLabel
      ? formTemplateDappSignal.value
      : formDappSignal.value;
    const key = FormDappUtil.getKeyForm(props, props, name);

    if (typeof formDappToggle[key] !== 'undefined') {
      setToggle(formDappToggle[key]);
    } else {
      formDappSignal.value = {
        ...formDappToggle,
        [key]: false,
      };
    }
  }, []);

  const getInput = React.useCallback(
    (field: FieldModel, fieldOpt: FieldOption): React.ReactNode => {
      const { key: fieldKey, ...fieldRest } = field;

      if (field.type === 'input') {
        return (
          <Input
            {...fieldRest}
            {...fieldOpt}
            disabled={disabled}
            onlyLabel={onlyLabel}
            name={fieldKey}
            key={fieldKey}
            dappKey={thisDapp.key}
          />
        );
      } else if (field.type === 'dropdown') {
        return (
          <Dropdown
            {...fieldRest}
            {...fieldOpt}
            disabled={disabled}
            onlyLabel={onlyLabel}
            keyDapp={thisDapp.key}
            name={fieldKey}
            key={fieldKey}
            options={field.options}
            background={adjustBrightness(background, -20)}
          />
        );
      } else if (field.type === 'group') {
        return (
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            key={fieldKey}
          >
            {field.options.map((option) => getInput(option, fieldOpt))}
          </div>
        );
      } else if (field.type === 'datetime') {
        return (
          <DateTimeInput
            {...fieldRest}
            {...fieldOpt}
            disabled={disabled}
            onlyLabel={onlyLabel}
            name={fieldKey}
            key={fieldKey}
            dappKey={thisDapp.key}
          />
        );
      }

      return null;
    },

    [thisDapp],
  );

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
        >
          {getInput(props, fieldOption)}
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
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {options.map((option) => getInput(option, fieldOption))}
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
      >
        <Toggle
          background={adjustBrightness(background, -20)}
          handleToggle={handleToggle}
          toggle={toggle}
        />
      </Lego>

      {toggle
        ? options.map((option) => (
            // @ts-ignore
            <ExtendsInput
              name={option.key}
              keyDapp={keyDapp}
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
            />
          ))
        : null}
    </React.Fragment>
  );
};

export default ExtendsInput;
