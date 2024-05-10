'use client';

import Loader from '@/modules/builder-landing/Loader';
import { TEXT_DIRTY_CONFIG } from '@/constants/constants';
import CProposal from '@/contract/proposal';
import { BVM_GOVERNOR_ADDRESS } from '@/contract/proposal/configs';
import { ProposalType } from '@/contract/proposal/proposal.interface';
import {
  NakaConnectContext,
  INakaConnectContext,
} from '@/Providers/NakaConnectProvider';
import { getProposalDetail } from '@/services/governor';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { requestReload } from '@/stores/states/common/reducer';
import { commonSelector } from '@/stores/states/common/selector';
import { nakaAddressSelector } from '@/stores/states/user/selector';
import { formatCurrency } from '@/utils/format';
import { compareString, formatAddressCenter } from '@/utils/string';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import cx from 'clsx';
import { formatEther } from 'ethers/lib/utils';
import moment from 'moment';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import sanitizeHtml from 'sanitize-html';
import { ProposalStatus } from '../Vote/Proposals/ListProposal/ItemProposal';
import Countdown from './Countdown';
import ProposalCancel from './ProposalCancel';
import ProposalSide from './ProposalSide';
import s from './styles.module.scss';
import InfoTooltip from '@/components/Form/InfoTooltip';

