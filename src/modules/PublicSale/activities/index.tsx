import React from 'react';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { PUBLIC_SALE_START } from '@/modules/Whitelist';
import { Flex } from '@chakra-ui/react';
import styles from './styles.module.scss';

interface ICTA {
  title: string,
  type: 'action' | 'link',
  onPress?: () => void;
  link?: string
}

export interface GameItemProps {
  key: number,
  tag: string
  title: string,
  desc: string | any,
  src: string,
  ctas?: ICTA[]
}

const Activities = React.memo(() => {
  const DAYS = React.useMemo<GameItemProps[]>(() => {
    return [
      {
        key: 0,
        tag: 'DAY 1',
        title: 'Fully on-chain gaming on Bitcoin',
        src: 'public-sale/playGame.png',
        ctas: [{
          title: 'Play games on Arcade',
          type: 'link',
          link: 'https://bitcoinarcade.xyz/'
        }],
        desc: `Have fun with Bitcoin Arcade - the Bitcoin L2 for fully-on-chain gaming<br/>Play hyper-casual mobile games on Bitcoin and earn $ARCA testnet tokens.`
      },
      {
        key: 1,
        tag: 'DAY 2',
        title: 'BRC-20 Futures Trading Competition',
        src: 'public-sale/playGame.png',
        ctas: [{
          title: 'Trade on Naka',
          type: 'link',
          link: 'https://nakachain.xyz/'
        }],
        desc: 'Experience on-chain BRC-20 perpetual trading with Naka Chain - the Bitcoin L2 for BRC-20 DeFi powered by BVM<br/>For the first time, you can go long and short on BRC-20 tokens on a decentralized platform'
      },
      {
        key: 2,
        tag: 'DAY 3',
        title: 'Playing with Lego at BVM network',
        src: 'public-sale/playGame.png',
        ctas: [{
          title: 'Play with modular blocks',
          type: 'link',
          link: 'https://playmodular.com/'
        }],
        desc: 'Build whatever on Bitcoin with modular blocks powered by the BVM network.'
      },
      {
        key: 3,
        tag: 'DAY 4',
        title: 'Poker Friday Night on Bitcoin',
        src: 'public-sale/playGame.png',
        ctas: [{
          title: 'Play games on Arcade',
          type: 'link',
          link: 'https://bitcoinarcade.xyz/'
        }],
        desc: 'Have fun with Bitcoin Arcade - the Bitcoin L2 for fully-on-chain gaming.<br/>Play hyper-casual mobile games on Bitcoin and earn $ARCA testnet tokens.'
      },
      {
        key: 4,
        tag: 'DAY 5',
        title: 'Get Fit & Raise Charity on Bitcoin',
        src: 'public-sale/playGame.png',
        ctas: [{
          title: 'Run with Alphas',
          type: 'link',
          link: 'https://alpha.wtf/'
        }],
        desc: 'A fitness and charity event built on Bitcoin in honor of Hal Finney.<br/>The more you run, the more you donate and earn at the same time'
      },
      {
        key: 5,
        tag: 'DAY 6',
        title: 'Get Fit & Raise Charity on Bitcoin',
        src: 'public-sale/playGame.png',
        ctas: [{
          title: 'Run with Alphas',
          type: 'link',
          link: 'https://alpha.wtf/'
        }],
        desc: 'A fitness and charity event built on Bitcoin in honor of Hal Finney.<br/>The more you run, the more you donate and earn at the same time'
      },
      {
        key: 6,
        tag: 'DAY 7',
        title: 'Last day',
        src: 'public-sale/playGame.png',
        desc: 'Details of Day 7 will be provided as soon as Day 6 is completed.'
      },
    ]
  }, [])

  const currentDay = React.useMemo(() => {
    const diffDay = new BigNumber(dayjs.utc(PUBLIC_SALE_START).diff(dayjs.utc(), 'days')).absoluteValue().toNumber();
    return {
      step: DAYS.length > diffDay ? DAYS[diffDay] : DAYS[DAYS.length - 1],
      diffDay
    }
  }, [])

  return (
    <Flex flexDirection="column" pb={{ base: "24px", md: "48px" }}>
      <p className={styles.container__title}>Experience Bitcoin like never before</p>
    </Flex>
  )
})

Activities.displayName = "Activities"
