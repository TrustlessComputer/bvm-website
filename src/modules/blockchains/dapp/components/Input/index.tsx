import React from 'react';

import { FieldOption } from '../../types';
import { getKeyForm } from '../../utils';
import { formDappInputSignal } from '../../signals/useFormDappsSignal';
import useDappsStore, { useFormDappsStore } from '../../stores/useDappStore';
import { useSignalEffect } from '@preact/signals-react';

import styles from './styles.module.scss';

type Props = {
  name: string;
  dappKey: string;
} & FieldOption &
  FieldModel;

const Input = ({ name, dappKey, ...props }: Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formDappInput = formDappInputSignal.value;
    const key = getKeyForm(props, props, name);

    formDappInputSignal.value = {
      ...formDappInput,
      [key]: e.target.value,
    };
  };

  useSignalEffect(() => {
    console.log(formDappInputSignal.value);
  });

  return (
    <input type="text" className={styles.input} onChange={handleInputChange} />
  );
};

export default React.memo(Input);
