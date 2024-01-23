import React from 'react';
import styles from './styles.module.scss';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';
import dayjs from 'dayjs';
import { TIME_CHAIN_EXPIRED_TIME } from '@/modules/Whitelist/stepAirdrop';
import useElementSize from '@/hooks/useElementSize';
import AirdropStorage from '@/utils/storage/airdrop.storage';

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

  const isClicked = React.useMemo(() => {
    return AirdropStorage.getTimeChainClicked()
  }, []);

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
      <Countdown
        className={styles.container_time}
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
