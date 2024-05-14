'use client';

import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './styles.module.scss';
import cx from 'classnames';
import CreateLaunchpadStep1 from './step1';
import CreateLaunchpadStep3 from './step3';
import CreateLaunchpadStep2 from './step2';

import CreateLaunchpadStep4 from './step4';
import CLaunchpadAPI from '../services/launchpad';
import { launchpadSelector, setCreateFeeOptions } from '../store/reducer';
import { CREATE_STEPS } from '../constants';

const CreateLaunchpad = () => {
  const launchpadApi = useRef(new CLaunchpadAPI()).current;

  const dispatch = useDispatch();
  const create_step = useSelector(launchpadSelector).create_step;

  const { activeStep, setActiveStep } = useSteps({
    index: create_step,
    count: CREATE_STEPS.length,
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setActiveStep(create_step);
  }, [create_step]);

  const fetchData = async () => {
    try {
      const [resFeeOptions] = await Promise.all([
        launchpadApi.getLaunchpadOptions(),
      ]);
      console.log('resFeeOptions', resFeeOptions);
      dispatch(setCreateFeeOptions(resFeeOptions));
    } catch (error) {
      //
    } finally {
      //
    }
  };

  const renderStep = useMemo(() => {
    switch (activeStep) {
      case 1:
        return <CreateLaunchpadStep2 />;
      case 2:
        return <CreateLaunchpadStep3 />;
      case 3:
        return <CreateLaunchpadStep4 />;

      default:
        return <CreateLaunchpadStep1 />;
    }
  }, [activeStep]);

  return (
    <Box className={cx(s.container)}>
      <Stepper index={activeStep}>
        {CREATE_STEPS.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <Box mt={8} />
      <Box className={s.content}>{renderStep}</Box>
    </Box>
  );
};

export default CreateLaunchpad;
