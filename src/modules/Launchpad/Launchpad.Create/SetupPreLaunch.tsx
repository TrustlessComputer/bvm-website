import { Checkbox, Flex } from '@chakra-ui/react';
import React from 'react';
import s from './styles.module.scss';
import { useForm, useFormState } from 'react-final-form';
import SetupPreLaunchpadTasks from './SetupPreLaunchpad.Tasks';

const SetupPreLaunch = () => {
  const { change } = useForm();
  const { values } = useFormState();

  const pre_sale = values.pre_sale;

  return (
    <Flex className={s.setupPreLaunch}>
      <Checkbox
        isChecked={pre_sale}
        onChange={(e) => change('pre_sale', e.target.checked)}
      >
        Pre-Launchpad?
      </Checkbox>
      <SetupPreLaunchpadTasks isOpen={pre_sale} />
    </Flex>
  );
};

export default SetupPreLaunch;
