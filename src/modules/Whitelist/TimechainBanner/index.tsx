import React from 'react';
import styles from './styles.module.scss';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';
import s from '@/modules/Whitelist/stepAirdrop/Step/styles.module.scss';
import dayjs from 'dayjs';
import { TIME_CHAIN_EXPIRED_TIME } from '@/modules/Whitelist/stepAirdrop';
import useElementSize from '@/hooks/useElementSize';

interface IProps {
  setTabIndex: (_: number) => void;
}

const TimechainBanner = React.memo(({ setTabIndex }: IProps) => {
  const [isEnd, setIsEnd] = React.useState(
    dayjs
      .utc(TIME_CHAIN_EXPIRED_TIME, 'YYYY-MM-DD HH:mm:ss')
      .isBefore(dayjs().utc().format())
  );

  const { width } = useElementSize({ elementID: 'ALLOW_TASKS_LIST' });

  React.useEffect(() => {
    const element = document.getElementById('TIME_CHAIN_BANNER');
    if (element) {
      element.style.maxWidth = `${width}px`;
      element.style.width = "100%"
    }
  }, [width])

  if (isEnd) return;
  return (
    <div className={styles.container} id="TIME_CHAIN_BANNER">
      <Countdown
        className={s.itemCommunity__countdown}
        expiredTime={dayjs.utc(TIME_CHAIN_EXPIRED_TIME, 'YYYY-MM-DD HH:mm:ss').toString()}
        hideIcon={true}
        onRefreshEnd={() => setIsEnd(true)}
        showDay={false}
      />
      <p className={styles.container_join} onClick={() => setTabIndex(1)}>Join Timechain Raffle</p>
    </div>
  )
});

TimechainBanner.displayName = 'TimechainBanner';

export default TimechainBanner;
