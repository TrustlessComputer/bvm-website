// import AppLoading from '@/components/AppLoading';
import Avatar from '@/components/Avatar';
import ListTable, { ColumnProp } from '@/components/ListTable';
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import { getTopLeaderBoards } from '@/services/leaderboard';
import { formatCurrency, formatName } from '@/utils/format';
import { getUrlAvatarTwitter, shortCryptoAddress } from '@/utils/helpers';
import { compareString } from '@/utils/string';
import { Box, Flex, Text } from '@chakra-ui/react';
import remove from 'lodash/remove';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './styles.module.scss';
import clsx from 'classnames';
import AppLoading from '@/components/AppLoading';
import { validateEVMAddress } from '@/utils/validate';
import { Tooltip } from '@chakra-ui/react';
import { CDN_URL_ICONS } from '@/configs';
// import Countdown from 'react-countdown';
// import dayjs from 'dayjs';

const valueToClassName: any = {
  '2.5': 'boost_25',
  '2': 'boost_2',
  '1.5': 'boost_15',
  '1': 'boost_1',
};

interface ILeaderBoard {
  addressL2?: string;
}

const LeaderBoard = (props: ILeaderBoard) => {
  const { addressL2 } = props;

  const [data, setData] = useState<ILeaderBoardPoint[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const hasIncrementedPageRef = useRef(false);
  const refParams = useRef({
    page: 1,
    limit: 100,
  });
  const refInitial = useRef(false);

  useEffect(() => {
    if (!addressL2 || validateEVMAddress(addressL2))
      fetchData(true);
  }, [addressL2]);

  const removeOwnerRecord = (arr: ILeaderBoardPoint[] = []) => {
    return remove(arr, v => !compareString(v.address, addressL2));
  };

  const fetchData = async (isNew?: boolean) => {
    try {
      const response = await getTopLeaderBoards({
        ...refParams.current,
      });
      if (isNew) {
        const response2 = await getTopLeaderBoards({
          page: 1,
          limit: 0,
          address: addressL2 as string,
        });
        refParams.current = {
          ...refParams.current,
          page: 1,
        };
        const reArr = removeOwnerRecord(response);

        setData(response2.concat(reArr));
      } else {
        const reArr = removeOwnerRecord(response);
        setData(_data => [..._data, ...reArr]);
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
    fontSize: '14px',
    letterSpacing: '-0.5px',
    borderBottom: '1px solid #FFFFFF33',
  };

  const columns: ColumnProp[] = useMemo(() => {
    return [
      {
        id: 'player',
        label: <Box pl={'8px'}>Rank</Box>,
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '16px',
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
              paddingLeft={'16px'}
            >
              <Text>{data.ranking}</Text>
            </Flex>
          );
        },
      },
      {
        id: 'player',
        label: 'User',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '16px',
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
            >
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
                      <Text className={styles.title}>
                        {formatName(data?.twitter_name as string, 50)}
                      </Text>
                      <Text className={styles.subTitle}>
                        {shortCryptoAddress(data?.address as string, 8)}
                      </Text>
                    </>
                  ) : (
                    <Text className={styles.title}>
                      {shortCryptoAddress(data?.address as string, 8)}
                    </Text>
                  )}
                </Flex>
              </Flex>
            </Flex>
          );
        },
      },
      {
        id: 'boost',
        label: (
          <Flex
            style={{
              justifyContent: 'center',
              width: '100%',
              paddingRight: '8px',
            }}
          >
            Boost
          </Flex>
        ),
        labelConfig: {
          color: '#898989',
          fontSize: '14px',
          borderBottom: '1px solid #FFFFFF33',
          textAlign: 'right',
          letterSpacing: '-0.5px',
        },
        config: {
          borderBottom: 'none',
          fontSize: '16px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: ILeaderBoardPoint) {
          return (
            <Flex justifyContent="center" alignItems="center">
              <Flex
                flexDirection={'column'}
                className={clsx(
                  styles.tagBoost,
                  styles[valueToClassName[`${data?.boost}`]],
                  valueToClassName[`${data?.boost}`]
                )}
              >
                <Text className={styles.title}>{data?.boost || 0}x</Text>
              </Flex>
            </Flex>
          );
        },
      },
      {
        id: 'content',
        label: (
          <Flex
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              width: '100%',
              gap: '4px',
            }}
          >
            <p>Content Points</p>
            <Tooltip
              minW="220px"
              bg="#000000"
              label={
                <Flex direction="column" color="#ffffff">
                  <p>Content Points are calculated based on the performance of your activities on X, including Views, Likes, Replies, and Reposts.</p>
                </Flex>
              }
            >
              <img className={styles.tooltipIcon} src={`${CDN_URL_ICONS}/ic-information-wh.svg`}/>
            </Tooltip>
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
        render(data: ILeaderBoardPoint) {
          return (
            <Flex
              gap={3}
              alignItems={'center'}
              width={'100%'}
              justifyContent={'center'}
            >
              <Flex alignItems={'center'} gap={'4px'}>
                <Box w="16px" />
                <Text className={styles.title}>
                  {formatCurrency(data?.point_spread_inday, 0, 0)}
                </Text>
                {data.need_active ? 
                  <Tooltip
                    minW="100px"
                    bg="#000000"
                    label={
                      <Flex direction="column" color="#ffffff">
                        <p>Shard: {data.shard}</p>
                        <p>View: {data.num_view}</p>
                        <p>Reply: {data.num_reply}</p>
                        <p>Retweet: {data.num_retweet}</p>
                        <p>Like: {data.num_like}</p>
                        <p>Quote: {data.num_quote}</p>
                      </Flex>
                    }
                  >
                    <img className={styles.tooltipIcon} src={`${CDN_URL_ICONS}/ic-information-bl.svg`}/>
                  </Tooltip>
                : <Box w="16px" />}
              </Flex>
            </Flex>
          );
        },
      },
      {
        id: 'swap',
        label: (
          <Flex
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              width: '100%',
            }}
          >
            Swap Points
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
                  {formatCurrency(data?.point_swap_inday, 0, 0)}
                </Text>
              </Flex>
            </Flex>
          );
        },
      },
      {
        id: 'feature',
        label: (
          <Flex
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              width: '100%',
            }}
          >
            Portfolio Points
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
                  {formatCurrency(data?.point_portfolio_inday, 0, 0)}
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
            }}
          >
            Total
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
                  {formatCurrency(data?.total_point_inday, 0, 0)}
                </Text>
              </Flex>
            </Flex>
          );
        },
      },
    ];
  }, []);


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

  return (
    <Box className={styles.container}>
      <Flex direction="column" alignItems="center" mb="32px" gap="2px">
        <Text className={styles.title1}>
          Rolling 24h leaderboard
        </Text>
        <div className={styles.indicator} />
      </Flex>

      {/* <div className={styles.banner}>
        <div className={styles.countDown}>
          <div className={styles.countDown_left}>Rolling 24h leaderboard</div>
          <div className={styles.countDown_right}>
            <div className={styles.time}>
              <Countdown
                date={Date.now() + remainingTime()}
                renderer={renderer}
              >
                <></>
              </Countdown>
            </div>
          </div>
        </div>
      </div> */}
      <Box w="100%" bg="#171820" height="76dvh" p="8px">
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
        >
          <ListTable
            data={data}
            columns={columns}
            className={styles.tableContainer}
          />
          {isFetching && <AppLoading className={styles.loading} />}
        </ScrollWrapper>
      </Box>
    </Box>
  );
};

export default LeaderBoard;
