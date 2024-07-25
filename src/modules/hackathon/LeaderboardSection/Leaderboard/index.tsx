'use client';

import React, { useRef, useState } from 'react';
import s from './Leaderboard.module.scss';
import useApiInfiniteVer1 from '@/hooks/useApiInfiniteVer1';
import InfiniteScroll from 'react-infinite-scroll-component';
import AppLoading from '@/components/AppLoading';
import { IGetParams } from '@/modules/Vote/Proposals/ListProposal';
import cn from 'classnames';
import Avatar from '@/components/Avatar';
import useNakaAuthen from '@/hooks/useRequestNakaAccount';
import { Box, Flex } from '@chakra-ui/react';
import IcCheck from '@/public/hackathon/ic-check.svg';
import IcClose from '@/public/hackathon/ic-close-red.svg';
import moment from 'moment';
import { MOCK_DATA } from './mockData';

type Props = {};

const LIMIT_PAGE = 50;

const Leaderboard = (props: Props) => {
  const { nakaAddress, isAuthen } = useNakaAuthen();

  const address = nakaAddress;
  const infiniteScrollRef = useRef<any>(null);

  const refParams = useRef<IGetParams>({
    page: 1,
    limit: LIMIT_PAGE,
  });

  const [dataInfinite, setDataInfinite] = useState([]);

  // fetch data from API
  const fetchLeaderboardData = async () => {
    try {
      // fetch data from API
      const res = await fetch('https://api.example.com/leaderboard');
      //   return res.json();
      return MOCK_DATA;
    } catch (error) {
      console.error('Error fetching leaderboard data', error);
    }
  };

  //   const {
  //     dataInfinite,
  //     loadMore,
  //     refresh,
  //     isLoadingMore,
  //     isReachingEnd,
  //     hasFirstFetching,
  //     isRefreshing,
  //   } = useApiInfiniteVer1(
  //     fetchLeaderboardData(),
  //     { limit: LIMIT_PAGE, page: refParams.current.page },
  //     { revalidateOnFocus: true },
  //   );

  const renderLoading = () => <AppLoading />;

  const renderItem = (data: any) => {
    return (
      <div className={cn(s.item, s.table_group)}>
        <Box className={s.first_col}>1</Box>
        <div className={cn(s.second_col, s.name)}>
          <Flex alignItems={'center'} gap="8px">
            <Avatar url={address || ''} width={20} circle />
            <p>John Doe</p>
          </Flex>
        </div>
        <div className={cn(s.place_center, s.third_col)}>3</div>
        <div className={s.place_center}>{renderTimeStatus(6000, true)}</div>
        <div className={s.place_center}> {renderTimeStatus(16000, true)}</div>
        <div className={s.place_center}> {renderTimeStatus(6000, false)}</div>
      </div>
    );
  };

  const renderTimeStatus = (time: number, isPassed?: boolean) => {
    let duration = moment.duration(time, 'seconds');
    let minutes = duration.minutes();
    let secondsLeft = duration.seconds();
    let formattedTime = `${minutes}m${
      secondsLeft > 0 ? `${secondsLeft}s` : ''
    }`;

    return (
      <Flex
        alignItems={'center'}
        gap="4px"
        w="100%"
        h="100%"
        py="12px"
        justifyContent={'center'}
        className={isPassed ? s.passed : s.failed}
      >
        {formattedTime}
        {isPassed ? <IcCheck /> : <IcClose />}
      </Flex>
    );
  };

  return (
    <div className={s.wrapper}>
      <div className={cn(s.header, s.table_group)}>
        <div className={s.first_col}>Rank</div>
        <div className={s.second_col}>Name</div>
        <div className={cn(s.third_col, s.place_center)}>Points</div>
        <div className={s.place_center}>Topic 1</div>
        <div className={s.place_center}>Topic 2</div>
        <div className={s.place_center}>Topic 3</div>
      </div>
      {MOCK_DATA.map((item: any) => renderItem(item))}

      {/* {dataInfinite && dataInfinite.length > 0 && (
        <InfiniteScroll
          ref={infiniteScrollRef}
          className={s.infinite}
          dataLength={dataInfinite?.length || 500}
          //   hasMore={!isReachingEnd}
          //   loader={isLoadingMore && renderLoading()}
          //   refreshFunction={refresh}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}

          //   next={loadMore}
        >
          {isRefreshing && renderLoading()}
          {(dataInfinite || []).map((item: any) => renderItem(item))}
        </InfiniteScroll>
      )} */}
    </div>
  );
};

export default Leaderboard;
