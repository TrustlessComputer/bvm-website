import React from 'react';
import { useSignalEffect } from '@preact/signals-react';

import { FormDappUtil } from '../../utils';
import { FieldOption } from '../../types';
import {
  formDappInputSignal,
  formDappSignal,
} from '../../signals/useFormDappsSignal';
import useDappsStore, { useFormDappsStore } from '../../stores/useDappStore';

import styles from './styles.module.scss';

type Props = {
  name: string;
  dappKey: string;
} & FieldOption &
  FieldModel;

const Input = ({ name, dappKey, placeholder, ...props }: Props) => {
  const [value, setValue] = React.useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formDappInput = formDappSignal.value;
    const key = FormDappUtil.getKeyForm(props, props, name);

    formDappSignal.value = {
      ...formDappInput,
      [key]: e.target.value,
    };
  };

  useSignalEffect(() => {
    const thisValue =
      formDappSignal.value[FormDappUtil.getKeyForm(props, props, name)];

    if (typeof thisValue !== 'undefined' && thisValue !== value) {
      setValue(thisValue || '');
    }
  });

  React.useEffect(() => {
    const formDappInput = formDappSignal.value;
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
      className={styles.input}
      onChange={handleInputChange}
      value={value}
      name={name}
      placeholder={placeholder}
    />
  );
};

export default React.memo(Input);
