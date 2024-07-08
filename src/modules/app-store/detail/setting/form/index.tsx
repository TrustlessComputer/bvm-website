import { useFormik } from 'formik';
import { Button, Flex } from '@chakra-ui/react';
import s from './styles.module.scss';
import { OrderItem } from '@/stores/states/l2services/types';
import { useState } from 'react';

interface IFormValues {
  hash: string;
}

interface IFormProps {
  selectedPackage?: IAppPackage;
  selectedOrder?: OrderItem;
}

const Form = (props: IFormProps) => {
  const { selectedPackage, selectedOrder} = props;
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (values: IFormValues) => {
    try {
      alert('aaaa')
      setSubmitting(true);
    } catch (e) {

    } finally {
      setSubmitting(false);
    }
  };

  const onValidate = (values: IFormValues) => {
    const errors: Record<string, string> = {};
    // if (!values.amount || !isAmount(values.amount)) {
    //   errors.amount = 'Required.';
    // } else if (new BigNumberJS(values.amount).gt(tokenMap.balance || '0')) {
    //   errors.amount = 'Insufficient balance.';
    // }
    return errors;
  };

  const formik = useFormik({
    initialValues: {hash: '' } as IFormValues,
    onSubmit,
    validate: onValidate,
  });

  return (
    <form className={s.container} onSubmit={formik.handleSubmit}>
      <Flex direction={"column"} gap={"28px"}>
        {/*<input
          id="hash"
          type="text"
          placeholder="Enter your deposit transaction hash"
          value={formik.values.hash}
          onChange={formik.handleChange}
        />
        <input
          id="hash"
          type="text"
          placeholder="Enter your deposit transaction hash"
          value={formik.values.hash}
          onChange={formik.handleChange}
        />*/}
        <Flex justifyContent={"center"} alignItems={"center"} gap={"28px"}>
          <Button
            className={s.btnPrimary}
            isDisabled={!selectedPackage || !selectedOrder || submitting}
            isLoading={submitting}
            type="submit" >
            Install
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default Form;
