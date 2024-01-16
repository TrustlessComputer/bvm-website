import { Button, Flex } from '@chakra-ui/react';
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

const JoinAllowList = ({isShow, onHide, secretCode, onSuccess}: any) => {
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
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <div className={s.content}>
          <div className={s.titleWrapper}>
            <div className={s.title}>BVM PUBLIC SALE</div>
          </div>
          <div className={s.desc}>Be the first to know. Allowlisters get up to <span>30% extra tokens</span>.</div>
          <Flex gap={3}>
            <div className={s.inputContainer}>
              <input
                id="postUrl"
                value={formValues.postUrl}
                placeholder="Enter your Twitter/X username"
                className={s.input}
                onChange={onChangeText}
              />
            </div>
            <Button
              type="submit"
              isDisabled={isCreating || !formValues.postUrl}
              isLoading={isCreating}
              loadingText={'Submittng...'}
              className={s.button}
            >
              Get on the allowlist
            </Button>
          </Flex>
        </div>
      </form>
    </div>
  );
};

export default JoinAllowList;