const VoteDetail = () => {
  const params = useParams();
  const proposalId = params?.id;
  const dispatch = useAppDispatch();
  const address = useAppSelector(nakaAddressSelector);

  const { getConnector } = useContext(
    NakaConnectContext,
  ) as INakaConnectContext;

  const needReload = useAppSelector(commonSelector).needReload;
  const proposalContract = useRef(new CProposal()).current;

  const [proposalDetail, setProposalDetail] = useState<any>(null);
  const [voteValue, setVoteValue] = useState('');
  const [proposalData, setProposalData] = useState<any>(null);

  const [submitting, setSubmitting] = useState(false);

  const [shardBalance, setShardBalance] = useState('0');

  useEffect(() => {
    if (address) getShardBalance();
  }, [address]);

  const getShardBalance = async () => {
    try {
      const balance = await proposalContract.getShardBalance(address);
      setShardBalance(balance);
    } catch (error) {}
  };

  useEffect(() => {
    if (proposalId) {
      fetchProposalDetail();
    }
  }, [proposalId, needReload]);

  const fetchProposalDetail = async () => {
    if (!proposalId) return;
    try {
      const data = await getProposalDetail(proposalId as string);
      setProposalDetail(data);
      if (data && data?.proposal) {
        const propoData = await proposalContract.getCreateProposalData(
          data?.proposal.calldatas
            ? JSON.parse(data?.proposal.calldatas)[0]
            : '',
        );
        setProposalData(propoData);
      }
    } catch (error) {}
  };

  const voteProposalAble = useMemo(() => {
    return Number(shardBalance) > 0;
  }, [shardBalance]);

  const allowVote = useMemo(() => {
    return (
      voteProposalAble &&
      moment().isAfter(moment(proposalDetail?.proposal?.vote_start_at)) &&
      moment().isBefore(moment(proposalDetail?.proposal?.vote_end_at))
    );
  }, [proposalDetail, voteProposalAble]);

  const isBeforeStartVote = useMemo(() => {
    return moment().isBefore(moment(proposalDetail?.proposal?.vote_start_at));
  }, [proposalDetail]);

  const isAfterEndVote = useMemo(() => {
    return moment().isAfter(moment(proposalDetail?.proposal?.vote_end_at));
  }, [proposalDetail]);

  const expiredTimeAt = useMemo(() => {
    if (moment().isBefore(moment(proposalDetail?.proposal?.vote_start_at))) {
      return proposalDetail?.proposal?.vote_start_at;
    } else {
      return proposalDetail?.proposal?.vote_end_at;
    }
  }, [proposalDetail]);

  const isEndProposal = useMemo(() => {
    return (
      proposalDetail?.proposal &&
      proposalDetail?.proposal?.vote_end_at &&
      proposalDetail?.proposal?.status === 'new' &&
      moment().isAfter(moment(proposalDetail?.proposal?.vote_end_at))
    );
  }, [proposalDetail]);

  const status = useMemo(() => {
    return isEndProposal ? 'end' : proposalDetail?.proposal?.status;
  }, [proposalDetail, isEndProposal]);

  const proposer = useMemo(() => {
    return proposalDetail?.proposal?.proposer;
  }, [proposalDetail]);

  useEffect(() => {
    if (proposalDetail?.proposal?.voted) {
      setVoteValue(proposalDetail?.proposal?.voted_support);
    }
  }, [JSON.stringify(proposalDetail)]);

  const onSubmit = async (value: string) => {
    try {
      if (!proposalDetail) return;
      const connector = getConnector();
      setSubmitting(true);
      setVoteValue(value);
      const calldata = proposalContract.voteProposalCalldata({
        proposalId: proposalDetail?.proposal?.proposal_id,
        value,
      });
      await connector.requestSign({
        calldata,
        target: 'popup',
        to: BVM_GOVERNOR_ADDRESS || '',
        functionType: 'Vote proposal',
        chainType: 'NAKA',
      });
      toast.success('Vote proposal successfully!');
      dispatch(requestReload());
    } catch (e) {
      console.log('Voting Proposal', e);
    } finally {
      setSubmitting(false);
    }
  };

  const getDescription = (data: any) => {
    try {
      if (data || data.description) {
        const _data = JSON.parse(data.description as string);
        return _data.desc;
      }
    } catch (error) {
      return data?.description || '';
    }
  };

  const getTitle = (data: any) => {
    try {
      if (data || data.description) {
        const _data = JSON.parse(data.description as string);
        return _data.title;
      }
    } catch (error) {
      return data?.title || '';
    }
  };

  const getProposalType = (data: any): ProposalType => {
    try {
      if (data || data.description) {
        const _data = JSON.parse(data.description as string);
        switch (Number(_data?.proposalType)) {
          case 0:
            return ProposalType.project;
          default:
            return ProposalType.marketing;
        }
      }
      return ProposalType.marketing;
    } catch (error) {
      return ProposalType.marketing;
    }
  };

  const getInfoLaunchpad = (data: any) => {
    try {
      if (data || data.description) {
        const _data = JSON.parse(data.description as string);
        return {
          presalePercent: _data.presalePercent,
          hardcap: _data.hardcap,
          liquidityPercent: _data.liquidityPercent,
          vesting: _data.vesting,
        };
      }
    } catch (error) {
      return undefined;
    }
  };

  const renderCountdown = React.useCallback(() => {
    return (
      <Text className={cx(s.status, s[status])} whiteSpace="pre">
        {ProposalStatus[status as string]}
        {status === 'new' && !isAfterEndVote && (
          <span>
            &nbsp;{' | '}&nbsp;
            {isBeforeStartVote ? 'Voting starts' : 'Voting ends in'}{' '}
            <Countdown expiredTime={expiredTimeAt} />
          </span>
        )}
      </Text>
    );
  }, [expiredTimeAt, status, isAfterEndVote]);

  if (!proposalDetail) return <Loader />;

  const infoLaunchPad = getInfoLaunchpad(proposalDetail?.proposal);

  const isProposalProject =
    getProposalType(proposalDetail?.proposal) === ProposalType.project;

  const isVotedAgain = proposalDetail?.votes['0']?.find((data: any) =>
    compareString(data?.voter_address, address),
  );
  const isVotedFor = proposalDetail?.votes['1']?.find((data: any) =>
    compareString(data?.voter_address, address),
  );
  const isVoted = isVotedFor || isVotedAgain;

  const totalVote =
    Number(proposalDetail?.total_support_weight) +
    Number(proposalDetail?.total_unsupport_weight);

  return (
    <Box className={s.container}>
      <Box className={s.wContainer}>
        <Box className={s.content}>
          <Flex
            direction={{ base: 'row', lg: 'row' }}
            w="100%"
            gap="16px"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex alignItems="center" gap="8px">
              <a href="/proposal-dashboard" className={s.btnBack}>
                ←
              </a>
              <p className={s.title}>
                Proposal <span>#{proposalId}</span>
              </p>
              {renderCountdown()}
            </Flex>
            <ProposalCancel
              walletAddress={address || ''}
              proposalDetail={proposalDetail}
              proposalData={proposalData}
              proposalType={getProposalType(proposalDetail?.proposal)}
            />
          </Flex>

          <Flex direction="column" gap="8px" w="100%" mt="8px">
            <p className={s.desc}>{getTitle(proposalDetail?.proposal)}</p>
            <Flex
              display="grid"
              mt="6px"
              gridTemplateColumns="1fr 1fr"
              gap="6px"
              w="fit-content"
            >
              <p className={s.proposedBy}>
                Proposed by{' '}
                <a
                  target="_blank"
                  href={`https://explorer.nakachain.xyz/address/${proposer?.address}`}
                >
                  {formatAddressCenter(proposer?.address)}
                </a>
              </p>
              <p className={s.proposedBy}>
                Purpose{' '}
                <span>
                  {isProposalProject
                    ? 'New launchpad proposal'
                    : 'Funding request for BVM community growth'}
                </span>
              </p>
              {!isProposalProject && proposalData.length > 1 && (
                <p className={s.proposedBy}>
                  Requested amount{' '}
                  <span>
                    {formatCurrency(formatEther(proposalData[1]), 0, 0)} BVM
                  </span>
                </p>
              )}
              {!isProposalProject && proposalData.length > 1 && (
                <p className={s.proposedBy}>
                  Recipient address{' '}
                  <a
                    target="_blank"
                    href={`https://explorer.nakachain.xyz/address/${proposalData[0]}`}
                  >
                    {formatAddressCenter(proposalData[0])}
                  </a>
                </p>
              )}
            </Flex>
            {isProposalProject &&
              infoLaunchPad &&
              infoLaunchPad.presalePercent && (
                <Flex
                  display="grid"
                  gap="12px"
                  mt="8px"
                  gridTemplateColumns={{
                    lg: '1fr 1fr 1fr 1fr',
                    base: '1fr 1fr',
                  }}
                >
                  <div className={s.supply}>
                    <p className={s.supplyTitle}>Token presale percentage</p>
                    <p className={s.supplyValue}>
                      {formatCurrency(
                        infoLaunchPad?.presalePercent,
                        0,
                        0,
                        '',
                        true,
                      )}
                      %
                    </p>
                  </div>

                  <div className={s.supply}>
                    <p className={s.supplyTitle}>Hardcap</p>
                    <p className={s.supplyValue}>
                      {infoLaunchPad?.hardcap &&
                      Number(infoLaunchPad?.hardcap) > 0
                        ? formatCurrency(
                            infoLaunchPad.hardcap,
                            0,
                            0,
                            '',
                            true,
                          ) + ' USD'
                        : 'Without hardcap'}
                    </p>
                  </div>

                  <div className={s.supply}>
                    <Flex direction="row" gap="4px" alignItems="center">
                      <p className={s.supplyTitle}>Liquidity percentage</p>
                      <InfoTooltip
                        iconSize="sm"
                        placement="top-start"
                        label="This allocation can help ensure that there is enough liquidity available for traders to buy and sell the token without experiencing significant price slippage"
                      />
                    </Flex>

                    <p className={s.supplyValue}>
                      {infoLaunchPad.liquidityPercent}%
                    </p>
                  </div>

                  <div className={s.supply}>
                    <p className={s.supplyTitle}>Vesting fund</p>
                    <p className={s.supplyValue}>
                      {infoLaunchPad.vesting} months
                    </p>
                  </div>
                </Flex>
              )}
          </Flex>

          <Flex
            direction="row"
            gap={{ base: '16px', lg: '24px' }}
            w="100%"
            mt={{ lg: '24px', base: '16px' }}
          >
            <ProposalSide
              title={'For'}
              currentVote={proposalDetail?.total_support_weight}
              totalVote={totalVote <= 0 ? 1 : totalVote}
              data={proposalDetail?.votes['1']}
              className={cx(s.sideWrapper, s.sideFor)}
              subElement={() => {
                return (
                  <>
                    {allowVote && (
                      <Button
                        isDisabled={
                          submitting ||
                          !allowVote ||
                          isVoted ||
                          status !== 'new'
                        }
                        isLoading={submitting && voteValue === '1'}
                        loadingText={'Voting...'}
                        onClick={() => onSubmit('1')}
                        className={cx(s.btnFor, isVoted ? s.voted : '')}
                        _hover={{ bg: 'inset', opacity: 0.8 }}
                      >
                        {isVotedFor ? 'You voted "FOR"' : 'FOR'}
                      </Button>
                    )}
                  </>
                );
              }}
            />
            <ProposalSide
              title={'Against'}
              currentVote={proposalDetail?.total_unsupport_weight}
              totalVote={totalVote <= 0 ? 1 : totalVote}
              data={proposalDetail?.votes['0']}
              className={cx(s.sideWrapper, s.sideAgainst)}
              subElement={() => {
                return (
                  <>
                    {allowVote && (
                      <Button
                        isDisabled={
                          submitting ||
                          !allowVote ||
                          isVoted ||
                          status !== 'new'
                        }
                        isLoading={submitting && voteValue === '0'}
                        loadingText={'Voting...'}
                        onClick={() => onSubmit('0')}
                        className={cx(s.btnAgainst, isVoted ? s.voted : '')}
                        _hover={{ bg: 'inset', opacity: 0.8 }}
                      >
                        {isVotedAgain ? 'You voted "AGAINST"' : 'AGAINST'}
                      </Button>
                    )}
                  </>
                );
              }}
            />
          </Flex>

          <Flex
            className={s.descContent}
            mt={{ lg: '60px', base: '40px' }}
            mb="80px"
            gap="16px"
            direction="column"
          >
            <p className={s.headingDesc}>Description</p>
            <div
              className={s.contentDesc}
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(
                  getDescription(proposalDetail?.proposal),
                  TEXT_DIRTY_CONFIG,
                ),
              }}
            />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default VoteDetail;
