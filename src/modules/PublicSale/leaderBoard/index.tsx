import Avatar from '@/components/Avatar';
import ListTable, { ColumnProp } from '@/components/ListTable';
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import { formatCurrency } from '@/utils/format';
import orderBy from 'lodash/orderBy';
import uniqBy from 'lodash/uniqBy';
import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './styles.module.scss';
import clsx from 'classnames';
import AppLoading from '@/components/AppLoading';
import { CDN_URL_ICONS } from '@/config';
import { getUrlAvatarTwitter } from '@/utils/twitter';
import cs from 'clsx';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import { leaderBoardSelector, userSelector } from '@/stores/states/user/selector';
import { setLeaderBoard } from '@/stores/states/user/reducer';
import copy from 'copy-to-clipboard';
import { shareReferralURL } from '@/utils/helpers';
import { getPublicSaleLeaderBoards } from '@/services/public-sale';
import { MAX_DECIMAL, MIN_DECIMAL } from '@/constants/constants';

const valueToClassName: any = {
  '10': 'boost_10',
  '20': 'boost_20',
  '30': 'boost_30',
};

const valueToImage: any = {
  '10': 'flash_normal.svg',
  '20': 'flash_fast.svg',
  '30': 'flash_supper.svg',
};

export const LEADER_BOARD_ID = 'LEADER_BOARD_ID';

interface IProps {
}

