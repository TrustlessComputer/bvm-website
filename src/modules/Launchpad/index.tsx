'use client';

import { Box } from '@chakra-ui/react';
import s from './styles.module.scss';
import TopContent from '@/modules/Launchpad/topContent';
import AboveTheFold from '@/modules/Launchpad/aboveTheFold';

const LaunchpadDetailModule = () => {
  return (
    <Box className={s.container}>
      <Box className={'container'}>
        <TopContent />
        <AboveTheFold />
      </Box>
    </Box>
  )
};

export default LaunchpadDetailModule;
