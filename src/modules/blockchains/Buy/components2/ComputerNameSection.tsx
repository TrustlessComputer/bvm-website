import TextInput from '@/components/TextInput/TextInput';
import { debounce, isEmpty } from 'lodash';
import { useCallback } from 'react';
import { FormFields, FormFieldsErrorMessage } from '../Buy.constanst';
import ErrorMessage from '../components/ErrorMessage';
import { useBuy } from '../../providers/Buy.hook';
import { validateSubDomainAPI } from '@/services/api/l2services';
import Section from '../components/Section';

const ComputerNameSection = () => {
  const { computerNameField, setComputerNameField } = useBuy();
  const { value, hasFocused, errorMessage, hasError } = computerNameField;

  const fieldID = FormFields.COMPUTER_NAME;

  const onChangeHandler = useCallback(
    debounce(async (e: any) => {
      const text = e.target.value;
      let isValid = !isEmpty(text);
      let errorMessage = FormFieldsErrorMessage[fieldID];
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

  return (
    <Section title="Bitcoin L2 Name" isRequired>
      <TextInput
        placeholder="Your computer name"
        id={fieldID}
        name={fieldID}
        isInvalid={hasFocused && hasError}
        value={value}
        onBlur={onChangeHandler}
        onFocus={(e: any) => {}}
        onChange={(e) => {
          const text = e.target.value;
          setComputerNameField({
            ...computerNameField,
            value: text,
          });
          onChangeHandler(e);
        }}
      />
      {hasFocused && hasError && <ErrorMessage message={errorMessage} />}
    </Section>
  );
};

export default ComputerNameSection;
