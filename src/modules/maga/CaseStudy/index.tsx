'use client';

import dayjs from 'dayjs';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

import useCountdown from '@/hooks/useCountdown';

import s from '../styles.module.scss';
import { useMemo } from 'react';

const TIME_START = '2024-07-25 14:00:00';

const CaseStudy = () => {
  const expiredTime = dayjs.utc(TIME_START, 'YYYY-MM-DD HH:mm:ss').toString();
  const {
    days = 0,
    hours,
    minutes,
    seconds,
    ended,
  } = useCountdown(expiredTime);

  const renderCountDown = useMemo(() => {
    if (expiredTime) {
      if (ended) {
        return <Text className={s.time}>Ended</Text>;
      }

      const arrTime = [`${seconds}s`, `${minutes}m`];

      if (days !== null && days !== 0) {
        arrTime.push(`${days * 24 + Number(hours)}h`);
      } else if (hours !== '00') {
        arrTime.push(`${hours}h`);
      }

      return <Text className={s.time}>{arrTime.reverse().join(' : ')}</Text>;
    }

    return <Text className={s.time}>-- : -- : --</Text>;
  }, [expiredTime, ended, days, hours, minutes, seconds]);

  return (
    <Flex
      gap={['80px']}
      py={['80px']}
      minW="100%"
      justifyContent="space-between"
      alignItems="center"
      direction={['column', 'row']}
    >
      <Flex gap={['24px']} direction="column">
        <Text className={s.label}>Case Study</Text>
        <Box>
          <Image src="/maga/trump.svg" alt="trump" />
        </Box>
        <Flex gap="12px" direction="column">
          <Text className={s.title} as="h6">
            BITCOIN WARS
          </Text>
          <Text className={s.description}>
            Prepare your strategy and engage in the battle that will shape the
            future of Bitcoin.
          </Text>
          <Text className={s.description}>
            Starting at the Bitcoin 2024 Conference in Nashville.
          </Text>
        </Flex>
        <Flex gap="24px">
          <a
            className={s.playNowBtn}
            href="https://x.com/BVMnetwork"
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow BVM on
            <Image src="/maga/follow-x.svg" alt="x.com" />
          </a>
          <Flex alignItems="center" gap="12px">
            <Text className={s.timeTitle}>Launch in</Text>
            {renderCountDown}
          </Flex>
        </Flex>
      </Flex>
      <Box>
        <Image
          maxW={['100%', '700px']}
          maxH={['100%', '400px']}
          src="/maga/crypto-war.svg"
          alt="crypto war"
        />
      </Box>
    </Flex>
  );
};

export default CaseStudy;