import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';
import dayjs from 'dayjs';
import { TIME_CHAIN_EXPIRED_TIME } from '@/modules/Whitelist/stepAirdrop';
import { Flex, Tooltip } from '@chakra-ui/react';
import { CDN_URL_ICONS } from '@/config';
import { getRaffleJoin } from '@/services/player-share';
import AuthenStorage from '@/utils/storage/authen.storage';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';

interface IProps {
  setTabIndex: (_: number) => void;
}

const ArcadeBanner = React.memo(({ setTabIndex }: IProps) => {
  return (
    <div className={styles.container} onClick={() => setTabIndex(1)}>
      <img src={`${CDN_URL_ICONS}/banner-arcade.png`} />
    </div>
  )
});

ArcadeBanner.displayName = 'ArcadeBanner';

export default ArcadeBanner;
