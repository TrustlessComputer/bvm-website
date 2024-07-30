import { useFormik } from 'formik';
import { Button, Flex } from '@chakra-ui/react';
import s from './styles.module.scss';
import { OrderItem } from '@/stores/states/l2services/types';
import { useState } from 'react';
import {
  IDApp,
  IDAppDetails,
  InstallDAByParams,
} from '@/services/api/DAServices/types';
import dAppServicesAPI from '@/services/api/DAServices';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@utils/errorV2';
import { useAppSelector } from '@/stores/hooks';
import { accountInforSelector } from '@/stores/states/l2services/selector';
import { requestReload } from '@/stores/states/common/reducer';
import { useDispatch } from 'react-redux';

interface IFormValues {
  hash: string;
}

interface IFormProps {
  app?: IDApp;
  selectedPackage?: IDAppDetails;
  selectedOrder?: OrderItem;
  isInValid?: boolean;
  inputs?: any[];
  onSucessCb?: () => void;
}

const Form = (props: IFormProps) => {
  const {
    selectedPackage,
    selectedOrder,
    isInValid,
    inputs = [],
    onSucessCb,
  } = props;
  const [submitting, setSubmitting] = useState(false);
  const userInfor = useAppSelector(accountInforSelector);
  const dispatch = useDispatch();
  // console.log('app', app);
  // console.log('userInfor', userInfor);
  // console.log('selectedPackage', selectedPackage);
  // console.log('selectedOrder', selectedOrder);

  const onSubmit = async (values: IFormValues) => {
    try {
      if (isInValid) return;

      setSubmitting(true);

      const params: InstallDAByParams = {
        address: userInfor?.tcAddress || '',
        network_id: selectedOrder?.chainId!,
        dAppID: selectedPackage?.id as number,
        inputs: inputs,
      };

      console.log('onSubmit Params: ', params);

      const result = await dAppServicesAPI.installDAByParams(params);
      if (result) {
        toast.success('Submit successfully!');

        dispatch(requestReload());
        onSucessCb && onSucessCb();
      }
    } catch (error) {
      const { message } = getErrorMessage(error);
      toast.error(message);
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
    initialValues: { hash: '' } as IFormValues,
    onSubmit,
    validate: onValidate,
  });

  return (
    <form className={s.container} onSubmit={formik.handleSubmit}>
      <Flex direction={'column'} gap={'28px'}>
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
        <Flex justifyContent={'center'} alignItems={'center'} gap={'28px'}>
          <Button
            className={s.btnPrimary}
            isDisabled={
              isInValid || !selectedPackage || !selectedOrder || submitting
            }
            isLoading={submitting}
            loadingText={'Installing'}
            type="submit"
          >
            Install
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default Form;
