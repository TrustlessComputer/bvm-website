import MainLayout from '@/layouts/MainLayout';
import { LaunchpadContext } from '@/Providers/LaunchpadProvider';
import { Box } from '@chakra-ui/react';
import React, { useContext } from 'react';
import s from './styles.module.scss';
import AboveTheFold from './aboveTheFold';
import Phases from './phases';
import dayjs from 'dayjs';
import { compareString } from '@/utils/string';
import { ELaunchpadStatus } from '../../services/launchpad.interfaces';
import ContentPreLaunch from './content/Content.PreLaunch';
import ContentIDO from './content/Content.IDO';

const LaunchpadDetailCommon = () => {
  const { currentLaunchpad } = useContext(LaunchpadContext);

  const renderContent = () => {
    if (
      compareString(currentLaunchpad?.status, ELaunchpadStatus.prelaunch) ||
      dayjs().isBefore(dayjs(currentLaunchpad?.pre_launch_end_date))
    ) {
      return <ContentPreLaunch />;
    } else {
      return <ContentIDO />;
    }
  };

  return (
    <MainLayout>
      <Box className={s.container}>
        <Phases />
        <Box className={s.content}>
          <AboveTheFold />
          {renderContent()}
        </Box>
      </Box>
    </MainLayout>
  );
};

export default LaunchpadDetailCommon;
