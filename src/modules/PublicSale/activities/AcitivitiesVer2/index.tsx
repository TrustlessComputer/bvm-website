import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import styles from './styles.module.scss';
import IncreaseNumber from '@/modules/PublicSale/activities/components/IncreaseNumber';
import { useAppSelector } from '@/stores/hooks';
import { numberReportSelector } from '@/stores/states/activities/selector';
import { formatCurrency } from '@/utils/format';
import { value } from 'valibot';
import BigNumber from 'bignumber.js';
import { coinPricesSelector } from '@/stores/states/common/selector';
import { Coin } from '@/stores/states/common/types';

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

export interface GameItemProps {
  title: string;
  subTitle?: string;
  desc: string | any;
  ctas?: ICTA[];
  banner?: string,
  link?: string,
  type: ActivityType
}

const GAME_LINK = {
  ARCA: "https://play.bitcoinarcade.xyz",
  NAKA: "https://nakachain.xyz/perpetual",
  MODULAR: "https://playmodular.com/workshop",
  ALPHA: "https://alpha.wtf/",
  AI: "https://eternalai.org/",
}


export const NormalRow = (p: { key: string, value?: string, mask?: boolean }) => {
  if (p.mask) {
    return (
      `
        <li>
          <div style="display: flex; flex-direction: row">
            <span style="font-size: 14px; line-height: 160%; color: white; font-weight: 700">${p.key}</span>
            <div style="background-color: white; opacity: 0.3; width: 152px; height: 22px; margin-left: 8px" />
          </div
        </li>
      `
    )
  }

  return (
    `
      <li>
        <p style="font-size: 14px; line-height: 160%">
          <span style="color: white; font-weight: 700">${p.key}</span>
         <span style="color: white; font-weight: 400; opacity: 0.7; margin-left: 4px;">${p.value}</span>
        </p>
      </li>
    `
  );
};

export const LinkRow = (p: { key: string, value: string, link: string }) => {
  return (
    `
      <li>
        <div style='display: flex; flex-direction: row; align-items: end'>
          <span style="font-size: 14px; line-height: 160%; color: white; font-weight: 700">${p.key}</span>
          <a href='${p.link}' target='_blank' style='display: flex; flex-direction: row; gap: 8px; align-items: center; font-size: 14px; color: #FA4E0E; font-weight: 400; margin-left: 8px;'>
            ${p.value}
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.7335 2.35074C3.63267 2.35429 3.53216 2.33751 3.43796 2.30138C3.34376 2.26525 3.2578 2.21052 3.18521 2.14045C3.11263 2.07038 3.0549 1.9864 3.01547 1.89354C2.97604 1.80067 2.95571 1.70081 2.95572 1.59992C2.95572 1.49903 2.97604 1.39917 3.01547 1.30631C3.0549 1.21344 3.11263 1.12947 3.18521 1.0594C3.2578 0.989326 3.34376 0.934593 3.43796 0.898464C3.53216 0.862335 3.63267 0.845549 3.7335 0.849108L9.40002 0.849108C9.59911 0.849232 9.79001 0.928376 9.93079 1.06915C10.0716 1.20993 10.1507 1.40083 10.1508 1.59992L10.1508 7.26644C10.1544 7.36727 10.1376 7.46778 10.1015 7.56198C10.0653 7.65618 10.0106 7.74214 9.94054 7.81473C9.87047 7.88731 9.7865 7.94505 9.69363 7.98448C9.60077 8.0239 9.50091 8.04423 9.40002 8.04423C9.29913 8.04423 9.19927 8.0239 9.1064 7.98447C9.01354 7.94504 8.92956 7.88731 8.85949 7.81473C8.78942 7.74214 8.73469 7.65618 8.69856 7.56198C8.66243 7.46778 8.64565 7.36727 8.64921 7.26644L8.6492 3.41321L1.78563 10.2768C1.64474 10.4177 1.45365 10.4968 1.2544 10.4968C1.05514 10.4968 0.864054 10.4177 0.723161 10.2768C0.582269 10.1359 0.503116 9.9448 0.503115 9.74554C0.503116 9.54629 0.582268 9.3552 0.723161 9.21431L7.58673 2.35074L3.7335 2.35074Z" fill="#FA4E0E"/>
            </svg>
          </a>
        </div>
      </li>
    `
  );
};

