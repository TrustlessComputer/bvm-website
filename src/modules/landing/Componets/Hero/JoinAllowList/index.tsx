import { Button, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import s from './styles.module.scss';
import { useRouter } from 'next/navigation';
import Fade from '@/interactive/Fade';
import Chars from '@/interactive/Chars';
import { getTopLeaderBoards } from '@/services/whitelist';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import Image from 'next/image';
import { formatCurrency } from '@/utils/format';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';
import dayjs from 'dayjs';
import { PUBLIC_SALE_END, PUBLIC_SALE_START } from '@/modules/Whitelist';
import { CDN_URL_ICONS } from '@/config';
import { getPublicSaleSummary } from '@/services/public-sale';
import { checkIsPublicSale } from '@/modules/Whitelist/utils';
import cs from 'classnames';
import HeroLabel from '@/modules/landing/Componets/Hero/HeroLabel';

const DELAY = 2;
const JoinAllowList = ({isFooter}: {isFooter?: boolean}) => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [totalUser, setTotalUser] = useState<string>('');
  const [totalDeposit, setTotalDeposit] = useState('');
  const [listUser, setListUser] = useState<ILeaderBoardPoint[]>([]);

  const isPublicSale = React.useMemo(() => checkIsPublicSale(), [])

  const getCount = async () => {
    try {
      if (isPublicSale) {
        const response = await getPublicSaleSummary();
        setTotalUser(response.total_user.toString());
        setTotalDeposit(response.total_usdt_value_not_boost.toString())
      } else {
        const response = await getTopLeaderBoards({ page: 1, limit: 20 });
        const topWhiteList = response.data.filter((item, index) => index < 5);
        setTotalUser(response.count);
        setListUser(topWhiteList);
      }
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getCount();
  }, [isPublicSale]);

  const delay = isFooter ? 0 : DELAY;

  return (
    <Fade delay={delay}>
      <div className={`${s.container} ${isFooter && s.isFooter}`}>
        <div className={`container ${s.content}`}>
          <Flex flexDirection={'column'} gap={'8px'}>
            <Fade delay={delay + .2}>
              <div className={s.titleWrapper}>
                <div className={cs(s.title)}>{"BVM PUBLIC SALE"}</div>
              </div>
            </Fade>
            <div className={cs(s.desc)}>
              {isPublicSale ? (
                (!!totalUser && Number(totalUser || 0)) ? (
                  <Chars delay={delay + .4}>
                    {/*Join <span>{formatCurrency(totalUser, 0, 0)}</span> people backing us building the future of Bitcoin.*/}
                    Join <span>{formatCurrency(totalUser, 0, 0)}</span> backers on our mission to evolve Bitcoin beyond currency — into the next internet era with gaming, DeFi, AI, and beyond.
                  </Chars>
                ) : (
                  <Chars delay={delay + .4}>
                    Back us building the future of Bitcoin
                  </Chars>
                )
              ) : (
                <Chars delay={delay + .4}>
                  Be the first to know.
                  <br />
                  Allowlisters get up to <span>&nbsp;30% extra tokens</span>.
                </Chars>
              )}
            </div>
          </Flex>

          <Flex gap={5} flexDirection={'column'}>
            <Fade delay={delay + .6}>
              <Button
                type='submit'
                // isDisabled={isCreating || !formValues.username}
                isLoading={isCreating}
                loadingText={'Submitting...'}
                className={s.button}
                onClick={() => {
                  if (isPublicSale) return router.push('/public-sale')
                  router.push('/allowlist');
                }}
              >
                {isPublicSale ? "Join the BVM public sale" : "Get on the allowlist"}
              </Button>
              {!isPublicSale && (
                <div className={s.whiteList}>
                  <div className={s.whiteList_users}>
                    <Image src={'/landing/allow-avatars.png'} quality={100} width={88} height={24}
                           alt={'allow-avatars'} />
                  </div>
                  <div className={s.whiteList_total}>
                    <span>{formatCurrency(totalUser, 0,0)}&nbsp;people</span>&nbsp;{isPublicSale ? "made contributions" : "are on the allowlist"}
                  </div>
                </div>
              )}
              <Flex flexDir="column" marginTop="20px">
                <Flex alignItems="center" gap="4px" justifyContent="center">
                  <span style={{ color: "#FA4E0E", fontWeight: "700", textAlign: 'center' }}>${formatCurrency(
                    totalDeposit || '0',
                    0,
                    0,
                    'BTC',
                    true,
                  )}
                  </span>
                  <span style={{ color: "white", fontWeight: "700", textAlign: 'center', paddingBottom: "2px" }}>raised</span>
                </Flex>
                <Flex gap="8px" flexDir="column" className={s.countDown_wrapper}>
                  <Flex alignItems="end">
                    <Countdown
                      className={s.countDown_time}
                      expiredTime={dayjs.utc(isPublicSale ? PUBLIC_SALE_END : PUBLIC_SALE_START, 'YYYY-MM-DD HH:mm:ss').toString()}
                      hideIcon={true}
                    />
                    <span style={{ marginLeft: "4px", lineHeight: "100%" }}>left</span>
                  </Flex>
                </Flex>
              </Flex>
            </Fade>
          </Flex>
        </div>
        <div className={`${s.hero_inner} ${s.hero_inner__desktop}`}>
          <HeroLabel />
        </div>
        {/*</form>*/}
      </div>
    </Fade>
  );
};

export default JoinAllowList;
