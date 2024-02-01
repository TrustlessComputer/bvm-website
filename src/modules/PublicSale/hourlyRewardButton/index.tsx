import { Center, Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import React, { useMemo } from 'react';
import cx from 'clsx';
import dayjs from 'dayjs';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';

const HourlyRewardButton = ({ className }: any) => {
  const [isEnd, setIsEnd] = React.useState(false);

  const hourlyEndTime = useMemo(() => {
    const res = dayjs.utc().set('minute', 30);
    if (dayjs().utc().isBefore(res)) {
      console.log('fadfa', res.get('hour'));
      res.set('hour', res.get('hour') + 1);
    }
    if(isEnd) {
      setIsEnd(false);
    }

    return res.toString();
  }, [isEnd]);

  console.log('dayjs.utc()', dayjs.utc().toString());
  console.log('hourlyEndTime', hourlyEndTime);

  return (
    <Flex className={cx(s.container, className)}>
      <Flex direction={"column"} justifyContent={"space-between"} flex={1}>
        <Center className={s.hourglassWrapper}>
          <div className="hourglass">
            <div className="top"></div>
            <div className="bottom"></div>
          </div>
        </Center>

        <Flex gap={'6px'} className={s.timeWrapper}>
          <Text className={s.title}>End in</Text>
          <Countdown
            className={s.time}
            expiredTime={dayjs
              .utc(hourlyEndTime, 'YYYY-MM-DD HH:mm:ss')
              .toString()}
            hideIcon={true}
            onRefreshEnd={() => setIsEnd(true)}
            type={"column"}
            showColon={true}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HourlyRewardButton;
