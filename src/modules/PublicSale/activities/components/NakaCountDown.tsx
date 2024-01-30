import React from 'react';
import useTradeNakaData from '@/modules/PublicSale/activities/hooks/useTradeNakaData';
import { Flex, GridItem, SimpleGrid, Text } from '@chakra-ui/react';
import styles from './styles.module.scss';
import dayjs from 'dayjs';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';
import SvgInset from '@/components/SvgInset';
import { CDN_URL_ICONS } from '@/config';
import { formatCurrency, formatString } from '@/utils/format';

const NakaCountDown = React.memo(() => {
  const { bestPNL } = useTradeNakaData();
  if (!bestPNL || !bestPNL.to_time || !bestPNL.from_time) return <></>;

  return (
    <Flex className={styles.nakaCountDown}>
      <Flex className={styles.item}>
        <Text className={styles.item_title}>
          {dayjs.utc(bestPNL.from_time, 'YYYY-MM-DD HH:mm:ss').local().format('HH:mm')}
          {" - "}
          {dayjs.utc(bestPNL.to_time, 'YYYY-MM-DD HH:mm:ss').local().format('HH:mm')}
        </Text>
        <Flex className={styles.item_countdown}>
          <SvgInset svgUrl={`${CDN_URL_ICONS}/ic-fire.svg`} size={16} />
          <Countdown expiredTime={dayjs.utc(bestPNL.to_time, 'YYYY-MM-DD HH:mm:ss').toString()} hideIcon={true} isHideSecond={false} hideZeroHour={true} />
        </Flex>
      </Flex>
      {!!bestPNL?.winner ? (
        <Flex className={styles.item}>
          <Text className={styles.item_title}>
            Top PNL
          </Text>
          <Text className={styles.item_name} cursor="pointer" _hover={{ textDecoration: bestPNL?.winner?.twitter_username ? 'underline' : 'unset' }} onClick={() => {
            if (!bestPNL?.winner?.twitter_username) return;
            window.open(`https://twitter.com/${bestPNL?.winner?.twitter_username}`, '_blank');
          }}>
            {formatString(bestPNL?.winner?.twitter_name || bestPNL?.winner?.address , 6)} <span>+{formatCurrency(bestPNL?.winner?.realized_pnl || '0', 0, 5, 'TC', false)} BTC</span>
          </Text>
        </Flex>
      ) : (
        <Flex className={styles.item}>
          <Text className={styles.item_title}>
            Top PNL
          </Text>
          <Text className={styles.item_name}>
            Be the first!!!
          </Text>
        </Flex>
      )}
      <Flex className={styles.item}>
        <Text className={styles.item_title}>
          Rewards
        </Text>
        <Flex className={styles.item_reward}>
          ${bestPNL.reward}
        </Flex>
      </Flex>
    </Flex>
  )
})

NakaCountDown.displayName = 'NakaCountDown';

export default NakaCountDown;
