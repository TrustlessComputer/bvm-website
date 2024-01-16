import { Button, Flex } from '@chakra-ui/react';
import { FormikProps, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import s from './styles.module.scss';
import { addAllowList } from '@/services/player-share';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ALLOW_LIST_URL } from '@/constants/route-path';
import { KEY_TWITTER_USERNAME } from '@/constants/storage-key';
import CookieUtil from '@/utils/cookie';

interface FormValues {
  username: string;
}

const JoinAllowList = () => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const twitterUsername = CookieUtil.get(KEY_TWITTER_USERNAME);

  useEffect(() => {
    if(twitterUsername) {
      formik.setValues((values: any) => ({
        ...values,
        username: twitterUsername,
      }))
    }
  }, [twitterUsername]);


  const onSubmit = async (values: FormValues) => {
    try {
      setIsCreating(true);
      const result = await addAllowList(formValues.username);
      CookieUtil.set(KEY_TWITTER_USERNAME, formValues.username);
      router.push(ALLOW_LIST_URL);
    } catch (error) {
      toast.error('Can not verify the post.');
    } finally {
      setIsCreating(false);
    }
  };

  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: { username: '' } as FormValues,
    onSubmit,
  });

  const formValues = React.useMemo(() => {
    return formik.values;
  }, [formik.values]);

  const onChangeText = (e: any) => {
    formik.setValues((values: any) => ({
      ...values,
      username: e.target.value,
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
                id="username"
                value={formValues.username}
                placeholder="Enter your Twitter/X username"
                className={s.input}
                onChange={onChangeText}
              />
            </div>
            <Button
              type="submit"
              isDisabled={isCreating || !formValues.username}
              isLoading={isCreating}
              loadingText={'Submitting...'}
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
