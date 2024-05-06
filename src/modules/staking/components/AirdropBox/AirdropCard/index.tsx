import Image from 'next/image';
import s from './style.module.scss';
import React, { useMemo } from 'react';
// import SocialToken from '@/modules/Launchpad/components/Social';
import { Button, Flex } from '@chakra-ui/react';

export type IAirdropCard = {
  title: string;
  subTitle: string;
  src: string;
  isDone?: boolean;
  release?: { token: string; date: string };
  socials?: any;
  desc?: any;
  airdropStr?: string;
  claimAble?: boolean;
  isClaimed?: boolean;
  isClaiming?: boolean;
  claimAmount?: string;
  onClickClaim?: () => void;
};
export default function AirdropCard({
  src,
  title,
  release,
  isDone,
  subTitle,
  desc,
  airdropStr,
  claimAble,
  isClaimed,
  isClaiming,
  claimAmount,
  onClickClaim,
}: IAirdropCard) {
  const isComming = useMemo((): boolean => {
    return !release && !isDone;
  }, [release, isDone]);

  return (
    <div
      className={`${s.airdropCard} ${isDone && s.isDone} ${
        isComming && s.isComming
      }`}
    >
      <div className={s.airdropCard_inner}>
        <div className={s.header}>
          <div className={s.airdropCard_thumbnail}>
            <Image width={240} height={240} src={src} alt={'airdropCard_img'} />
          </div>
          <Flex direction="column" gap="20px">
            {airdropStr && <p className={s.airdropAmount}>{airdropStr}</p>}
            <div className={s.socials}>
              <p className={s.header_title}>{subTitle}</p>
              {/*<SocialToken socials={socials} theme={'dark'} />*/}
            </div>
            <p>{desc}</p>
          </Flex>
        </div>
        {claimAble ? (
          <>
            {isClaimed ? (
              <p className={s.airdropCard_ct}>{title}</p>
            ) : (
              <Button
                w="100%"
                minH="56px"
                className={`${s.airdropCard_release} ${s.airdropCard_ct}`}
                onClick={onClickClaim}
                disabled={isClaiming}
                isLoading={isClaiming}
              >
                <span className={s.token}>{claimAmount}</span>
                <span className={s.date}>Claim</span>
              </Button>
            )}
          </>
        ) : (
          <>
            {release ? (
              <div className={`${s.airdropCard_release} ${s.airdropCard_ct}`}>
                <span className={s.token}>
                  <img src="/images/1000.png" alt="1000" />
                  {release.token}
                </span>
                <span className={s.date}>{release.date}</span>
              </div>
            ) : (
              <p className={s.airdropCard_ct}>{title}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
