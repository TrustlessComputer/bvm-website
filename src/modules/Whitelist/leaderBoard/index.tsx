import Avatar from '@/components/Avatar';
import ListTable, { ColumnProp } from '@/components/ListTable';
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import { getTopLeaderBoards } from '@/services/whitelist';
import { formatCurrency, formatName } from '@/utils/format';
import orderBy from 'lodash/orderBy';
import uniqBy from 'lodash/uniqBy';
import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './styles.module.scss';
import clsx from 'classnames';
import AppLoading from '@/components/AppLoading';
import { CDN_URL_ICONS } from '@/config';
import { getUrlAvatarTwitter } from '@/utils/twitter';
import cs from 'clsx';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import BigNumber from 'bignumber.js';
import SvgInset from '@/components/SvgInset';

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

const LeaderBoard = () => {
  const [data, setData] = useState<ILeaderBoardPoint[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const needReload = useAppSelector(commonSelector).needReload;

  const hasIncrementedPageRef = useRef(false);
  const refParams = useRef({
    page: 1,
    limit: 1000,
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
        return uniqBy(orderBy(arr, item => Number(item.need_active || false), 'desc'), (item: ILeaderBoardPoint) => item.twitter_id)
      }
      const { data: response, count } = await getTopLeaderBoards({
        ...refParams.current,
      });
      if (isNew) {
        const { data: response2 } = await getTopLeaderBoards({
          page: 1,
          limit: 0,
        });
        refParams.current = {
          ...refParams.current,
          page: 1,
        };
        const reArr = removeOwnerRecord(response);

        setData(sortList(response2.concat(reArr)));
      } else {
        const reArr = removeOwnerRecord(response);
        setData(_data => sortList([..._data, ...reArr]));
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
    color: 'rgba(1, 1, 0, 0.7)',
    fontSize: '12px',
    letterSpacing: '-0.5px',
    borderBottom: '1px solid #FFFFFF33',
    textTransform: 'uppercase'
  };


  const columns: ColumnProp[] = useMemo(() => {
    return [
      {
        id: 'player',
        label: <Box pl={'8px'}>RANK</Box>,
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '16px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
          color: 'black !important'
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
              <Text >{data.ranking}</Text>
            </Flex>
          );
        },
      },
      {
        id: 'player',
        label: 'X USER',
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
              cursor="pointer"
              onClick={() => {
                window.open(`https://twitter.com/${data?.twitter_username}`)
              }}
            >
              <Flex flex={1} gap={2} alignItems={'center'}>
                <Avatar
                  url={getUrlAvatarTwitter(
                    data?.twitter_avatar as string,
                    'normal'
                  )}
                  address={''}
                  width={40}
                  name={data?.twitter_name || data?.twitter_username || ''}
                />
                <Flex width={'100%'} gap={'4px'} direction={'column'}>
                    <Text className={styles.title}>
                      {formatName(data?.twitter_name as string, 50)}
                    </Text>
                    {data?.need_active && (
                      <Text className={styles.subTitle}>
                        YOU
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
        labelConfig,
        label: (
          <Flex
            style={{
              justifyContent: 'center',
              width: '100%',
              paddingRight: '8px',
              textTransform: 'uppercase'
            }}
          >
            Multiplier
          </Flex>
        ),
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
                flexDirection="row"
                gap="4px"
                alignItems="center"
                className={clsx(
                  styles.tagBoost,
                )}
              >
                <img style={{ width: 20 }} src={`${CDN_URL_ICONS}/${valueToImage?.[data?.boost] || 'flash_normal.svg'}`}/>
                <Text className={cs(
                  styles.title,
                  styles.multiplier,
                  styles[valueToClassName[`${data?.boost}`]],
                  data.need_active && styles.isActiveRow
                )}>{data?.boost || 0}%</Text>
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
            <p style={{ textTransform:'uppercase' }}>Content Points</p>
            <Tooltip
              minW="220px"
              bg="white"
              boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
              borderRadius="4px"
              padding="8px"
              label={
                <Flex direction="column" color="black" opacity={0.7}>
                  <p>Content Points are calculated based on the performance of your posts on X, including Views, Likes, Reposts, and Quotes.
                    Note: To be qualified, you must tag: <br/><strong>@bvmnetwork</strong></p>
                </Flex>
              }
            >
              <img className={styles.tooltipIcon} src={`${CDN_URL_ICONS}/info-circle.svg`}/>
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
                <Text className={styles.title}>
                  {formatCurrency(data?.content_point, 0, 0)}
                </Text>
                {data.need_active ?
                  <Tooltip
                    minW="180px"
                    bg="white"
                    boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
                    borderRadius="4px"
                    padding="8px"
                    label={
                      <Flex direction="column" color="black" opacity={0.7}>
                        <p>Post: {data.num_post || '0'}</p>
                        <p>View: {data.num_view || '0'}</p>
                        <p>Like: {data.num_like || '0'}</p>
                        <p>Repost: {data.num_retweet || '0'}</p>
                        <p>Quote: {data.num_quote || '0'}</p>
                      </Flex>
                    }
                  >
                    <div>
                      <SvgInset size={18} className={styles.tooltipIconActive} svgUrl={`${CDN_URL_ICONS}/info-circle.svg`}/>
                    </div>
                  </Tooltip>
                : <Box w="16px" />}
              </Flex>
            </Flex>
          );
        },
      },
      // {
      //   id: 'swap',
      //   label: (
      //     <Flex style={{ textTransform: 'uppercase' }}>
      //       BVM OG
      //     </Flex>
      //   ),
      //   labelConfig,
      //   config: {
      //     borderBottom: 'none',
      //     fontSize: '16px',
      //     fontWeight: 500,
      //     verticalAlign: 'middle',
      //     letterSpacing: '-0.5px',
      //     textTransform: 'uppercase'
      //   },
      //   render(data: ILeaderBoardPoint) {
      //     return (
      //       <Flex
      //         gap={3}
      //         alignItems={'center'}
      //         width={'100%'}
      //         justifyContent={'center'}
      //       >
      //         <Flex alignItems={'center'} gap={2}>
      //           <Text className={styles.title}>
      //             {formatCurrency(data?.point_swap_inday, 0, 0)}
      //           </Text>
      //         </Flex>
      //       </Flex>
      //     );
      //   },
      // },
      {
        id: 'feature',
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
            <p style={{ textTransform:'uppercase' }}>Gas Spent</p>
            <Tooltip
              minW="220px"
              bg="white"
              boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
              borderRadius="4px"
              padding="8px"
              label={
                <Flex direction="column" color="black" opacity={0.7}>
                  <p>Gas spent is calculated from total gas fees paid on Bitcoin.</p>
                </Flex>
              }
            >
              <img className={styles.tooltipIcon} src={`${CDN_URL_ICONS}/info-circle.svg`}/>
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
              <Flex alignItems={'center'} gap={2}>
                <Text className={styles.title}>
                  {formatCurrency(data?.gas_point, 0, 0)}
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
            <p style={{ textTransform:'uppercase' }}>REFER</p>
            <Tooltip
              minW="220px"
              bg="white"
              boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
              borderRadius="4px"
              padding="8px"
              label={
                <Flex direction="column" color="black" opacity={0.7}>
                  <p>Referral points are calculated based on the total number of friends you refer to the allowlist.</p>
                </Flex>
              }
            >
              <img className={styles.tooltipIcon} src={`${CDN_URL_ICONS}/info-circle.svg`}/>
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
              <Flex alignItems={'center'} gap={2}>
                <Text className={styles.title}>
                  {formatCurrency(data?.refer_point, 0, 0)}
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
              textTransform: 'uppercase'
            }}
          >
            Total points
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
                  {formatCurrency(new BigNumber(data?.point || '0').toNumber(), 0, 0)}
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

  const renderTimeLine = (params: { content: React.ReactNode }) => {
    return (
      <Flex gap="6px" alignItems="center" width="fit-content">
        <img style={{ width: 4, height: 4 }} src={`${CDN_URL_ICONS}/ic-dot.svg`} alt="ic-dot"/>
        {params.content}
      </Flex>
    )
  }

  return (
    <Box className={styles.container}>
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
      {/*<Box className={styles.timeLine}>
        <Box>
          {renderTimeLine({
            content: <p>Public sale starting soon</p>
          })}
          {count !== undefined && (
            renderTimeLine({
              content: <p><span>{formatCurrency(count, 0)}</span> people are on the allowlist</p>
            })
          )}

        </Box>
      </Box>*/}
      <Box w="100%" bg="rgba(255, 255, 255, 0.30)" p="8px">
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
