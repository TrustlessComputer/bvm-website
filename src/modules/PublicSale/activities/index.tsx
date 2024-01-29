import React from 'react';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { PUBLIC_SALE_START } from '@/modules/Whitelist';
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Center, Flex, Text } from '@chakra-ui/react';
import styles from './styles.module.scss';
import { CDN_URL } from '@/config';
import cs from 'classnames';
import SvgInset from '@/components/SvgInset';
import s from '@/modules/PublicSale/playGame/styles.module.scss';

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
        desc: `Have fun with Bitcoin Arcade - the Bitcoin L2 for fully-on-chain gaming<br/>Play hyper-casual mobile games on Bitcoin and earn $ARCA testnet tokens.<br/>Play hyper-casual mobile games on Bitcoin Arcade.<br/>Total rewards: 30M $ARCA testnet tokens.`
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

  const renderCta = (item: ICTA) => {

    switch (item.type) {
      case 'link':
        return (
          <a href={item.link} target="_blank" key={item.title}>
            <Flex className={styles.itemWrapper_learnMore} gap="2px">
              <Text>{item.title}</Text>
              <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.1144 12.1642C13.0305 12.1672 12.9469 12.1532 12.8685 12.1232C12.7901 12.0931 12.7186 12.0476 12.6582 11.9893C12.5978 11.931 12.5498 11.8611 12.517 11.7839C12.4842 11.7066 12.4673 11.6236 12.4673 11.5396C12.4673 11.4557 12.4842 11.3726 12.517 11.2954C12.5498 11.2181 12.5978 11.1483 12.6582 11.09C12.7186 11.0317 12.7901 10.9861 12.8685 10.9561C12.9469 10.926 13.0305 10.9121 13.1144 10.915L17.8284 10.915C17.994 10.9151 18.1528 10.981 18.2699 11.0981C18.3871 11.2152 18.4529 11.374 18.453 11.5396L18.453 16.2537C18.456 16.3376 18.442 16.4212 18.4119 16.4995C18.3819 16.5779 18.3364 16.6494 18.2781 16.7098C18.2198 16.7702 18.1499 16.8182 18.0727 16.851C17.9954 16.8838 17.9123 16.9007 17.8284 16.9007C17.7445 16.9007 17.6614 16.8838 17.5841 16.851C17.5069 16.8182 17.437 16.7702 17.3787 16.7098C17.3204 16.6494 17.2749 16.5779 17.2448 16.4995C17.2148 16.4212 17.2008 16.3376 17.2038 16.2537L17.2038 13.0481L11.4939 18.758C11.3767 18.8752 11.2177 18.9411 11.052 18.9411C10.8862 18.9411 10.7272 18.8752 10.61 18.758C10.4928 18.6408 10.427 18.4818 10.427 18.3161C10.427 18.1503 10.4928 17.9913 10.61 17.8741L16.3199 12.1642L13.1144 12.1642Z" fill="#FA4E0E"/>
              </svg>
            </Flex>
          </a>
        )
      case 'action':
        return (
          <Flex
            className={styles.itemWrapper_learnMore}
            key={item.title}
            gap={3}
            onClick={() => {
              if (item.onPress) item.onPress()
            }}
          >
            <Text>{item.title}</Text>
            <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.1144 12.1642C13.0305 12.1672 12.9469 12.1532 12.8685 12.1232C12.7901 12.0931 12.7186 12.0476 12.6582 11.9893C12.5978 11.931 12.5498 11.8611 12.517 11.7839C12.4842 11.7066 12.4673 11.6236 12.4673 11.5396C12.4673 11.4557 12.4842 11.3726 12.517 11.2954C12.5498 11.2181 12.5978 11.1483 12.6582 11.09C12.7186 11.0317 12.7901 10.9861 12.8685 10.9561C12.9469 10.926 13.0305 10.9121 13.1144 10.915L17.8284 10.915C17.994 10.9151 18.1528 10.981 18.2699 11.0981C18.3871 11.2152 18.4529 11.374 18.453 11.5396L18.453 16.2537C18.456 16.3376 18.442 16.4212 18.4119 16.4995C18.3819 16.5779 18.3364 16.6494 18.2781 16.7098C18.2198 16.7702 18.1499 16.8182 18.0727 16.851C17.9954 16.8838 17.9123 16.9007 17.8284 16.9007C17.7445 16.9007 17.6614 16.8838 17.5841 16.851C17.5069 16.8182 17.437 16.7702 17.3787 16.7098C17.3204 16.6494 17.2749 16.5779 17.2448 16.4995C17.2148 16.4212 17.2008 16.3376 17.2038 16.2537L17.2038 13.0481L11.4939 18.758C11.3767 18.8752 11.2177 18.9411 11.052 18.9411C10.8862 18.9411 10.7272 18.8752 10.61 18.758C10.4928 18.6408 10.427 18.4818 10.427 18.3161C10.427 18.1503 10.4928 17.9913 10.61 17.8741L16.3199 12.1642L13.1144 12.1642Z" fill="#FA4E0E"/>
            </svg>
          </Flex>
        )
    }
  }

  const renderItem = (item: GameItemProps, index: number) => {
    const isDisable = index > currentDay.diffDay;
    const title = isDisable ? "▧ ❀ ▧ ❀ ⬚ 🖳 ▧ ❀ ⬚ 🗠 ⬚ ❀ ⬚ ❀ ▧ ♖ ▧" : item.title
    return (
      <AccordionItem isDisabled={index > currentDay.diffDay} className={styles.itemWrapper}>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton justifyContent={'space-between'} className={cs(styles.itemWrapper_header, {[styles.itemWrapper_header__active]: isExpanded})}>
                <span className={cs(styles.itemWrapper_title, {[styles.itemWrapper_title__active]: isExpanded})}>{item.tag}: {title}</span>
                <button>
                  <SvgInset
                    className={isExpanded ? styles.itemWrapper_downArrow : styles.itemWrapper_normalArrow}
                    svgUrl={`${CDN_URL}/icons/chevron-right-ic-32.svg`}
                    alt="chevron-right-ic"
                    size={24}
                  />
                </button>
              </AccordionButton>
            </h2>
            <AccordionPanel style={{ padding: '0 0 16px 0' }}>
              <Flex flex={1} flexDir="column">
                <div className={styles.itemWrapper_desc} dangerouslySetInnerHTML={{ __html: item.desc }}/>
                {item.ctas?.map(renderCta)}
              </Flex>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    )
  }

  return (
    <Flex flexDirection="column" padding={{ base: "24px", md: "48px 32px 32px 32px" }} bg="#F6F6F6;">
      <p className={styles.container__title}>Experience Bitcoin like never before</p>
      <Accordion allowMultiple={false} defaultIndex={currentDay.diffDay}>
        {DAYS.map(renderItem)}
      </Accordion>
    </Flex>
  )
})

Activities.displayName = "Activities";

export default Activities;
