import AppLoading from '@/components/AppLoading';
import ListTable, { ColumnProp } from '@/components/ListTable';
import EmptyList from '@/components/ListTable/EmptyList';
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper';
import CRollupL2DetailBitcoinAPI from '@/services/api/dapp/rollupl2-detail-bitcoin';
import {
  BalanceBitcoinType,
  BalanceTypes,
  IBitcoinTokenTransaction,
} from '@/services/api/dapp/rollupl2-detail-bitcoin/interface';
import { shortCryptoAddress } from '@/utils/address';
import { formatCurrency } from '@/utils/format';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { L2RollupDetailContext } from '../providers/l2-rollup-detail-context';
import s from './styles.module.scss';

interface IProps {}

const TransactionsTabBitcoin = (props: IProps) => {
  const { address } = useContext(L2RollupDetailContext);

  const rollupApi = new CRollupL2DetailBitcoinAPI();
  const [balanceType, setBalanceType] =
    useState<BalanceBitcoinType | 'bitcoin'>('bitcoin');

  const [list, setList] = useState<IBitcoinTokenTransaction[]>([]);

  const [isFetching, setIsFetching] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const refInitial = useRef(false);
  const hasIncrementedPageRef = useRef(false);
  const refParams = useRef({
    page: 1,
    limit: 20,
  });

  useEffect(() => {
    refParams.current = {
      ...refParams.current,
    };
  }, []);

  useEffect(() => {
    fetchData(true);
  }, [address, balanceType]);

  const fetchData = async (isNew?: boolean) => {
    try {
      setIsFetching(true);

      if (isNew) {
        setList([]);
        refParams.current = {
          ...refParams.current,
          page: 1,
        };
        const res = (await rollupApi.getRollupL2BitcoinTokenTransactions({
          user_address: address,
          type: balanceType,
          ...refParams.current,
        })) as any;

        setList(res);
      } else {
        const res = (await rollupApi.getRollupL2BitcoinTokenTransactions({
          user_address: address,
          type: balanceType,
          ...refParams.current,
        })) as any;

        setList([...list, ...res]);
      }
    } catch (error) {
    } finally {
      setIsFetching(false);
      hasIncrementedPageRef.current = false;
    }
  };

  const onRefresh = async () => {
    if (!refInitial.current) {
      return;
    }
    try {
      setRefreshing(true);
      refParams.current = {
        ...refParams.current,
        page: 1,
      };
      hasIncrementedPageRef.current = true;
      await fetchData(true);
    } catch (error) {
      console.log('refreshing err', error);
    } finally {
      setRefreshing(false);
    }
  };

  const labelConfig = {
    color: '#898989',
  };

  const columns: ColumnProp[] = useMemo(() => {
    return [
      {
        id: 'tx',
        label: 'Transaction',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
          paddingLeft: '16px !important',
        },
        render(data: IBitcoinTokenTransaction) {
          return (
            <Flex
              direction={'column'}
              cursor="pointer"
              _hover={{
                textDecoration: 'underline',
              }}
              onClick={() => {
                window.open(`https://mempool.space/tx/${data.tx_id}`);
              }}
            >
              <Flex direction={'row'} alignItems={'center'} gap={'4px'}>
                <Text className={s.title}>
                  {shortCryptoAddress(data.tx_id)}
                </Text>
              </Flex>
            </Flex>
          );
        },
      },
      {
        id: 'from',
        label: 'From',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: IBitcoinTokenTransaction) {
          return (
            <Flex
              gap={6}
              alignItems={'center'}
              width={'100%'}
              justifyContent={'space-between'}
              cursor="pointer"
              _hover={{
                textDecoration: 'underline',
              }}
              onClick={() => {
                if (data.from)
                  window.open(`https://mempool.space/address/${data.from}`);
              }}
            >
              <Text className={s.title}>
                {data.from ? shortCryptoAddress(data.from, 10) : '-'}
              </Text>
            </Flex>
          );
        },
      },
      {
        id: 'to',
        label: 'To',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: IBitcoinTokenTransaction) {
          return (
            <Flex
              gap={6}
              alignItems={'center'}
              width={'100%'}
              justifyContent={'space-between'}
              cursor="pointer"
              _hover={{
                textDecoration: 'underline',
              }}
              onClick={() => {
                window.open(`https://mempool.space/address/${data.to}`);
              }}
            >
              <Text className={s.title}>{shortCryptoAddress(data.to, 10)}</Text>
            </Flex>
          );
        },
      },
      {
        id: 'value',
        label: 'Value',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: IBitcoinTokenTransaction) {
          return (
            <Flex gap={3} alignItems={'center'} width={'100%'}>
              <Flex gap={2} alignItems={'center'}>
                <Text className={s.title}>
                  {formatCurrency(data?.amount, 0, 6)}{' '}
                  {data.transaction_symbol || data.symbol}
                </Text>
              </Flex>
            </Flex>
          );
        },
      },
      {
        id: 'time',
        label: 'Time',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: IBitcoinTokenTransaction) {
          return (
            <Flex direction={'column'}>
              <Flex alignItems={'center'} width={'100%'}>
                <Text className={s.title}>
                  {dayjs
                    .unix(Number(data.transaction_time) / 1000)
                    .format('MM/DD/YYYY HH:mm')}
                </Text>
              </Flex>
            </Flex>
          );
        },
      },
    ];
  }, []);

  return (
    <Flex direction={'column'}>
      <Flex
        gap={'8px'}
        bg={'#F5F5F5'}
        w={'fit-content'}
        p={'2px 6px'}
        borderRadius={'8px'}
        mb={'20px'}
      >
        {[
          {
            type: 'bitcoin',
            title: 'BTC',
          },
          ...BalanceTypes,
        ].map((balance) => (
          <Box
            bg={balanceType === balance.type ? '#ffff' : 'transparent'}
            fontWeight={balanceType === balance.type ? '400' : '500'}
            onClick={() => setBalanceType(balance.type as any)}
            p={'6px'}
            borderRadius={'8px'}
            cursor={'pointer'}
          >
            <Text>{balance.title}</Text>
          </Box>
        ))}
      </Flex>
      <Box className={s.container} h="60vh">
        <ScrollWrapper
          onFetch={() => {
            refParams.current = {
              ...refParams.current,
              page: refParams.current.page + 1,
            };
            hasIncrementedPageRef.current = true;
            fetchData();
          }}
          isFetching={refreshing}
          hasIncrementedPageRef={hasIncrementedPageRef}
          onFetchNewData={onRefresh}
          wrapClassName={s.wrapScroll}
          dependData={list}
        >
          {balanceType === 'bitcoin' ? (
            <>
              <Flex w="100%" gap={{ base: '16px', lg: '24px' }}>
                {list.length > 0 &&
                  list.map((item) => {
                    return (
                      <Flex direction={'column'} className={s.shadow}>
                        <Flex direction={'column'} p={'8px'}>
                          <Text color={'#898989'}>
                            {item.inscription_number}
                          </Text>
                          <Text>
                            {item.symbol || item.inscription_id || '-'}
                          </Text>
                        </Flex>
                      </Flex>
                    );
                  })}
              </Flex>
              {!isFetching && list.length === 0 && (
                <EmptyList
                  color={'#000'}
                  labelText={`No transactions found.`}
                  emptyIcon={<Image src={'/icons/icon-empty.svg'} />}
                />
              )}
            </>
          ) : (
            <ListTable
              data={list}
              columns={columns}
              className={s.tableContainer}
              showEmpty={!isFetching}
              emptyLabel="No transactions found."
              emptyIcon={<Image src={'/icons/icon-empty.svg'} />}
            />
          )}
          {isFetching && <AppLoading className={s.loading} />}
        </ScrollWrapper>
      </Box>
    </Flex>
  );
};

export default TransactionsTabBitcoin;
