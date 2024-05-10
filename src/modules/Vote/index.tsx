'use client';

import { Box } from '@chakra-ui/react';
import s from './styles.module.scss';
import Treasury from './Treasury';
import Proposals from './Proposals';
import StakingVote from './Staking';
import React, { useEffect, useRef, useState } from 'react';
import CProposal from '@/contract/proposal';
import Loader from '@/modules/builder-landing/Loader';
import MainLayout from '@layouts/MainLayout';

const VoteModule = () => {
  const [minimunShardToSubmit, setMinimunShardToSubmit] =
    useState<number>(1000);

  const proposalContract = useRef(new CProposal()).current;

  useEffect(() => {
    getMinimunShardToCreateProposal();
  }, []);

  const getMinimunShardToCreateProposal = async () => {
    try {
      const data = await proposalContract.getMinimunShardToSubmitProposal();
      setMinimunShardToSubmit(Number(data));
    } catch (error) {
      // TODO
    }
  };

  return (
    <MainLayout
      headerProps={{
        color: 'white',
      }}
    >
      <Loader />
      <Box className={s.container}>
        <Box className={s.content}>
          <Treasury minimunShardToSubmit={minimunShardToSubmit} />
          <StakingVote />
          <Proposals minimunShardToSubmit={minimunShardToSubmit} />
        </Box>
      </Box>
    </MainLayout>
  );
};

export default VoteModule;
