import React from 'react';
import { Box, Flex, Image, SimpleGrid, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import styles from './styles.module.scss';
import IncreaseNumber from '@/modules/PublicSale/activities/components/IncreaseNumber';
import { useAppSelector } from '@/stores/hooks';
import { numberReportSelector } from '@/stores/states/activities/selector';
import { formatCurrency } from '@/utils/format';
import BigNumber from 'bignumber.js';
import { coinPricesSelector } from '@/stores/states/common/selector';
import { Coin } from '@/stores/states/common/types';
import cx from 'clsx';

interface ICTA {
  title: string;
  type: 'action' | 'link';
  onPress?: () => void;
  link?: string;
}

enum ActivityType {
  Game,
  Naka,
  Modular,
  Social,
  AI
}

const MODULAR_TW_LINK = 'https://twitter.com/BVMnetwork/status/1752952381007171646';

export interface GameItemProps {
  title: string;
  subTitle?: string;
  desc: string | any;
  ctas?: ICTA[];
  banner?: string,
  link?: string,
  type: ActivityType,
  bannerLink?: string
}

const GAME_LINK = {
  ARCA: 'https://play.bitcoinarcade.xyz',
  NAKA: 'https://nakachain.xyz/perpetual',
  MODULAR: 'https://playmodular.com/workshop',
  ALPHA: 'https://alpha.wtf/',
  AI: 'https://eternalai.org/',
};


export const NormalRow = (p: { key: string, value?: string, mask?: boolean }) => {
  if (p.mask) {
    return (
      `
        <li>
          <div style='display: flex; flex-direction: row'>
            <span style='font-size: 14px; line-height: 160%; color: black; font-weight: 700'>${p.key}</span>
            <div style='background-color: black; opacity: 0.3; width: 152px; height: 22px; margin-left: 8px' />
          </div
        </li>
      `
    );
  }

  if (!p.key) {
    return (
      `
        <li>
          <p style='font-size: 14px; line-height: 160%'>
            <span style='color: black; font-weight: 400; opacity: 0.7;'>${p.value}</span>
          </p>
        </li>
      `
    );
  }

  return (
    `
      <li>
        <p style='font-size: 14px; line-height: 160%'>
          <span style='color: black; font-weight: 700'>${p.key}</span>
          <span style='color: black; font-weight: 400; opacity: 0.7; margin-left: 4px;'>${p.value}</span>
        </p>
      </li>
    `
  );
};

export const LinkRow = (p: { key: string, value: string, link: string, isSpecial?: boolean }) => {
  return (
    `
    <li>
      <div style='display: flex; flex-direction: row; align-items: end'>
        <span style='font-size: 14px; line-height: 160%; color: black; font-weight: 700'>${p.key}</span>
        <a href='${p.link}' target='_blank'
           style='display: flex; flex-direction: row; gap: 8px; align-items: center; font-size: 14px; color: #FA4E0E; font-weight: 400; margin-left: 8px;'>
          ${p.value}
          ${p?.isSpecial ? (
      `<svg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M3.73368 2.35074C3.63285 2.35429 3.53234 2.33751 3.43814 2.30138C3.34394 2.26525 3.25799 2.21052 3.1854 2.14045C3.11281 2.07038 3.05508 1.9864 3.01565 1.89354C2.97622 1.80067 2.9559 1.70081 2.9559 1.59992C2.9559 1.49903 2.97622 1.39917 3.01565 1.30631C3.05508 1.21344 3.11281 1.12947 3.1854 1.0594C3.25799 0.989326 3.34394 0.934593 3.43814 0.898464C3.53234 0.862335 3.63285 0.845549 3.73368 0.849108L9.4002 0.849108C9.59929 0.849232 9.79019 0.928376 9.93097 1.06915C10.0717 1.20993 10.1509 1.40083 10.151 1.59992L10.151 7.26644C10.1546 7.36727 10.1378 7.46778 10.1017 7.56198C10.0655 7.65618 10.0108 7.74214 9.94073 7.81473C9.87066 7.88731 9.78668 7.94505 9.69382 7.98448C9.60095 8.0239 9.50109 8.04423 9.4002 8.04423C9.29931 8.04423 9.19945 8.0239 9.10659 7.98447C9.01372 7.94504 8.92975 7.88731 8.85968 7.81473C8.78961 7.74214 8.73487 7.65618 8.69874 7.56198C8.66261 7.46778 8.64583 7.36727 8.64939 7.26644L8.64939 3.41321L1.78582 10.2768C1.64492 10.4177 1.45383 10.4968 1.25458 10.4968C1.05533 10.4968 0.864237 10.4177 0.723344 10.2768C0.582452 10.1359 0.503299 9.9448 0.503299 9.74554C0.503299 9.54629 0.582451 9.3552 0.723344 9.21431L7.58692 2.35074L3.73368 2.35074Z'
          fill='#FFA888' />
      </svg>`
    ) : (
      `<svg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M3.7335 2.35074C3.63267 2.35429 3.53216 2.33751 3.43796 2.30138C3.34376 2.26525 3.2578 2.21052 3.18521 2.14045C3.11263 2.07038 3.0549 1.9864 3.01547 1.89354C2.97604 1.80067 2.95571 1.70081 2.95572 1.59992C2.95572 1.49903 2.97604 1.39917 3.01547 1.30631C3.0549 1.21344 3.11263 1.12947 3.18521 1.0594C3.2578 0.989326 3.34376 0.934593 3.43796 0.898464C3.53216 0.862335 3.63267 0.845549 3.7335 0.849108L9.40002 0.849108C9.59911 0.849232 9.79001 0.928376 9.93079 1.06915C10.0716 1.20993 10.1507 1.40083 10.1508 1.59992L10.1508 7.26644C10.1544 7.36727 10.1376 7.46778 10.1015 7.56198C10.0653 7.65618 10.0106 7.74214 9.94054 7.81473C9.87047 7.88731 9.7865 7.94505 9.69363 7.98448C9.60077 8.0239 9.50091 8.04423 9.40002 8.04423C9.29913 8.04423 9.19927 8.0239 9.1064 7.98447C9.01354 7.94504 8.92956 7.88731 8.85949 7.81473C8.78942 7.74214 8.73469 7.65618 8.69856 7.56198C8.66243 7.46778 8.64565 7.36727 8.64921 7.26644L8.6492 3.41321L1.78563 10.2768C1.64474 10.4177 1.45365 10.4968 1.2544 10.4968C1.05514 10.4968 0.864054 10.4177 0.723161 10.2768C0.582269 10.1359 0.503116 9.9448 0.503115 9.74554C0.503116 9.54629 0.582268 9.3552 0.723161 9.21431L7.58673 2.35074L3.7335 2.35074Z'
          fill='#FA4E0E' />
      </svg>`
    )
    }
        </a>
      </div>
    </li>
    `
  );
};

export const ReportRow = (p: { key: string, value: string, prefix?: string, maxDigit?: number, diffNumb?: number }) => {
  return (
    <Flex flexDir='row' alignItems='end' color='black'>
      {p.prefix && (
        <span style={{ fontWeight: '500', fontSize: '12px', lineHeight: '140%' }}>
          {p.prefix || ''}
        </span>
      )}
      <IncreaseNumber
        from={
          new BigNumber(new BigNumber(p.value)
            .minus(new BigNumber(p.value)
              .div((p.diffNumb || 300)),
            )
            .toFixed(0, BigNumber.ROUND_CEIL))
            .toNumber()
        }
        to={new BigNumber(new BigNumber(p.value).toFixed(0, BigNumber.ROUND_CEIL)).toNumber()}
        format={(_value: number) => {
          return formatCurrency(_value, 0, p.maxDigit || 0);
        }}
      />
      <Text fontSize='12px' lineHeight='120%' color='black' opacity={0.7} fontWeight='400' ml='4px'>
        {p.key}
      </Text>
    </Flex>
  );
};


const ActivitiesVer2 = React.memo(() => {
  const numberReport = useAppSelector(numberReportSelector);
  const btcPrice = useAppSelector(coinPricesSelector)?.[Coin.BTC];
  const { isOpen: isOpenFDV, onToggle: onToggleFDV, onClose: onCloseFDV, onOpen: onOpenFDV } = useDisclosure();

  const TASKS = React.useMemo<GameItemProps[]>(() => {
    return [
      {
        title: 'AI on Bitcoin',
        desc: `
          <ul style='color: black; columns: 2'>
            ${LinkRow({ key: 'Bitcoin L2:', value: 'Eternal AI', link: GAME_LINK.AI })}
            ${NormalRow({ key: 'Block time:', value: '2 seconds' })}
            ${NormalRow({ key: 'Data availability layer:', value: 'Bitcoin + Avail' })}
            ${NormalRow({ key: 'Network type:', value: 'Bitcoin Mainnet' })}
            ${NormalRow({ key: 'Deployer:', value: 'NBC team' })}
            ${NormalRow({ key: 'Launch date:', value: 'January 01, 2024' })}
          </ul>
        `,
        subTitle: '',
        banner: 'banner-05.png',
        link: GAME_LINK.AI,
        type: ActivityType.AI,
      },
      {
        title: 'GameFi on Bitcoin',
        desc: `
          <ul style='color: black'>
            ${NormalRow({ key: 'Activities:', value: 'Play 8 different fully on-chain games to earn rewards.' })}
            ${LinkRow({ key: 'Bitcoin L2:', value: 'Bitcoin Arcade', link: GAME_LINK.ARCA })}
          </ul>
        `,
        banner: 'banner-01_1.png',
        link: GAME_LINK.ARCA,
        type: ActivityType.Game,
      },
      {
        title: 'DeFi on Bitcoin',
        desc: `
          <ul style='color: black'>
            ${LinkRow({ key: 'Bitcoin L2:', value: 'Naka', link: GAME_LINK.NAKA })}
            ${NormalRow({ key: 'Block time:', value: '2 seconds' })}
            ${NormalRow({ key: 'Data availability layer:', value: 'Bitcoin + Polygon' })}
            ${NormalRow({ key: 'Network type:', value: 'Bitcoin Mainnet' })}
            ${NormalRow({ key: 'Deployer:', value: 'Naka team' })}
            ${NormalRow({ key: 'Launch date:', value: 'January 01, 2024' })}
          </ul>
        `,
        banner: 'banner-02.png',
        link: GAME_LINK.NAKA,
        type: ActivityType.Naka,
      },
      {
        title: 'Education on Bitcoin',
        desc: `
          <ul style='color: black'>
            ${NormalRow({
          key: 'Activities:',
          value: 'Learn about modular blockchain architecture via a fun Lego game.',
        })}
            ${LinkRow({ key: 'Bitcoin L2:', value: 'Modular', link: GAME_LINK.MODULAR })}
          </ul>
        `,
        banner: 'banner-03.png',
        link: GAME_LINK.MODULAR,
        type: ActivityType.Modular,
        bannerLink: MODULAR_TW_LINK,
      },
      {
        title: 'SocialFi on Bitcoin',
        desc: `
          <ul style='color: black'>
            ${LinkRow({ key: 'Bitcoin L2:', value: 'Alpha', link: GAME_LINK.ALPHA })}
            ${NormalRow({ key: 'Block time:', value: '2 seconds' })}
            ${NormalRow({ key: 'Data availability layer:', value: 'Bitcoin + Polygon' })}
            ${NormalRow({ key: 'Network type:', value: 'Bitcoin Mainnet' })}
            ${NormalRow({ key: 'Deployer:', value: 'NBC team' })}
            ${NormalRow({ key: 'Launch date:', value: 'June 27, 2023' })}
          </ul>
        `,
        banner: 'banner-04.png',
        link: GAME_LINK.ALPHA,
        type: ActivityType.Social,
      },
    ];
  }, []);

  const renderReport = React.useCallback((type: ActivityType) => {
    if (!numberReport) return <></>;
    let component1: any | undefined = undefined;
    let component2: any | undefined = undefined;
    switch (type) {
      case ActivityType.Game: {
        const gameReport = numberReport.gameReport
        if (gameReport && gameReport.total_game && gameReport.total_txs) {
          component1 = ReportRow({
            key: "games played",
            value: gameReport.total_game.toString(),
          });
          component2 = (
            <Flex cursor="pointer" onClick={() => {
              window.open("https://explorer.testnet.bitcoinarcade.xyz/", "_blank")
            }}>
              {ReportRow({
                key: "transactions",
                value: gameReport.total_txs.toString(),
              })}
            </Flex>
          )
        }
        break;
      }
      case ActivityType.Naka: {
        const nakaVolume = numberReport.nakaVolume
        if (nakaVolume && nakaVolume.usd_volume) {
          component1 = (
            <Flex cursor="pointer" onClick={() => {
              window.open("https://explorer.nakachain.xyz/address/0x43eF235efF5d8Aa29D34bCB7AE42dCFA6A86477e", "_blank")
            }}>
              {
                ReportRow({
                  key: "volume",
                  value: nakaVolume.usd_volume.toString(),
                  maxDigit: 2,
                  prefix: "$"
                })
              }
            </Flex>
          );
        }
        break;
      }
      case ActivityType.Modular: {
        const modular = numberReport.modular
        if (modular && modular.total_owner && modular.total_model) {
          component1 = ReportRow({
            key: "builders",
            value: modular.total_owner.toString()
          });
          component2 = ReportRow({
            key: "builds",
            value: modular.total_model.toString()
          });
        }
        break;
      }
      case ActivityType.Social: {
        const alphaRun = numberReport.alphaRun
        if (alphaRun && alphaRun.total_distance && alphaRun.total_reward) {
          component1 = ReportRow({
            key: "km ran",
            value: alphaRun.total_distance.toString()
          });
          component2 = ReportRow({
            key: "charity raised",
            value: new BigNumber(alphaRun.total_reward.toString()).div(1e8).times(btcPrice).toString(),
            maxDigit: 2,
            prefix: "$"
          });
        }
        break;
      }
      case ActivityType.AI: {
        const aiReport = numberReport.aiReport
        if (aiReport && aiReport.total_model) {
          component1 = ReportRow({
            key: "AI models",
            value: aiReport.total_model.toString()
          });
          component2 = ReportRow({
            key: "AI challenges",
            value: aiReport.total_challenge.toString()
          });
        }
        break;
      }
    }
    if (!component1 && !component2) return <></>;
    const isModular = type === ActivityType.Modular;

    return (
      <Flex alignItems="center" gap="8px" cursor={isModular ? "pointer" : "unset"} onClick={() => {
        if(!isModular) return;
        window.open(MODULAR_TW_LINK, "_blank")
      }}>
        {!!component1 && (
          component1
        )}
        {!!component2 && (
          <Box w="1px" height="9px" bg="black" opacity={0.7}/>
        )}
        {!!component2 && (
          component2
        )}
      </Flex>
    )
  }, [numberReport]);

  const renderItem = (item: GameItemProps) => {
    return (
      <Flex flexDir='column'
            className={cx(styles.container_item, /*[ActivityType.AI].includes(item?.type) ? styles.special : ''*/)}
            key={item.title}>
        <div className={styles.container_item_header}>
          <Text color='black' fontSize='16px' fontWeight='500'>
            {item.title}
            {!!item.subTitle && <span style={{ fontWeight: '400' }}>{item.subTitle}</span>}
          </Text>
          {renderReport(item.type)}
        </div>
        <div className={styles.container_item_content}>
          <div dangerouslySetInnerHTML={{ __html: item.desc }} />
          {
            [ActivityType.AI].includes(item?.type) && (
              <div>
                <Tooltip
                  minW="220px"
                  bg="#007659"
                  isOpen={isOpenFDV}
                  // boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
                  borderRadius="4px"
                  padding="16px"
                  label={
                    <Flex direction="column" color="white" gap={"4px"}>
                      <Text>- Receive 1,000 testnet $EAI for each AI model created.</Text>
                      <Text>- Token Airdrop for the Top 3 most-used models - To Be Announced.</Text>
                      <Text>- Token Airdrop for the Top 3 AI models with the most likes on X.</Text>
                      <Text>- Token Airdrop for the Top 3 users who use the AI models the most.</Text>
                      <Text>- Token Airdrop for the Top 3 users who use the AI models the most.</Text>
                      <Text>- Token Airdrop also extends to $BVM holders, $GM holders, Perceptrons holders, Alpha OGs, NakaChain OGs, Bitcoin Arcade OGs, and users of other Bitcoin L2 platforms powered by BVM.</Text>
                    </Flex>
                  }
                  className={styles.aiPrizeInfo}
                >
                  <Flex alignItems="center"
                        onClick={onToggleFDV}
                        onMouseEnter={onOpenFDV}
                        onMouseLeave={onCloseFDV}
                        className={styles.aiPrizeIcon}
                  >
                    <svg width="14px" height="14px" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.66667 0.333984C2.98667 0.333984 0 3.32065 0 7.00065C0 10.6807 2.98667 13.6673 6.66667 13.6673C10.3467 13.6673 13.3333 10.6807 13.3333 7.00065C13.3333 3.32065 10.3467 0.333984 6.66667 0.333984ZM7.33333 10.334H6V6.33398H7.33333V10.334ZM7.33333 5.00065H6V3.66732H7.33333V5.00065Z" fill="#FFFFFF"/>
                    </svg>
                  </Flex>
                </Tooltip>
              </div>
            )
          }
        </div>
        <div className={styles.container_item_media}>
          {!!item.banner && (
            (!!item.link || !!item.bannerLink) ?
              (
                <a href={item.bannerLink || item.link || ''} target='_blank'>
                  <Image draggable={false} src={`public-sale/${item.banner}`} style={{ width: '100%' }} alt='banner' />
                </a>
              ) :
              (
                <Image draggable={false} src={`public-sale/${item.banner}`} style={{ width: '100%' }} alt='banner' />
              )
          )}
        </div>
      </Flex>
    );
  };

  return (
    <Box className={styles.wrap}>
      <Flex flexDir='column' gap='20px' className={styles.container}>
        <SimpleGrid columns={{ base: 1, md: 1 }} gap='20px'>
          {TASKS.map(renderItem)}
        </SimpleGrid>
      </Flex>
    </Box>
  );
});

ActivitiesVer2.displayName = 'ActivitiesVer2';

export default ActivitiesVer2;
