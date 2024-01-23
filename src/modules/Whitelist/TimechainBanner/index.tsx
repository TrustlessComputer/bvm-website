import React from 'react';
import styles from './styles.module.scss';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';
import dayjs from 'dayjs';
import { TIME_CHAIN_EXPIRED_TIME } from '@/modules/Whitelist/stepAirdrop';
import useElementSize from '@/hooks/useElementSize';
import TimeChainStorage from '@/utils/storage/timechain.storage';
import { Flex } from '@chakra-ui/react';

interface IProps {
  setTabIndex: (_: number) => void;
}

const TimechainBanner = React.memo(({ setTabIndex }: IProps) => {
  const [isEnd, setIsEnd] = React.useState(
    dayjs
      .utc(TIME_CHAIN_EXPIRED_TIME, 'YYYY-MM-DD HH:mm:ss')
      .isBefore(dayjs().utc().format())
  );

  const isClicked = React.useMemo(() => {
    return TimeChainStorage.getTimeChainClicked()
  }, [])

  const { width } = useElementSize({ elementID: 'ALLOW_TASKS_LIST' });

  React.useEffect(() => {
    const element = document.getElementById('TIME_CHAIN_BANNER');
    if (element) {
      element.style.maxWidth = `${width}px`;
      element.style.width = "100%"
    }
  }, [width])

  if (isEnd || isClicked) return;
  return (
    <div className={styles.container} id="TIME_CHAIN_BANNER">
      <Flex flexDirection="column">
        <Countdown
          className={styles.container_time}
          expiredTime={dayjs.utc(TIME_CHAIN_EXPIRED_TIME, 'YYYY-MM-DD HH:mm:ss').toString()}
          hideIcon={true}
          onRefreshEnd={() => setIsEnd(true)}
          showDay={false}
        />
        <p className={styles.container_join} onClick={() => setTabIndex(1)}>Join Timechain Raffle</p>
      </Flex>
      <Flex flexDirection="column">
        <p className={styles.container_info}>INSCRIPTION: #39554</p>
        <p className={styles.container_info}>FLOOR PRICE: <span>3200$</span></p>
      </Flex>
    </div>
  )
});

TimechainBanner.displayName = 'TimechainBanner';

export default TimechainBanner;
