import TextInput from '@/components/TextInput/TextInput';
import { isEmpty } from 'lodash';
import { useBuy } from '../../providers/Buy.hook';
import { FormFields, FormFieldsErrorMessage } from '../Buy.constanst';
import ErrorMessage from '../components/ErrorMessage';
import Section from '../components/Section';

const BlockGasLimitSection = () => {
  const { blockGasLimitField, setBlockGasLimitField } = useBuy();
  const { value, hasFocused, errorMessage, hasError } = blockGasLimitField;
  const fieldName = FormFields.MIN_GAS_PRICE;

  const onChangeHandler = async (e: any) => {
    const text = e.target.value;

    let errorMessage = FormFieldsErrorMessage[fieldName];
    let isValid = true;

    if (isEmpty(text)) {
      isValid = false;
    } else if (Number(text) <= 0) {
      isValid = false;
      errorMessage = 'Gas limit must be greater than 0';
    }

    setBlockGasLimitField({
      ...blockGasLimitField,
      hasFocused: true,
      value: text,
      hasError: !!blockGasLimitField.isRequired && !isValid,
      errorMessage,
    });
  };

  return (
    <Section
      isRequired
      title={'Block gas limit'}
      description={'Which block gas limit is right for you?'}
      descriptionDetail={undefined}
    >
      <TextInput
        placeholder="Gas limit"
        id={fieldName}
        name={fieldName}
        value={value}
        isInvalid={hasFocused && hasError}
        onBlur={onChangeHandler}
        onChange={onChangeHandler}
        type="number"
      />
      {hasFocused && hasError && <ErrorMessage message={errorMessage} />}
    </Section>
  );
};

export default BlockGasLimitSection;
