'use client';

import React, { useMemo, useRef } from 'react';
import useApiInfiniteVer1 from '@/hooks/useApiInfiniteVer1';
import InfiniteScroll from 'react-infinite-scroll-component';
import AppLoading from '@/components/AppLoading';
import { IGetParams } from '@/modules/Vote/Proposals/ListProposal';
import cn from 'classnames';
import Avatar from '@/components/Avatar';
import { Box, Flex, Image } from '@chakra-ui/react';
import { getListLeaderboard } from '@/services/api/EternalServices';
import {
  IContestProblem,
  IUserContest,
} from '@/services/api/EternalServices/types';
import s from './Leaderboard.module.scss';

type Props = {
  currentUserContest?: IUserContest;
};

const LIMIT_PAGE = 50;

const Leaderboard = (props: Props) => {
  const { currentUserContest } = props;

  const infiniteScrollRef = useRef<any>(null);

  const refParams = useRef<IGetParams>({
    page: 1,
    limit: LIMIT_PAGE,
  });

  // fetch data from API
  const fetchLeaderboardData = async (params: any) => {
    try {
      return getListLeaderboard(params);
    } catch (error) {
      console.error('Error fetching leaderboard data', error);
    }
  };

  const {
    dataInfinite,
    loadMore,
    refresh,
    isLoadingMore,
    isReachingEnd,
    isRefreshing,
  } = useApiInfiniteVer1(
    fetchLeaderboardData,
    {
      limit: LIMIT_PAGE,
      page: refParams.current.page,
    },
    { revalidateOnFocus: true, refreshInterval: 10000 },
  );

  const renderLoading = () => <AppLoading />;

  const renderItem = (data: IUserContest, index: number) => {
    // No need to render current user in the loop
    if (index >= 0 && data.user_address === currentUserContest?.user_address) {
      return null;
    }

    const map = data.contest_problems?.reduce(
      (prev, item) => ({
        ...prev,
        [item.code]: item,
      }),
      {} as Record<string, IContestProblem>,
    );

    return (
      <div className={cn(s.item, s.table_group)}>
        <Box className={s.first_col}>{data.rank}</Box>
        <div className={cn(s.second_col, s.name)}>
          <Flex alignItems={'center'} gap="8px" style={{ overflow: 'hidden' }}>
            <Avatar
              url={data.user.profile_image}
              width={20}
              circle
              className={s.avatar}
            />
            <p
              title={data.user.name}
              style={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                color:
                  data.user_address === currentUserContest?.user_address
                    ? '#8643FB'
                    : 'inherit',
              }}
            >
              {data.user.name || data.user.twitter_username}
            </p>
          </Flex>
        </div>
        <div className={cn(s.place_center, s.third_col)}>
          {data.total_point}
        </div>
        <div className={s.place_center}>{data.total_gas_used}</div>
        <div className={s.place_center}>{renderTimeStatus(map?.['1'])}</div>
        <div className={s.place_center}> {renderTimeStatus(map?.['2'])}</div>
        <div className={s.place_center}> {renderTimeStatus(map?.['3'])}</div>
      </div>
    );
  };

  const renderTimeStatus = (contestProblem?: IContestProblem) => {
    if (!contestProblem) {
      return null;
    }
    // const formattedTime = getTimeText(contestProblem.duration);
    const isPassed = contestProblem.status === 'marked';

    if (isPassed) {
      return (
        <Flex
          alignItems={'center'}
          gap="4px"
          w="100%"
          h="100%"
          justifyContent={'center'}
          className={s.passed}
        >
          {contestProblem.gas_used}
          <Image src="/hackathon/ic-check.svg" />
        </Flex>
      );
    }

    return (
      <Flex
        alignItems={'center'}
        gap="4px"
        w="100%"
        h="100%"
        justifyContent={'center'}
        className={s.failed}
        position={'relative'}
      >
        <Image src="/hackathon/ic-close-red.svg" />
      </Flex>
    );
  };

  const dataSource = useMemo(() => {
    return (dataInfinite as IUserContest[][])?.reduce(
      (prev, current) => prev.concat(current),
      [] as IUserContest[],
    );
  }, [dataInfinite]);

  return (
    <div
      className={s.wrapper}
      id="scrollableDiv"
      style={{
        height: 750,
        overflow: 'auto',
      }}
    >
      <div className={cn(s.header, s.table_group)}>
        <div className={s.first_col}>Rank</div>
        <div className={s.second_col}>Name</div>
        <div className={cn(s.third_col, s.place_center)}>Points</div>
        <div className={s.place_center}>Total Gas</div>
        <div className={s.place_center}>Problem 1</div>
        <div className={s.place_center}>Problem 2</div>
        <div className={s.place_center}>Problem 3</div>
      </div>

      {dataSource && dataSource.length > 0 && (
        <InfiniteScroll
          ref={infiniteScrollRef}
          className={s.infinite}
          dataLength={dataSource?.length || 500}
          hasMore={!isReachingEnd}
          loader={isLoadingMore && renderLoading()}
          refreshFunction={refresh}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          scrollableTarget="scrollableDiv"
          next={loadMore}
        >
          {isRefreshing && renderLoading()}
          {!!currentUserContest && renderItem(currentUserContest, -1)}
          {(dataSource || []).map(renderItem)}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Leaderboard;
