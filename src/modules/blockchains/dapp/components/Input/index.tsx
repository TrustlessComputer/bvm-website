import React from 'react';
import { useSignalEffect } from '@preact/signals-react';

import { FormDappUtil } from '../../utils';
import { FieldOption } from '../../types';
import { formDappInputSignal } from '../../signals/useFormDappsSignal';
import useDappsStore, { useFormDappsStore } from '../../stores/useDappStore';

import styles from './styles.module.scss';

type Props = {
  name: string;
  dappKey: string;
} & FieldOption &
  FieldModel;

const Input = ({ name, dappKey, ...props }: Props) => {
  const [value, setValue] = React.useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formDappInput = formDappInputSignal.value;
    const key = FormDappUtil.getKeyForm(props, props, name);

    formDappInputSignal.value = {
      ...formDappInput,
      [key]: e.target.value,
    };
  };

  useSignalEffect(() => {
    const thisValue =
      formDappInputSignal.value[FormDappUtil.getKeyForm(props, props, name)];

    if (thisValue && thisValue !== value) {
      setValue(thisValue || '');
    }
  });

  React.useEffect(() => {
    const formDappInput = formDappInputSignal.value;
    const key = FormDappUtil.getKeyForm(props, props, name);

    if (!formDappInput[key]) {
      formDappInputSignal.value = {
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
    />
  );
};

export default React.memo(Input);
