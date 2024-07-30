'use client';
import { Box, Spinner } from '@chakra-ui/react';
import cn from 'classnames';
import { Formik } from 'formik';
import { isAddress } from '@ethersproject/address';

import { submitProblem } from '@/services/api/EternalServices';
import { showError, showSuccess } from '@/components/toast';

import s from './styles.module.scss';

type Props = {
  className?: string;
  code: string | number;
};

type FormValues = {
  contractAddress: string;
};

const SubmitProblem = ({ className, code }: Props) => {
  const validateForm = (values: FormValues) => {
    const errors: Record<string, string> = {};

    if (!values.contractAddress) {
      errors.contractAddress = 'Contract address is required.';
    } else if (!isAddress(values.contractAddress)) {
      errors.contractAddress = 'Contract address is invalid.';
    }

    return errors;
  };

  const handleSubmit = async (
    values: FormValues,
    {
      resetForm,
      setSubmitting,
    }: { resetForm: () => void; setSubmitting: (arg: boolean) => void },
  ) => {
    setSubmitting(true);
    const result = await submitProblem({
      contractAddress: values.contractAddress,
      problemCode: `${code}`,
    });
    if (result) {
      showSuccess({
        message: 'Your submission has been sent.',
      });
      resetForm();
    } else {
      showError({
        message: 'Submission failed.',
      });
    }
    setSubmitting(false);
  };

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
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form
          onSubmit={handleSubmit}
          className={cn(s.submitProblem, className)}
        >
          <Box position="relative">
            <input
              type="text"
              name="contractAddress"
              placeholder="Enter contract address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.contractAddress}
            />
            <button disabled={isSubmitting} type="submit">
              {isSubmitting ? <Spinner /> : 'Submit'}
            </button>
          </Box>
          <Box className={s.submitProblem_error}>
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