export const ReportRow = (p: { key: string, value: string, prefix?: string, maxDigit?: number, diffNumb?: number }) => {
  return (
    <Flex flexDir="row" alignItems="end">
      {p.prefix && (
        <span style={{ fontWeight: '500', fontSize: "12px", lineHeight: "140%" }}>
          {p.prefix || ""}
        </span>
      )}
      <IncreaseNumber
        from={
        new BigNumber(new BigNumber(p.value)
          .minus(new BigNumber(p.value)
            .div((p.diffNumb || 300))
          )
          .toFixed(0, BigNumber.ROUND_CEIL))
          .toNumber()
      }
        to={new BigNumber(new BigNumber(p.value).toFixed(0, BigNumber.ROUND_CEIL)).toNumber()}
        format={(_value: number) => {
          return formatCurrency(_value, 0, p.maxDigit || 0)
        }}
      />
      <Text fontSize="12px" lineHeight="120%" color="white" opacity={0.7} fontWeight="400" ml="4px">
        {p.key}
      </Text>
    </Flex>
  );
};


const ActivitiesVer2 = React.memo(() => {
  const numberReport = useAppSelector(numberReportSelector);
  const btcPrice = useAppSelector(coinPricesSelector)?.[Coin.BTC];
  const TASKS = React.useMemo<GameItemProps[]>(() => {
    return [
      {
        title: 'GameFi on Bitcoin',
        desc: `
          <ul>
            ${NormalRow({ key: "Activities:", value: "Play 8 different fully on-chain games to earn rewards." })}
            ${NormalRow({ key: "Rewards:", value: "Each game: $100 (1st place), $50 (2nd place), $30 (3rd place), $10 (4th), $10 (5th)." })}
            ${LinkRow({ key: "Bitcoin L2:", value: "Bitcoin Arcade", link: GAME_LINK.ARCA })}
          </ul>
        `,
        banner: 'banner-01.png',
        link: GAME_LINK.ARCA,
        type: ActivityType.Game,
      },
      {
        title: 'DeFi on Bitcoin',
        desc: `
          <ul>
            ${NormalRow({ key: "Activities:", value: "Trade BRC-20 perpetual futures on-chain." })}
            ${NormalRow({ key: "Rewards:", value: "$50 every 4 hours & 100k Naka points every hours." })}
            ${LinkRow({ key: "Bitcoin L2:", value: "Naka", link: GAME_LINK.NAKA })}
          </ul>
        `,
        banner: 'banner-02.png',
        link: GAME_LINK.NAKA,
        type: ActivityType.Naka,
      },
      {
        title: 'Education on Bitcoin',
        desc: `
          <ul>
            ${NormalRow({ key: "Activities:", value: "Learn about modular blockchain architecture via an exciting Lego game." })}
            ${NormalRow({ key: "Rewards:", value: "Bitcoin Punk 686 (1st place), Rare Modular (2nd place), Common Modular (3rd place)." })}
            ${LinkRow({ key: "Bitcoin L2:", value: "Modular", link: GAME_LINK.MODULAR })}
          </ul>
        `,
        banner: 'banner-03.png',
        link: GAME_LINK.MODULAR,
        type: ActivityType.Modular,
      },
      {
        title: 'SocialFi on Bitcoin',
        desc: `
          <ul>
            ${NormalRow({ key: "Activities:", value: "Participate in a charity run." })}
            ${NormalRow({ key: "Rewards:", value: "For every km you run, you’ll raise $1 for charity and earn 10,000 Alpha points." })}
            ${LinkRow({ key: "Bitcoin L2:", value: "Alpha", link: GAME_LINK.ALPHA })}
          </ul>
        `,
        banner: 'banner-04.png',
        link: GAME_LINK.ALPHA,
        type: ActivityType.Social,
      },
      {
        title: 'AI on Bitcoin',
        subTitle: " (Available on Monday)",
        desc: `
          <ul>
            ${NormalRow({ key: "Rewards:", value: undefined, mask: true })}
            ${NormalRow({ key: "Activities:", value: "Play fully on-chain games" })}
            ${LinkRow({ key: "Bitcoin L2:", value: "Eternal AI", link: GAME_LINK.AI })}
          </ul>
        `,
        banner: 'banner-05.png',
        link: GAME_LINK.AI,
        type: ActivityType.AI,
      },
    ]
  }, []);

  const renderReport = React.useCallback((type: ActivityType) => {
    if (!numberReport || type === ActivityType.AI) return <></>;
    let component1: any | undefined = undefined;
    let component2: any | undefined = undefined;
    switch (type) {
      case ActivityType.Game: {
        const gameReport = numberReport.gameReport
        if (gameReport && gameReport.total_game && gameReport.total_txs) {
          component1 = ReportRow({
            key: "Game plays",
            value: gameReport.total_game.toString(),
          });
          component2 = ReportRow({
            key: "Tx",
            value: gameReport.total_txs.toString(),
          })
        }
        break;
      }
      case ActivityType.Naka: {
        const nakaVolume = numberReport.nakaVolume
        if (nakaVolume && nakaVolume.usd_volume) {
          component1 = ReportRow({
            key: "Vols",
            value: nakaVolume.usd_volume.toString(),
            maxDigit: 2,
            prefix: "$"
          });
        }
        break;
      }
      case ActivityType.Modular: {
        const modular = numberReport.modular
        if (modular && modular.total_owner && modular.total_model) {
          component1 = ReportRow({
            key: "Builders",
            value: modular.total_owner.toString()
          });
          component2 = ReportRow({
            key: "Builds",
            value: modular.total_model.toString()
          });
        }
        break;
      }
      case ActivityType.Social: {
        const alphaRun = numberReport.alphaRun
        if (alphaRun && alphaRun.total_distance && alphaRun.total_reward) {
          component1 = ReportRow({
            key: "Km",
            value: alphaRun.total_distance.toString()
          });
          component2 = ReportRow({
            key: "Fund raised",
            value: new BigNumber(alphaRun.total_reward.toString()).div(1e8).times(btcPrice).toString(),
            maxDigit: 2,
            prefix: "$"
          });
        }
        break;
      }
    }
    if (!component1 && !component2) return <></>;

    return (
      <Flex alignItems="center" gap="8px">
        {!!component1 && (
          component1
        )}
        {!!component2 && (
          <Box w="1px" height="9px" bg="white" opacity={0.7}/>
        )}
        {!!component2 && (
          component2
        )}
      </Flex>
    )
  }, []);

  const renderItem = (item: GameItemProps) => {
    return (
      <Flex flexDir="column" className={styles.container_item} key={item.title}>
        <div className={styles.container_item_header}>
          <Text color="white" fontSize="16px" fontWeight="500">
            {item.title}
            {!!item.subTitle && <span style={{ fontWeight: "400" }}>{item.subTitle}</span>}
          </Text>
          {renderReport(item.type)}
        </div>
        <div className={styles.container_item_content}>
          <div dangerouslySetInnerHTML={{ __html: item.desc }}/>
        </div>
        <div className={styles.container_item_media}>
          {!!item.banner && (
            !!item.link ?
              (
                <a href={item.link || ""} target='_blank'>
                  <Image draggable={false} src={`public-sale/${item.banner}`} style={{ width: "100%" }}  alt="banner"/>
                </a>
              ) :
              (
                <Image draggable={false} src={`public-sale/${item.banner}`} style={{ width: "100%" }}  alt="banner"/>
              )
          )}
        </div>
      </Flex>
    )
  }

  return (
    <Box className={styles.wrap}>
      <Flex flexDir="column" gap="16px" className={styles.container}>
        <Flex id="HEADER" flexDir="column" gap="8px" className={styles.container_header}>
          <Text color="white" fontSize={{ base: "18px", md: "24px" }} lineHeight="140%">
            BITCOIN L2 HOPPING WEEKEND
          </Text>
          <Text color="white" fontSize={{ base: "14px", md: "16px" }} lineHeight="140%" opacity={0.7}>
            Explore Bitcoin like never before. Hop from one Bitcoin L2 to another to play on-chain games, trade BRC-20 futures, run for charity, learn about modular architecture, and more!
          </Text>
          <Text color="white" fontSize={{ base: "14px", md: "16px" }} lineHeight="140%" opacity={0.7}>
            Time: from now to 3:30 am UTC Monday, Feb 5
          </Text>
        </Flex>
        <Flex flexDir="column" gap="20px">
          {TASKS.map(renderItem)}
        </Flex>
      </Flex>
    </Box>
  )
});

ActivitiesVer2.displayName = "ActivitiesVer2";

export default ActivitiesVer2;
