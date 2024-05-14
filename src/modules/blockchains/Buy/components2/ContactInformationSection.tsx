import TextInput from '@/components/TextInput/TextInput';
import { Flex } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { FormFields } from '../Buy.constanst';
import ErrorMessage from '../components/ErrorMessage';
import Section from '../components/Section';
import { useBuy } from '../../providers/Buy.hook';

const ContactInformationSection = () => {
  const { yourXField, setYourTelegramField, yourTelegramField, setYourXField } =
    useBuy();

  const onChangeHandler = async (field: FormFields, e: any) => {
    const text = e.target.value;
    if (field == FormFields.YOUR_X_ACC) {
      setYourXField({
        ...yourXField,
        value: text,
        hasFocused: true,
        hasError: !!yourXField.isRequired && isEmpty(text),
      });
    }

    if (field == FormFields.YOUR_TELEGRAM) {
      setYourTelegramField({
        ...yourTelegramField,
        value: text,
        hasFocused: true,
        hasError: !!yourTelegramField.isRequired && isEmpty(text),
      });
    }
  };

  return (
    <Flex flexDir={'row'} gap={'20px'}>
      <Flex flex={1} flexDir={'column'} ref={yourXField.ref}>
        <Section title="Your X handle" isRequired>
          <TextInput
            placeholder="Enter your X handle"
            id={FormFields.YOUR_X_ACC}
            name={FormFields.YOUR_X_ACC}
            value={yourXField.value}
            isInvalid={yourXField.hasFocused && yourXField.hasError}
            onBlur={(e: any) => {
              onChangeHandler(FormFields.YOUR_X_ACC, e);
            }}
            onChange={(e) => {
              onChangeHandler(FormFields.YOUR_X_ACC, e);
            }}
          />
          {yourXField.hasFocused && yourXField.hasError && (
            <ErrorMessage message={yourXField.errorMessage} />
          )}
        </Section>
      </Flex>

      <Flex flex={1} flexDir={'column'}>
        <Section title="Your Telegram handle">
          <TextInput
            placeholder="Enter your telegram handle"
            id={FormFields.YOUR_TELEGRAM}
            name={FormFields.YOUR_TELEGRAM}
            value={yourTelegramField.value}
            onBlur={(e: any) => {
              onChangeHandler(FormFields.YOUR_TELEGRAM, e);
            }}
            onChange={(e) => {
              onChangeHandler(FormFields.YOUR_TELEGRAM, e);
            }}
          />
          {yourXField.hasFocused && yourXField.hasError && (
            <ErrorMessage message="" />
          )}
        </Section>
      </Flex>
    </Flex>
  );
};

export default ContactInformationSection;
