import { Box, Center, Flex, GridItem, SimpleGrid, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import GameFrame from './GameFrame';
import React, { useState } from 'react';
import cx from 'clsx';
import dayjs from 'dayjs';
import { PUBLIC_SALE_START } from '@/modules/Whitelist';
import BigNumber from 'bignumber.js';

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

const Playgame = () => {
  const DAYS = React.useMemo<GameItemProps[]>(() => {
    return [
      {
        key: 0,
        tag: 'DAY 1',
        title: 'Fully on-chain gaming on Bitcoin',
        src: 'public-sale/playGame.png',
        ctas: [{
          title: 'Play game in Arcade',
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
          title: 'Trading in NakaChain',
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
          title: 'Playing with Lego',
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
          title: 'Play game in Arcade',
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
        desc: 'A fitness and charity event built on Bitcoin in honor of Hal Finney.<br/>The more you run, the more you donate and earn at the same time'
      },
      {
        key: 5,
        tag: 'DAY 6',
        title: 'Play game in Arcade',
        src: 'public-sale/playGame.png',
        desc: 'day 6 Day Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al.Ut enim ad minima veniam, quis nostrum exercitationem ullam.'
      },
      {
        key: 6,
        tag: 'DAY 7',
        title: 'Play game in Arcade',
        src: 'public-sale/playGame.png',
        desc: 'day 6 Day Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al.Ut enim ad minima veniam, quis nostrum exercitationem ullam.'
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

  const [selectedDay, setSelectedDay] = useState(currentDay.step);

  const renderCta = (item: ICTA) => {

    switch (item.type) {
      case 'link':
        return (
          <a href={item.link} target="_blank" key={item.title}>
            <Flex className={s.learnMoreWrapper} gap={3}>
              <Text>{item.title}</Text>
              <Center w="28px" height="28px" bgColor="#FA4E0E">
                <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.1144 12.1642C13.0305 12.1672 12.9469 12.1532 12.8685 12.1232C12.7901 12.0931 12.7186 12.0476 12.6582 11.9893C12.5978 11.931 12.5498 11.8611 12.517 11.7839C12.4842 11.7066 12.4673 11.6236 12.4673 11.5396C12.4673 11.4557 12.4842 11.3726 12.517 11.2954C12.5498 11.2181 12.5978 11.1483 12.6582 11.09C12.7186 11.0317 12.7901 10.9861 12.8685 10.9561C12.9469 10.926 13.0305 10.9121 13.1144 10.915L17.8284 10.915C17.994 10.9151 18.1528 10.981 18.2699 11.0981C18.3871 11.2152 18.4529 11.374 18.453 11.5396L18.453 16.2537C18.456 16.3376 18.442 16.4212 18.4119 16.4995C18.3819 16.5779 18.3364 16.6494 18.2781 16.7098C18.2198 16.7702 18.1499 16.8182 18.0727 16.851C17.9954 16.8838 17.9123 16.9007 17.8284 16.9007C17.7445 16.9007 17.6614 16.8838 17.5841 16.851C17.5069 16.8182 17.437 16.7702 17.3787 16.7098C17.3204 16.6494 17.2749 16.5779 17.2448 16.4995C17.2148 16.4212 17.2008 16.3376 17.2038 16.2537L17.2038 13.0481L11.4939 18.758C11.3767 18.8752 11.2177 18.9411 11.052 18.9411C10.8862 18.9411 10.7272 18.8752 10.61 18.758C10.4928 18.6408 10.427 18.4818 10.427 18.3161C10.427 18.1503 10.4928 17.9913 10.61 17.8741L16.3199 12.1642L13.1144 12.1642Z" fill="white"/>
                </svg>
              </Center>
            </Flex>
          </a>
        )
      case 'action':
        return (
          <Flex
            className={s.learnMoreWrapper}
            key={item.title}
            gap={3}
            onClick={() => {
              if (item.onPress) item.onPress()
            }}
          >
            <Text>{item.title}</Text>
            <Center w="28px" height="28px" bgColor="#FA4E0E">
              <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.1144 12.1642C13.0305 12.1672 12.9469 12.1532 12.8685 12.1232C12.7901 12.0931 12.7186 12.0476 12.6582 11.9893C12.5978 11.931 12.5498 11.8611 12.517 11.7839C12.4842 11.7066 12.4673 11.6236 12.4673 11.5396C12.4673 11.4557 12.4842 11.3726 12.517 11.2954C12.5498 11.2181 12.5978 11.1483 12.6582 11.09C12.7186 11.0317 12.7901 10.9861 12.8685 10.9561C12.9469 10.926 13.0305 10.9121 13.1144 10.915L17.8284 10.915C17.994 10.9151 18.1528 10.981 18.2699 11.0981C18.3871 11.2152 18.4529 11.374 18.453 11.5396L18.453 16.2537C18.456 16.3376 18.442 16.4212 18.4119 16.4995C18.3819 16.5779 18.3364 16.6494 18.2781 16.7098C18.2198 16.7702 18.1499 16.8182 18.0727 16.851C17.9954 16.8838 17.9123 16.9007 17.8284 16.9007C17.7445 16.9007 17.6614 16.8838 17.5841 16.851C17.5069 16.8182 17.437 16.7702 17.3787 16.7098C17.3204 16.6494 17.2749 16.5779 17.2448 16.4995C17.2148 16.4212 17.2008 16.3376 17.2038 16.2537L17.2038 13.0481L11.4939 18.758C11.3767 18.8752 11.2177 18.9411 11.052 18.9411C10.8862 18.9411 10.7272 18.8752 10.61 18.758C10.4928 18.6408 10.427 18.4818 10.427 18.3161C10.427 18.1503 10.4928 17.9913 10.61 17.8741L16.3199 12.1642L13.1144 12.1642Z" fill="white"/>
              </svg>
            </Center>
          </Flex>
        )
    }
  }

  const renderCtaList = () => {
    if (!selectedDay.ctas || !selectedDay.ctas.length) return <></>;

    return selectedDay.ctas.map(renderCta)
  }

  return (
    <Flex className={s.container} direction={"column"}>
      <Box className={s.content}>
        <div className={s.content_inner}>
        <Flex gap={2} justifyContent={"space-between"} mb={8}>
          {
            DAYS.map(d => {
              return (
                <Flex
                  flex={1}
                  justifyContent="center"
                  alignItems="center"
                  onClick={() => setSelectedDay(d)}
                  className={cx(s.item, d?.key === selectedDay?.key ? s.selected : null)}
                >
                  {d?.tag}
                </Flex>
              )
            })
          }
        </Flex>
        <SimpleGrid gridTemplateColumns={["1fr", "1fr 1fr"]} gap={6}>
          <GridItem>
            <Text className={s.title}>{selectedDay?.title}</Text>
            <div className={s.desc} dangerouslySetInnerHTML={{ __html: selectedDay?.desc }}/>
            {renderCtaList()}
          </GridItem>
          <GridItem>
            <Flex justifyContent="flex-end">
              <GameFrame src={selectedDay.src} />
            </Flex>
          </GridItem>
        </SimpleGrid>
        </div>
      </Box>
    </Flex>
  );
}

export default Playgame;
