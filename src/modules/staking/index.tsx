'use client';

import Loader from '@/modules/builder-landing/Loader';
import HeaderPoints from '@/modules/staking/components/HeaderPoints';
import StakeRole from '@/modules/staking/components/StakeRole';
import TeamPoints from '@/modules/staking/components/TeamPoints';
import useFetchStakingData from '@/modules/staking/hooks/useFetchStakingData';
import { useAppSelector } from '@/stores/hooks';
import { stakeUserSelector } from '@/stores/states/stakingV2/selector';
import { Box } from '@chakra-ui/react';
import MainLayout from '@layouts/MainLayout';
import styles from './styles.module.scss';

const StakingUser = () => {
  useFetchStakingData();

  const stakeUser = useAppSelector(stakeUserSelector);

  return (
    <MainLayout
      headerProps={{
        color: 'white',
        colorLogo: 'white',
        bgColor: 'black',
        theme: 'black',
      }}
    >
      <Loader />
      <Box className={`${styles.container} containerV3`}>
        <HeaderPoints />
        {stakeUser?.isHaveTeam ? <TeamPoints /> : <StakeRole />}
        {/* <MiningBox /> */}
        {/* <AirdropBox /> */}
        {/* <CurrentLaunchpad /> */}
        {/* <EternalSeeds /> */}
      </Box>
    </MainLayout>
  );
};

export default StakingUser;
