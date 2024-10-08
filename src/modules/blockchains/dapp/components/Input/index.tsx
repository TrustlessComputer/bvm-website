import { useSignalEffect } from '@preact/signals-react';
import cn from 'classnames';
import React from 'react';

import {
  formDappSignal,
  formTemplateDappSignal,
} from '../../signals/useFormDappsSignal';
import { FieldOption } from '../../types';
import { FormDappUtil } from '../../utils';

import styles from './styles.module.scss';
import { FieldModel } from '@/types/customize-model';

type Props = {
  name: string;
  dappKey: string;
  onlyLabel?: boolean;
  disabled?: boolean;
} & FieldOption &
  FieldModel;

const Input = ({
  name,
  dappKey,
  placeholder,
  onlyLabel = false,
  disabled = false,
  inputType = 'text',
  inputAccept,
  ...props
}: Props) => {
  const [value, setValue] = React.useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || onlyLabel) return;

    const formDappInput = formDappSignal.value;
    const key = FormDappUtil.getKeyForm(props, props, name);
    if (inputType === 'file') {
      const keyFile = FormDappUtil.getKeyForm(props, props, `${name}_file`);
      formDappSignal.value = {
        ...formDappInput,
        [key]: e.target.value,
        [keyFile]: e.target?.files?.[0],
      };
    } else {
      formDappSignal.value = {
        ...formDappInput,
        [key]: e.target.value,
      };
    }
  };

  useSignalEffect(() => {
    if (disabled || onlyLabel) return;

    const thisValue =
      formDappSignal.value[FormDappUtil.getKeyForm(props, props, name)];

    if (typeof thisValue !== 'undefined' && thisValue !== value) {
      setValue(thisValue || '');
    }
  });

  React.useEffect(() => {
    const formDappInput = onlyLabel
      ? formTemplateDappSignal.value
      : formDappSignal.value;
    const key = FormDappUtil.getKeyForm(props, props, name);

    if (typeof formDappInput[key] === 'undefined') {
      formDappSignal.value = {
        ...formDappInput,
        [key]: '',
      };
    } else {
      setValue(formDappInput[key]);
    }
  }, []);

  return (
    <input
      type={disabled ? 'text' : inputType}
      className={cn(styles.input, {
        [styles.input__disabled]: disabled,
        [styles.input__file]: inputType === 'file',
      })}
      accept={inputAccept || undefined}
      onChange={handleInputChange}
      value={value}
      name={name}
      id={name}
      placeholder={placeholder}
    />
  );
};

export default React.memo(Input);
