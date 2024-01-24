import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';
import dayjs from 'dayjs';
import { TIME_CHAIN_EXPIRED_TIME } from '@/modules/Whitelist/stepAirdrop';
import useElementSize from '@/hooks/useElementSize';
import TimeChainStorage from '@/utils/storage/timechain.storage';
import { Flex, Tooltip } from '@chakra-ui/react';
import { CDN_URL_ICONS } from '@/config';
import { getRaffleJoin } from '@/services/player-share';
import AuthenStorage from '@/utils/storage/authen.storage';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';

interface IProps {
  setTabIndex: (_: number) => void;
}

const TimechainBanner = React.memo(({ setTabIndex }: IProps) => {
  const [isEnd, setIsEnd] = React.useState(
    dayjs
      .utc(TIME_CHAIN_EXPIRED_TIME, 'YYYY-MM-DD HH:mm:ss')
      .isBefore(dayjs().utc().format())
  );
  const [raffleCode, setRaffleCode] = useState();
  const [show, setShow] = useState(false);


  const token = AuthenStorage.getAuthenKey();
  const needReload = useAppSelector(commonSelector).needReload;

  const getRaffleJoinInfo = async () => {
    const res = await getRaffleJoin();
    setRaffleCode(res);
    setShow(true)
  };

  useEffect(() => {
    if(token) {
      getRaffleJoinInfo();
    } else {
      setShow(true)
    }
  }, [token, needReload]);

  const { width } = useElementSize({ elementID: 'ALLOW_TASKS_LIST' });


  React.useEffect(() => {
    // const element = document.getElementById('TIME_CHAIN_BANNER');
    // if (element) {
    //   element.style.maxWidth = `${width}px`;
    //   element.style.width = "100%"
    // }
  }, [width])

  if (isEnd || raffleCode || !show) return;
  return (
    <div className={styles.container} id="TIME_CHAIN_BANNER">
      <div className={styles.content}>
        <Tooltip
          minW="220px"
          bg="white"
          boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
          borderRadius="4px"
          padding="8px"
          label={
            <Flex direction="column" color="black" opacity={0.7}>
              <p>Bitcoin's first long-form gen art collection: Timechain (Inscription ID: 39554)</p>
            </Flex>
          }
        >
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
        </Tooltip>
        <Flex flexDirection="column" gap="8px">
          <p className={styles.container_title}>FLOOR PRICE</p>
          <p className={styles.container_price}>$3,200</p>
          <p className={styles.container_more} onClick={() => {
            window.open("https://twitter.com/BVMnetwork/status/1748299995898691711")
          }}>Learn more</p>
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
