import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import LeaderBoard from './leaderBoard';
import ShareTw from './shareTw';
import s from './styles.module.scss';

const Whitelist = () => {
  const [inputAddress, setInputAddress] = useState("");


  return (
    <Flex className={s.container}>
      <p className={s.title}>NAKA SEASON 1</p>
      <p style={{marginTop: '8px'}} className={s.desc}>Rewards tokens to active users and early adopters via Airdrop Points<br/>Liquidity providers, trading, engaging, and promoting NakaChain on X to receive points</p>
      <p style={{marginTop: '12px', marginBottom: '4px'}} className={s.desc}>Season 1 release date: 31 Mar 2024, Total $N4KA Season 1: 168,000</p>
      <ShareTw inputValue="" setInputValue={setInputAddress} />
      <div className={s.tokenSection}>
        <LeaderBoard addressL2="" />
      </div>
    </Flex>
  );
};

export default Whitelist;
