'use client';

import React, { useMemo, useRef } from 'react';
import useApiInfiniteVer1 from '@/hooks/useApiInfiniteVer1';
import InfiniteScroll from 'react-infinite-scroll-component';
import AppLoading from '@/components/AppLoading';
import { IGetParams } from '@/modules/Vote/Proposals/ListProposal';
import cn from 'classnames';
import Avatar from '@/components/Avatar';
import { Box, Flex, Image, Text, Tooltip } from '@chakra-ui/react';
import { getListLeaderboard } from '@/services/api/EternalServices';
import {
  IContestProblem,
  IUserContest,
  UserContestType,
} from '@/services/api/EternalServices/types';
import s from './Leaderboard.module.scss';
import { formatAddressOrName, formatCurrency } from '@/utils/format';
import { useDispatch } from 'react-redux';
import SvgInset from '@/components/SvgInset';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { isAddress } from 'ethers/lib/utils';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { PROBLEM_DATASOURCE } from '../Problems/ProblemData';

type Props = {
  currentUserContest?: IUserContest;
};

const LIMIT_PAGE = 50;
const rowStyle = {
  gridTemplateColumns: `56px 1fr 62px repeat(${
    PROBLEM_DATASOURCE.length + 1
  }, 95px)`,
};

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
      return getListLeaderboard({
        ...params,
        contest_type: UserContestType.COMPETITION,
      });
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
      contest_type: UserContestType.COMPETITION,
    },
    { revalidateOnFocus: true, refreshInterval: 10000 },
  );

  const renderLoading = () => <AppLoading />;

  const renderItem = (data: IUserContest, index: number) => {
    // No need to render current user in the loop
    const isCurrentUser =
      data.user_address === currentUserContest?.user_address;
    if (index >= 0 && isCurrentUser) {
      return null;
    }

    const map = data.contest_problems?.reduce(
      (prev, item) => ({
        ...prev,
        [item.code]: item,
      }),
      {} as Record<string, IContestProblem>,
    );

    const nameText =
      data.name ||
      data.user.name ||
      data.user.twitter_username ||
      data.user.email?.split('@')?.[0];

    return (
      <div
        className={cn(s.item, s.table_group, { [s.highlight]: isCurrentUser })}
        style={rowStyle}
      >
        <Box className={s.first_col}>{data.rank}</Box>
        <div className={cn(s.second_col, s.name)}>
          <Flex alignItems={'center'} gap="8px" style={{ overflow: 'hidden' }}>
            {isAddress(data.user.profile_image) ? (
              <Jazzicon
                diameter={20}
                seed={jsNumberForAddress(data.user.profile_image)}
              />
            ) : (
              <Avatar
                url={data.user.profile_image}
                width={20}
                circle
                className={s.avatar}
              />
            )}
            <p
              style={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                color: isCurrentUser ? '#8643FB' : 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {formatAddressOrName(nameText)}
              {isAddress(nameText) && (
                <SvgInset
                  onClick={() => {
                    copy(nameText);
                    toast.success('Copied');
                  }}
                  style={{ cursor: 'pointer' }}
                  svgUrl="/icons/ic-copy.svg"
                />
              )}
            </p>
          </Flex>
        </div>
        <div className={cn(s.place_center, s.third_col)}>
          {data.total_point}
        </div>
        <div className={s.place_center}>
          {formatCurrency(data.total_gas_used)}
        </div>
        {PROBLEM_DATASOURCE.map((item) => (
          <div className={s.place_center} key={`cell-${item.id}`}>
            {renderTimeStatus(map?.[item.id])}
          </div>
        ))}
      </div>
    );
  };

  const renderTimeStatus = (contestProblem?: IContestProblem) => {
    if (!contestProblem) {
      return null;
    }

    const isPassed =
      contestProblem.status === 'marked' && contestProblem.point > 0;
    const isProcessing = contestProblem.status === 'processing';

    const renderContent = () => {
      if (isPassed) {
        return (
          <>
            {formatCurrency(contestProblem.gas_used)}
            <Image src="/hackathon/ic-check.svg" />
          </>
        );
      }

      if (isProcessing) {
        return (
          <>
            <Image src="/icons/ic-time-forward.svg" />
            <Text
              position={'absolute'}
              transform={'translateY(20px)'}
              fontSize={'10px'}
              color="rgba(255, 255, 255, 0.70)"
              fontWeight={500}
            >
              Judging
            </Text>
          </>
        );
      }

      return contestProblem.error_msg ? (
        <Tooltip label={contestProblem.error_msg}>
          <Image src="/hackathon/ic-close-red.svg" />
        </Tooltip>
      ) : (
        <Image src="/hackathon/ic-close-red.svg" />
      );
    };

    return (
      <Flex
        alignItems={'center'}
        gap="4px"
        w="100%"
        h="100%"
        justifyContent={'center'}
        className={cn({
          [s.passed]: isPassed,
          [s.failed]: !isPassed && !isProcessing,
        })}
      >
        {renderContent()}
      </Flex>
    );
  };

  const dataSource = useMemo(() => {
    return (dataInfinite as IUserContest[][])?.reduce(
      (prev, current) => prev.concat(current),
      [] as IUserContest[],
    );
  }, [dataInfinite]);

  const renderHeader = () => {
    return (
      <div className={cn(s.header, s.table_group)} style={rowStyle}>
        <div className={s.first_col}>
          <span>Rank</span>
        </div>
        <div className={s.second_col}>
          <span>Name</span>
        </div>
        <div className={cn(s.third_col, s.place_center)}>
          <span>Points</span>
        </div>
        <div className={s.place_center}>
          <span>Total Gas</span>
        </div>
        {PROBLEM_DATASOURCE.map((item, index) => (
          <div className={s.place_center} key={`header-${item.id}`}>
            <span>Problem {index + 1}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={s.wrapper}
      id="scrollableDiv"
      style={{
        height: 660,
        overflow: 'auto',
      }}
    >
      {!dataSource?.length && renderHeader()}
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
          {renderHeader()}
          {isRefreshing && renderLoading()}
          {!!currentUserContest && renderItem(currentUserContest, -1)}
          {(dataSource || []).map(renderItem)}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Leaderboard;
