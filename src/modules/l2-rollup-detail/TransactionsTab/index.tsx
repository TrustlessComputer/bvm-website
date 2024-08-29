import AppLoading from '@/components/AppLoading';
import ListTable, { ColumnProp } from '@/components/ListTable';
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper';
import { MIN_DECIMAL } from '@/constants/constants';
import CRollupL2DetailAPI from '@/services/api/dapp/rollupl2-detail';
import {
  IRollupTransaction,
  ITransaction,
} from '@/services/api/dapp/rollupl2-detail/interface';
import { shortCryptoAddress } from '@/utils/address';
import { formatCurrency } from '@/utils/format';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { L2RollupDetailContext } from '../providers/l2-rollup-detail-context';
import s from './styles.module.scss';
import { HEART_BEAT } from '@/constants/route-path';

interface IProps {}

const TransactionsTab = (props: IProps) => {
  const { address } = useContext(L2RollupDetailContext);
  const router = useRouter();

  const rollupApi = new CRollupL2DetailAPI();

  const [rollupTransactions, setRollupTransactions] = useState<
    IRollupTransaction[]
  >([]);

  const list = useMemo(() => {
    let transactions: ITransaction[] = [];
    rollupTransactions.forEach((data) => {
      transactions = [
        ...transactions,
        ...data.transactions.map((transaction) => ({
          ...transaction,
          chain: data.rollup,
        })),
      ];
    });
    return transactions;
  }, [rollupTransactions]);

  const [isFetching, setIsFetching] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  const refInitial = useRef(false);
  const endOfPaging = useRef(false);

  useEffect(() => {
    fetchData(true);
  }, [address]);

  const fetchData = async (isNew?: boolean) => {
    try {
      if (isNew) {
        endOfPaging.current = false;
        setIsFetching(true);

        refParams.current = {
          ...refParams.current,
          page: 1,
        };
        const res = (await rollupApi.getRollupL2Transactions({
          user_address: address,
          ...refParams.current,
        })) as any;

        setRollupTransactions(res);
      } else {
        if (endOfPaging.current) return;
        setIsFetching(true);
        const res = (await rollupApi.getRollupL2Transactions({
          user_address: address,
          ...refParams.current,
        })) as any;

        if (res && res?.length > 0) {
          setRollupTransactions([...rollupTransactions, ...res]);
        } else {
          endOfPaging.current = true;
        }
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
        id: 'chain',
        label: 'Chain',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
          paddingLeft: '16px !important',
        },
        render(data: ITransaction) {
          return (
            <Flex
              direction={'column'}
              cursor="pointer"
              _hover={{
                textDecoration: 'underline',
              }}
              onClick={() => {
                window.open(`${data.chain?.explorer}`);
              }}
            >
              <Flex direction={'row'} alignItems={'center'} gap={'4px'}>
                <Image
                  w={'18px'}
                  h={'18px'}
                  borderRadius={'50%'}
                  src={data.chain?.icon}
                />
                <Text className={s.title}>{data.chain?.name}</Text>
              </Flex>
            </Flex>
          );
        },
      },
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
        },
        render(data: ITransaction) {
          return (
            <Flex
              direction={'column'}
              cursor="pointer"
              _hover={{
                textDecoration: 'underline',
              }}
              onClick={() => {
                window.open(`${data.chain?.explorer}/tx/${data.hash}`);
              }}
            >
              <Flex direction={'row'} alignItems={'center'} gap={'4px'}>
                <Text className={s.title}>{shortCryptoAddress(data.hash)}</Text>
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
        render(data: ITransaction) {
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
                router.push(`${HEART_BEAT}/address/${data.from_address}`);
              }}
            >
              <Text className={s.title}>
                {shortCryptoAddress(data.from_address, 10)}
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
        render(data: ITransaction) {
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
                router.push(`${HEART_BEAT}/address/${data.to_address}`);
              }}
            >
              <Text className={s.title}>
                {shortCryptoAddress(data.to_address, 10)}
              </Text>
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
        render(data: ITransaction) {
          return (
            <Flex gap={3} alignItems={'center'} width={'100%'}>
              <Flex gap={2} alignItems={'center'}>
                <Text className={s.title}>
                  {formatCurrency(data?.value, 0, 6)} {data.chain?.symbol}
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
        render(data: ITransaction) {
          return (
            <Flex direction={'column'}>
              <Flex alignItems={'center'} width={'100%'}>
                <Text className={s.title}>
                  {dayjs(data.updated_at).format('MM/DD/YYYY HH:mm')}
                </Text>
              </Flex>
            </Flex>
          );
        },
      },
    ];
  }, []);

  return (
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
        <ListTable
          data={list}
          columns={columns}
          className={s.tableContainer}
          showEmpty={!isFetching}
          emptyLabel="No transactions found."
          emptyIcon={<Image src={'/icons/icon-empty.svg'} />}
        />
        {isFetching && <AppLoading className={s.loading} />}
      </ScrollWrapper>
    </Box>
  );
};

export default TransactionsTab;
