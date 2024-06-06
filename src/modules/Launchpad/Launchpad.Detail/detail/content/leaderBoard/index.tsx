/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable jsx-a11y/alt-text */
import AppLoading from '@/components/AppLoading';
import Avatar from '@/components/Avatar';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import CLaunchpadAPI from '@/modules/Launchpad/services/launchpad';
import {
  ELaunchpadStatus,
  IPreLaunchpadPointType,
  IPreLaunchpadTask,
} from '@/modules/Launchpad/services/launchpad.interfaces';
import { setMyDataLeaderBoard } from '@/modules/Launchpad/store/reducer';
import ListTable, {
  ColumnProp,
} from '@/modules/Whitelist/leaderBoard/ListTable';
import { LaunchpadContext } from '@/Providers/LaunchpadProvider';
import { commonSelector } from '@/stores/states/common/selector';
import { shortCryptoAddress } from '@/utils/address';
import { formatCurrency, formatName } from '@/utils/format';
import { getExplorer } from '@/utils/helpers';
import { compareString } from '@/utils/string';
import { getUrlAvatarTwitter } from '@/utils/twitter';
import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import { BigNumber } from 'bignumber.js';
import clsx from 'classnames';
import { orderBy, uniqBy } from 'lodash';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { isDesktop } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import s from './styles.module.scss';

const valueToClassName: any = {
  '1.3': 'boost_25',
  // '1.2': 'boost_2',
  '1.2': 'boost_15',
  '1.1': 'boost_1',
};

const LeaderBoard = ({ tasks = [] }: { tasks?: IPreLaunchpadTask[] }) => {
  const { currentLaunchpad } = useContext(LaunchpadContext);
  const needReload = useSelector(commonSelector).needReload;
  const [data, setData] = useState<ILeaderBoardPoint[]>([]);

  const hasIncrementedPageRef = useRef(false);
  const refParams = useRef({
    page: 1,
    limit: 100,
  });
  const refInitial = useRef(false);
  const launchpadApi = useRef(new CLaunchpadAPI()).current;

  const params = useParams();
  const id = params?.id;

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData(true);
  }, [needReload, currentLaunchpad]);

  const sortList = (arr: ILeaderBoardPoint[]) => {
    return uniqBy(
      orderBy(arr, (item) => Number(item.need_active || false), 'desc'),
      (item: ILeaderBoardPoint) => item.twitter_id,
    );
  };

  const fetchData = async (isNew?: boolean) => {
    try {
      if (!currentLaunchpad?.id) {
        return;
      }
      if (isNew) {
        refParams.current = {
          ...refParams.current,
          page: 1,
        };
      }

      let response: any = [];
      let response2 = [];

      if (compareString(currentLaunchpad?.status, ELaunchpadStatus.prelaunch)) {
        response = await launchpadApi.getPrelaunchLeaderBoards(Number(id), {
          ...refParams.current,
        });
      } else {
        response = await launchpadApi.getLaunchIDOLeaderBoards(Number(id), {
          ...refParams.current,
        });
      }

      if (isNew) {
        if (
          compareString(currentLaunchpad?.status, ELaunchpadStatus.prelaunch)
        ) {
          response2 = await launchpadApi.getPrelaunchLeaderBoards(Number(id), {
            page: 1,
            limit: 0,
          });
        } else {
          response2 = await launchpadApi.getLaunchIDOLeaderBoards(Number(id), {
            page: 1,
            limit: 0,
          });
        }

        dispatch(setMyDataLeaderBoard(response2?.rows[0]));

        refParams.current = {
          ...refParams.current,
          page: 1,
        };
        const rows = (response as any)?.rows || [];
        setData(sortList(response2?.rows.concat(rows)));
      } else {
        const rows = (response as any)?.rows || [];
        setData((_data) => sortList([..._data, ...rows]));
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
    const _cols: ColumnProp[] = [
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
        label: 'Participant',
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
    ];

    if (
      [ELaunchpadStatus.prelaunch, ELaunchpadStatus.ido].includes(
        currentLaunchpad?.status as ELaunchpadStatus,
      )
    ) {
      _cols.push(
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
          id: 'total',
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
              <p>Total Pts</p>
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
                  <Text className={s.title} style={{ fontWeight: 600 }}>
                    {formatCurrency(data?.total_point, 0, 0, 'BTC')}
                  </Text>
                </Flex>
              </Flex>
            );
          },
        },
      );
      if (
        tasks.find((v) =>
          compareString(v.point_type, IPreLaunchpadPointType.Staking),
        )
      ) {
        _cols.push({
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
              <p>Staking Pts</p>
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
        });
      }
      if (
        tasks.find(
          (v) =>
            compareString(v.point_type, IPreLaunchpadPointType.Refer) ||
            compareString(v.point_type, IPreLaunchpadPointType.FollowOnX) ||
            compareString(v.point_type, IPreLaunchpadPointType.LikeOnX) ||
            compareString(v.point_type, IPreLaunchpadPointType.SpreadOnX),
        )
      ) {
        _cols.push({
          id: 'invited',
          label: (
            <Tooltip
              hasArrow
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                width: '100%',
              }}
              bg="#ffffff"
              label={
                <Flex direction="column" color="#000000" padding={'4px'}>
                  <p>Shared pts = Refer friend + Like & retweet + Follow</p>
                </Flex>
              }
            >
              <Flex alignItems={'center'} gap={'2px'} cursor={'pointer'}>
                Shared Pts
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 256 256"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M142,176a6,6,0,0,1-6,6,14,14,0,0,1-14-14V128a2,2,0,0,0-2-2,6,6,0,0,1,0-12,14,14,0,0,1,14,14v40a2,2,0,0,0,2,2A6,6,0,0,1,142,176ZM124,94a10,10,0,1,0-10-10A10,10,0,0,0,124,94Zm106,34A102,102,0,1,1,128,26,102.12,102.12,0,0,1,230,128Zm-12,0a90,90,0,1,0-90,90A90.1,90.1,0,0,0,218,128Z"></path>
                </svg>
              </Flex>
            </Tooltip>
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
                    {formatCurrency(
                      Number(data?.referral_point) +
                        Number(data?.follow_point) +
                        Number(data?.like_point) +
                        Number(data?.content_point),
                      0,
                      0,
                      'BTC',
                    )}
                  </Text>
                </Flex>
              </Flex>
            );
          },
        });
      }

      if (
        tasks.find((v) =>
          compareString(v.point_type, IPreLaunchpadPointType.Portfolio),
        )
      ) {
        _cols.push({
          id: 'deposit',
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
              <p>Deposit Pts</p>
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
                    {formatCurrency(data?.portfolio_point, 0, 0, 'BTC')}
                  </Text>
                </Flex>
              </Flex>
            );
          },
        });
      }
    }

    return _cols;
  }, [needReload, currentLaunchpad?.status, isDesktop, tasks]);

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
