import { useFormik } from 'formik';
import { Button, Flex } from '@chakra-ui/react';
import s from './styles.module.scss';
import { OrderItem } from '@/stores/states/l2services/types';
import { useState } from 'react';
import { IDApp, InstallDAByParams } from '@/services/api/DAServices/types';
import dAppServicesAPI from '@/services/api/DAServices';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@utils/errorV2';
import { useAppSelector } from '@/stores/hooks';
import { accountInforSelector } from '@/stores/states/l2services/selector';

interface IFormValues {
  hash: string;
}

interface IFormProps {
  app?: IDApp;
  selectedPackage?: IAppPackage;
  selectedOrder?: OrderItem;
}

const Form = (props: IFormProps) => {
  const { selectedPackage, selectedOrder} = props;
  const [submitting, setSubmitting] = useState(false);
  const userInfor = useAppSelector(accountInforSelector);
  // console.log('app', app);
  // console.log('userInfor', userInfor);
  // console.log('selectedPackage', selectedPackage);
  // console.log('selectedOrder', selectedOrder);

  const onSubmit = async (values: IFormValues) => {
    try {
      setSubmitting(true);

      const params: InstallDAByParams = {
        address: userInfor?.tcAddress || '',
        networkId: selectedOrder?.chainId,
        dAppID: selectedPackage?.id as number,
        inputs: [
          // {
          //   key: 'aaPaymasterTokenID',
          //   value: tokenContractAddress,
          // },
          // {
          //   key: 'aaTokenGas',
          //   value: new BigNumber(feeRate || 1).multipliedBy(1e18).toFixed(),
          // },
        ],
      };

      console.log('onSubmit Params: ', params);

      const result = await dAppServicesAPI.installDAByParams(params);
      if (result) {
        toast.success('Submit successfully!');
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
