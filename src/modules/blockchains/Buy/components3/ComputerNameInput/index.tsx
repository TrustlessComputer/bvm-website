import React from 'react';
import { debounce, isEmpty } from 'lodash';

import s from './styles.module.scss';
import { useBuy } from '@/modules/blockchains/providers/Buy.hook';
import { getRandonComputerName } from '../../Buy.helpers';
import { validateSubDomainAPI } from '@/services/api/l2services';
import { FormFields, FormFieldsErrorMessage } from '../../Buy.constanst';

const ComputerNameInput = () => {
  const { computerNameField, setComputerNameField, isMainnet } = useBuy();

  const { value, hasFocused, errorMessage, hasError } = computerNameField;

  const onChangeHandler = React.useCallback(
    debounce(async (e: any) => {
      const text = e.target.value;
      let isValid = !isEmpty(text);
      let errorMessage = FormFieldsErrorMessage[FormFields.COMPUTER_NAME];
      if (isValid) {
        try {
          isValid = await validateSubDomainAPI(text);
        } catch (error: any) {
          errorMessage = error.toString() || 'Computer name is invalid';
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
