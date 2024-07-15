import AppLoading from '@/components/AppLoading';
import Avatar from '@/components/Avatar';
import ListTable, { ColumnProp } from '@/components/ListTable';
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper';
import { formatCurrency, formatName } from '@/utils/format';
import { getUrlAvatarTwitter } from '@/utils/helpers';
import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import s from './styles.module.scss';
import { MIN_DECIMAL } from '@/constants/constants';
import CReferralAPI from 'src/services/api/referrals';
import { shortCryptoAddress } from '@/utils/address';
import { useAuthenticatedWallet } from '@/Providers/AuthenticatedProvider/hooks';

const getReferStatus = (key: string) => {
  switch (key) {
    case 'new': return 'New';
    case 'completed': return 'Completed';
    default: return '';
  }
}

const ListReferred = () => {
  const wallet = useAuthenticatedWallet();
  const addressL2 = wallet?.address;
  const userApi = useRef(new CReferralAPI()).current;

  const [data, setData] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const hasIncrementedPageRef = useRef(false);
  const refParams = useRef({
    page: 1,
    limit: 100,
  });
  const refInitial = useRef(false);

  useEffect(() => {
    fetchData();
  }, [addressL2])

  const fetchData = async () => {
    if (!addressL2) return;
    try {
      const response = await userApi.getListReferred();
      setData(response?.rows);
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
      await fetchData();
    } catch (error) {
      console.log('refreshing err', error);
    } finally {
      setRefreshing(false);
    }
  };

  const labelConfig = {
    color: '#898989',
    fontSize: '14px',
    letterSpacing: '-0.5px',
    borderBottom: '1px solid #FFFFFF33',
  };

  const columns: ColumnProp[] = useMemo(() => {
    return [
      {
        id: 'player',
        label: 'Friend',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '16px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: any) {
          return (
            <Flex flex={1} gap={2} alignItems={'center'}>
              <Avatar
                url={getUrlAvatarTwitter(
                  data?.twitter_avatar as string,
                  'normal'
                )}
                address={data?.address}
                width={36}
                name={data?.twitter_username}
              />
              <Flex width={'100%'} gap={'0px'} direction={'column'}>
                {data?.twitter_name ? (
                  <>
                    <Text className={s.title}>
                      {formatName(data?.twitter_name as string, 50)}
                    </Text>
                    <Text className={s.subTitle}>
                      {shortCryptoAddress(data?.address as string, 8)}
                    </Text>
                  </>
                ) : (
                  <Text className={s.title} >
                    {shortCryptoAddress(data?.address as string, 12)}
                  </Text>
                )}
              </Flex>
            </Flex>
          );
        },
      },
      {
        id: 'point',
        label: (
          <Flex
            style={{
              justifyContent: 'flex-end',
              alignSelf: 'flex-end',
              width: '100%',
            }}
          >
            Trading Volume
          </Flex>
        ),
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '16px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: any) {
          return (
            <Flex
              gap={3}
              alignItems={'center'}
              width={'100%'}
              justifyContent={'flex-end'}
            >
              <Flex alignItems={'flex-end'} gap={2}>
                <Text className={s.title}>
                  {formatCurrency(data?.trading_volume, MIN_DECIMAL, MIN_DECIMAL, 'BTC', true)} USD
                </Text>
              </Flex>
            </Flex>
          );
        },
      },
    {
        id: 'status',
        label: (
          <Flex
            style={{
              justifyContent: 'flex-end',
              alignSelf: 'flex-end',
              width: '100%',
            }}
          >
            Status
          </Flex>
        ),
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '16px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: any) {
          return (
            <Flex
              gap={3}
              alignItems={'center'}
              width={'100%'}
              justifyContent={'flex-end'}
            >
              <Flex alignItems={'flex-end'} gap={2}>
                <Text className={s.title}>
                  {getReferStatus(data.refer_status as string)}
                </Text>
              </Flex>
            </Flex>
          );
        },
      },
    ];
  }, []);

  return (
    <div className={s.container}>
      <div className={s.content}>
        <p className={s.titleInvite}>Invited friends</p>

        <Box w="100%" height="42dvh">
          <ScrollWrapper
            onFetch={() => {
              refParams.current = {
                ...refParams.current,
                page: refParams.current.page + 1,
              };
              hasIncrementedPageRef.current = true;
              // fetchData();
            }}
            isFetching={refreshing}
            hasIncrementedPageRef={hasIncrementedPageRef}
            onFetchNewData={onRefresh}
            wrapClassName={s.wrapScroll}
          >
            <ListTable
              data={data}
              columns={columns}
              className={s.tableContainer}
            />
            {isFetching && <AppLoading className={s.loading} />}
          </ScrollWrapper>
        </Box>
      </div>
    </div>
  );
};

export default ListReferred;
