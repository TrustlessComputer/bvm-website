import Avatar from '@/components/Avatar';
import ListTable, { ColumnProp } from '@/components/ListTable';
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import { formatCurrency } from '@/utils/format';
import orderBy from 'lodash/orderBy';
import uniqBy from 'lodash/uniqBy';
import { Avatar as AvatarImg, AvatarGroup, Box, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import s from './styles.module.scss';
import clsx from 'classnames';
import AppLoading from '@/components/AppLoading';
import { getUrlAvatarTwitter } from '@/utils/twitter';
import cs from 'clsx';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import { publicSaleLeaderBoardSelector, userSelector } from '@/stores/states/user/selector';
import { clearPublicSaleLeaderBoard, setPublicSaleLeaderBoard } from '@/stores/states/user/reducer';
import { getPublicSaleDailyReward, getPublicSaleLeaderBoards, IPublicSaleDailyReward } from '@/services/public-sale';
import { MIN_DECIMAL } from '@/constants/constants';
import { tokenIcons } from '@/modules/PublicSale/depositModal/constants';
import { compareString } from '@/utils/string';
import { setPublicSaleDailyReward } from '@/stores/states/common/reducer';
import { isAddress } from '@ethersproject/address';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

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
  userName?: string;
  isSearch?: boolean;
  setSubmitting?: any;
}

const LeaderBoard = (props: IProps) => {
  const { userName, isSearch, setSubmitting } = props;
  const { list } = useAppSelector(publicSaleLeaderBoardSelector);
  const [isFetching, setIsFetching] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const needReload = useAppSelector(commonSelector).needReload;
  const dispatch = useAppDispatch();
  const [dailyReward
    , setDailyReward] = useState<IPublicSaleDailyReward | null>();

  const hasIncrementedPageRef = useRef(false);
  const refParams = useRef({
    page: 1,
    limit: 20,
    search: '',
  });

  useEffect(() => {
    refParams.current = {
      ...refParams.current,
      search: userName || '',
    };
  }, [userName]);

  const refInitial = useRef(false);

  useEffect(() => {
    fetchData(true);
    getProgramInfo();
  }, [needReload]);

  useEffect(() => {
    if (isSearch) {
      dispatch(clearPublicSaleLeaderBoard());
      fetchData(true);
    }
  }, [isSearch]);

  const getProgramInfo = async () => {
    try {
      const res = await getPublicSaleDailyReward();
      setDailyReward(res);
      dispatch(setPublicSaleDailyReward(res));
    } catch (e) {
    } finally {
      // setIsLoading(false);
    }
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
        const arr = sortList((userName ? [] : response2).concat(response));

        dispatch(
          setPublicSaleLeaderBoard({
            list: arr,
            count,
          }),
        );

        setSubmitting && setSubmitting(false);
      } else {
        const arr = sortList([...response]);
        dispatch(
          setPublicSaleLeaderBoard({
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

  const labelConfig = {
    color: 'rgba(255, 255, 255, 0.7)',
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
          color: 'white !important',
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
                {isAddress(data?.twitter_name || data?.twitter_username || "")
                  ? (
                    <Flex>
                      <Jazzicon
                        diameter={40}
                        seed={jsNumberForAddress(data?.twitter_name || data?.twitter_username || "")}
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
        id: 'point',
        label: (
          <Flex
            style={{
              // justifyContent: 'center',
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
              // justifyContent={'center'}
            >
              <Flex gap={2} alignItems={'center'}>
                <Text className={s.title}>
                  $
                  {formatCurrency(data?.usdt_value, MIN_DECIMAL, MIN_DECIMAL)}
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
                <AvatarGroup spacing={'-5px'} >
                  {(data?.coin_balances || []).map((t) => (
                    <AvatarImg
                      key={`${data.id}-${t.symbol}`}
                      src={tokenIcons[t.symbol.toLowerCase()]}
                      width={'18px'}
                      height={'18px'}
                    />
                  ))}
                </AvatarGroup>
                {/* <AvatarImg
                    width={'18px'}
                    height={'18px'}
                    src={
                      tokenIcons[
                        (data?.coin_balances || [])[0]?.symbol.toLowerCase()
                      ]
                    }
                  /> */}
              </Flex>
              {Boolean(!!data?.view_boost && Number(data?.view_boost || 0)) && (
                <Flex
                  bg={
                    'linear-gradient(90deg, rgba(0, 245, 160, 0.15) 0%, rgba(0, 217, 245, 0.15) 100%)'
                  }
                  borderRadius={'100px'}
                  p={'3px 12px'}
                  width={'fit-content'}
                >
                  <Text
                    fontSize={'14'}
                    mt="2px"
                    fontWeight={'400'}
                    className={s.boost}
                  >
                    {`+${formatCurrency(
                      data?.view_boost,
                      0,
                      0,
                      'BTC',
                      true,
                    )}% boost`}
                  </Text>
                </Flex>
              )}
            </Flex>
          );
        },
      },
      {
        id: 'refer',
        label: (
          <Flex
            style={{
              justifyContent: 'flex-end',
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
            <Flex direction={"column"} justifyContent={"flex-end"}>
              <Flex
                gap={3}
                alignItems={'center'}
                width={'100%'}
                justifyContent={'flex-end'}
              >
                <Flex alignItems={'center'} gap={2}>
                  {parseFloat(data?.view_boost || '0') > 0 &&
                    user?.twitter_id &&
                    compareString(data?.twitter_id, user?.twitter_id) && (
                      <Flex justifyContent="flex-start" alignItems="center">
                        <Flex
                          flexDirection="row"
                          gap="4px"
                          alignItems="center"
                          className={clsx(
                            s.tagBoost,
                            (Number(data?.view_boost) || 0) <= 10
                              ? s.boostNormal
                              : '',
                            data.need_active && s.isActiveRowContent,
                          )}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.3337 6.54474H8.97002L9.93972 0.726562L2.66699 9.45383H7.03063L6.06093 15.272L13.3337 6.54474Z"
                              fill="#008456"
                            />
                          </svg>

                          <Text
                            className={cs(
                              s.title,
                              // s.multiplier,
                              s[valueToClassName[`${data?.view_boost}`]],
                              data.need_active && s.isActiveRow,
                            )}
                          >
                            {data?.view_boost || 0}%
                          </Text>
                        </Flex>
                      </Flex>
                    )}

                  <Text className={s.bvm_amount}>
                    {formatCurrency(data?.bvm_balance, MIN_DECIMAL, MIN_DECIMAL)}{' '}
                    BVM
                  </Text>
                  <Text className={s.bvm_percent}>
                    (
                    {formatCurrency(
                      Number(data?.bvm_percent) * 100,
                      MIN_DECIMAL,
                      MIN_DECIMAL,
                    )}
                    %)
                  </Text>
                </Flex>
              </Flex>
              {/*{data?.need_active &&*/}
              {/*  <Flex justifyContent={"flex-end"} fontSize={"12px"} color={"#fa4e0e !important;"}> Claimed: {formatCurrency(dailyReward?.claimed, 0, 0, 'BTC', false)} BVM</Flex>*/}
              {/*}*/}
            </Flex>
          );
        },
      },
    ];
  }, [user?.referral_code, user?.twitter_id]);

  return (
    <Box className={s.container} height="65dvh" id={LEADER_BOARD_ID}>
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
        hideScrollBar={false}
      >
        <ListTable data={list} columns={columns} className={s.tableContainer} />
        {isFetching && <AppLoading className={s.loading} />}
      </ScrollWrapper>
    </Box>
  );
};

export default LeaderBoard;