const LeaderBoard = (props: IProps) => {
  const { list } = useAppSelector(leaderBoardSelector);
  const [isFetching, setIsFetching] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const needReload = useAppSelector(commonSelector).needReload;
  const dispatch = useAppDispatch();

  const hasIncrementedPageRef = useRef(false);
  const refParams = useRef({
    page: 1,
    limit: 50,
  });
  const refInitial = useRef(false);

  useEffect(() => {
    fetchData(true);
  }, [needReload]);

  const removeOwnerRecord = (arr: ILeaderBoardPoint[] = []) => {
    // return remove(arr, v => !compareString(v.address, 'TESTTTTT'));
    return arr;
  };

  const fetchData = async (isNew?: boolean) => {
    try {
      const sortList = (arr: ILeaderBoardPoint[]) => {
        return uniqBy(
          orderBy(arr, (item) => Number(item.need_active || false), 'desc'),
          (item: ILeaderBoardPoint) => item.twitter_id,
        );
      };
      const { data: response, count } = await getPublicSaleLeaderBoards({
        ...refParams.current,
      });
      if (isNew) {
        const { data: response2 } = await getPublicSaleLeaderBoards({
          page: 1,
          limit: 0,
        });
        refParams.current = {
          ...refParams.current,
          page: 1,
        };
        const reArr = removeOwnerRecord(response);
        const arr = sortList(response2.concat(reArr));
        dispatch(
          setLeaderBoard({
            list: arr,
            count,
          }),
        );
      } else {
        const reArr = removeOwnerRecord(response);
        const arr = sortList([...reArr]);
        dispatch(
          setLeaderBoard({
            list: arr,
            count,
          }),
        );
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

  const user = useAppSelector(userSelector);
  const handleShareRefferal = () => {
    if (!user?.referral_code) return;
    copy(shareReferralURL(user?.referral_code || ''));
    const element = document.getElementById('copy-button');
    if (element) {
      element.textContent = 'COPIED';
      setTimeout(() => {
        element.textContent = 'GET';
      }, 2000)
    }
  }

  const labelConfig = {
    color: 'rgba(1, 1, 0, 0.7)',
    fontSize: '11px',
    letterSpacing: '-0.5px',
    borderBottom: '1px solid #FFFFFF33',
    textTransform: 'uppercase',
  };

  const columns: ColumnProp[] = useMemo(() => {
    return [
      {
        id: 'rank',
        label: <Box pl={'8px'}>RANK</Box>,
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
          color: 'black !important',
        },
        render(data: ILeaderBoardPoint) {
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
        id: 'name',
        label: 'NAME',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: ILeaderBoardPoint) {
          return (
            <Flex
              gap={6}
              alignItems={'center'}
              width={'100%'}
              justifyContent={'space-between'}
              cursor="pointer"
              onClick={() => {
                window.open(`https://twitter.com/${data?.twitter_username}`);
              }}
            >
              <Flex flex={1} gap={2} alignItems={'center'}>
                <Avatar
                  url={getUrlAvatarTwitter(
                    data?.twitter_avatar as string,
                    'normal',
                  )}
                  address={''}
                  width={40}
                  name={data?.twitter_name || data?.twitter_username || ''}
                />
                <Flex width={'100%'} gap={'4px'} direction={'column'}>
                  <p className={styles.title}>{data?.twitter_name || ''}</p>
                  {data?.need_active && (
                    <Text className={styles.subTitle}>YOU</Text>
                  )}
                </Flex>
              </Flex>
            </Flex>
          );
        },
      },
      {
        id: 'boost',
        labelConfig,
        label: (
          <Flex
            style={{
              justifyContent: 'center',
              width: '100%',
              textTransform: 'uppercase',
            }}
          >
            BOOST
          </Flex>
        ),
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: ILeaderBoardPoint) {
          return (
            <Flex justifyContent="center" alignItems="center">
              <Flex
                flexDirection="row"
                gap="4px"
                alignItems="center"
                className={clsx(styles.tagBoost)}
              >
                <img
                  style={{ width: 20 }}
                  src={`${CDN_URL_ICONS}/${
                    valueToImage?.[data?.boost] || 'flash_normal.svg'
                  }`}
                />
                <Text
                  className={cs(
                    styles.title,
                    styles.multiplier,
                    styles[valueToClassName[`${data?.boost}`]],
                    data.need_active && styles.isActiveRow,
                  )}
                >
                  {data?.boost || 0}%
                </Text>
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
              justifyContent: 'center',
              alignSelf: 'center',
              width: '100%',
              textTransform: 'uppercase',
            }}
          >
            CONTRIBUTION
          </Flex>
        ),
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: ILeaderBoardPoint) {
          return (
            <Flex
              gap={3}
              alignItems={'center'}
              width={'100%'}
              justifyContent={'center'}
            >
              <Flex direction={"column"} gap={2}>
                <Text className={''}>
                  {formatCurrency(data?.btc_balance, MIN_DECIMAL, MAX_DECIMAL)} BTC
                </Text>
                <Text className={''}>
                  {formatCurrency(data?.eth_balance, MIN_DECIMAL, MAX_DECIMAL)} ETH
                </Text>
              </Flex>
            </Flex>
          );
        },
      },
      {
        id: 'refer',
        label: (
          <Flex
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              width: '100%',
              textTransform: 'uppercase',
            }}
            gap="3px"
          >
            <p style={{ textTransform: 'uppercase' }}>ALLOCATION</p>
          </Flex>
        ),
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: ILeaderBoardPoint) {
          return (
            <Flex
              gap={3}
              alignItems={'center'}
              width={'100%'}
              justifyContent={'center'}
            >
              <Flex alignItems={'center'} gap={2}>
                <Text className={styles.title}>
                  {formatCurrency(data?.bvm_balance, MIN_DECIMAL, MAX_DECIMAL)}
                </Text>
              </Flex>
            </Flex>
          );
        },
      },
    ];
  }, [user?.referral_code]);

  // const remainingTime = () => {
  //   const now = dayjs();

  //   const tomorrow = dayjs()
  //     .add(1, 'days')
  //     .set('hour', 7)
  //     .set('minute', 0)
  //     .set('second', 0);

  //   const millisecondsRemaining = tomorrow.valueOf() - now.valueOf();

  //   return millisecondsRemaining;
  // };

  // const renderer = ({ hours, minutes, seconds, completed }: any) => {
  //   if (completed) {
  //     // Render a completed state
  //     return <></>;
  //   } else {
  //     // Render a countdown
  //     return (
  //       <span>
  //         {hours}h : {minutes}m : {seconds}s
  //       </span>
  //     );
  //   }
  // };

  const renderTimeLine = (params: { content: React.ReactNode }) => {
    return (
      <Flex gap="6px" alignItems="center" width="fit-content">
        <img
          style={{ width: 4, height: 4 }}
          src={`${CDN_URL_ICONS}/ic-dot.svg`}
          alt="ic-dot"
        />
        {params.content}
      </Flex>
    );
  };

  return (
    <Box className={styles.container} height="85dvh" id={LEADER_BOARD_ID}>
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
        wrapClassName={styles.wrapScroll}
        hideScrollBar={false}
      >
        <ListTable
          data={list}
          columns={columns}
          className={styles.tableContainer}
        />
        {isFetching && <AppLoading className={styles.loading} />}
      </ScrollWrapper>
    </Box>
  );
};

export default LeaderBoard;
