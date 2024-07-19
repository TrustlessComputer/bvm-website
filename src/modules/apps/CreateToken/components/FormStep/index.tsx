import {
  Box,
  Flex,
  Step,
  StepIcon,
  StepIndicator,
  Stepper,
  StepSeparator,
  StepStatus,
  Text,
  useSteps,
} from "@chakra-ui/react";
import cs from "classnames";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { createTokenSelector } from "../../states/selector";
import s from "../../styles.module.scss";
import { isDesktop } from "react-device-detect";

const steps = [
  { title: "Information" },
  { title: "Tokenomics" },
  { title: "Preview & Submit" },
];

const FormStep = () => {
  const { create_step } = useSelector(createTokenSelector);
  const { activeStep, setActiveStep } = useSteps({
    count: steps.length,
  });

  useEffect(() => {
    setActiveStep(create_step - 1);
  }, [create_step]);

  return (
    <Box maxW={"600px"} margin={isDesktop ? "0 auto" : undefined}>
      <Stepper className={s.stepContainer} my={"12px"} index={activeStep}>
        {steps.map((_step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<></>}
                active={
                  <svg
                    width="4"
                    height="4"
                    viewBox="0 0 4 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="2" cy="2" r="2" fill="#ECCC31" />
                  </svg>
                }
              />
            </StepIndicator>
            {/* {isDesktop && (
              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
              </Box>
            )} */}

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <Flex
        className={cs(s.stepLabel)}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        {steps.map((v, i) => (
          <Text className={i < create_step ? s.active : undefined}>
            {v.title}
          </Text>
        ))}
      </Flex>
    </Box>
  );
};

export default FormStep;
