import CPaymentSWPAPI from '@/modules/Launchpad/services/payment.swp';
import styles from './styles.module.scss';
import { Button, Flex } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useRef } from 'react';

interface IFormValues {
  hash: string;
}

const DepositSubmitHash = () => {
  const paymentSWPAPI = useRef(new CPaymentSWPAPI()).current;

  const onSubmit = async () => {
    try {
      await paymentSWPAPI.submitRequestScan();
      // showSuccess({
      //   message: 'Successfully.',
      // });
    } catch (error) {
      // const { message } = getErrorMessage(error);
      // showError({ message: message });
    }
  };

  const onValidate = (values: IFormValues) => {
    const errors: Record<string, string> = {};
    if (!values.hash) {
      errors.hash = 'Required.';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: { hash: '' } as IFormValues,
    onSubmit,
    validate: onValidate,
  });
  return (
    <Flex width="100%" flexDirection="column">
      <form className={styles.submitHashBox} onSubmit={formik.handleSubmit}>
        <input
          id="hash"
          type="text"
          placeholder="Enter your deposit transaction hash"
          value={formik.values.hash}
          onChange={formik.handleChange}
        />
        <Button borderRadius="4px" type="submit">
          Submit
        </Button>
      </form>
      {!!formik.errors.hash && (
        <p className={styles.error}>{formik.errors.hash}</p>
      )}
    </Flex>
  );
};

export default DepositSubmitHash;
