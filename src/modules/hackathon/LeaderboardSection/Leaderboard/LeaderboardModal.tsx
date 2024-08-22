'use client';

import React from 'react';
import cn from 'classnames';
import Avatar from '@/components/Avatar';
import { Box, Flex, Image, Text, Tooltip } from '@chakra-ui/react';
import {
  IContestProblem,
  IUserContest,
} from '@/services/api/EternalServices/types';
import s from './Leaderboard.module.scss';
import { formatAddressOrName, formatCurrency } from '@/utils/format';
import { PROBLEM_DATASOURCE } from '../../Problems/ProblemData';

type Props = {
  userContest: IUserContest;
};

const LIMIT_PAGE = 50;
const rowStyle = {
  gridTemplateColumns: `56px 220px 62px repeat(${
    PROBLEM_DATASOURCE.length + 1
  }, 100px)`,
};

const LeaderboardModal = (props: Props) => {
  const { userContest } = props;

  const renderItem = (data: IUserContest) => {
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
      <Box className={cn(s.item, s.table_group)} style={rowStyle}>
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
              title={nameText}
              style={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {formatAddressOrName(nameText)}
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
      </Box>
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

  const renderHeader = () => {
    return (
      <Box className={cn(s.header, s.table_group)} style={rowStyle}>
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
      </Box>
    );
  };

  return (
    <div
      style={{
        overflow: 'auto',
      }}
    >
      {renderHeader()}
      {renderItem(userContest)}
    </div>
  );
};

export default LeaderboardModal;
