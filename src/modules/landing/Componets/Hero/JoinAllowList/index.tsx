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
import Fade from '@/interactive/Fade';
import Chars from '@/interactive/Chars';
import { getTopLeaderBoards } from '@/services/whitelist';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import Image from 'next/image';

interface FormValues {
  username: string;
}

const JoinAllowList = () => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [totalUser, setTotalUser] = useState<string>('');
  const [listUser, setListUser] = useState<ILeaderBoardPoint[]>([]);
  const twitterUsername = CookieUtil.get(KEY_TWITTER_USERNAME);

  useEffect(() => {
    if (twitterUsername) {
      formik.setValues((values: any) => ({
        ...values,
        username: twitterUsername,
      }));
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

  const getCount = async () => {
    try {
      const response = await getTopLeaderBoards({ page: 1, limit: 20 });
      const topWhiteList = response.data.filter((item, index) => index < 5);
      setTotalUser(response.count);
      setListUser(topWhiteList);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getCount();
  }, []);
  console.log('count', listUser);

  return (
    <div className={s.container}>
      <div className={s.content}>
        <Flex flexDirection={'column'} gap={'8px'}>
          <Fade delay={0.6}>
            <div className={s.titleWrapper}>
              <div className={s.title}>BVM PUBLIC SALE</div>
            </div>
          </Fade>
          <div className={s.desc}>
            <Chars delay={0.7}>
              Be the first to know.
              <br />
              Allowlisters get up to <span>&nbsp;30% extra tokens</span>.
            </Chars>
          </div>
        </Flex>

        <Flex gap={5} flexDirection={'column'}>
          <Fade delay={0.8}>
            <Button
              type="submit"
              // isDisabled={isCreating || !formValues.username}
              isLoading={isCreating}
              loadingText={'Submitting...'}
              className={s.button}
              onClick={() => {
                router.push('/allowlist');
              }}
            >
              Get on the allowlist
            </Button>
          </Fade>
          <div className={s.whiteList}>
            <div className={s.whiteList_users}>
              {listUser.map((item) => {
                return (
                  <figure className={s.whiteList_users_avatar} key={item.id}>
                    <Image
                      src={item.twitter_avatar}
                      width={23}
                      height={23}
                      alt={item.twitter_name}
                    />
                  </figure>
                );
              })}
            </div>
            <div className={s.whiteList_total}>
              <span>{totalUser}</span> &nbsp;people are on the allowlist
            </div>
          </div>
        </Flex>
      </div>
      {/*</form>*/}
    </div>
  );
};

export default JoinAllowList;
