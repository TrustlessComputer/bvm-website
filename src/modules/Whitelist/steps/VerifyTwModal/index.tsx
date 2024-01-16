import { getError } from '@/utils/error';
import { Button } from '@chakra-ui/react';
import { FormikProps, useFormik } from 'formik';
import React, { useState } from 'react';
import s from './styles.module.scss';
import { generateTokenWithTwPost } from '@/services/player-share';
import { toast } from 'react-hot-toast';
import { closeModal } from '@/stores/states/modal/reducer';
import { useDispatch } from 'react-redux';

interface FormValues {
  postUrl: string;
}

export const ReferralModalID = 'ReferralModalID';

const VerifyTwModal = ({secretCode, onSuccess}: any) => {
  const dispatch = useDispatch();
  const [isCreating, setIsCreating] = useState(false);

  const onSubmit = async (values: FormValues) => {
    try {
      setIsCreating(true);
      const result = await generateTokenWithTwPost(secretCode as string, formValues.postUrl);
      onSuccess && onSuccess(result);
      dispatch(closeModal({ id: ReferralModalID }));
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
          <div className={s.desc}>Simply paste the URL of your tweet below to verify manually and we'll take care of the rest.</div>
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
