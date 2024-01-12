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
      <p className={s.title}>Allowlist</p>
      <p style={{marginTop: '8px'}} className={s.desc}>Rewards tokens to active users and early adopters via Airdrop Points<br/>Liquidity providers, trading, engaging, and promoting NakaChain on X to receive points</p>
      <p style={{marginTop: '12px', marginBottom: '4px'}} className={s.desc}>Season 1 release date: 31 Mar 2024, Total $N4KA Season 1: 168,000</p>
      <div className={s.tokenSection}>
        <LeaderBoard />
      </div>
    </Flex>
  )
};

export default Whitelist;
