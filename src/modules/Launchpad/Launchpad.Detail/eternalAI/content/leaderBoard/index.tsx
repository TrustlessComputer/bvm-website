/* eslint-disable jsx-a11y/alt-text */
import AppLoading from '@/components/AppLoading';
import Avatar from '@/components/Avatar';
import { LAUNCHPAD_DETAIL_URL } from '@/constants/route-path';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';

import { useAuthenticatedWallet } from '@/Providers/AuthenticatedProvider/hooks';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { CDN_URL_ICONS, TC_LAYER2_EXPLORER } from '@/config';
import CLaunchpadAPI from '@/modules/Launchpad/services/launchpad';
import { setMyDataLeaderBoard } from '@/modules/Launchpad/store/reducer';
import ListTable, {
  ColumnProp,
} from '@/modules/Whitelist/leaderBoard/ListTable';
import { commonSelector } from '@/stores/states/common/selector';
import { shortCryptoAddress } from '@/utils/address';
import { formatCurrency, formatName } from '@/utils/format';
import { compareString, labelAmountOrNumberAdds } from '@/utils/string';
import { getUrlAvatarTwitter } from '@/utils/twitter';
import { Box, Button, Flex, Text, Tooltip } from '@chakra-ui/react';
import { BigNumber } from 'bignumber.js';
import clsx from 'classnames';
import { orderBy, uniqBy } from 'lodash';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { isDesktop } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import s from './styles.module.scss';

const valueToClassName: any = {
  '1.3': 'boost_25',
  // '1.2': 'boost_2',
  '1.2': 'boost_15',
  '1.1': 'boost_1',
};

