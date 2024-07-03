import TextInput from '@/components/TextInput/TextInput';
import { isEmpty } from 'lodash';
import { FormFields, FormFieldsErrorMessage } from '../Buy.constanst';
import ErrorMessage from './ErrorMessage';
import Section from './Section';
import { useBuy } from '../../../providers/Buy.hook';
import { Box } from '@chakra-ui/react';

const MinGasPriceSection = () => {
  const { minGasPriceField, setMinGasPriceField, isStandardMode } = useBuy();
  const { value, hasFocused, errorMessage, hasError } = minGasPriceField;
  const fieldName = FormFields.MIN_GAS_PRICE;

  const onChangeHandler = async (e: any) => {
    const text = e.target.value;
    let errorMessage = FormFieldsErrorMessage[fieldName];
    let isValid = true;

    if (isEmpty(text)) {
      isValid = false;
    } else if (Number(text) <= 0) {
      isValid = false;
      errorMessage = 'Gas price must be greater than 0';
    }

    setMinGasPriceField({
      ...minGasPriceField,
      hasFocused: true,
      value: text,
      hasError: !!minGasPriceField.isRequired && !isValid,
      errorMessage,
    });
  };

  return (
    <>
      <Section
        isRequired
        title={'Min Gas Price (Gwei)'}
        description={'Which min gas price is right for you?'}
        descriptionDetail={{
          title: 'Min Gas Price (Gwei)',
          content: (
            <p>
              Similar to the minimum gas price on other EVM-based blockchains,
              the gas price for transactions within your Bitcoin L2 must be set
              to a value higher than or equal to the one you choose.
            </p>
          ),
        }}
      >
        <TextInput
          placeholder="Min gas price"
          id={fieldName}
          name={fieldName}
          value={value}
          isInvalid={hasFocused && hasError}
          onBlur={onChangeHandler}
          onChange={onChangeHandler}
          type="number"
          isDisabled={isStandardMode}
        />
        {hasFocused && hasError && <ErrorMessage message={errorMessage} />}
      </Section>
      <Box ref={minGasPriceField.ref}></Box>
    </>
  );
};

export default MinGasPriceSection;
