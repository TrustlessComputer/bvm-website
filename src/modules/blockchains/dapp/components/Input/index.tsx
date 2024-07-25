import React from 'react';
import { useSignalEffect } from '@preact/signals-react';
import cn from 'classnames';

import { FormDappUtil } from '../../utils';
import { FieldOption } from '../../types';
import {
  formDappInputSignal,
  formDappSignal,
  formTemplateDappSignal,
} from '../../signals/useFormDappsSignal';
import useDappsStore, { useFormDappsStore } from '../../stores/useDappStore';

import styles from './styles.module.scss';

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
  ...props
}: Props) => {
  const [value, setValue] = React.useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || onlyLabel) return;

    const formDappInput = formDappSignal.value;
    const key = FormDappUtil.getKeyForm(props, props, name);

    formDappSignal.value = {
      ...formDappInput,
      [key]: e.target.value,
    };
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
      type="text"
      className={cn(styles.input, {
        [styles.input__disabled]: disabled,
      })}
      onChange={handleInputChange}
      value={value}
      name={name}
      placeholder={placeholder}
    />
  );
};

export default React.memo(Input);