const LeaderBoard = () => {
  const router = useRouter();

  const needReload = useSelector(commonSelector).needReload;
  const [data, setData] = useState<ILeaderBoardPoint[]>([]);

  const wallet = useAuthenticatedWallet();

  const hasIncrementedPageRef = useRef(false);
  const refParams = useRef({
    page: 1,
    limit: 100,
  });
  const refInitial = useRef(false);
  const launchpadApi = useRef(new CLaunchpadAPI()).current;

  const params = useParams();
  const id = params?.id;

  const { currentLaunchpad } = useLaunchpadContext();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData(true);
  }, [id, needReload]);

  const sortList = (arr: ILeaderBoardPoint[]) => {
    return uniqBy(
      orderBy(arr, (item) => Number(item.need_active || false), 'desc'),
      (item: ILeaderBoardPoint) => item.twitter_id,
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

      const response = await launchpadApi.getPrelaunchLeaderBoards(Number(id), {
        ...refParams.current,
      });

      if (isNew) {
        const response2 = await launchpadApi.getPrelaunchLeaderBoards(
          Number(id),
          {
            page: 1,
            limit: 0,
          },
        );

        dispatch(setMyDataLeaderBoard(response2?.rows[0]));

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
    color: '#6C6F93',
    fontSize: '12px',
    textTransform: 'uppercase',
    // letterSpacing: '-0.5px',
    // borderBottom: '1px solid #FFFFFF33',
  };

  const columns: ColumnProp[] = useMemo(() => {
    return [
      {
        id: 'rank',
        label: (
          <Flex pl={'8px'} gap={'4px'}>
            Rank
            <Tooltip
              minW="220px"
              bg="#000000"
              label={
                <Flex direction="column" color="#ffffff" padding={'4px'}>
                  <p>
                    Top 2%: +30% boost <br />
                    Top 8%: +20% boost <br />
                    Others: +10% boost
                  </p>
                </Flex>
              }
            >
              <img
                className={s.tooltipIcon}
                src={`${CDN_URL_ICONS}/ic-information-wh.svg`}
              />
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
        label: 'BACKER',
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
                if (data?.twitter_username) {
                  window.open(`https://twitter.com/${data?.twitter_username}`);
                } else {
                  window.open(`${TC_LAYER2_EXPLORER}/address/${data?.address}`);
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
                      {data.need_active && (
                        <Text className={s.subTitle}>YOU</Text>
                      )}
                    </>
                  ) : (
                    <Text className={s.title} maxW={'200px !important'}>
                      {shortCryptoAddress(data?.address || ('' as string), 16)}
                    </Text>
                  )}
                </Flex>
              </Flex>
            </Flex>
          );
        },
      },
      ...(['prelaunch'].includes(currentLaunchpad?.status as string)
        ? [
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
              labelConfig,
              config: {
                borderBottom: 'none',
                fontSize: '16px',
                fontWeight: 500,
                verticalAlign: 'middle',
                letterSpacing: '-0.5px',
              },
              render(data: ILeaderBoardPoint) {
                const view_boost = new BigNumber(data?.boost || 0)
                  .minus(1)
                  .multipliedBy(100)
                  .toNumber();
                return (
                  <Flex justifyContent="center" alignItems="center">
                    <Flex
                      flexDirection={'column'}
                      className={clsx(
                        s.tagBoost,
                        s[valueToClassName[`${data?.boost}`]],
                        valueToClassName[`${data?.boost}`],
                      )}
                    >
                      <Text className={s.title} style={{ fontWeight: 600 }}>
                        {view_boost}%
                      </Text>
                    </Flex>
                  </Flex>
                );
              },
            },

            {
              id: 'staking',
              label: (
                <Flex
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: '100%',
                    gap: '4px',
                    marginRight: '4px',
                  }}
                >
                  <p>STAKED BVM</p>
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
                      <Text className={s.title}>
                        {formatCurrency(data?.staking_point, 0, 0, 'BTC')}
                      </Text>
                    </Flex>
                  </Flex>
                );
              },
            },
            // {
            //   id: 'invited',
            //   label: (
            //     <Flex
            //       style={{
            //         justifyContent: 'center',
            //         alignItems: 'center',
            //         alignSelf: 'center',
            //         width: '100%',
            //         gap: '4px',
            //         marginRight: '4px',
            //       }}
            //     >
            //       <p>Follow Pts</p>
            //     </Flex>
            //   ),
            //   labelConfig,
            //   config: {
            //     borderBottom: 'none',
            //     fontSize: '16px',
            //     fontWeight: 500,
            //     verticalAlign: 'middle',
            //     letterSpacing: '-0.5px',
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
            //           <Text className={s.title}>
            //             {formatCurrency(data?.follow_point,
            //               0,
            //               0,
            //               'BTC',
            //             )}
            //           </Text>
            //         </Flex>
            //       </Flex>
            //     );
            //   },
            // },
            // {
            //   id: 'testnet',
            //   label: (
            //     <Flex
            //       style={{
            //         justifyContent: 'center',
            //         alignItems: 'center',
            //         alignSelf: 'center',
            //         width: '100%',
            //         gap: '4px',
            //         marginRight: '4px',
            //       }}
            //     >
            //       <p>Use Testnet Pts</p>
            //     </Flex>
            //   ),
            //   labelConfig,
            //   config: {
            //     borderBottom: 'none',
            //     fontSize: '16px',
            //     fontWeight: 500,
            //     verticalAlign: 'middle',
            //     letterSpacing: '-0.5px',
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
            //           <Text className={s.title}>
            //             {formatCurrency(data?.testnet_point,
            //               0,
            //               0,
            //               'BTC',
            //             )}
            //           </Text>
            //         </Flex>
            //       </Flex>
            //     );
            //   },
            // },
            // {
            //   id: 'deposit',
            //   label: (
            //     <Flex
            //       style={{
            //         justifyContent: 'center',
            //         alignItems: 'center',
            //         alignSelf: 'center',
            //         width: '100%',
            //         gap: '4px',
            //         marginRight: '4px',
            //       }}
            //     >
            //       <p>Deposit Pts</p>
            //     </Flex>
            //   ),
            //   labelConfig,
            //   config: {
            //     borderBottom: 'none',
            //     fontSize: '16px',
            //     fontWeight: 500,
            //     verticalAlign: 'middle',
            //     letterSpacing: '-0.5px',
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
            //           <Text className={s.title}>
            //             {formatCurrency(data?.portfolio_point, 0, 0, 'BTC')}
            //           </Text>
            //         </Flex>
            //       </Flex>
            //     );
            //   },
            // },
            // {
            //   id: 'bitcoin',
            //   label: (
            //     <Flex
            //       style={{
            //         justifyContent: 'center',
            //         alignItems: 'center',
            //         alignSelf: 'center',
            //         width: '100%',
            //         gap: '4px',
            //         marginRight: '4px',
            //       }}
            //     >
            //       <p>Bitcoin Pts</p>
            //     </Flex>
            //   ),
            //   labelConfig,
            //   config: {
            //     borderBottom: 'none',
            //     fontSize: '16px',
            //     fontWeight: 500,
            //     verticalAlign: 'middle',
            //     letterSpacing: '-0.5px',
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
            //           <Text className={s.title}>
            //             {formatCurrency(data?.gas_point, 0, 0)}
            //           </Text>
            //         </Flex>
            //       </Flex>
            //     );
            //   },
            // },
            // {
            //   id: 'merlin',
            //   label: (
            //     <Flex
            //       style={{
            //         justifyContent: 'center',
            //         alignItems: 'center',
            //         alignSelf: 'center',
            //         width: '100%',
            //         gap: '4px',
            //         marginRight: '4px',
            //       }}
            //     >
            //       <p>Merlin Pts</p>
            //     </Flex>
            //   ),
            //   labelConfig,
            //   config: {
            //     borderBottom: 'none',
            //     fontSize: '16px',
            //     fontWeight: 500,
            //     verticalAlign: 'middle',
            //     letterSpacing: '-0.5px',
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
            //           <Text className={s.title}>
            //             {formatCurrency(data?.merlin_point, 0, 0)}
            //           </Text>
            //         </Flex>
            //       </Flex>
            //     );
            //   },
            // },
            // {
            //   id: '404point',
            //   label: (
            //     <Flex
            //       style={{
            //         justifyContent: 'center',
            //         alignItems: 'center',
            //         alignSelf: 'center',
            //         width: '100%',
            //         gap: '4px',
            //         marginRight: '4px',
            //       }}
            //     >
            //       <p>BRC-404 Pts</p>
            //     </Flex>
            //   ),
            //   labelConfig,
            //   config: {
            //     borderBottom: 'none',
            //     fontSize: '16px',
            //     fontWeight: 500,
            //     verticalAlign: 'middle',
            //     letterSpacing: '-0.5px',
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
            //           <Text className={s.title}>
            //             {formatCurrency(data?.brc404_point, 0, 0, 'BTC')}
            //           </Text>
            //         </Flex>
            //       </Flex>
            //     );
            //   },
            // },
            // {
            //   id: 'savm',
            //   label: (
            //     <Flex
            //       style={{
            //         justifyContent: 'center',
            //         alignItems: 'center',
            //         alignSelf: 'center',
            //         width: '100%',
            //         gap: '4px',
            //         marginRight: '4px',
            //       }}
            //     >
            //       <p>SAVM Pts</p>
            //     </Flex>
            //   ),
            //   labelConfig,
            //   config: {
            //     borderBottom: 'none',
            //     fontSize: '16px',
            //     fontWeight: 500,
            //     verticalAlign: 'middle',
            //     letterSpacing: '-0.5px',
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
            //           <Text className={s.title}>
            //             {formatCurrency(data?.savm_point, 0, 0, 'BTC')}
            //           </Text>
            //         </Flex>
            //       </Flex>
            //     );
            //   },
            // },
          ]
        : []),
      ...(['ido', 'ended'].includes(currentLaunchpad?.status || '')
        ? [
            ...(isDesktop
              ? [
                  {
                    id: 'winningChance',
                    label: (
                      <Flex
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                          width: '100%',
                          gap: '4px',
                          marginRight: '4px',
                        }}
                      >
                        <p>Chance of winning</p>
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
                            <Text className={s.title}>
                              {formatCurrency(data?.wining_chance, 0, 2, 'BTC')}
                              %
                            </Text>
                          </Flex>
                        </Flex>
                      );
                    },
                  },
                ]
              : []),
            // {
            //   id: 'invited',
            //   label: (
            //     <Flex
            //       style={{
            //         justifyContent: 'center',
            //         alignItems: 'center',
            //         alignSelf: 'center',
            //         width: '100%',
            //         gap: '4px',
            //         marginRight: '4px',
            //       }}
            //     >
            //       <p>Invitation Tickets</p>
            //     </Flex>
            //   ),
            //   labelConfig,
            //   config: {
            //     borderBottom: 'none',
            //     fontSize: '16px',
            //     fontWeight: 500,
            //     verticalAlign: 'middle',
            //     letterSpacing: '-0.5px',
            //   },
            //   render(data: ILeaderBoardPoint) {
            //     console.log('datadatadata', data);
            //     return (
            //       <Flex
            //         gap={3}
            //         alignItems={'center'}
            //         width={'100%'}
            //         justifyContent={'center'}
            //       >
            //         <Flex alignItems={'center'} gap={2}>
            //           <Text className={s.title}>
            //             {formatCurrency(data?.referral_ticket, 0, 0)}
            //           </Text>
            //         </Flex>
            //       </Flex>
            //     );
            //   },
            // },
            {
              id: 'total',
              label: (
                <Flex
                  style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    width: '100%',
                    alignItems: 'center',
                  }}
                >
                  <Text>Total Tickets</Text>
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
                const view_boost = new BigNumber(data?.boost || 0)
                  .minus(1)
                  .multipliedBy(100)
                  .toNumber();
                const ticketBoost =
                  (data?.total_ticket as number) -
                  (data?.total_ticket_not_boost as number);

                const totalTickets = data?.need_active
                  ? data?.total_ticket_not_boost
                  : (data?.total_ticket as number) +
                    (data?.referral_ticket as number);

                return (
                  <Flex
                    gap={3}
                    alignItems={'center'}
                    width={'100%'}
                    justifyContent={'center'}
                    marginRight={'12px'}
                  >
                    <Flex alignItems={'center'} gap={2}>
                      {/*       {data?.need_active && (
                        <Text className={s.userBoost}>
                          +{view_boost}% boost
                        </Text>
                      )}*/}
                      <Text
                        className={s.title}
                        style={{ maxWidth: '120px !important' }}
                      >
                        {formatCurrency(totalTickets, 0, 0)}
                        {data?.need_active &&
                          ticketBoost > 0 &&
                          ` + ${ticketBoost} boost ticket${labelAmountOrNumberAdds(
                            ticketBoost,
                          )}`}
                      </Text>
                      {data?.need_active && (
                        <Tooltip
                          minW="430px"
                          bg="#000000"
                          // isOpen={true}
                          label={
                            <Flex
                              direction="column"
                              color="#ffffff"
                              padding={'4px'}
                            >
                              <p>
                                Total tickets = (Paid tickets x (1 + Boost)) +
                                Invitation tickets
                              </p>
                              <p>
                                Paid tickets: {data?.total_ticket_not_boost}
                              </p>
                              <p>Invitation tickets: {data?.referral_ticket}</p>
                              <p>Boost: {view_boost}%</p>
                            </Flex>
                          }
                        >
                          <img
                            className={s.tooltipIcon2}
                            src={`${CDN_URL_ICONS}/ic-information-wh.svg`}
                          />
                        </Tooltip>
                      )}
                      {compareString(data?.address, wallet?.address) && (
                        <Button
                          className={s.btnClaimed}
                          onClick={() =>
                            router.push(`${LAUNCHPAD_DETAIL_URL}/${id}/claim`)
                          }
                        >
                          Claim
                        </Button>
                      )}

                      {/*{data?.need_active &&
                      ['redemption'].includes(
                        currentLaunchpad?.status || '',
                      ) && <BuyButton data={data} />}*/}
                    </Flex>
                  </Flex>
                );
              },
            },
            ...(['ended'].includes(currentLaunchpad?.status as string)
              ? [
                  {
                    id: 'won',
                    label: (
                      <Flex
                        style={{
                          justifyContent: 'center',
                          alignSelf: 'center',
                          width: '100%',
                        }}
                      >
                        Winning Tickets
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
                          marginRight={'12px'}
                        >
                          <Flex alignItems={'center'} gap={2}>
                            <Text className={s.title}>
                              {formatCurrency(data?.won_ticket, 0, 0)}
                            </Text>
                          </Flex>
                        </Flex>
                      );
                    },
                  },
                ]
              : []),
            // {
            //   id: 'bought',
            //   label: (
            //     <Flex
            //       style={{
            //         justifyContent: 'center',
            //         alignSelf: 'center',
            //         width: '100%',
            //       }}
            //     >
            //       Claimed Tickets
            //     </Flex>
            //   ),
            //   labelConfig,
            //   config: {
            //     borderBottom: 'none',
            //     fontSize: '16px',
            //     fontWeight: 500,
            //     verticalAlign: 'middle',
            //     letterSpacing: '-0.5px',
            //   },
            //   render(data: ILeaderBoardPoint) {
            //     return (
            //       <Flex
            //         gap={3}
            //         alignItems={'center'}
            //         width={'100%'}
            //         justifyContent={'center'}
            //         marginRight={'12px'}
            //       >
            //         <Flex alignItems={'center'} gap={2}>
            //           <Text className={s.title}>
            //             {formatCurrency(data?.bought_ticket, 0, 0)}
            //           </Text>
            //         </Flex>
            //       </Flex>
            //     );
            //   },
            // },
          ]
        : []),
    ];
  }, [needReload, currentLaunchpad?.status, isDesktop]);

  return (
    <Box className={s.container}>
      <Box
        w="100%"
        bg="#FFF"
        height="80dvh"
        minH={'750px'}
        borderRadius={'8px'}
      >
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
