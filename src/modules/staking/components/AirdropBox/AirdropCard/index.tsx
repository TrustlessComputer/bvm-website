import Image from 'next/image';
import s from './style.module.scss';
import React, { useMemo } from 'react';
// import SocialToken from '@/modules/Launchpad/components/Social';
import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import { formatCurrency, formatDate } from '@/utils/format';
import moment from 'moment';
import ClaimAirdropModal from '../ClaimAirdropModal';
import useNakaAuthen from '@/hooks/useRequestNakaAccount';
import { getExplorer } from '@/utils/helpers';

export type IAirdropCard = {
  title: string;
  subTitle: string;
  src: string;
  isDone?: boolean;
  release?: { token: string; date: string };
  socials?: any;
  desc?: any;
  airdropStr?: string;
  claimingId?: number;
  totalClaimed?: number;
  claimAmount?: string;
  airdrops?: any[];
  symbol?: string;
  onClickClaim?: (id: number) => void;
};
export default function AirdropCard({
  src,
  title,
  release,
  isDone,
  subTitle,
  desc,
  airdropStr,
  claimingId,
  airdrops,
  symbol,
  onClickClaim,
  totalClaimed,
}: IAirdropCard) {
  const isComming = useMemo((): boolean => {
    return !release && !isDone;
  }, [release, isDone]);

  const {
    isOpen: isOpenClaimAirdrop,
    onOpen: onOpenClaimAirdrop,
    onClose: onCloseClaimAirdrop,
  } = useDisclosure();
  const { nakaAddress } = useNakaAuthen();

  const renderAirdrop = (airdrops: any[]) => {
    return (
      <>
        <Flex direction="row" alignItems="center" w="100%" gap="8px">
          {airdrops.slice(0, 1).map((airdrop) => {
            const isClaimed =
              airdrop && (airdrop.is_claimed || Number(airdrop.amount) <= 0);
            const claimable =
              airdrop.claimable || moment().isAfter(moment(airdrop.valid_at));
            return (
              <>
                {isClaimed ? (
                  <Flex
                    className={`${s.airdropCard_ct} ${
                      Number(airdrop.amount) <= 0 ? s.airdropCard_ctp : ''
                    }`}
                    justifyContent="center"
                    w="100%"
                    cursor={Number(airdrop.amount) <= 0 ? 'auto' : 'pointer'}
                    onClick={() =>
                      window.open(
                        getExplorer(
                          nakaAddress,
                          (symbol?.toLowerCase() as any) || 'naka',
                          'address',
                        ),
                      )
                    }
                  >
                    <p>
                      {Number(airdrop.amount) <= 0
                        ? `You missed the ${symbol} airdrop. Don't miss out on the next one!`
                        : `RECEIVED ${formatCurrency(
                            totalClaimed,
                            0,
                            3,
                          )} $${symbol}`}
                    </p>
                  </Flex>
                ) : (
                  <Button
                    w="100%"
                    minH="56px"
                    className={`${s.airdropCard_release} ${s.airdropCard_ct}`}
                    onClick={() =>
                      claimable &&
                      onClickClaim &&
                      onClickClaim(airdrop?.id || 0)
                    }
                    cursor={claimable ? 'pointer' : 'not-allowed'}
                    isLoading={claimingId ? claimingId === airdrop?.id : false}
                  >
                    <span className={s.token}>
                      {formatCurrency(airdrop.amount, 0, 3)} ${symbol}
                    </span>
                    <span className={s.date}>
                      {claimable
                        ? 'Claim'
                        : `in ${formatDate(airdrop.valid_at, 'D MMMM, HH:mm')}`}
                    </span>
                  </Button>
                )}
              </>
            );
          })}
          <Flex
            cursor="pointer"
            w="48px"
            h="100%"
            minH="52px"
            _hover={{ opacity: 0.8 }}
            justifyContent="center"
            className={s.airdropCard_ct}
            onClick={() => onOpenClaimAirdrop()}
          >
            <img style={{ height: '20px' }} src={`/icons/ic-more.svg`} />
          </Flex>
        </Flex>
        {isOpenClaimAirdrop && (
          <ClaimAirdropModal
            isOpen={isOpenClaimAirdrop}
            onClose={onCloseClaimAirdrop}
            claimingId={claimingId}
            airdrops={airdrops}
            symbol={symbol}
            onClickClaim={onClickClaim}
          />
        )}
      </>
    );
  };

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
        <div className={s.actions}>
          {airdrops && airdrops.length > 0 ? (
            renderAirdrop(airdrops)
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
                <p className={`${s.airdropCard_ct} ${s.airdropCard_ctp}`}>
                  {title}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
