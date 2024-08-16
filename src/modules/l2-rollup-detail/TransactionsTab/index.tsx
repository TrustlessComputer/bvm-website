import AppLoading from '@/components/AppLoading';
import Avatar from '@/components/Avatar';
import ListTable, { ColumnProp } from '@/components/ListTable';
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper';
import { MIN_DECIMAL } from '@/constants/constants';
import { formatCurrency } from '@/utils/format';
import { getUrlAvatarTwitter } from '@/utils/helpers';
import { Box, Flex, Text, Image } from '@chakra-ui/react';
import { isAddress } from '@ethersproject/address';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import s from './styles.module.scss';

interface IProps {}

const TransactionsTab = (props: IProps) => {
  const [list, setList] = useState([]);
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

  useEffect(() => {
    fetchData(true);
  }, []);

  const fetchData = async (isNew?: boolean) => {
    try {
      if (isNew) {
      } else {
      }
    } catch (error) {
    } finally {
      setIsFetching(false);
      hasIncrementedPageRef.current = false;
      refInitial.current = true;
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
        label: 'Tx',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
          paddingLeft: '16px !important',
        },
        render(data: any) {
          return (
            <Flex
              gap={6}
              alignItems={'center'}
              width={'100%'}
              justifyContent={'space-between'}
              paddingLeft={'16px'}
            >
              <Text>{data.ranking}</Text>
            </Flex>
          );
        },
      },
      {
        id: 'exc',
        label: 'Excute',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: any) {
          const _isAddress = isAddress(
            data?.twitter_name || data?.twitter_username || '',
          );
          return (
            <Flex
              gap={6}
              alignItems={'center'}
              width={'100%'}
              justifyContent={'space-between'}
              cursor="pointer"
              onClick={() => {
                if (_isAddress) {
                  window.open(
                    `https://explorer.nakachain.xyz/address/${data?.address}`,
                  );
                }
                window.open(`https://twitter.com/${data?.twitter_username}`);
              }}
            >
              <Flex flex={1} gap={2} alignItems={'center'}>
                {_isAddress ? (
                  <Flex>
                    <Jazzicon
                      diameter={40}
                      seed={jsNumberForAddress(
                        data?.twitter_name || data?.twitter_username || '',
                      )}
                    />
                  </Flex>
                ) : (
                  <Avatar
                    url={getUrlAvatarTwitter(
                      data?.twitter_avatar as string,
                      'normal',
                    )}
                    address={''}
                    width={40}
                    name={data?.twitter_name || data?.twitter_username || ''}
                  />
                )}

                <Flex width={'100%'} gap={'4px'} direction={'column'}>
                  <p className={s.title}>{data?.twitter_name || ''}</p>
                  {data?.need_active && <Text className={s.subTitle}>YOU</Text>}
                </Flex>
              </Flex>
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
        render(data: any) {
          return (
            <Flex gap={3} alignItems={'center'} width={'100%'}>
              <Flex gap={2} alignItems={'center'}>
                <Text className={s.title}>
                  ${formatCurrency(data?.usdt_value, MIN_DECIMAL, MIN_DECIMAL)}
                </Text>
                <svg
                  width="1"
                  height="16"
                  viewBox="0 0 1 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="0.5"
                    y1="16"
                    x2="0.499999"
                    y2="2.18557e-08"
                    stroke="#ECECEC"
                  />
                </svg>
              </Flex>
            </Flex>
          );
        },
      },
      {
        id: 'fee',
        label: 'Fee',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: any) {
          return (
            <Flex direction={'column'} justifyContent={'flex-end'}>
              <Flex
                gap={3}
                alignItems={'center'}
                width={'100%'}
                justifyContent={'flex-end'}
              >
                <Flex alignItems={'center'} gap={2}></Flex>
              </Flex>
            </Flex>
          );
        },
      },
    ];
  }, []);

  return (
    <Box className={s.container} maxH="65dvh">
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
      >
        <ListTable
          data={list}
          columns={columns}
          className={s.tableContainer}
          showEmpty
          emptyLabel="No transactions found."
          emptyIcon={<Image src={'/icons/icon-empty.svg'} />}
        />
        {isFetching && <AppLoading className={s.loading} />}
      </ScrollWrapper>
    </Box>
  );
};

export default TransactionsTab;
