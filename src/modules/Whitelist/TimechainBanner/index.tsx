import React from 'react';
import styles from './styles.module.scss';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';
import dayjs from 'dayjs';
import { TIME_CHAIN_EXPIRED_TIME } from '@/modules/Whitelist/stepAirdrop';
import useElementSize from '@/hooks/useElementSize';
import TimeChainStorage from '@/utils/storage/timechain.storage';
import { Flex } from '@chakra-ui/react';
import { CDN_URL_ICONS } from '@/config';

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
      element.style.maxWidth = `${width > 560 ? 560 : width}px`;
      element.style.width = "100%"
    }
  }, [width])

  if (isEnd || isClicked) return;
  return (
    <div className={styles.container} id="TIME_CHAIN_BANNER">
      <div className={styles.content}>
        <Flex gap="12px">
          <img style={{ width: 48 }} src={`${CDN_URL_ICONS}/hourglass.png`}/>
          <Flex flexDirection="column" gap="8px">
            <p className={styles.container_title}>Join giveaway</p>
            <Countdown
              className={styles.container_time}
              expiredTime={dayjs.utc(TIME_CHAIN_EXPIRED_TIME, 'YYYY-MM-DD HH:mm:ss').toString()}
              hideIcon={true}
              onRefreshEnd={() => setIsEnd(true)}
              showDay={false}
            />
          </Flex>
        </Flex>
        <Flex flexDirection="column" gap="8px">
          <p className={styles.container_title}>FLOOR PRICE</p>
          <p className={styles.container_price}>$3,200</p>
        </Flex>
      </div>
      <button className={styles.cta} onClick={() => setTabIndex(1)}>
        Join Timechain Raffle
      </button>
    </div>
  )
});

TimechainBanner.displayName = 'TimechainBanner';

export default TimechainBanner;
