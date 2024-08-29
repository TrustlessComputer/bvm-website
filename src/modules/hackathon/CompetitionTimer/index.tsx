import React from 'react';
import useCountdown from '@/hooks/useCountdown';
import { Flex, Text } from '@chakra-ui/react';
import Countdown from '@/components/Countdown';
import s from './CompetitionTimer.module.scss';
import dayjs from 'dayjs';

type Props = {
  startTime: string;
  endTime: string;
};

// const START_TIME = '2024-08-29T10:00:00Z';

// const END_TIME = '2024-09-05T10:00:00Z';

const CompetitionTimer = (props: Props) => {
  const startTime = useCountdown(props.startTime);

  const endTime = useCountdown(props.endTime);
  if (!startTime.ended) {
    return (
      <Flex className={s.countdown_wrapper}>
        <Text whiteSpace={'nowrap'} opacity={0.6}>
          Competition starts in
        </Text>
        <Countdown
          className={s.countDown_time}
          expiredTime={dayjs
            .utc(props.startTime, 'YYYY-MM-DD HH:mm:ss')
            .toString()}
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
      <Flex className={s.countdown_wrapper}>
        <Text whiteSpace={'nowrap'} opacity={0.6}>
          Competition ends in
        </Text>
        <Countdown
          className={s.countDown_time}
          expiredTime={dayjs
            .utc(props.endTime, 'YYYY-MM-DD HH:mm:ss')
            .toString()}
          hideIcon={true}
          showDay
          // type="column"
          // hideZeroHour={true}
        />
      </Flex>
    );
  }

  return null;
};

export default CompetitionTimer;
