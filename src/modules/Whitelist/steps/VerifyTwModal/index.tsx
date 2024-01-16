import { getError } from '@/utils/error';
import { Button } from '@chakra-ui/react';
import { FormikProps, useFormik } from 'formik';
import React, { useState } from 'react';
import s from './styles.module.scss';
import { generateTokenWithTwPost } from '@/services/player-share';
import { toast } from 'react-hot-toast';

interface FormValues {
  postUrl: string;
}

export const ReferralModalID = 'ReferralModalID';

const VerifyTwModal = ({secretCode}: any) => {
  const [isCreating, setIsCreating] = useState(false);

  const onSubmit = async (values: FormValues) => {
    try {
      console.log('values', values);
      setIsCreating(true);
      const result = await generateTokenWithTwPost(secretCode as string, formValues.postUrl);
    } catch (error) {
      const { message } = getError(error);
      toast.error(message);
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

  console.log('formValues', formValues);

  return (
    <div className={s.container}>
      <div className={s.content}>
        <form className={s.form} onSubmit={formik.handleSubmit}>
          <div className={s.inputContainer}>
            <input
              id="postUrl"
              value={formValues.postUrl}
              placeholder="Enter post url"
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
