import { saleManualCheck } from '@/services/public-sale';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { useCallback, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import toast from 'react-hot-toast';

const DepositCheck = ({ onClose }: { onClose?: any }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const onSubmit = useCallback(
    async (values: any, actions: any) => {
      try {
        await saleManualCheck('gReCaptchaToken');
        // if (!executeRecaptcha) {
        //   console.log('Execute recaptcha not yet available');
        //   throw Error('Execute recaptcha not yet available');
        // }
        // actions.setSubmitting(true);

        // const gReCaptchaToken = await executeRecaptcha('enquiryFormSubmit');
        // await saleManualCheck(gReCaptchaToken);
        toast.success('Request success');
        onClose();
      } catch (error) {
        //
      } finally {
        actions.setSubmitting(false);
      }
    },
    [executeRecaptcha],
  );

  return (
    <Formik
      initialValues={{
        tx_hash: '',
      }}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, errors, touched, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Flex gap={'12px'} mt={'20px'}>
            <FormControl isInvalid={!!errors.tx_hash && touched.tx_hash}>
              <Field
                as={Input}
                name="tx_hash"
                variant="filled"
                placeholder="Enter tx hash"
                validate={(value: any) => {
                  let error;

                  if (value.length === 0) {
                    error = 'Required';
                  }

                  return error;
                }}
              />
              <FormErrorMessage fontSize={'12px'}>
                {errors.tx_hash}
              </FormErrorMessage>
            </FormControl>
            <Button
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Flex>
        </form>
      )}
    </Formik>
  );
};

export default DepositCheck;
