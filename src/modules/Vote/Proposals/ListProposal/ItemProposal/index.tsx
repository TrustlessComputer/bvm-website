import Countdown from '@/modules/VoteDetail/Countdown';
import { Flex, Text, Image } from '@chakra-ui/react';
import cx from 'clsx';
import moment from 'moment';
import React, { useMemo } from 'react';
import s from './styles.module.scss';

interface LabelStatusMap {
  [name: string]: any;
}

export const ProposalStatus: LabelStatusMap = {
  new: 'Active',
  excuted: 'Executed',
  defeated: 'Defeated',
  cancel: 'Canceled',
  end: 'Ended',
};

const ItemProposal = ({ data }: any) => {
  const isEndProposal = useMemo(() => {
    return (
      data &&
      data.vote_end_at &&
      data.status === 'new' &&
      moment().isAfter(moment(data?.vote_end_at))
    );
  }, [data]);

  const status = isEndProposal ? 'end' : data?.status;

  const isBeforeStartVote = useMemo(() => {
    return moment().isBefore(moment(data?.vote_start_at));
  }, [data]);

  const isAfterEndVote = useMemo(() => {
    return moment().isAfter(moment(data?.vote_end_at));
  }, [data]);

  const expiredTimeAt = useMemo(() => {
    if (moment().isBefore(moment(data?.vote_start_at))) {
      return data?.vote_start_at;
    } else {
      return data?.vote_end_at;
    }
  }, [data?.vote_start_at, data?.vote_end_at]);

  const getTitle = () => {
    try {
      if (data || data.description) {
        const _data = JSON.parse(data.description as string);
        return _data.title;
      }
    } catch (error) {
      return data?.description || '';
    }
  };

  const renderCountdown = React.useCallback(() => {
    return (
      <p>
        <span>
          {isBeforeStartVote ? 'Voting starts' : 'Voting ends in'}{' '}
          <Countdown expiredTime={expiredTimeAt} />
        </span>
      </p>
    );
  }, [expiredTimeAt, isBeforeStartVote]);

  return (
    <a className={s.container} href={`/proposal-dashboard/${data?.id}`}>
      <Text className={s.title}>
        <span>{data?.id}&nbsp;</span>&nbsp;&nbsp;{getTitle()}
      </Text>
      <Flex direction={'row'} gap="8px">
        {status === 'new' && !isAfterEndVote && (
          <Flex className={s.timer}>
            <Image src="/icons/icontime.svg" />
            {renderCountdown()}
            {/*<p>*/}
            {/*  <span>*/}
            {/*    {isBeforeStartVote ? 'Starts in' : 'Ends in'}{' '}*/}
            {/*    <Countdown expiredTime={expiredTimeAt} />*/}
            {/*  </span>*/}
            {/*</p>*/}
          </Flex>
        )}
        <Text className={cx(s.status, s[status])}>
          {ProposalStatus[status as string]}
        </Text>
      </Flex>
    </a>
  );
};

export default ItemProposal;
