/* eslint-disable no-constant-condition */

import { formatCurrency } from '@/utils/format';
import { Box, Button, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { isDesktop, isMobile } from 'react-device-detect';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ContributionIDItem from './item';
import styles from './styles.module.scss';
import uniq from 'lodash/uniq';
import { openExtraLink } from '@/utils/helpers';
import { useAuthenticatedWallet } from '@/Providers/AuthenticatedProvider/hooks';
import CPaymentEAIAPI from '@/modules/Launchpad/services/payment.eai';
import { userContributeSelector } from '@/modules/Launchpad/store/lpEAIPayment/selector';
import { getCollectEternalSeedAttr } from '@/modules/staking/components/EternalSeeds/helpers';

const CACHED_BRAIN_IDS_KEY = 'CACHED_BRAIN_IDS_KEY';

export const arrayRange = (start: any, stop: any, step: any) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (_value, index) => start + index * step,
  );

const ContributionIds = () => {
  const wallet = useAuthenticatedWallet();
  const paymentEAIApi = useRef(new CPaymentEAIAPI()).current;
  const userContributeInfo = useSelector(userContributeSelector);
  const [topBalance, setTopBalance] = useState<any>(0);
  const [viewers, setViewers] = React.useState<number[]>([]);
  const burnedIDsRef = React.useRef<number[]>([]);

  const isLogged = useMemo(() => wallet?.address, [wallet]);

  useEffect(() => {
    getTopBalance();
  }, [isLogged]);

  const getTopBalance = async () => {
    try {
      if (isLogged) {
        return;
      }
      const rs = await paymentEAIApi.getTopBalance();
      setTopBalance(rs);
    } catch (error) {
      //
    }
  };

  const arrayRange = React.useCallback((start: any, stop: any, step: any) => {
    return Array.from(
      { length: (stop - start) / step + 1 },
      (_value, index) => start + index * step,
    );
  }, []);

  const latestIDs = useMemo(() => {
    if (
      Number(userContributeInfo?.from_eternal_id) === 0 &&
      Number(userContributeInfo?.to_eternal_id) === 0
    ) {
      return [];
    }

    return arrayRange(
      userContributeInfo?.from_eternal_id,
      userContributeInfo?.to_eternal_id,
      1,
    );
  }, [userContributeInfo?.from_eternal_id, userContributeInfo?.to_eternal_id]);

  const isEmpty = (data?: any) => {
    return !data || !data.length || data === '[]';
  };

  const onHideCard = (cardID: number) => {
    const storageCachedIDs = localStorage.getItem(
      CACHED_BRAIN_IDS_KEY,
    ) as string;

    if (!isEmpty(storageCachedIDs)) {
      const arrStorageCachedIDs = (
        typeof storageCachedIDs === 'string'
          ? JSON.parse(storageCachedIDs) || []
          : storageCachedIDs
      ) as number[];

      const newList = arrStorageCachedIDs
        .filter((id) => cardID !== id)
        .filter((id) => Number(id) > 649);

      localStorage.setItem(CACHED_BRAIN_IDS_KEY, JSON.stringify(newList));

      setViewers(newList);
    }
  };

  const youHaveSeed = useMemo(
    () => Boolean(latestIDs.length > 0) || Boolean(viewers.length > 0),
    [latestIDs, viewers],
  );

  React.useEffect(() => {
    let cachedIDs: string | number[] = localStorage.getItem(
      CACHED_BRAIN_IDS_KEY,
    ) as any;
    if (isEmpty(cachedIDs)) {
      cachedIDs = latestIDs;
      localStorage.setItem(CACHED_BRAIN_IDS_KEY, JSON.stringify(latestIDs));
    } else {
      cachedIDs = JSON.parse(cachedIDs as string);

      burnedIDsRef.current = (cachedIDs as number[]).filter(
        (cachedID) =>
          !(latestIDs as number[]).some((latestID) => cachedID === latestID),
      );

      const newIDs = (latestIDs as number[]).filter(
        (latestID) =>
          !(cachedIDs as number[]).some((cachedID) => cachedID === latestID),
      );
      cachedIDs = uniq([...(cachedIDs as number[]), ...(newIDs || [])]);
      localStorage.setItem(CACHED_BRAIN_IDS_KEY, JSON.stringify(cachedIDs));
    }

    setViewers(cachedIDs as number[]);
  }, [JSON.stringify(latestIDs || [])]);

  const rightHeader = useMemo(() => {
    if (!youHaveSeed) {
      return (
        <Flex alignItems={'center'} gap={'2px'}>
          <Text
            className={styles.learnMore}
            as={'a'}
            target="_blank"
            href="https://twitter.com/CryptoEternalAI/status/1773306357862867434"
          >
            {`Learn more`}
          </Text>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.75 13.5L11.25 9L6.75 4.5"
              stroke="#55ACEE"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Flex>
      );
    } else {
      const onShare = () => {
        const content = `I just got rewarded ${
          getCollectEternalSeedAttr(userContributeInfo?.from_eternal_id as any)
            ?.label
        } Eternal Seeds for being among top 100 backers for $EAI @CryptoEternalAI\n\nThese Eternal Seeds will evolve into the first-ever on-chain AI models on #Bitcoin\n\nJoin $EAI public sale now:\nhttps://nakachain.xyz/public-sale/eai`;
        return openExtraLink(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            content,
          )}`,
        );
      };
      return (
        <Button
          maxHeight={'48px'}
          minHeight={'48px'}
          alignItems={'center'}
          gap={'5px'}
          onClick={onShare}
        >
          <Text fontSize={'18px'}>Share on</Text>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_30620_7147)">
              <path
                d="M12.6007 0.769531H15.054L9.694 6.8962L16 15.2315H11.0627L7.196 10.1755L2.77067 15.2315H0.316L6.04933 8.6782L0 0.770198H5.06267L8.558 5.39153L12.6007 0.769531ZM11.74 13.7635H13.0993L4.324 2.16086H2.86533L11.74 13.7635Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_30620_7147">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Button>
      );
    }
  }, [isDesktop, userContributeInfo, youHaveSeed]);

  return (
    <Flex className={styles.container}>
      <Flex w={'100%'} alignItems={'center'} justifyContent={'space-between'}>
        <Box flex={1}>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Text className={styles.tagTop100}>TOP 100</Text>
            {!isDesktop && rightHeader}
          </Flex>
          <p className={styles.container_title}>Collect Eternal Seeds</p>
        </Box>
        {isDesktop && rightHeader}
      </Flex>
      <p className={styles.container_content}>
        1350 historical seeds are rewarded to the top 100 backers
        proportionately based on their contribution.
      </p>
      <p className={styles.container_content}>
        Seeds are the placeholders for deploying AIs on the Eternal AI
        blockchain later. The lower a seed number is, the more historical value
        it has. Low seed numbers are desirable.
      </p>

      <SimpleGrid
        className={styles.seedGroup}
        columns={youHaveSeed ? (isMobile ? 3 : 7) : isMobile ? 1 : 2}
      >
        {youHaveSeed ? (
          viewers.map((index) => (
            <ContributionIDItem
              key={index}
              id={index}
              isHideBrain={burnedIDsRef.current.some((id) => id === index)}
              onHideCard={onHideCard}
            />
          ))
        ) : (
          <>
            <Flex className={styles.youHaveEmpty}>
              <Text>{`You have 0 seeds`}</Text>
              <Text>
                Contribute{' '}
                <span>
                  $
                  {formatCurrency(
                    isLogged
                      ? userContributeInfo?.reach_top_balance
                      : topBalance,
                    0,
                    0,
                  )}
                </span>{' '}
                or more to break into the Top 100 and collect some.
              </Text>
            </Flex>
            <SimpleGrid gap="12px" columns={3}>
              {[650, 1111, 2000].map((i) => (
                <ContributionIDItem
                  key={i}
                  id={i}
                  hideID={true}
                  onHideCard={onHideCard}
                />
              ))}
            </SimpleGrid>
          </>
        )}
      </SimpleGrid>

      {/* <ContributionVideo /> */}
    </Flex>
  );
};

export default ContributionIds;
