import { Box } from '@chakra-ui/react';
import s from './styles.module.scss';
import React from 'react';
import LiveAndUpcomming from './Launchpad.List/liveAndUpcomming';

const LaunchpadModule = () => {
  return (
    <Box className={s.container}>
      <LiveAndUpcomming />
    </Box>
  );
};

export default LaunchpadModule;
