import ButtonConnected from "@/components/ButtonConnected";
import ButtonWrapper from "@/components/ButtonWrapper";
import FieldAmount from "@/components/Form/fieldAmount";
import InputWrapper from "@/components/Form/inputWrapper";
import { required } from "@/utils/form-validate";
import { requiredAmount } from "@/utils/validate";
import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from 'react-redux';
import { setCreateFormValues, setCreateStep } from "../states/reducer";
import { createTokenSelector } from "../states/selector";
import s from "../styles.module.scss";
import FieldTextFormik from '@components/Form/Field.Text.Formik';
import React from 'react';

interface IFormValues {
  name: string;
  ticker: string;
  description: string;
  image?: File;
  twitterLink: string;
  telegramLink: string;
  website: string;
  feeBalance: string;
  feeNeeded: number;
  onchainImage: boolean;
  supply: string;
  decimals: string;
}

const FormStep1 = () => {
  const { form_values } = useSelector(createTokenSelector);
  const dispatch = useDispatch();

  // const { isOpen: isShowMore, onToggle: onToggleShowMore } = useDisclosure();

  const onSubmit = async (values: IFormValues) => {
    try {
      dispatch(setCreateFormValues(values));
      dispatch(setCreateStep(2));
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Flex className={s.boxContent}>
      <Formik onSubmit={onSubmit} initialValues={form_values as any}>
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <SimpleGrid columns={isMobile ? 1 : 3} gap={"24px"}>
              <InputWrapper label={`Token name`}>
                <Field
                  name="name"
                  component={FieldTextFormik}
                  validate={required}
                />
              </InputWrapper>
              <InputWrapper label={`Symbol`}>
                <Field
                  name="ticker"
                  component={FieldTextFormik}
                  validate={required}
                />
              </InputWrapper>
              <InputWrapper label={`Total Supply`}>
                <Field
                  name="supply"
                  component={FieldAmount}
                  min={0}
                  validate={requiredAmount}
                />
              </InputWrapper>
            </SimpleGrid>

            <Box mt={"24px"} />

            <ButtonConnected
              className={s.btnSubmit}
              title="Connect Naka wallet"
            >
              <ButtonWrapper className={s.btnSubmit}>
                <Button type="submit">
                  <Text>Next</Text>
                </Button>
              </ButtonWrapper>
            </ButtonConnected>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default FormStep1;
