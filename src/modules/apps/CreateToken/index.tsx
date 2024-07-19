import { Flex, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import FormStep from './components/FormStep';
import FormStep1 from './form/step.1';
import FormStep2 from './form/step.2';
import { createTokenSelector } from './states/selector';
import s from './styles.module.scss';
import dynamic from 'next/dynamic';

const FormStep3 = dynamic(() => import("./form/step3"));

const TokenCreateModule = () => {
  const { create_step } = useSelector(createTokenSelector);

  const renderForm = () => {
    if (create_step === 1) {
      return <FormStep1 />;
    }
    if (create_step === 2) {
      return <FormStep2 />;
    }
    if (create_step === 3) {
      return <FormStep3 />;
    }

    return <></>;
  };

  return (
    <Flex flexDirection={"column"} gap={"24px"}>
      <Text className={s.title}>Create New A Token</Text>
      <FormStep />
      {renderForm()}
    </Flex>
  );
};

export default TokenCreateModule;
