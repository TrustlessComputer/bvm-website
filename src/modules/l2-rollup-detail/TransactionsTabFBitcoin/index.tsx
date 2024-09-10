import AppLoading from '@/components/AppLoading';
import EmptyList from '@/components/ListTable/EmptyList';
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper';
import { HEART_BEAT } from '@/constants/route-path';
import CRollupL2DetailBitcoinAPI from '@/services/api/dapp/rollupl2-detail-bitcoin';
import { IFBitcoinTransaction } from '@/services/api/dapp/rollupl2-detail-bitcoin/interface';
import { shortCryptoAddress } from '@/utils/address';
import { formatCurrency } from '@/utils/format';
import { formatTimeAgo } from '@/utils/time';
import { Box, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import {
  L2RollupExplorerContext,
  L2RollupExplorerProvider,
} from '../providers/l2-rollup-explorer-context';
import s from './styles.module.scss';

interface IProps {}

const TransactionsTabFBitcoin = (props: IProps) => {
  const { address, fbBlockCount } = useContext(L2RollupExplorerContext);

  const router = useRouter();

  const rollupApi = new CRollupL2DetailBitcoinAPI();

  const [list, setList] = useState<IFBitcoinTransaction[]>([]);

  const [isFetching, setIsFetching] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const refInitial = useRef(false);
  const endOfPaging = useRef(false);
  const hasIncrementedPageRef = useRef(false);
  const refParams = useRef({
    after_hash: '',
  });

  useEffect(() => {
    fetchData(true);
  }, [address]);

  const fetchData = async (isNew?: boolean) => {
    try {
      if (isNew) {
        setIsFetching(true);
        endOfPaging.current = false;

        setList([]);
        refParams.current = {
          ...refParams.current,
          after_hash: '',
        };
        const res = (await rollupApi.getRollupL2FractalBitcoinTokenTransactions(
          {
            user_address: address,
            type: 'fractal',
            ...refParams.current,
          },
        )) as any;

        setList(res);
      } else {
        if (endOfPaging.current) return;
        setIsFetching(true);
        const res = (await rollupApi.getRollupL2FractalBitcoinTokenTransactions(
          {
            user_address: address,
            type: 'fractal',
            ...refParams.current,
          },
        )) as any;
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
        after_hash: '',
      };
      hasIncrementedPageRef.current = true;
      await fetchData(true);
    } catch (error) {
      console.log('refreshing err', error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <Flex direction={'column'}>
      <Box
        className={`${s.container} ${list.length > 0 ? '' : s.shadow}`}
        h="60vh"
      >
        <ScrollWrapper
          onFetch={() => {
            if (list.length >= 10) {
              refParams.current = {
                ...refParams.current,
                after_hash: list[list.length - 1].txid,
              };
              hasIncrementedPageRef.current = true;
              fetchData();
            }
          }}
          isFetching={refreshing}
          hasIncrementedPageRef={hasIncrementedPageRef}
          onFetchNewData={onRefresh}
          wrapClassName={s.wrapScroll}
          dependData={list}
        >
          <Flex direction={'column'} gap={'20px'}>
            {list.length > 0 &&
              list.map((item) => {
                return (
                  <Flex className={s.item} direction={'column'}>
                    <Flex
                      w={'100%'}
                      justifyContent={'space-between'}
                      bg={'#F9F9F9'}
                      p={'12px'}
                    >
                      <Flex
                        direction={'column'}
                        cursor="pointer"
                        _hover={{
                          textDecoration: 'underline',
                        }}
                        as={'a'}
                        href={`${HEART_BEAT}/tx/${item.txid}`}
                      >
                        <Flex
                          direction={'row'}
                          alignItems={'center'}
                          gap={'4px'}
                        >
                          <Text className={s.title} fontWeight={'600'}>
                            {item.txid}
                          </Text>
                        </Flex>
                      </Flex>
                      <Text className={s.title}>
                        {dayjs
                          .unix(Number(item.status.block_time))
                          .format('HH:mm:ss MM/DD/YYYY')}
                        <Text as={'span'}>
                          {' '}
                          ({formatTimeAgo(item.status.block_time)})
                        </Text>
                      </Text>
                    </Flex>

                    <SimpleGrid
                      columns={2}
                      w={'100%'}
                      gap={'24px'}
                      borderBottom={'1px solid #f5f5f5'}
                      p={'12px'}
                    >
                      <Flex flexDirection={'column'}>
                        {item.vin.map((item) => {
                          return (
                            <Flex
                              py={'12px'}
                              borderBottom={'1px solid #f5f5f5'}
                              direction={'row'}
                              justifyContent={'space-between'}
                            >
                              <Text
                                cursor="pointer"
                                _hover={{
                                  textDecoration: 'underline',
                                }}
                                as={'a'}
                                href={
                                  !item.is_coinbase
                                    ? `${HEART_BEAT}/address/${item.prevout.scriptpubkey_address}`
                                    : ''
                                }
                              >
                                {item.is_coinbase
                                  ? 'Coinbase'
                                  : shortCryptoAddress(
                                      item.prevout.scriptpubkey_address,
                                      20,
                                    )}
                              </Text>
                              {item.prevout?.value && (
                                <Text>
                                  {formatCurrency(
                                    new BigNumber(
                                      item.prevout.value || '0',
                                    ).dividedBy(1e8),
                                    0,
                                    6,
                                  )}{' '}
                                  <span style={{ color: 'gray' }}>FB</span>
                                </Text>
                              )}
                            </Flex>
                          );
                        })}
                      </Flex>
                      <Flex
                        flexDirection={'column'}
                        borderBottom={'1px solid #f5f5f5'}
                      >
                        {item.vout.map((item) => {
                          return (
                            <Flex
                              py={'12px'}
                              borderBottom={'1px solid #f5f5f5'}
                              direction={'row'}
                              justifyContent={'space-between'}
                            >
                              <Text
                                cursor="pointer"
                                _hover={{
                                  textDecoration: 'underline',
                                }}
                                as={'a'}
                                href={
                                  !!item.scriptpubkey_address
                                    ? `${HEART_BEAT}/address/${item.scriptpubkey_address}`
                                    : ''
                                }
                              >
                                {item.scriptpubkey_address
                                  ? shortCryptoAddress(
                                      item.scriptpubkey_address,
                                      20,
                                    )
                                  : item.scriptpubkey_type.toUpperCase()}
                              </Text>
                              {item?.value && (
                                <Text>
                                  {formatCurrency(
                                    new BigNumber(item.value || '0').dividedBy(
                                      1e8,
                                    ),
                                    0,
                                    6,
                                  )}{' '}
                                  <span style={{ color: 'gray' }}>FB</span>
                                </Text>
                              )}
                            </Flex>
                          );
                        })}
                      </Flex>
                    </SimpleGrid>
                    <Flex
                      p={'12px'}
                      borderBottom={'1px solid #f5f5f5'}
                      direction={'row'}
                      justifyContent={'space-between'}
                    >
                      <Flex direction={'row'} gap={'8px'}>
                        <Text>
                          Block:{' '}
                          <span>{item?.status?.block_height || '-'}</span>
                        </Text>
                        <Text>|</Text>
                        <Text>
                          Txn fee:{' '}
                          <span>{item?.fee ? item?.fee + ' sats' : '-'}</span>
                        </Text>
                      </Flex>
                      <Flex
                        bg={item.status.confirmed ? 'green' : 'yellow'}
                        p={'4px 8px'}
                        borderRadius={'4px'}
                        color={'#fff'}
                      >
                        {item.status.confirmed
                          ? `${formatCurrency(
                              fbBlockCount - Number(item.status.block_height),
                              0,
                              2,
                            )} confirmed`
                          : 'Pending'}
                      </Flex>
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
          {isFetching && <AppLoading className={s.loading} />}
        </ScrollWrapper>
      </Box>
    </Flex>
  );
};

const TransactionsTabFBitcoinModule = () => {
  return (
    <L2RollupExplorerProvider>
      <TransactionsTabFBitcoin />
    </L2RollupExplorerProvider>
  );
};

export default TransactionsTabFBitcoinModule;
