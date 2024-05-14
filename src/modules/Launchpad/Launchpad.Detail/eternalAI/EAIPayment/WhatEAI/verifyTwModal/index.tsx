import { Button } from '@chakra-ui/react';
import { FormikProps, useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import s from './styles.module.scss';
import CPaymentEAIAPI from '@/modules/Launchpad/services/payment.eai';
import { closeModal } from '@/stores/states/modal/reducer';

interface FormValues {
  postUrl: string;
}

export const VerifyTwModalID = 'VerifyTwModalID';

const VerifyTwModal = ({ secretCode, onSuccess }: any) => {
  const dispatch = useDispatch();
  const [isCreating, setIsCreating] = useState(false);

  const paymentEAIApi = useRef(new CPaymentEAIAPI()).current;

  const onSubmit = async (values: FormValues) => {
    try {
      setIsCreating(true);
      const result = await paymentEAIApi.updateTwitterInfo({
        secret_code: secretCode as string,
        link: values.postUrl,
      });
      onSuccess && onSuccess(result);
      dispatch(closeModal({ id: VerifyTwModalID }));
    } catch (error) {
      toast.error('Can not verify the post.');
    } finally {
      setIsCreating(false);
    }
  };

  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: { postUrl: '' } as FormValues,
    onSubmit,
  });

  const formValues = React.useMemo(() => {
    return formik.values;
  }, [formik.values]);

  const onChangeText = (e: any) => {
    formik.setValues((values: any) => ({
      ...values,
      postUrl: e.target.value,
    }));
  };

  return (
    <div className={s.container}>
      <div className={s.content}>
        <form className={s.form} onSubmit={formik.handleSubmit}>
          <div className={s.title}>Mission in progress...</div>
          <div className={s.desc}>
            It appears that X cannot verify your post. Please paste the link to
            your post here so we can proceed with verification.
          </div>
          <div className={s.inputContainer}>
            <input
              id="postUrl"
              value={formValues.postUrl}
              placeholder="Enter post URL"
              className={s.input}
              onChange={onChangeText}
            />
          </div>
          <Button
            type="submit"
            isDisabled={isCreating || !formValues.postUrl}
            isLoading={isCreating}
            loadingText={'Verifying...'}
            className={s.button}
          >
            Verify
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VerifyTwModal;
