import React from 'react';
import useCountdown from '@/hooks/useCountdown';
import { Flex, Text } from '@chakra-ui/react';
import Countdown from '@/components/Countdown';
import s from './CompetitionTimer.module.scss';
import dayjs from 'dayjs';

type Props = {};

const START_TIME = '2024-08-08T10:00:00Z';

const END_TIME = '2024-08-15T10:00:00Z';

const CompetitionTimer = (props: Props) => {
  const startTime = useCountdown(START_TIME);

  const endTime = useCountdown(END_TIME);
  if (!startTime.ended) {
    return (
      <Flex
        alignItems={'center'}
        gap="4px"
        flexDir={{ base: 'column', xl: 'row' }}
      >
        <Text whiteSpace={'nowrap'} opacity={0.6}>
          Competition starts in
        </Text>
        <Countdown
          className={s.countDown_time}
          expiredTime={dayjs.utc(START_TIME, 'YYYY-MM-DD HH:mm:ss').toString()}
          hideIcon={true}
          showDay
          // type="column"
          // hideZeroHour={true}
        />
      </Flex>
    );
  }

  if (!endTime.ended) {
    return (
      <Flex alignItems={'center'} gap="4px">
        <Text whiteSpace={'nowrap'} opacity={0.6}>
          Competition ends in
        </Text>
        <Countdown
          className={s.countDown_time}
          expiredTime={dayjs.utc(END_TIME, 'YYYY-MM-DD HH:mm:ss').toString()}
          hideIcon={true}
          showDay
          // type="column"
          // hideZeroHour={true}
        />
      </Flex>
    );
  }

  return <Text>Ended</Text>;
};

export default CompetitionTimer;