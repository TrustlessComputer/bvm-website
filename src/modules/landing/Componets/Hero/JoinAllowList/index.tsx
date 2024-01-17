import { Button, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import s from './styles.module.scss';
import { useRouter } from 'next/navigation';
import Fade from '@/interactive/Fade';
import Chars from '@/interactive/Chars';
import { getTopLeaderBoards } from '@/services/whitelist';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import Image from 'next/image';


const DELAY = 2;
const JoinAllowList = () => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [totalUser, setTotalUser] = useState<string>('');
  const [listUser, setListUser] = useState<ILeaderBoardPoint[]>([]);

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
    <Fade delay={DELAY}>
      <div className={s.container}>
        <div className={`container ${s.content}`}>
          <Flex flexDirection={'column'} gap={'8px'}>
            <Fade delay={DELAY + .2}>
              <div className={s.titleWrapper}>
                <div className={s.title}>BVM PUBLIC SALE</div>
              </div>
            </Fade>
            <div className={s.desc}>
              <Chars delay={DELAY + .4}>
                Be the first to know.
                <br />
                Allowlisters get up to <span>&nbsp;30% extra tokens</span>.
              </Chars>
            </div>
          </Flex>

          <Flex gap={5} flexDirection={'column'}>
            <Fade delay={DELAY + .6}>
              <Button
                type='submit'
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
              <div className={s.whiteList}>
                <div className={s.whiteList_users}>
                  <Image src={'/landing/allow-avatars.png'} quality={100} width={88} height={24}
                         alt={'allow-avatars'} />
                  {/*{listUser.map((item) => {*/}
                  {/*  return (*/}
                  {/*    <figure className={s.whiteList_users_avatar} key={item.id}>*/}
                  {/*      <Image*/}
                  {/*        src={item.twitter_avatar}*/}
                  {/*        width={23}*/}
                  {/*        height={23}*/}
                  {/*        alt={item.twitter_name}*/}
                  {/*      />*/}
                  {/*    </figure>*/}
                  {/*  );*/}
                  {/*})}*/}
                </div>
                <div className={s.whiteList_total}>
                  <span>{totalUser}&nbsp;people</span>&nbsp;are on the allowlist
                </div>
              </div>
            </Fade>
          </Flex>
        </div>
        {/*</form>*/}
      </div>
    </Fade>
  );
};

export default JoinAllowList;
