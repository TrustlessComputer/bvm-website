/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable jsx-a11y/alt-text */
import AppLoading from '@/components/AppLoading';
import Avatar from '@/components/Avatar';
import { MIN_DECIMAL } from '@/constants/constants';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import { ILeaderBoardEAI } from '@/modules/Launchpad/services/laupEAI-payment.interfaces';
import CPaymentSWPAPI from '@/modules/Launchpad/services/payment.swp';
import { tokenIcons } from '@/modules/PublicSale/depositModal/constants';
import ListTable, {
  ColumnProp,
} from '@/modules/Whitelist/leaderBoard/ListTable';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { commonSelector } from '@/stores/states/common/selector';
import { shortCryptoAddress } from '@/utils/address';
import { isProduction } from '@/utils/commons';
import { formatCurrency, formatName } from '@/utils/format';
import { getExplorer } from '@/utils/helpers';
import { getUrlAvatarTwitter } from '@/utils/twitter';
import {
  AvatarGroup,
  Avatar as AvatarImg,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { orderBy, uniqBy } from 'lodash';
import { useParams } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { isDesktop } from 'react-device-detect';
import { useSelector } from 'react-redux';
import s from './styles.module.scss';

const LeaderBoard = () => {
  const needReload = useSelector(commonSelector).needReload;
  const [data, setData] = useState<ILeaderBoardPoint[]>([]);

  const hasIncrementedPageRef = useRef(false);
  const refParams = useRef({
    page: 1,
    limit: 100,
  });
  const refInitial = useRef(false);
  const launchpadApi = useRef(new CPaymentSWPAPI()).current;

  const params = useParams();
  const id = params?.id;

  const { currentLaunchpad } = useLaunchpadContext();

  const endTime = useMemo(() => {
    // if (summary?.end_time) {
    //   cachedEndTime.current = summary?.end_time;
    //   return summary?.end_time;
    // }
    // return cachedEndTime.current;
    return '2024-03-29T15:00:00Z';
  }, []);

  const isEnd = React.useMemo(() => {
    if (!isProduction()) return true;
    if (!endTime) return false;
    try {
      const _isEnd = dayjs.utc(endTime).isBefore(dayjs.utc());
      return _isEnd;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  }, [endTime]);

  useEffect(() => {
    fetchData(true);
  }, [id, needReload]);

  const sortList = (arr: ILeaderBoardPoint[]) => {
    return uniqBy(
      orderBy(arr, (item) => Number(item.need_active || false), 'desc'),
      (item: ILeaderBoardPoint) => item.id,
    );
  };

  const fetchData = async (isNew?: boolean) => {
    try {
      if (isNew) {
        refParams.current = {
          ...refParams.current,
          page: 1,
        };
      }

      const response = await launchpadApi.getPublicSaleLeaderBoards({
        ...refParams.current,
      });

      if (isNew) {
        const response2 = await launchpadApi.getPublicSaleLeaderBoards({
          page: 1,
          limit: 0,
        });

        refParams.current = {
          ...refParams.current,
          page: 1,
        };
        setData(sortList(response2?.rows.concat(response?.rows)));
      } else {
        setData((_data) => sortList([..._data, ...response?.rows]));
      }
    } catch (error) {
      console.log('errorerror', error);
    } finally {
      hasIncrementedPageRef.current = false;
      refInitial.current = true;
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
        id: 'rank',
        label: (
          <Flex pl={'8px'} gap={'4px'}>
            Rank
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
        render(data: ILeaderBoardEAI) {
          return (
            <Flex
              gap={6}
              alignItems={'center'}
              width={'100%'}
              justifyContent={'space-between'}
              paddingLeft={'16px'}
            >
              <Text className={s.title}>{data.ranking}</Text>
            </Flex>
          );
        },
      },
      {
        id: 'player',
        label: 'Participant',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '16px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: ILeaderBoardEAI) {
          return (
            <Flex
              gap={6}
              alignItems={'center'}
              width={'100%'}
              justifyContent={'space-between'}
              cursor="pointer"
              onClick={() => {
                if (data?.twitter_username) {
                  window.open(`https://twitter.com/${data?.twitter_username}`);
                } else {
                  window.open(getExplorer(data?.address, 'naka', 'address'));
                }
              }}
            >
              <Flex flex={1} gap={2} alignItems={'center'}>
                <Avatar
                  url={getUrlAvatarTwitter(
                    data?.twitter_avatar as string,
                    'normal',
                  )}
                  address={data?.address}
                  width={36}
                  name={data?.twitter_username}
                />
                <Flex width={'100%'} gap={'0px'} direction={'column'}>
                  {data?.twitter_name ? (
                    <>
                      <Text
                        className={s.title}
                        maxW={
                          isDesktop ? 'unset !important' : '100px !important'
                        }
                      >
                        {formatName(
                          data?.twitter_name as string,
                          data?.twitter_name?.length,
                        )}
                      </Text>
                    </>
                  ) : (
                    <Text className={s.title} maxW={'200px !important'}>
                      {shortCryptoAddress(data?.address || ('' as string), 16)}
                    </Text>
                  )}
                  {data.need_active && <Text className={s.subTitle}>YOU</Text>}
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
                          GSWP
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
                      // flexDirection="column"
                      // width="230px"
                      alignItems="center"
                      gap="4px"
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
                          GSWP (
                          {formatCurrency(
                            Number(data?.token_percent) * 100,
                            MIN_DECIMAL,
                            MIN_DECIMAL,
                          )}
                          %)
                        </span>
                      </Text>
                      {/* {compareString(data?.address, wallet?.address) &&
                        data?.claimable &&
                        !data?.is_claimed && (
                          <Button
                            className={s.btnClaimed}
                            onClick={() =>
                              router.push(`${LAUNCHPAD_DETAIL_URL}/${id}/claim`)
                            }
                          >
                            Claim
                          </Button>
                        )} */}
                    </Flex>
                  )}
                </Flex>
              </Flex>
            </Flex>
          );
        },
      },
    ];
  }, [needReload, currentLaunchpad?.status, isDesktop, isEnd]);

  return (
    <Box className={s.container}>
      <Box w="100%" bg="#FAFAFA" height="80dvh" minH={'750px'}>
        {refInitial.current ? (
          <ListTable
            data={data}
            columns={columns}
            className={s.tableContainer}
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
        ) : (
          <Flex p={'20px'} justifyContent={'center'}>
            <AppLoading />
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default LeaderBoard;
