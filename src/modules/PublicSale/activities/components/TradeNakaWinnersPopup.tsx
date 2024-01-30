import BaseModal, { IBaseModalProps } from '@/components/BaseModal';
import useTradeNakaData from '@/modules/PublicSale/activities/hooks/useTradeNakaData';
import ListTable, { ColumnProp } from '@/components/ListTable';
import React, { useMemo } from 'react';
import { getUrlAvatarTwitter } from '@/utils/twitter';
import Avatar from '@/components/Avatar';
import { Flex, Text } from '@chakra-ui/react';
import { TopWinner } from '@/services/interfaces/activities';
import dayjs from 'dayjs';
import { formatCurrency, formatName } from '@/utils/format';
import styles from './styles.module.scss';
import cs from 'classnames';
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper';
import { useAppSelector } from '@/stores/hooks';
import { coinPricesSelector } from '@/stores/states/common/selector';
import { Coin } from '@/stores/states/common/types';
import BigNumber from 'bignumber.js';

interface IProps extends IBaseModalProps {
}

const TradeNakaWinnersPopup = ({ isShow, onHide }: IProps) => {
  const { topWinners } = useTradeNakaData();
  const coinPrices = useAppSelector(coinPricesSelector);
  const btcPrice = coinPrices?.[Coin.BTC];

  const labelConfig = {
    color: '#FFF',
    opacity: 0.7,
    fontSize: '12px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.10);',
    textTransform: 'uppercase',
    textAlign: 'center'
  };

  const config = {
    borderBottom: 'none',
    verticalAlign: 'middle',
    letterSpacing: '-0.5px',
  }

  const columns: ColumnProp[] = useMemo(() => {
    return [
      {
        id: 'user',
        labelConfig,
        config,
        label: <Text>USER</Text>,
        render(row: TopWinner) {
          return (
            <Flex
              alignItems="center"
              gap="12px"
              cursor={row.twitter_username ? "pointer" : "unset"}
              onClick={() => {
                if (!row.twitter_username) return;
                window.open(`https://twitter.com/${row.twitter_username}`)
              }}
              maxW="170px"
            >
              <Avatar
                url={getUrlAvatarTwitter(
                  row?.twitter_avatar as string,
                  'normal',
                )}
                address={''}
                width={40}
                name={row?.twitter_name || row?.twitter_username || row?.address || ''}
              />
              <Text className={cs(styles.modalContent__userName)}>{row?.twitter_username ? formatName(row?.twitter_username || '-', 17) : (row?.address || '').slice(0, 8)}</Text>
            </Flex>
          );
        },
      },
      {
        id: 'time',
        labelConfig,
        config,
        label: <Text>TIME</Text>,
        render(row: TopWinner) {
          return (
            <Flex
              alignItems="center"
              gap="12px"
            >
              <Text className={cs(styles.modalContent__text)}>
                {dayjs.utc(row.from_time, 'YYYY-MM-DD HH:mm:ss').local().format('HH:mm')}
                {" - "}
                {dayjs.utc(row.to_time, 'YYYY-MM-DD HH:mm:ss').local().format('HH:mm')}
              </Text>
            </Flex>
          );
        },
      },
      {
        id: 'pnl',
        labelConfig,
        config,
        label: <Text>PNL</Text>,
        render(row: TopWinner) {
          const amountUSD = new BigNumber(btcPrice || 0).times(row?.realized_pnl || 0).toNumber()
          return (
            <Flex
              gap="4px"
              flexDir="column"
            >
              <Text className={cs(styles.modalContent__text, styles.modalContent__pnl)}>+{formatCurrency(row?.realized_pnl, 0, 5, 'TC', false)} BTC</Text>
              <Text className={cs(styles.modalContent__usd)}>${formatCurrency(amountUSD, 0, 3, 'TC', false)}</Text>
            </Flex>
          );
        },
      },
      {
        id: 'reward',
        labelConfig,
        config,
        label: <Text>REWARD</Text>,
        render(row: TopWinner) {
          return (
            <Flex
              alignItems="center"
              gap="12px"
            >
              <Text className={cs(styles.modalContent__text, styles.modalContent__reward)}>${row?.reward}</Text>
            </Flex>
          );
        },
      },
    ]
  }, [topWinners])

  return (
    <BaseModal isShow={isShow} onHide={onHide} title="Winner" size="normal" className={styles.modalContent} headerClassName={styles.modalManualHeader}>
      <Flex flexDirection="column" height="500px">
        <ScrollWrapper onFetch={() => undefined} isFetching={false} hasIncrementedPageRef={undefined} onFetchNewData={() => undefined}>
          <ListTable data={topWinners} columns={columns} className={styles.tableContainer} />
        </ScrollWrapper>
      </Flex>
    </BaseModal>
  )
}

export default TradeNakaWinnersPopup;
