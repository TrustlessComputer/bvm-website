import { useSignalEffect } from '@preact/signals-react';
import cn from 'classnames';
import React from 'react';

import {
  formDappSignal,
  formTemplateDappSignal,
} from '../../signals/useFormDappsSignal';
import { FieldOption } from '../../types';
import { FormDappUtil } from '../../utils';

import { FieldModel } from '@/types/customize-model';
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

    // console.log(
    //   'formDappInput -> ',
    //   key,
    //   formTemplateDappSignal.value,
    //   formDappInput[key],
    // );

    if (typeof formDappInput[key] === 'undefined') {
      formDappInput.value = {
        ...formDappInput,
        [key]: '',
      };
    } else {
      setValue(formDappInput[key]);
    }
  }, []);

  // TODO: Split file input to another component or check the above code to handle file upload
  if (inputType === 'file') {
    return (
      <input
        type={inputType}
        className={cn(styles.input, {
          [styles.input__disabled]: disabled,
          [styles.input__file]: inputType === 'file',
        })}
        accept={inputAccept || undefined}
        onChange={handleInputChange}
        name={name}
        id={name}
        placeholder={placeholder}
        disabled={disabled}
      />
    );
  }

  return (
    <input
      type={inputType ?? 'text'}
      className={cn(styles.input, {
        [styles.input__disabled]: disabled,
      })}
      accept={inputAccept || undefined}
      onChange={handleInputChange}
      value={value}
      name={name}
      id={name}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default React.memo(Input);
