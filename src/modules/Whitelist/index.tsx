import { Flex } from '@chakra-ui/react';
import React from 'react';
import LeaderBoard from './leaderBoard';
import s from './styles.module.scss';
import useElementHeight from '@/hooks/useElementHeight';
import { HEADER_ID } from '@/layouts/Header';
import px2rem from '@/utils/px2rem';

const CONTAINER_ID = 'WHITE_LIST_CONTAINER_ID';

const Whitelist = () => {
  const { height } = useElementHeight({ elementID: HEADER_ID });

  React.useEffect(() => {
    const element = document.getElementById(CONTAINER_ID)
    if (height && element) {
      element.style.paddingTop = `${px2rem(height)}`
    }
  }, [height])

  return (
    <Flex className={s.container} id={CONTAINER_ID}>
      <p className={s.title}>BVM Allowlist Dashboard</p>
      <p className={s.desc}>You’re almost there!<br/>Complete the tasks below to upgrade your multiplier!</p>
      <div className={s.tokenSection}>
        <LeaderBoard />
      </div>
    </Flex>
  )
};

export default Whitelist;
