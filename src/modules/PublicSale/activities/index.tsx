import React from 'react';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { PUBLIC_SALE_START } from '@/modules/Whitelist';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Center,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import styles from './styles.module.scss';
import { CDN_URL, CDN_URL_ICONS } from '@/config';
import cs from 'classnames';
import SvgInset from '@/components/SvgInset';
import TradeNakaWinnersPopup from '@/modules/PublicSale/activities/components/TradeNakaWinnersPopup';
import NakaCountDown from '@/modules/PublicSale/activities/components/NakaCountDown';

interface ICTA {
  title: string;
  type: 'action' | 'link';
  onPress?: () => void;
  link?: string;
}

enum ActivityType {
  Day1,
  Day2,
  Day3,
  Day4,
  Day5,
  Day6,
  Day7,
}

export interface GameItemProps {
  key: number;
  tag: string;
  title: string;
  desc: string | any;
  src: string;
  ctas?: ICTA[];
  type: ActivityType;
  startTime?: string;
  endTime?: string;
}

const Activities = React.memo(() => {
  const {
    onClose: onCloseNakaWinners,
    onOpen: onOpenNakaWinners,
    isOpen: isOpenNakaWinners,
  } = useDisclosure();

  const DAYS = React.useMemo<GameItemProps[]>(() => {
    return [
      {
        key: 0,
        tag: 'Day 1',
        title: 'Fully on-chain gaming on Bitcoin',
        src: 'public-sale/playGame.png',
        ctas: [{
          title: "Play game in Arcade",
          type: 'link',
          link: 'https://play.bitcoinarcade.xyz'
        }],
        type: ActivityType.Day1,
        desc: `
Bitcoin Arcade is a Bitcoin L2 for gaming using Bitcoin for security, EigenDA for data availability, and Optimism for execution.<br/><br/>
Let's play to earn $ARCA testnet tokens, convertible to $ARCA mainnet tokens in March.<br/><br/>
🎁 Rewards: <strong>30M $ARCA</strong><br/><br/>
🎮 Play now at <a href='https://play.bitcoinarcade.xyz' target='_blank' style='text-decoration: underline; color: #FA4E0E'>play.bitcoinarcade.xyz</a> with the invite code ARCADE.<br/><br/>
<img src='public-sale/banner-game.png' width="100%" />
`,
      },
      {
        key: 1,
        tag: 'Day 2',
        title: 'BRC-20 Perpetual Futures on Bitcoin',
        src: 'public-sale/playGame.png',
        type: ActivityType.Day2,
        ctas: [
          {
            title: 'Trade on Naka',
            type: 'link',
            link: 'https://nakachain.xyz/app',
          },
          {
            title: 'Winners',
            type: 'action',
            onPress: () => {
              onOpenNakaWinners();
            },
          },
        ],
        desc:
          'NakaChain is a low-cost and lightning-fast Bitcoin Layer 2 blockchain designed for DeFi apps using Bitcoin for security, Polygon for data availability, and Optimism for execution.' +
          "<br/><br/>Trade perpetual on $ORDI and $SATS to earn $50 every 4 hours.<br/>"
          // '<br/><br/>Total rewards: <span style="color: #FA4E0E">$1,000</span>',
      },
      {
        key: 2,
        tag: 'Day 3',
        title: 'Modular on Bitcoin',
        src: 'public-sale/playGame.png',
        type: ActivityType.Day3,
        ctas: [
          {
            title: 'Play with modular blocks',
            type: 'link',
            link: 'https://playmodular.com/workshop',
          },
        ],
        // https://
        desc: 'Build whatever on Bitcoin with modular blocks powered by the BVM network.' +
          '<br/><br/>' +
          'Share your build for a chance to get <a style="text-decoration: underline; color: white" target="_blank" href="https://magiceden.io/ordinals/item-details/ea283fe32ce8666960ec43febb6b09857c095f24b8a723140f57aacca34c35eci0">Bitcoin Punk Inscription #18108</a> - one of the earliest Bitcoin Punk ever inscribed.' +
          '<br/><br/>' +
          '<video src="public-sale/modular-video-2.mp4" controls muted autoplay loop style="width: 100%" />',
      },
      {
        key: 3,
        tag: 'Day 4',
        title: 'Fully on-chain poker on Bitcoin',
        src: 'public-sale/playGame.png',
        type: ActivityType.Day4,
        ctas: [
          {
            title: 'Play games on Arcade',
            type: 'link',
            link: 'https://bitcoinarcade.xyz/',
          },
        ],
        desc: 'Have fun with Bitcoin Arcade - the Bitcoin L2 for fully-on-chain gaming.<br/>Play hyper-casual mobile games on Bitcoin and earn $ARCA testnet tokens.',
      },
      {
        key: 4,
        tag: 'Day 5',
        type: ActivityType.Day5,
        title: 'Running Bitcoin',
        src: 'public-sale/playGame.png',
        ctas: [
          {
            title: 'Run with Alphas',
            type: 'link',
            link: 'https://alpha.wtf/',
          },
        ],
        desc: 'A fitness and charity event built on Bitcoin in honor of Hal Finney.<br/>The more you run, the more you donate and earn at the same time',
      },
      {
        key: 5,
        tag: 'Day 6',
        type: ActivityType.Day6,
        title: 'Running Bitcoin',
        src: 'public-sale/playGame.png',
        ctas: [
          {
            title: 'Run with Alphas',
            type: 'link',
            link: 'https://alpha.wtf/',
          },
        ],
        desc: 'A fitness and charity event built on Bitcoin in honor of Hal Finney.<br/>The more you run, the more you donate and earn at the same time',
      },
      {
        key: 6,
        tag: 'Day 7',
        type: ActivityType.Day7,
        title: 'AI x Bitcoin',
        src: 'public-sale/playGame.png',
        desc: 'Details of Day 7 will be provided as soon as Day 6 is completed.',
      },
    ];
  }, [isOpenNakaWinners]);

  const currentDay = React.useMemo(() => {
    let diffDay = new BigNumber(
      dayjs.utc(PUBLIC_SALE_START).diff(dayjs.utc(), 'days'),
    )
      .absoluteValue()
      .toNumber();

    // // Case naka start at 4h UTC
    // if (diffDay === ActivityType.Day2 && dayjs.utc().hour() < 4) {
    //   diffDay = 0;
    // }

    return {
      step: DAYS.length > diffDay ? DAYS[diffDay] : DAYS[DAYS.length - 1],
      diffDay,
    };
  }, []);

  const [expandIndex, setExpandIndex] =
    React.useState<Number | undefined>(currentDay.diffDay);

  const renderCta = (item: ICTA) => {
    switch (item.type) {
      case 'link':
        return (
          <a href={item.link} target="_blank" key={item.title}>
            <Flex className={styles.itemWrapper_learnMore} gap="2px">
              <Text>{item.title}</Text>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.73335 9.34973C9.63255 9.35333 9.53205 9.33653 9.43785 9.30043C9.34365 9.26433 9.25765 9.20953 9.18515 9.13943C9.11255 9.06943 9.05475 8.98543 9.01535 8.89253C8.97595 8.79973 8.95565 8.69983 8.95565 8.59893C8.95565 8.49803 8.97595 8.39823 9.01535 8.30533C9.05475 8.21243 9.11255 8.12853 9.18515 8.05843C9.25765 7.98833 9.34365 7.93363 9.43785 7.89753C9.53205 7.86133 9.63255 7.84453 9.73335 7.84813H15.4C15.599 7.84823 15.7899 7.92743 15.9307 8.06823C16.0715 8.20893 16.1506 8.39983 16.1508 8.59893V14.2654C16.1543 14.3663 16.1375 14.4668 16.1014 14.561C16.0653 14.6552 16.0106 14.7411 15.9405 14.8137C15.8704 14.8863 15.7864 14.944 15.6936 14.9835C15.6007 15.0229 15.5008 15.0432 15.4 15.0432C15.2991 15.0432 15.1992 15.0229 15.1063 14.9835C15.0135 14.944 14.9295 14.8863 14.8594 14.8137C14.7894 14.7411 14.7346 14.6552 14.6985 14.561C14.6624 14.4668 14.6456 14.3663 14.6491 14.2654V10.4122L7.78555 17.2758C7.64465 17.4167 7.45355 17.4958 7.25425 17.4958C7.05505 17.4958 6.86395 17.4167 6.72305 17.2758C6.58215 17.1349 6.50305 16.9438 6.50305 16.7445C6.50305 16.5453 6.58215 16.3542 6.72305 16.2133L13.5867 9.34973H9.73335Z"
                  fill="#FA4E0E"
                />
              </svg>
            </Flex>
          </a>
        );
      case 'action':
        return (
          <Flex
            className={styles.itemWrapper_learnMore}
            key={item.title}
            gap="2px"
            onClick={() => {
              if (item.onPress) item.onPress();
            }}
            textDecoration="underline"
            cursor="pointer"
          >
            <Text>{item.title}</Text>
            {/*<svg*/}
            {/*  width="30"*/}
            {/*  height="29"*/}
            {/*  viewBox="0 0 30 29"*/}
            {/*  fill="none"*/}
            {/*  xmlns="http://www.w3.org/2000/svg"*/}
            {/*>*/}
            {/*  <path*/}
            {/*    d="M13.1144 12.1642C13.0305 12.1672 12.9469 12.1532 12.8685 12.1232C12.7901 12.0931 12.7186 12.0476 12.6582 11.9893C12.5978 11.931 12.5498 11.8611 12.517 11.7839C12.4842 11.7066 12.4673 11.6236 12.4673 11.5396C12.4673 11.4557 12.4842 11.3726 12.517 11.2954C12.5498 11.2181 12.5978 11.1483 12.6582 11.09C12.7186 11.0317 12.7901 10.9861 12.8685 10.9561C12.9469 10.926 13.0305 10.9121 13.1144 10.915L17.8284 10.915C17.994 10.9151 18.1528 10.981 18.2699 11.0981C18.3871 11.2152 18.4529 11.374 18.453 11.5396L18.453 16.2537C18.456 16.3376 18.442 16.4212 18.4119 16.4995C18.3819 16.5779 18.3364 16.6494 18.2781 16.7098C18.2198 16.7702 18.1499 16.8182 18.0727 16.851C17.9954 16.8838 17.9123 16.9007 17.8284 16.9007C17.7445 16.9007 17.6614 16.8838 17.5841 16.851C17.5069 16.8182 17.437 16.7702 17.3787 16.7098C17.3204 16.6494 17.2749 16.5779 17.2448 16.4995C17.2148 16.4212 17.2008 16.3376 17.2038 16.2537L17.2038 13.0481L11.4939 18.758C11.3767 18.8752 11.2177 18.9411 11.052 18.9411C10.8862 18.9411 10.7272 18.8752 10.61 18.758C10.4928 18.6408 10.427 18.4818 10.427 18.3161C10.427 18.1503 10.4928 17.9913 10.61 17.8741L16.3199 12.1642L13.1144 12.1642Z"*/}
            {/*    fill="#FA4E0E"*/}
            {/*  />*/}
            {/*</svg>*/}
          </Flex>
        );
    }
  };

  const renderItem = (item: GameItemProps) => {
    const isDisable = item.key > currentDay.diffDay;
    const title = isDisable ? item.title : item.title;

    const isRunningNaka = expandIndex === item.key && item.key === ActivityType.Day2

    return (
      <AccordionItem isDisabled={isDisable} className={styles.itemWrapper}>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton
                justifyContent={'space-between'}
                className={cs(styles.itemWrapper_header, {
                  [styles.itemWrapper_header__active]: isExpanded,
                  [styles.itemWrapper_header__disable]: isDisable,
                })}
              >
                <Flex
                  gap={1}
                  className={cs(styles.itemWrapper_title, {
                    [styles.itemWrapper_title__active]: isExpanded,
                  })}
                >
                  <Flex direction="column" gap="8px">
                    <Text>
                      {item.key < currentDay.diffDay && (
                        <span className={styles.itemWrapper_happening}>Happening Now</span>
                      )}
                      {item.key === currentDay.diffDay && (
                        <span className={styles.itemWrapper_unlocked}>New unlocked</span>
                      )}
                    </Text>
                    <Text>
                      {item.tag}: {title}
                    </Text>
                  </Flex>
                </Flex>
                <button>
                  <SvgInset
                    className={
                      isDisable
                        ? ''
                        : isExpanded
                        ? styles.itemWrapper_downArrow
                        : styles.itemWrapper_normalArrow
                    }
                    svgUrl={
                      isDisable
                        ? `${CDN_URL_ICONS}/lock.svg`
                        : `${CDN_URL}/icons/chevron-right-ic-32.svg`
                    }
                    size={20}
                  />
                </button>
              </AccordionButton>
            </h2>
            <AccordionPanel style={{ padding: '0 0 10px 0' }}>
              <Flex flex={1} flexDir="column">
                <div
                  className={styles.itemWrapper_desc}
                  dangerouslySetInnerHTML={{ __html: item.desc }}
                />
                {isRunningNaka && <NakaCountDown />}
                <Flex alignItems="center" gap="8px">
                  {item.ctas?.map(renderCta)}
                </Flex>
              </Flex>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    );
  };

  return (
    <>
      <Flex
        className={styles.wrap}
        flexDirection="column"
        padding={{ base: '24px', md: '24px 24px 32px 24px' }}
      >
        <p className={styles.container__title}>
          Experience Bitcoin like never before.
        </p>
        <Accordion
          allowToggle={true}
          allowMultiple={false}
          index={expandIndex as any}
          defaultIndex={currentDay.diffDay}
          onChange={(expandedIndex) => {
            setExpandIndex(expandedIndex as number);
          }}
        >
          {DAYS.map(renderItem)}
        </Accordion>
      </Flex>
      <TradeNakaWinnersPopup
        isShow={isOpenNakaWinners}
        onHide={onCloseNakaWinners}
      />
    </>
  );
});

Activities.displayName = 'Activities';

export default Activities;
