/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable jsx-a11y/alt-text */
'use client';

import AppLoading from '@/components/AppLoading';
import ListTable, { ColumnProp } from '@/components/ListTable';
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper';
import CRollupL2DetailBitcoinAPI from '@/services/api/dapp/rollupl2-detail-bitcoin';
import {
  BalanceBitcoinType,
  BalanceTypes,
  IBalanceBitcoin,
} from '@/services/api/dapp/rollupl2-detail-bitcoin/interface';
import { ITokenChain } from '@/services/api/dapp/rollupl2-detail/interface';
import { formatCurrency } from '@/utils/format';
import { Box, Flex, Image, Text, Grid } from '@chakra-ui/react';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { L2RollupDetailContext } from '../providers/l2-rollup-detail-context';
import s from './styles.module.scss';
import EmptyList from '@/components/ListTable/EmptyList';

const PortfolioTabBitcoin = () => {
  const { address } = useContext(L2RollupDetailContext);

  const rollupApi = new CRollupL2DetailBitcoinAPI();

  const [balanceType, setBalanceType] = useState<BalanceBitcoinType>('runes');
  const [list, setList] = useState<IBalanceBitcoin[]>([]);

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
        const res = (await rollupApi.getRollupL2BitcoinBalances({
          user_address: address,
          type: balanceType,
          ...refParams.current,
        })) as any;

        setList(res);
      } else {
        const res = (await rollupApi.getRollupL2BitcoinBalances({
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
    fontSize: '16px',
  };

  const columns: ColumnProp[] = useMemo(() => {
    return [
      {
        id: 'tx',
        label: 'Token',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
          paddingLeft: '16px !important',
        },
        render(data: IBalanceBitcoin) {
          return (
            <Flex
              w={'100%'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Flex position={'relative'}>
                <Text className={s.title}>{data.symbol}</Text>
                {/* <Image
                  position={'absolute'}
                  right={'-20px'}
                  top={0}
                  w={'16px'}
                  h={'16px'}
                  borderRadius={'50%'}
                  src={data.chain?.icon}
                /> */}
              </Flex>
            </Flex>
          );
        },
      },
      {
        id: 'exc',
        label: 'Price',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: IBalanceBitcoin) {
          return (
            <Flex
              alignItems={'center'}
              width={'100%'}
              justifyContent={'space-between'}
            >
              <Text className={s.title}>-</Text>
            </Flex>
          );
        },
      },
      {
        id: 'exc',
        label: 'Amount',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: IBalanceBitcoin) {
          return (
            <Flex
              gap={6}
              alignItems={'center'}
              width={'100%'}
              justifyContent={'space-between'}
            >
              <Text className={s.title}>
                {formatCurrency(data.holding_amount, 2, 2)}
              </Text>
            </Flex>
          );
        },
      },
      {
        id: 'usd',
        label: 'USD Value',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: ITokenChain) {
          return (
            <Flex alignItems={'center'}>
              <Text className={s.title}>-</Text>
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
        p={'2px 8px'}
        borderRadius={'8px'}
      >
        {BalanceTypes.map((balance) => (
          <Box
            bg={balanceType === balance.type ? '#ffff' : 'transparent'}
            fontWeight={balanceType === balance.type ? '400' : '500'}
            onClick={() => setBalanceType(balance.type)}
            p={'6px'}
            borderRadius={'8px'}
            cursor={'pointer'}
          >
            <Text>{balance.title}</Text>
          </Box>
        ))}
      </Flex>
      <Box
        className={`${s.container} ${
          balanceType != 'ordinals_nft' ? s.shadow : ''
        }`}
        h="60vh"
      >
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
          {balanceType === 'ordinals_nft' ? (
            <>
              <Grid
                w="100%"
                gridTemplateColumns={{
                  base: 'repeat(auto-fill, 196px)',
                }}
                gap={{ base: '16px', lg: '24px' }}
              >
                {list.length > 0 &&
                  list.map((item) => {
                    return (
                      <Flex direction={'column'} className={s.shadow}>
                        <Image
                          borderTopRadius={'12px'}
                          w={'100%'}
                          aspectRatio={1}
                        />
                        <Flex direction={'column'} p={'8px'}>
                          <Text color={'#898989'}>
                            #{item.inscription_number}
                          </Text>
                          <Text>{item.symbol}</Text>
                        </Flex>
                      </Flex>
                    );
                  })}
              </Grid>
              {!isFetching && list.length === 0 && (
                <EmptyList
                  color={'#000'}
                  labelText={`There's no Oridinals NFT`}
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
              emptyIcon={<Image src={'/icons/icon-empty.svg'} />}
            />
          )}
          {isFetching && <AppLoading className={s.loading} />}
        </ScrollWrapper>
      </Box>
    </Flex>
  );
};

export default PortfolioTabBitcoin;
