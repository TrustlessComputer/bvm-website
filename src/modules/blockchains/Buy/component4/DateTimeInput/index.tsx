import React from 'react';
import { useSignalEffect } from '@preact/signals-react';

import { FieldOption } from '../../types';
import { FormDappUtil } from '../../utils';
import {
  formDappSignal,
  formTemplateDappSignal,
} from '../../signals/useFormDappsSignal';

import s from './styles.module.scss';
import { FieldModel } from '@/types/customize-model';

type Props = {
  name: string;
  dappKey: string;
  onlyLabel?: boolean;
  disabled?: boolean;
} & FieldOption &
  FieldModel;

const DateTimeInput = ({
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
      setValue(thisValue || new Date().toISOString().slice(0, 16));
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
      type="datetime-local"
      value={value}
      onChange={handleInputChange}
      className={s.input}
    />
  );
};

export default DateTimeInput;
