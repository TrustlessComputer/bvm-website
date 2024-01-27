import s from './styles.module.scss';
import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import ListTable, { ColumnProp } from '@/components/ListTable';
import React, { useMemo } from 'react';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import { tokenIcons } from '@/modules/PublicSale/depositModal/constants';
import { formatCurrency } from '@/utils/format';
import { MAX_DECIMAL, MIN_DECIMAL } from '@/constants/constants';

export interface IContributionCoin {
  symbol: string;
  balance: string;
  usdt_value: string;
  network: string;
};

const ContributorDetailInfo = ({data}: {data?: ILeaderBoardPoint}) => {
  console.log('ContributorDetailInfo', data);

  const labelConfig = {
    color: '#898989',
    fontSize: '11px',
    letterSpacing: '-0.5px',
    borderBottom: '1px solid #FFFFFF33',
    textTransform: 'uppercase',
  };

  const columns: ColumnProp[] = useMemo(() => {
    return [
      {
        id: 'rank',
        label: <Text pl={"8px"}>TOKEN NAME</Text>,
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 400,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
          color: '#1C1C1C !important',
        },
        render(row: IContributionCoin) {
          return (
            <Flex
              gap={1}
              alignItems={'center'}
              width={'100%'}
              paddingLeft={'8px'}
            >
              <Avatar width={'24px'} height={'24px'} src={tokenIcons[row.symbol.toLowerCase()]} />
              <Text>{row?.symbol}</Text>
            </Flex>
          );
        },
      },
      {
        id: 'rank',
        label: 'UNIT',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 400,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
          color: '#1C1C1C !important',
        },
        render(row: IContributionCoin) {
          return (
            <Flex
              alignItems={'center'}
              width={'100%'}
              justifyContent={'flex-end'}
            >
              <Text>{formatCurrency(row?.balance, MIN_DECIMAL, MAX_DECIMAL, 'BTC', true)}</Text>
            </Flex>
          );
        },
      },
      {
        id: 'rank',
        label: <Box pr={"8px"}>USD</Box>,
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 400,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
          color: '#1C1C1C !important',
        },
        render(row: IContributionCoin) {
          return (
            <Flex
              alignItems={'center'}
              width={'100%'}
              justifyContent={'flex-end'}
              pr={"8px"}
            >
              <Text>{formatCurrency(row?.usdt_value, MIN_DECIMAL, MIN_DECIMAL, 'BTC', true)}</Text>
            </Flex>
          );
        },
      },
    ];
  }, []);

  return (
    <Box className={s.container}>
      <Flex p={"8px 16px"} bg={"#F6F6F6"} w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
        <Text
          fontSize={"14px"}
          fontWeight={400}
          color={"#1C1C1C"}
        >Total contribution</Text>
        <Text
          fontSize={"16px"}
          fontWeight={500}
          color={"#1C1C1C"}
        >${formatCurrency(data?.usdt_value, 0, 2, 'BTC', true)}</Text>
      </Flex>
      <ListTable
        data={data?.coin_balances}
        columns={columns}
        className={s.tableContainer}
      />
    </Box>
  )
};

export default ContributorDetailInfo;
