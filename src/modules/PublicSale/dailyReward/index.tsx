import s from './styles.module.scss';
import { Flex, Text } from '@chakra-ui/react';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';
import dayjs from 'dayjs';
import RaffleButton from '@/modules/PublicSale/raffleButton';
import React, { useEffect, useState } from 'react';
import {
  getPublicSaleProgram,
  IPublicSalePrograme,
} from '@/services/public-sale';
import HourlyReward from '@/modules/PublicSale/hourlyReward';
import LuckyMoneyWinner from '../LuckyMoneyWinner';

const DailyReward = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEnd, setIsEnd] = React.useState(false);
  const [programeInfo, setProgrameInfo] = useState<IPublicSalePrograme>();

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

  return (
    <Flex direction={'column'} className={s.wrapper}>
      {/* <HourlyReward /> */}
      <LuckyMoneyWinner />
      <Flex className={s.container}>
        <Flex
          justifyContent={'space-between'}
          alignItems={'center'}
          gap={'4px'}
        >
          <Text
            fontSize={'11px'}
            fontWeight={400}
            color={'rgba(255, 255, 255, 0.7)'}
          >
            RAFFLE
          </Text>
          <Flex gap={'6px'} className={s.timeWrapper}>
            <Countdown
              className={s.time}
              expiredTime={dayjs
                .utc(programeInfo?.end_date, 'YYYY-MM-DD HH:mm:ss')
                .toString()}
              hideIcon={true}
              onRefreshEnd={() => setIsEnd(true)}
              isHideSecond={true}
            />
          </Flex>
        </Flex>
        <RaffleButton />
        {/*<Divider />*/}
        {/*<RewardButton />*/}
      </Flex>
    </Flex>
  );
};

export default DailyReward;
