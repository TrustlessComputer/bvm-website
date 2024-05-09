import { Button, Flex } from '@chakra-ui/react';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import s from './styles.module.scss';
import CProposal from '@/contract/proposal';
import { STAKING_URL } from '@/constants/route-path';
import moment from 'moment';
import { compareString } from '@/utils/string';
import sleep from '@/utils/sleep';
import { ProposalType } from '@/contract/proposal/proposal.interface';
import { formatEther } from 'ethers/lib/utils';
import useNakaAuthen from '@/hooks/useRequestNakaAccount';
import { useAppDispatch } from '@/stores/hooks';
import { requestReload } from '@/stores/states/common/reducer';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { getError } from '@/utils/error';
import {
  INakaConnectContext,
  NakaConnectContext,
} from '@/Providers/NakaConnectProvider';
import { BVM_GOVERNOR_ADDRESS } from '@/contract/proposal/configs';

const ProposalVote = ({
  proposalDetail,
  walletAddress,
  proposalData,
  proposalType,
}: {
  proposalDetail: any;
  walletAddress: string;
  proposalData: any;
  proposalType: ProposalType;
}) => {
  const { requestAccount, isAuthen } = useNakaAuthen();
  const { getConnector } = useContext(
    NakaConnectContext,
  ) as INakaConnectContext;

  const router = useRouter();
  const dispatch = useAppDispatch();

  const proposalContract = useRef(new CProposal()).current;
  const [isAdmin, setIsAdmin] = useState(false);

  const [shardBalance, setShardBalance] = useState('0');
  const [loadingBalance, setLoadingBalance] = useState(false);

  const [canceling, setCanceling] = useState(false);

  const voteProposalAble = useMemo(() => {
    return Number(shardBalance) > 0;
  }, [shardBalance]);

  const allowCancel = useMemo(() => {
    return (
      compareString(
        walletAddress,
        proposalDetail?.proposal?.proposer?.address,
      ) &&
      moment().isBefore(moment(proposalDetail?.proposal?.vote_start_at)) &&
      proposalDetail?.proposal?.status !== 'cancel'
    );
  }, [proposalDetail, walletAddress]);

  const allowAdminCancel = useMemo(() => {
    return (
      isAdmin &&
      moment().isBefore(moment(proposalDetail?.proposal?.vote_end_at)) &&
      proposalDetail?.proposal?.status !== 'cancel'
    );
  }, [isAdmin, proposalDetail]);

  useEffect(() => {
    if (walletAddress) getShardBalance();
  }, [walletAddress]);

  useEffect(() => {
    if (walletAddress) checkAdmin(walletAddress);
  }, [walletAddress]);

  const checkAdmin = async (address: string) => {
    try {
      const data = await proposalContract.isAdmin(address);
      setIsAdmin(data);
    } catch (error) {}
  };

  const getShardBalance = async () => {
    try {
      setLoadingBalance(true);
      const balance = await proposalContract.getShardBalance(walletAddress);
      setShardBalance(balance);
    } catch (error) {
    } finally {
      setLoadingBalance(false);
    }
  };

  const onSubmitProposal = () => {
    if (isAuthen) {
      if (!voteProposalAble) {
        router.push(STAKING_URL);
      }
    } else {
      requestAccount();
    }
  };

  const onCancelProposal = async () => {
    try {
      const connector = getConnector();
      setCanceling(true);
      const proposal = proposalDetail?.proposal;
      const calldata = proposalContract.creatorCancelProposalCalldata({
        proposalType,
        receipient: proposalData[0],
        amount: formatEther(proposalData[1]),
        description: proposal?.description,
      });
      await connector.requestSign({
        calldata,
        target: 'popup',
        to: BVM_GOVERNOR_ADDRESS || '',
        functionType: 'Cancel proposal',
        chainType: 'NAKA',
      });
      await sleep(1);
      toast.success('Cancel proposal successfully!');
      dispatch(requestReload());
    } catch (error: any) {
      toast.error(getError(error).message);
    } finally {
      setCanceling(false);
    }
  };

  const onAdminCancelProposal = async () => {
    try {
      const connector = getConnector();
      setCanceling(true);
      const proposal = proposalDetail?.proposal;
      const calldata = proposalContract.adminCancelProposalCalldata({
        calldatas: proposal?.calldatas,
        targets: proposal?.targets,
        values: proposal?.values,
        description: proposal?.description,
      });
      await connector.requestSign({
        calldata,
        target: 'popup',
        to: BVM_GOVERNOR_ADDRESS || '',
        functionType: 'Cancel proposal',
        chainType: 'NAKA',
      });
      await sleep(1);
      toast.success('Cancel proposal successfully!');
      dispatch(requestReload());
    } catch (error) {
      toast.error(getError(error).message);
    } finally {
      setCanceling(false);
    }
  };

  if (loadingBalance) return <></>;

  if (isAuthen && allowAdminCancel) {
    return (
      <Flex
        className={s.wrapper}
        maxW="35%"
        direction="row"
        alignItems="flex-start"
        justifyContent="flex-end"
        gap="16px"
      >
        <Button
          isLoading={canceling}
          loadingText="Canceling..."
          minW="110px"
          minH="40px"
          fontSize="14px"
          bg="#000"
          color="#fff"
          borderRadius="100px"
          onClick={onAdminCancelProposal}
        >
          {'CANCEL PROPOSAL'}
        </Button>
      </Flex>
    );
  }

  if (isAuthen && voteProposalAble) {
    return (
      <Flex
        className={s.wrapper}
        maxW="35%"
        direction="row"
        alignItems="flex-start"
        justifyContent="flex-end"
        gap="16px"
      >
        {allowCancel && (
          <Button
            isLoading={canceling}
            loadingText="Canceling..."
            minW="110px"
            minH="40px"
            fontSize="14px"
            bg="#000"
            color="#fff"
            borderRadius="100px"
            onClick={onCancelProposal}
            _hover={{ bg: 'inset', opacity: 0.8 }}
          >
            {'CANCEL PROPOSAL'}
          </Button>
        )}
      </Flex>
    );
  }

  return (
    <>
      <Flex
        className={s.wrapper}
        maxW="50%"
        w="100%"
        direction="row"
        justifyContent="flex-end"
        alignItems={{ base: 'flex-start', lg: 'center' }}
        gap="16px"
      >
        {!isAuthen && <p className={s.heading}>Connect wallet to vote.</p>}
        {isAuthen && !voteProposalAble && (
          <p className={s.heading}>Voting is only open to SHARD holders.</p>
        )}
        {!voteProposalAble && (
          <Button
            minW="110px"
            minH="40px"
            textTransform="uppercase"
            fontSize="14px"
            bg={isAuthen ? '#10C800' : '#000'}
            color="#fff"
            borderRadius="100px"
            _hover={{ bg: 'inset', opacity: 0.8 }}
            onClick={onSubmitProposal}
          >
            {isAuthen ? 'Stake BVM now' : 'Connect wallet'}
          </Button>
        )}
      </Flex>
    </>
  );
};

export default ProposalVote;
