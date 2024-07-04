import React from 'react';
import { debounce, isEmpty } from 'lodash';
import toast from 'react-hot-toast';

import { useBuy } from '@/modules/blockchains/providers/Buy.hook';
import { validateSubDomainAPI } from '@/services/api/l2services';
import { showError } from '@/components/toast';
import { FormFields, FormFieldsErrorMessage } from '../../Buy.constanst';
import { ORDER_FIELD, useFormOrderStore } from '../../stores';
import { getRandonComputerName } from '../../Buy.helpers';

import s from './styles.module.scss';

const ComputerNameInput = () => {
  const { field } = useFormOrderStore((state) => state);

  const { computerNameField, setComputerNameField, isMainnet } = useBuy();
  const { value, errorMessage } = computerNameField;

  const onChangeHandler = React.useCallback(
    debounce(async (e: any) => {
      const text = e.target.value;
      let isValid = !isEmpty(text);
      let errorMessage = FormFieldsErrorMessage[FormFields.COMPUTER_NAME];

      if (isValid) {
        try {
          isValid = await validateSubDomainAPI(text);
          field[ORDER_FIELD.CHAIN_NAME].value = text;
        } catch (error: any) {
          errorMessage = error.toString() || 'Computer name is invalid';
          toast.error(errorMessage);
        } finally {
        }
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
