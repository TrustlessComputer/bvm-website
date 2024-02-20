import Fade from '@/interactive/Fade';
import s from '@/modules/landing/Componets/Hero/JoinAllowList/styles.module.scss';
import cs from 'classnames';
import Chars from '@/interactive/Chars';
import { formatCurrency } from '@/utils/format';
import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';
import { CDN_URL_ICONS } from '@/config';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';
import dayjs from 'dayjs';
import { PUBLIC_SALE_END, PUBLIC_SALE_START } from '@/modules/Whitelist';


type Iprop = {
  delay?: number
  totalUser: number,
  isPublicSale: boolean,
  totalDeposit: number
}
export default function PublicSale({ delay = 0, totalUser, isPublicSale, totalDeposit }: Iprop) {

  return (
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
                Join the <span>{formatCurrency(totalUser, 0, 0)}</span> early contributors backing us with
                {" "}<span>${formatCurrency(
                totalDeposit || '0',
                0,
                0,
                'BTC',
                true,
              )}</span> to build the future of Bitcoin.
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
          <Flex gap="8px" className={s.countDown_wrapper}>
            <img style={{ width: 18 }} src={`${CDN_URL_ICONS}/hourglass.png`}/>
            <p className={s.countDown_title}>{isPublicSale ? 'Ends' : 'Public sale starting'} in</p>
            <Countdown
              className={s.countDown_time}
              expiredTime={dayjs.utc(isPublicSale ? PUBLIC_SALE_END : PUBLIC_SALE_START, 'YYYY-MM-DD HH:mm:ss').toString()}
              hideIcon={true}
            />
          </Flex>
        </Fade>
      </Flex>
    </div>
  );
}
