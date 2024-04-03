'use client';

import { useAppSelector } from '@/stores/hooks';
import { stakeUserSelector } from '@/stores/states/stakingV2/selector';
import MainLayout from '@layouts/MainLayout';
import Loader from '@/modules/builder-landing/Loader';
import React from 'react';
import styles from './styles.module.scss';
import useFetchStakingData from '@/modules/staking/hooks/useFetchStakingData';
import HeaderPoints from '@/modules/staking/components/HeaderPoints';
import TeamPoints from '@/modules/staking/components/TeamPoints';
import StakeRole from '@/modules/staking/components/StakeRole';
import MiningBox from '@/modules/staking/components/MiningBox';
import AirdropBox from '@/modules/staking/components/AirdropBox';
import CurrentLaunchpad from '@/modules/staking/components/CurrentLaunchpad';
import EternalSeeds from '@/modules/staking/components/EternalSeeds';
import { Box } from '@chakra-ui/react';

const StakingUser = () => {
  useFetchStakingData()

  const stakeUser = useAppSelector(stakeUserSelector);

  return (
    <MainLayout
      headerProps={{
        color: 'white',
      }}
    >
      <Loader />
      <Box className={styles.container} bgColor="rgba(15, 15, 15, 1)">
        <HeaderPoints />
        {stakeUser?.isHaveTeam ? <TeamPoints /> : <StakeRole />}
        <MiningBox />
        <AirdropBox />
        <CurrentLaunchpad />
        <EternalSeeds />
      </Box>
    </MainLayout>
  )
};

export default StakingUser;
