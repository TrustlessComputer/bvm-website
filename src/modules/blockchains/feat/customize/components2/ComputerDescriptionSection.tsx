import { Textarea } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { useBuy } from '../../../providers/Buy.hook';
import { FormFields } from '../Buy.constanst';
import ErrorMessage from './ErrorMessage';
import Section from './Section';

const ComputerDescriptionSection = () => {
  const { computerDescriptionField, setComputerDescriptionField } = useBuy();
  const { value, hasFocused, errorMessage, hasError } =
    computerDescriptionField;
  const fieldName = FormFields.DESCRIPTION;

  const onChangeHandler = async (e: any) => {
    const text = e.target.value;
    setComputerDescriptionField({
      ...computerDescriptionField,
      hasFocused: true,
      value: text,
      hasError: !!computerDescriptionField.isRequired && isEmpty(text),
    });
  };

  return (
    <Section
      title="Tell us more about your plan with your ZK-powered Blockchain"
      isRequired={!!computerDescriptionField.isRequired}
    >
      <Textarea
        borderColor={'#d9d9d9'}
        color={'#000'}
        fontSize={'18px'}
        borderWidth={'1px'}
        borderRadius={'12px'}
        _placeholder={{
          caretColor: '#2b35e4',
          color: '#5a5a5a7b',
        }}
        _hover={{
          borderColor: '#2b35e4',
        }}
        _active={{
          caretColor: '#2b35e4',
          color: '#000',
        }}
        placeholder="Enter your plan here"
        id={fieldName}
        name={fieldName}
        value={value}
        className={`${hasFocused && hasError ? 'error' : ''}`}
        onBlur={onChangeHandler}
        onChange={onChangeHandler}
        onFocus={(e: any) => {}}
        autoComplete="off"
        spellCheck={false}
        autoFocus={false}
        onWheel={(e: any) => e?.target?.blur()}
      />
      {hasFocused && hasError && <ErrorMessage message={errorMessage} />}
    </Section>
  );
};

export default ComputerDescriptionSection;
