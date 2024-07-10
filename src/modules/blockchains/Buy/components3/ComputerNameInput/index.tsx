import React, { useEffect, useRef } from 'react';
import { debounce, isEmpty } from 'lodash';
import toast from 'react-hot-toast';

import { useBuy } from '@/modules/blockchains/providers/Buy.hook';
import { validateSubDomainAPI } from '@/services/api/l2services';
import { showError } from '@/components/toast';
import { FormFields, FormFieldsErrorMessage } from '../../Buy.constanst';
import { ORDER_FIELD, useFormOrderStore } from '../../stores';
import { getRandonComputerName } from '../../Buy.helpers';

import s from './styles.module.scss';
import { useDebounce } from '@/hooks/useDebounce';

const ComputerNameInput = () => {
  const { field, setFormField } = useFormOrderStore((state) => state);
  const { computerNameField, setComputerNameField, isMainnet } = useBuy();
  const { value, errorMessage } = computerNameField;
  const inputNameRef = useRef<HTMLInputElement>(null);

  const onChangeHandler = React.useCallback(
    debounce(async (e: any) => {
      const text = e.target.value;
      let isValid = !isEmpty(text);
      let errorMessage = FormFieldsErrorMessage[FormFields.COMPUTER_NAME];
      let timer: NodeJS.Timeout | null = null;

      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setFormField(ORDER_FIELD.CHAIN_NAME, text);
      }, 100);

      if (isValid) {
        try {
          isValid = await validateSubDomainAPI(text);
        } catch (error: any) {
          errorMessage = error.toString() || 'Computer name is invalid';
          toast.error(errorMessage);
        } finally {
        }
      } else {
        toast.error(errorMessage);
      }

      setComputerNameField({
        ...computerNameField,
        value: text,
        hasFocused: true,
        hasError: !!computerNameField.isRequired && !isValid,
        errorMessage: isValid ? undefined : errorMessage,
      });
    }, 500),
    [],
  );

  React.useEffect(() => {
    const computerName = getRandonComputerName(isMainnet);

    setFormField(ORDER_FIELD.CHAIN_NAME, computerName);
    setComputerNameField({
      ...computerNameField,
      value: computerName,
      hasFocused: true,
      hasError: false,
      errorMessage: undefined,
    });
  }, [isMainnet]);

  return (
    <input
      type="text"
      placeholder="Enter chain name"
      className={s.input}
      value={value}
      onChange={(e) => {
        const text = e.target.value;

        setComputerNameField({
          ...computerNameField,
          value: text,
        });

        onChangeHandler(e);
      }}
    />
  );
};

export default ComputerNameInput;
