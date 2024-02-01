import s from './styles.module.scss';
import { Flex, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import { getPublicSaleProgram, IPublicSalePrograme } from '@/services/public-sale';
import HourlyRewardButton from '@/modules/PublicSale/hourlyRewardButton';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import BigNumber from 'bignumber.js';
import { PUBLIC_SALE_START } from '@/modules/Whitelist';
import { formatCurrency } from '@/utils/format';
import { MIN_DECIMAL } from '@/constants/constants';

const HourlyReward = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEnd, setIsEnd] = React.useState(false);
  const [programeInfo, setProgrameInfo] = useState<IPublicSalePrograme>();
  const configs = useAppSelector(commonSelector).configs;

  useEffect(() => {
    getProgramInfo();
  }, []);

  const getProgramInfo = async () => {
    try {
      const res = await getPublicSaleProgram();
      setProgrameInfo(res);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  const currentDay = React.useMemo(() => {
    const diffDay = new BigNumber(
      dayjs.utc(PUBLIC_SALE_START).diff(dayjs.utc(), 'days'),
    )
      .absoluteValue()
      .toNumber();
    return {
      // step: DAYS.length > diffDay ? DAYS[diffDay] : DAYS[DAYS.length - 1],
      diffDay,
    };
  }, []);

  const REWARDS = useMemo(() => {
    if(configs) {
      if(configs['naka']?.bvm_halvings) {
        const res = JSON.parse(configs['naka']?.bvm_halvings);
        return Object.values(res);
      }
    }
    return [];
  }, [configs]);

  const currentHourReward: number = useMemo(() => {
    return (REWARDS[currentDay.diffDay] as number) / 24;
  }, [currentDay, REWARDS])

  return null;
  return (
    <Flex className={s.container}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text className={s.title}>Hourly Reward</Text>
        <Flex className={s.timeWrapper}>
          <Text className={s.time}>{formatCurrency(currentHourReward, MIN_DECIMAL, MIN_DECIMAL, 'BTC', false)} BVM</Text>
        </Flex>
      </Flex>
      <HourlyRewardButton />
    </Flex>
  )
}

export default HourlyReward;
