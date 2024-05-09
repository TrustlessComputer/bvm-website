import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import s from './styles.module.scss';
import SubmitProposalModal from '../SubmitProposalModal';
import CProposal from '@/contract/proposal';
import { STAKING_URL } from '@/constants/route-path';
import { useRouter } from 'next/navigation';
import useNakaAuthen from '@/hooks/useRequestNakaAccount';
import { useAppSelector } from '@/stores/hooks';
import { nakaAddressSelector } from '@/stores/states/user/selector';

const SubmitProposal = ({
  minimunShardToSubmit,
}: {
  minimunShardToSubmit: number;
}) => {
  const { requestAccount, isAuthen } = useNakaAuthen();
  const address = useAppSelector(nakaAddressSelector);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const proposalContract = useRef(new CProposal()).current;

  const [shardBalance, setShardBalance] = useState('0');
  const [loadingBalance, setLoadingBalance] = useState(false);

  const submitProposalAble = useMemo(() => {
    return Number(shardBalance) >= minimunShardToSubmit;
  }, [shardBalance, minimunShardToSubmit]);

  useEffect(() => {
    if (address) getShardBalance();
  }, [address]);

  const getShardBalance = async () => {
    try {
      setLoadingBalance(true);
      const balance = await proposalContract.getShardBalance(address);
      setShardBalance(balance);
    } catch (error) {
    } finally {
      setLoadingBalance(false);
    }
  };

  const onSubmitProposal = () => {
    if (isAuthen) {
      if (submitProposalAble) {
        onOpen();
      } else {
        router.push(STAKING_URL);
      }
    } else {
      requestAccount();
    }
  };

  if (loadingBalance) return <></>;

  return (
    <>
      <Flex
        className={s.wrapper}
        direction="row"
        alignItems="center"
        gap="16px"
      >
        {!isAuthen && (
          <p className={s.heading}>Connect wallet to make a proposal.</p>
        )}
        {isAuthen && !submitProposalAble && (
          <p className={s.heading}>
            A minimum of <span>{minimunShardToSubmit} SHARD</span> is required
            to submit proposals.
          </p>
        )}
        <Button
          minH="44px"
          fontSize="16px"
          bg={isAuthen && !submitProposalAble ? '#10C800' : '#fa4e0e'}
          color="#fff"
          borderRadius="100px"
          onClick={onSubmitProposal}
          _hover={{ bg: 'inset', opacity: 0.8 }}
        >
          {isAuthen
            ? submitProposalAble
              ? 'Submit Proposal'
              : 'Stake now'
            : 'Connect Wallet'}
        </Button>
      </Flex>
      <SubmitProposalModal isShow={isOpen} onClose={onClose} />
    </>
  );
};

export default SubmitProposal;
