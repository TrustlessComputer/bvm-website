import { composeValidators, required } from '@/utils/form-validate';
import { Box, Button, Flex } from '@chakra-ui/react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import s from './styles.module.scss';
import InputWrapper from '@/components/Form/inputWrapper';
import FieldText from '@/components/Form/Field.Text';
import {
  launchpadSelector,
  setCreateBody,
  setCreateStep,
} from '../store/reducer';

const FormCreateLaunchpadStep2 = ({ handleSubmit }: any) => {
  const dispatch = useDispatch();
  return (
    <form onSubmit={handleSubmit}>
      <InputWrapper label="Description">
        <Field
          placeholder="Ex: Naka...."
          name="description"
          component={FieldText}
          fieldType="textarea"
          validate={composeValidators(required)}
        />
      </InputWrapper>
      <Box mt={3} />
      <Flex gap={3}>
        <Box flex={1}>
          <InputWrapper label="Website">
            <Field
              placeholder="Ex: https://...."
              name="web"
              component={FieldText}
            />
          </InputWrapper>
        </Box>
        <Box flex={1}>
          <InputWrapper label="Twitter (X)">
            <Field
              placeholder="Ex: https://twitter.com/...."
              name="twitter"
              component={FieldText}
            />
          </InputWrapper>
        </Box>
      </Flex>
      <Box mt={3} />
      <Flex gap={3}>
        <Box flex={1}>
          <InputWrapper label="Telegram">
            <Field
              placeholder="Ex: https://t.me/...."
              name="telegram"
              component={FieldText}
            />
          </InputWrapper>
        </Box>
        <Box flex={1}>
          <InputWrapper label="Discord">
            <Field
              placeholder="Ex: https://discord.com/...."
              name="discord"
              component={FieldText}
            />
          </InputWrapper>
        </Box>
      </Flex>
      <Box mt={6} />
      <Flex gap={4} justifyContent={'center'}>
        <Button
          className={s.btnBack}
          onClick={() => dispatch(setCreateStep(0))}
          type="button"
        >
          Back
        </Button>
        <Button type="submit">Next</Button>
      </Flex>
    </form>
  );
};

const CreateLaunchpadStep2 = () => {
  const dispatch = useDispatch();
  const step_values = useSelector(launchpadSelector).create_body;

  const onSubmit = (values: any) => {
    try {
      dispatch(setCreateBody(values));
      dispatch(setCreateStep(2));
    } catch (error) {
      //
    }
  };

  return (
    <Form
      initialValues={{
        description: step_values.description,
        web: step_values.web,
        twitter: step_values.twitter,
        telegram: step_values.telegram,
        discord: step_values.discord,
      }}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <FormCreateLaunchpadStep2 handleSubmit={handleSubmit} />
      )}
    </Form>
  );
};

export default CreateLaunchpadStep2;
