'use client';
import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import cn from 'classnames';
import { Formik } from 'formik';

import s from './styles.module.scss';

type Props = {
  className?: string;
  code: string;
};

const SubmitProblem = ({ className, code }: Props) => {
  const validateForm = (values: any) => {
    const errors: Record<string, string> = {};

    if (!values.amount) {
      errors.contractAddress = 'Amount is required.';
    }
    return errors;
  };

  const handleSubmit = async (values: unknown) => {};

  return (
    <Formik
      initialValues={{
        contractAddress: '',
      }}
      validate={validateForm}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form
          onSubmit={handleSubmit}
          className={cn(s.submitProblem, className)}
        >
          <Flex justifyContent="space-between">
            <input
              type="text"
              name="contractAddress"
              placeholder="Enter contract address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.contractAddress}
            />
            <button type="submit">Submit</button>
          </Flex>
          <Box>
            {errors.contractAddress &&
              touched.contractAddress &&
              errors.contractAddress}
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default SubmitProblem;
