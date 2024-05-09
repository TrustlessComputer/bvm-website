import AppLoading from '@/components/AppLoading';
import Avatar from '@/components/Avatar';
import ListTable, { ColumnProp } from '@/components/ListTable';
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper';
import { MIN_DECIMAL } from '@/constants/constants';
import { formatCurrency } from '@/utils/format';
import {
  AvatarGroup,
  Avatar as AvatarImg,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import { isAddress } from '@ethersproject/address';
import orderBy from 'lodash/orderBy';
import uniqBy from 'lodash/uniqBy';
import { useEffect, useMemo, useRef, useState } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import s from './styles.module.scss';

import { useAuthenticatedWallet } from '@/Providers/AuthenticatedProvider/hooks';
import { ILeaderBoardEAI } from '@/modules/Launchpad/services/laupEAI-payment.interfaces';
import CPaymentEAIAPI from '@/modules/Launchpad/services/payment.eai';
import {
  clearPublicSaleLeaderBoard,
  setPublicSaleLeaderBoard,
} from '@/modules/Launchpad/store/lpEAIPayment/reducer';
import { publicSaleLeaderBoardSelector } from '@/modules/Launchpad/store/lpEAIPayment/selector';
import { tokenIcons } from '@/modules/PublicSale/depositModal/constants';
import { commonSelector } from '@/stores/states/common/selector';
import { userSelector } from '@/stores/states/user/selector';
import { isAmount } from '@/utils/number';
import { getUrlAvatarTwitter } from '@/utils/twitter';
import BigNumberJS from 'bignumber.js';
import { useDispatch, useSelector } from 'react-redux';

// const valueToClassName: any = {
//   '10': 'boost_10',
//   '20': 'boost_20',
//   '30': 'boost_30',
// };

export const LEADER_BOARD_ID = 'LEADER_BOARD_ID';

interface IProps {
  userName?: string;
  isSearch?: boolean;
  setSubmitting?: any;
  isEnd?: boolean;
}

const LeaderBoard = (props: IProps) => {
  const cpaymentEAIAPI = useRef(new CPaymentEAIAPI()).current;

  const { userName, isSearch, setSubmitting, isEnd } = props;
  const { list } = useSelector(publicSaleLeaderBoardSelector);
  const [isFetching, setIsFetching] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const needReload = useSelector(commonSelector).needReload;
  const dispatch = useDispatch();
  const wallet = useAuthenticatedWallet();

  const address = wallet?.address;

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
      // const res = await getPublicSaleDailyReward();
      // setDailyReward(res);
      // dispatch(setPublicSaleDailyReward(res));
    } catch (e) {
      // TODO
    } finally {
      // setIsLoading(false);
    }
  };

  const fetchData = async (isNew?: boolean) => {
    try {
      const sortList = (arr: ILeaderBoardEAI[]) => {
        return uniqBy(
          orderBy(arr, (item) => Number(item.need_active || false), 'desc'),
          (item: ILeaderBoardEAI) => item.id,
        );
      };
      const { data: response, count } =
        await cpaymentEAIAPI.getPublicSaleLeaderBoards({
          ...refParams.current,
        });
      if (isNew) {
        const { data: response2 } =
          await cpaymentEAIAPI.getPublicSaleLeaderBoards({
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

  const user = useSelector(userSelector);

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
        render(data: ILeaderBoardEAI) {
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
        render(data: ILeaderBoardEAI) {
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
        render(data: ILeaderBoardEAI) {
          return (
            <Flex
              gap={3}
              alignItems={'center'}
              width={'100%'}
              // justifyContent={'center'}
            >
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
                <AvatarGroup spacing={'-5px'}>
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
              {Boolean(
                !!data?.view_boost &&
                  !!data?.need_active &&
                  Number(data?.view_boost || 0),
              ) && (
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
        render(data: ILeaderBoardEAI) {
          return (
            <Flex direction={'column'} justifyContent={'flex-end'}>
              <Flex
                gap={3}
                alignItems={'center'}
                width={'100%'}
                justifyContent={'flex-end'}
              >
                <Flex alignItems={'center'} gap={2}>
                  {!isEnd && (
                    <Flex alignItems="center" gap="6px">
                      <Text
                        className={`${s.bvm_amount} ${
                          data.need_active && s.active
                        }`}
                      >
                        <span>
                          {formatCurrency(
                            data?.token_balance,
                            MIN_DECIMAL,
                            MIN_DECIMAL,
                          )}{' '}
                          EAI
                        </span>
                      </Text>
                      <Text className={s.bvm_percent}>
                        (
                        {formatCurrency(
                          Number(data?.token_percent) * 100,
                          MIN_DECIMAL,
                          MIN_DECIMAL,
                        )}
                        %)
                      </Text>
                    </Flex>
                  )}
                  {isEnd && (
                    <Flex
                      flexDirection="column"
                      width="230px"
                      alignItems="flex-end"
                      gap="4px"
                    >
                      <Flex
                        alignItems="center"
                        gap="8px"
                        // width="100%"
                        // justifyContent="space-between"
                      >
                        <Text
                          className={`${s.bvm_amount} ${
                            data.need_active && s.active
                          }`}
                        >
                          <span>
                            {formatCurrency(
                              data?.token_balance,
                              MIN_DECIMAL,
                              MIN_DECIMAL,
                            )}{' '}
                            EAI (
                            {formatCurrency(
                              Number(data?.token_percent) * 100,
                              MIN_DECIMAL,
                              MIN_DECIMAL,
                            )}
                            %)
                          </span>
                        </Text>
                      </Flex>
                      <Flex
                        alignItems="center"
                        gap="8px"
                        // width="100%"
                        // justifyContent="space-between"
                      >
                        <Text
                          className={`${s.bvm_amount} ${
                            data.need_active && s.active
                          }`}
                        >
                          Claimable at TGE:
                        </Text>
                        <Text
                          className={`${s.bvm_amount} ${
                            data.need_active && s.active
                          }`}
                        >
                          <span>
                            {formatCurrency(
                              new BigNumberJS(data?.token_balance || 0)
                                .minus(data?.vesting_token_balance || 0)
                                .toString(),
                              MIN_DECIMAL,
                              MIN_DECIMAL,
                              'BTC',
                              false,
                              1000,
                            )}{' '}
                            EAI
                          </span>
                        </Text>
                      </Flex>
                      {!!isAmount(data.vesting_token_balance) && (
                        <Flex
                          alignItems="center"
                          gap="8px"
                          // width="100%"
                          // justifyContent="space-between"
                        >
                          <Text
                            className={`${s.bvm_amount} ${
                              data.need_active && s.active
                            }`}
                          >
                            6M cliff & 12M vesting:
                          </Text>
                          <Text
                            className={`${s.bvm_amount} ${
                              data.need_active && s.active
                            }`}
                          >
                            <span>
                              {formatCurrency(
                                data?.vesting_token_balance,
                                MIN_DECIMAL,
                                MIN_DECIMAL,
                                'BTC',
                                false,
                                1000,
                              )}{' '}
                              EAI
                            </span>
                          </Text>
                        </Flex>
                      )}
                    </Flex>
                  )}
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
  }, [user?.referral_code, address]);

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
      >
        <ListTable data={list} columns={columns} className={s.tableContainer} />
        {isFetching && <AppLoading className={s.loading} />}
      </ScrollWrapper>
    </Box>
  );
};

export default LeaderBoard;
