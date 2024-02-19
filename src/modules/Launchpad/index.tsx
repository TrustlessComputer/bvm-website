'use client';

import { Box, Flex } from '@chakra-ui/react';
import s from './styles.module.scss';
import TopContent from '@/modules/Launchpad/topContent';

const LaunchpadDetailModule = () => {
  return (
    <Box className={s.container}>
      <TopContent />
    </Box>
  )
};

export default LaunchpadDetailModule;
