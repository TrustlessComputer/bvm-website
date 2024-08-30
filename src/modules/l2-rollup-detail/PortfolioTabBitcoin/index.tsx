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
import { formatCurrency } from '@/utils/format';
import { Box, Flex, Image, Text, Grid, Skeleton } from '@chakra-ui/react';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { L2RollupDetailContext } from '../providers/l2-rollup-detail-context';
import s from './styles.module.scss';
import EmptyList from '@/components/ListTable/EmptyList';
import BigNumber from 'bignumber.js';
import { Chart, ArcElement, Tooltip } from 'chart.js';
Chart.register([ArcElement, Tooltip]);
import { Pie } from 'react-chartjs-2';
import IframeComponent from './IframeComponent';
import AvatarDefaultToken from '@/components/AvatarDefaultToken';

const PortfolioTabBitcoin = () => {
  const { address, rollupBitcoinBalances, totalBitcoinBalanceUsd } = useContext(
    L2RollupDetailContext,
  );

  const rollupApi = new CRollupL2DetailBitcoinAPI();

  const [balanceType, setBalanceType] = useState<BalanceBitcoinType>('runes');
  const [list, setList] = useState<IBalanceBitcoin[]>([]);

  const [isFetching, setIsFetching] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const refInitial = useRef(false);
  const endOfPaging = useRef(false);
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
      if (isNew) {
        endOfPaging.current = false;
        setIsFetching(true);
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
        if (endOfPaging.current) return;
        setIsFetching(true);
        const res = (await rollupApi.getRollupL2BitcoinBalances({
          user_address: address,
          type: balanceType,
          ...refParams.current,
        })) as any;
        if (res && res?.length > 0) {
          setList([...list, ...res]);
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
              minW={'100px'}
            >
              <Flex
                position={'relative'}
                direction={'row'}
                alignItems={'center'}
                gap={'6px'}
              >
                <AvatarDefaultToken name={data.symbol} />
                <Text className={s.title}>{data.symbol}</Text>
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
              <Text className={s.title}>
                ${formatCurrency(data.token_price, 0, 6)}
              </Text>
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
                {formatCurrency(data.holding_amount, 0, 6)}
              </Text>
            </Flex>
          );
        },
      },
      {
        id: 'usd',
        label: 'Value',
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
            <Flex alignItems={'center'}>
              <Text className={s.title}>
                $
                {formatCurrency(
                  new BigNumber(data.holding_amount)
                    .multipliedBy(data.token_price)
                    .toNumber(),
                  0,
                  2,
                )}
              </Text>
            </Flex>
          );
        },
      },
    ];
  }, []);

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (yDatapoint: any) => {
            return ` $${formatCurrency(yDatapoint.raw, 2, 2, '', true)}`;
          },
        },
      },
    },
  };

  const renderPorfolio = () => {
    return (
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justifyContent={'center'}
        alignItems={'center'}
        gap={{ base: '20px', lg: '60px' }}
        mb="36px"
      >
        {rollupBitcoinBalances && (
          <Box maxW={'220px'}>
            <Pie
              options={options}
              data={{
                labels: rollupBitcoinBalances.map((item) => item.title),
                datasets: [
                  {
                    data: rollupBitcoinBalances.map((item) => item.amountUsd),
                    backgroundColor: rollupBitcoinBalances.map(
                      (item) => item.color,
                    ),
                  },
                ],
              }}
            />
          </Box>
        )}
        <Flex
          direction={'column'}
          className={s.shadow}
          p={{ base: '12px', lg: '24px' }}
          w="100%"
          gap={'24px'}
          borderRadius={'12px'}
        >
          <Flex direction={'row'} alignItems={'center'} gap={'4px'}>
            <Text fontWeight={'400'} color={'#808080'}>
              Total asset value:
            </Text>
            <Text fontWeight={'600'} fontSize={'18px'}>
              {`$${formatCurrency(totalBitcoinBalanceUsd, 2, 2)}`}
            </Text>
          </Flex>
          <Grid
            w="100%"
            gridTemplateColumns={{
              base: 'repeat(auto-fill, 160px)',
            }}
            columnGap={{ base: '16px', lg: '32px' }}
            rowGap={'20px'}
          >
            {rollupBitcoinBalances &&
              rollupBitcoinBalances
                .sort((a, b) => b.amountUsd - a.amountUsd)
                .map((detail) => {
                  const totalUsd = detail.amountUsd;
                  return (
                    <Flex direction={'row'} alignItems={'center'} gap={'12px'}>
                      <Flex direction={'column'}>
                        <Flex
                          direction={'row'}
                          alignItems={'center'}
                          gap={'4px'}
                        >
                          <Box
                            w={'12px'}
                            h={'12px'}
                            borderRadius={'50%'}
                            bg={detail.color}
                          />
                          <Text fontWeight={'400'} color={'#808080'}>
                            {detail.title}
                          </Text>
                        </Flex>
                        <Flex
                          direction={'row'}
                          alignItems={'center'}
                          gap={'8px'}
                        >
                          <Text fontWeight={'600'} fontSize={'18px'}>
                            ${formatCurrency(totalUsd, 2, 2)}
                          </Text>
                          <Text
                            color={'#808080'}
                            fontSize={'14px'}
                            fontWeight={'400'}
                          >
                            {totalUsd && totalBitcoinBalanceUsd
                              ? (
                                  (totalUsd / totalBitcoinBalanceUsd) *
                                  100
                                ).toFixed(0)
                              : 0}
                            %
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  );
                })}
          </Grid>
        </Flex>
      </Flex>
    );
  };

  return (
    <Flex direction={'column'}>
      {rollupBitcoinBalances &&
        rollupBitcoinBalances?.length > 0 &&
        renderPorfolio()}
      <Flex
        gap={'8px'}
        bg={'#F5F5F5'}
        w={'fit-content'}
        p={'2px 6px'}
        borderRadius={'8px'}
        mb={'20px'}
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
                        <IframeComponent
                          style={{
                            width: '196px',
                            aspectRatio: 1,
                            borderTopLeftRadius: '12px',
                            borderTopRightRadius: '12px',
                            background: 'lightgray',
                            objectFit: 'contain',
                            position: 'relative',
                          }}
                          src={item.image_url}
                          type={item.content_type}
                        />
                        <Flex direction={'column'} p={'8px'}>
                          <Text
                            cursor={'pointer'}
                            _hover={{ textDecoration: 'underline' }}
                            color={'#898989'}
                            onClick={() =>
                              window.open(
                                `https://ordinals.com/inscription/${
                                  item.inscription_id || item.inscription_number
                                }`,
                              )
                            }
                          >
                            #{item.inscription_number}
                          </Text>
                          <Text>
                            {item.symbol || item.inscription_id || '-'}
                          </Text>
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
