import Avatar from '@/components/Avatar';
import ListTable, { ColumnProp } from './ListTable';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import { getTopLeaderBoards } from '@/services/whitelist';
import { formatCurrency } from '@/utils/format';
import orderBy from 'lodash/orderBy';
import uniqBy from 'lodash/uniqBy';
import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './styles.module.scss';
import clsx from 'classnames';
import { CDN_URL_ICONS } from '@/config';
import { getUrlAvatarTwitter } from '@/utils/twitter';
import cs from 'clsx';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import BigNumber from 'bignumber.js';
import SvgInset from '@/components/SvgInset';
import { leaderBoardSelector, userSelector } from '@/stores/states/user/selector';
import { setLeaderBoard } from '@/stores/states/user/reducer';
import copy from 'copy-to-clipboard';
import { shareReferralURL } from '@/utils/helpers';

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
  setIndex: (_: number) => void
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
    fontSize: '9px',
    letterSpacing: '-0.5px',
    borderBottom: '1px solid #FFFFFF33',
    textTransform: 'uppercase',
    fontWeight: 500
  };

  const _formatPoint = (point: string | number) => {
    const _point = formatCurrency(point, 0, 0)
    return (!!_point && _point !== '0') ? _point : '-';
  }

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
            TOTAL
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
                  {_formatPoint(
                    new BigNumber(data?.point || '0').toNumber(),
                  )}
                </Text>
              </Flex>
            </Flex>
          );
        },
      },
      {
        id: 'modular',
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
            <Flex flexDirection="column" alignItems="center">
              <p style={{ textTransform: 'uppercase' }}>MODULAR</p>
              <p style={{ textTransform: 'uppercase' }}>PTS</p>
            </Flex>
            <Tooltip
              minW="220px"
              bg="white"
              boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
              borderRadius="4px"
              padding="8px"
              label={
                <Flex direction="column" color="black" opacity={0.7}>
                  <p>
                    The more <strong>TIA</strong>, <strong>MATIC</strong>, and <strong>MANTA</strong> you hold, or the more <strong>ETH</strong> you stake on <strong>Eigen</strong>, the more Modular points you'll get.
                  </p>
                </Flex>
              }
            >
              <img
                className={styles.tooltipIcon}
                src={`${CDN_URL_ICONS}/info-circle.svg`}
              />
            </Tooltip>
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
          const point = new BigNumber(data?.celestia_point || 0)
            .plus(data?.eigenlayer_point || 0)
            .plus(data?.polygon_point || 0)
            .toNumber();
          return (
            <Flex
              gap={3}
              alignItems={'center'}
              width={'100%'}
              justifyContent={'center'}
            >
              <Flex alignItems={'center'} gap={'4px'}>
                <Text className={styles.title}>
                  {_formatPoint(new BigNumber(data?.celestia_point || 0)
                    .plus(data?.eigenlayer_point || 0)
                    .plus(data?.polygon_point || 0)
                    .toNumber())}
                </Text>
                {(data.need_active && !!point) ? (
                  <Tooltip
                    minW="160px"
                    bg="white"
                    boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
                    borderRadius="4px"
                    padding="8px"
                    label={
                      <Flex direction="column" color="black" opacity={0.7}>
                        <p>Eigenlayer: {_formatPoint(data.eigenlayer_point || '0')}</p>
                        <p>Celestia: {_formatPoint(data.celestia_point || '0')}</p>
                        <p>Polygon: {_formatPoint(data.polygon_point || '0')}</p>
                        <p>Manta: {_formatPoint(data.manta_point || '0')}</p>
                      </Flex>
                    }
                  >
                    <div>
                      <SvgInset
                        size={18}
                        className={styles.tooltipIconActive}
                        svgUrl={`${CDN_URL_ICONS}/info-circle.svg`}
                      />
                    </div>
                  </Tooltip>
                ) : (
                  <Box w="16px" />
                )}
              </Flex>
            </Flex>
          );
        },
      },
      {
        id: 'btc-og',
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
            <Flex flexDirection="column" alignItems="center">
              <p style={{ textTransform: 'uppercase' }}>BITCOIN</p>
              <p style={{ textTransform: 'uppercase' }}>PTS</p>
            </Flex>
            <Tooltip
              minW="220px"
              bg="white"
              boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
              borderRadius="4px"
              padding="8px"
              label={
                <Flex direction="column" color="black" opacity={0.7}>
                  <p>
                    Bitcoin OG is calculated from total gas fees paid on
                    Bitcoin.
                  </p>
                </Flex>
              }
            >
              <img
                className={styles.tooltipIcon}
                src={`${CDN_URL_ICONS}/info-circle.svg`}
              />
            </Tooltip>
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
                  {_formatPoint(data?.gas_point || '0')}
                </Text>
              </Flex>
            </Flex>
          );
        },
      },
      {
        id: 'layer-2',
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
            <p style={{ textTransform: 'uppercase' }}>L2 PTS</p>
            <Tooltip
              minW="220px"
              bg="white"
              boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
              borderRadius="4px"
              padding="8px"
              label={
                <Flex direction="column" color="black" opacity={0.7}>
                  <p>
                    ETH you stake on <strong>Blast</strong> or the more <strong>Optimism (OP)</strong>, <strong>Base (ETH)</strong>, <strong>Arbitrum (ARB)</strong> tokens you hold.
                  </p>
                </Flex>
              }
            >
              <img
                className={styles.tooltipIcon}
                src={`${CDN_URL_ICONS}/info-circle.svg`}
              />
            </Tooltip>
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
          const point = new BigNumber(data?.optimism_point || 0)
            .plus(data?.blast_point || 0)
            .plus(data?.base_point || 0)
            .plus(data?.arb_point || 0)
            .toNumber();
          return (
            <Flex
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                width: '100%',
                gap: '4px',
              }}
            >
              <Text className={styles.title}>
                {_formatPoint(point)}
              </Text>
              {data.need_active && !!point ? (
                <Tooltip
                  minW="160px"
                  bg="white"
                  boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
                  borderRadius="4px"
                  padding="8px"
                  label={
                    <Flex direction="column" color="black" opacity={0.7}>
                      <p>Optimism: {_formatPoint(data.optimism_point || '0')}</p>
                      <p>Blast: {_formatPoint(data.blast_point || '0')}</p>
                      <p>Base: {_formatPoint(data.base_point || '0')}</p>
                      <p>Arbitrum: {_formatPoint(data.arb_point || '0')}</p>
                    </Flex>
                  }
                >
                  <div>
                    <SvgInset
                      size={18}
                      className={styles.tooltipIconActive}
                      svgUrl={`${CDN_URL_ICONS}/info-circle.svg`}
                    />
                  </div>
                </Tooltip>
              ) : (
                <Box w="16px" />
              )}
            </Flex>
          );
        },
      },
      {
        id: 'game',
        label: (
          <Flex
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              width: '100%',
              gap: '4px',
              color: "#FA4E0E"
            }}
          >
            <Flex alignItems="center" flexDirection="column">
              <SvgInset svgUrl={`${CDN_URL_ICONS}/ic-fire.svg`} />
              <p style={{ textTransform: 'uppercase' }}>Gaming PTS</p>
              <p style={{ textTransform: 'uppercase' }}>3X POINT</p>
            </Flex>
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
          const point = new BigNumber(data?.game_point || 0).toNumber();
          return (
            <Flex
              gap={'4px'}
              alignItems={'center'}
              width={'100%'}
              justifyContent={'center'}
            >
              <Flex alignItems={'center'} gap={'4px'}>
                <Text className={styles.title}>
                  {data.need_active ? point ? _formatPoint(point) : '' : _formatPoint(point)}
                </Text>
                {data.need_active && !point && (
                  <button onClick={() => props.setIndex(1)} className={styles.button}>GET</button>
                )}
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
            <p style={{ textTransform: 'uppercase' }}>INVITE PTS</p>
            <Tooltip
              minW="220px"
              bg="white"
              boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
              borderRadius="4px"
              padding="8px"
              label={
                <Flex direction="column" color="black" opacity={0.7}>
                  <p>
                    Referral points are calculated based on the total number of
                    friends you refer to the allowlist.
                  </p>
                </Flex>
              }
            >
              <img
                className={styles.tooltipIcon}
                src={`${CDN_URL_ICONS}/info-circle.svg`}
              />
            </Tooltip>
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
          const point = new BigNumber(data?.refer_point || 0).toNumber()
          return (
            <Flex
              gap={3}
              alignItems={'center'}
              width={'100%'}
              justifyContent={'center'}
            >
              <Flex alignItems={'center'} gap={2}>
                <Text className={styles.title}>
                  {data.need_active ? point ? _formatPoint(point) : '' : _formatPoint(point)}
                </Text>
                {data.need_active && !point && (
                  <button id="copy-button" onClick={handleShareRefferal} className={styles.button}>GET</button>
                )}
              </Flex>
            </Flex>
          );
        },
      },
      {
        id: 'eco',
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
            <p style={{ textTransform: 'uppercase' }}>ECO PTS</p>
            <Tooltip
              minW="220px"
              bg="white"
              boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
              borderRadius="4px"
              padding="8px"
              label={
                <Flex direction="column" color="black" opacity={0.7}>
                  <p>
                    The Eco points are calculated based on all the tasks you have completed in the Experience BVM section.
                  </p>
                </Flex>
              }
            >
              <img
                className={styles.tooltipIcon}
                src={`${CDN_URL_ICONS}/info-circle.svg`}
              />
            </Tooltip>
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
          const point = new BigNumber(data?.alpha_point || 0).plus(data?.bvm_point || 0).plus(data?.naka_point || 0).toNumber()
          return (
            <Flex
              gap={'4px'}
              alignItems={'center'}
              width={'100%'}
              justifyContent={'center'}
            >
              <Flex alignItems={'center'} gap={'4px'}>
                <Text className={styles.title}>
                  {data.need_active ? point ? _formatPoint(point) : '' : _formatPoint(point)}
                </Text>
                {data.need_active && !point && (
                  <button onClick={() => props.setIndex(1)} className={styles.button}>GET</button>
                )}
                {data.need_active && !!point && (
                  <Tooltip
                    minW="180px"
                    bg="white"
                    boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
                    borderRadius="4px"
                    padding="8px"
                    label={
                      <Flex direction="column" color="black" opacity={0.7}>
                        <p>Naka: {_formatPoint(data.naka_point || '0')}</p>
                        <p>BVM: {_formatPoint(data.bvm_point || '0')}</p>
                        <p>SocialFi: {_formatPoint(data.alpha_point || '0')}</p>
                      </Flex>
                    }
                  >
                    <div>
                      <SvgInset
                        size={18}
                        className={styles.tooltipIconActive}
                        svgUrl={`${CDN_URL_ICONS}/info-circle.svg`}
                      />
                    </div>
                  </Tooltip>
                )}
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
            <p style={{ textTransform: 'uppercase' }}>TWEET PTS</p>
            <Tooltip
              minW="220px"
              bg="white"
              boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
              borderRadius="4px"
              padding="8px"
              label={
                <Flex direction="column" color="black" opacity={0.7}>
                  <p>
                    Content Points are calculated based on the performance of
                    your posts on X, including Views. Note: To be qualified, you
                    must tag: <br />
                    <strong>@BVMnetwork</strong>
                  </p>
                </Flex>
              }
            >
              <img
                className={styles.tooltipIcon}
                src={`${CDN_URL_ICONS}/info-circle.svg`}
              />
            </Tooltip>
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
              <Flex alignItems={'center'} gap={'4px'}>
                <Text className={styles.title}>
                  {_formatPoint(data?.content_point)}
                </Text>
                {data.need_active ? (
                  <Tooltip
                    minW="180px"
                    bg="white"
                    boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
                    borderRadius="4px"
                    padding="8px"
                    label={
                      <Flex direction="column" color="black" opacity={0.7}>
                        {/*<p>Post: {data.num_post || '0'}</p>*/}
                        <p>View: {data.num_view || '0'}</p>
                        {/*<p>Like: {data.num_like || '0'}</p>*/}
                        {/*<p>Repost: {data.num_retweet || '0'}</p>*/}
                        {/*<p>Quote: {data.num_quote || '0'}</p>*/}
                      </Flex>
                    }
                  >
                    <div>
                      <SvgInset
                        size={18}
                        className={styles.tooltipIconActive}
                        svgUrl={`${CDN_URL_ICONS}/info-circle.svg`}
                      />
                    </div>
                  </Tooltip>
                ) : (
                  <Box w="16px" />
                )}
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
    <Box className={styles.container} id={LEADER_BOARD_ID}>
      {/*<ScrollWrapper*/}
      {/*  onFetch={() => {*/}
      {/*    refParams.current = {*/}
      {/*      ...refParams.current,*/}
      {/*      page: refParams.current.page + 1,*/}
      {/*    };*/}
      {/*    hasIncrementedPageRef.current = true;*/}
      {/*    fetchData();*/}
      {/*  }}*/}
      {/*  isFetching={refreshing}*/}
      {/*  hasIncrementedPageRef={hasIncrementedPageRef}*/}
      {/*  onFetchNewData={onRefresh}*/}
      {/*  wrapClassName={styles.wrapScroll}*/}
      {/*  hideScrollBar={false}*/}
      {/*>*/}
      {/*  <ListTable*/}
      {/*    data={list}*/}
      {/*    columns={columns}*/}
      {/*    className={styles.tableContainer}*/}
      {/*  />*/}
      {/*  {isFetching && <AppLoading className={styles.loading} />}*/}
      {/*</ScrollWrapper>*/}
      {/*<InfiniteScroll*/}
      {/*  dataLength={columns.length}*/}
      {/*  next={() => {*/}
      {/*    refParams.current = {*/}
      {/*      ...refParams.current,*/}
      {/*      page: refParams.current.page + 1,*/}
      {/*    };*/}
      {/*    hasIncrementedPageRef.current = true;*/}
      {/*    fetchData();*/}
      {/*  }}*/}
      {/*  hasMore={true}*/}
      {/*  className={styles.wrapScroll}*/}
      {/*  loader={<h4>Loading more...</h4>}*/}
      {/*>*/}
        <ListTable
          data={list}
          columns={columns}
          className={styles.tableContainer}
          hasIncrementedPageRef={hasIncrementedPageRef}
          onFetch={() => {
            refParams.current = {
              ...refParams.current,
              page: refParams.current.page + 1,
            };
            hasIncrementedPageRef.current = true;
            fetchData();
          }}
        />
      {/*</InfiniteScroll>*/}
    </Box>
  );
};

export default LeaderBoard;
