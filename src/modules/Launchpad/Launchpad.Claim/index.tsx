'use client';

import { Box, Spinner } from '@chakra-ui/react';
import { useCallback } from 'react';
import s from './styles.module.scss';
import { compareString } from '@/utils/string';
import { LAUNCHPAD_DETAIL } from '@/modules/Launchpad/Launchpad.Detail/constant';
import cx from 'classnames';
import LaunchpadClaimNaka from '@/modules/Launchpad/Launchpad.Claim/naka';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';

const LaunchpadClaimModule = () => {
  const { loading, currentLaunchpad } = useLaunchpadContext();

  const renderContent = useCallback(() => {
    if (compareString(currentLaunchpad?.id, LAUNCHPAD_DETAIL.NAKACHAIN)) {
      return <LaunchpadClaimNaka />;
      // } else if (compareString(currentLaunchpad?.id, LAUNCHPAD_DETAIL.EAI)) {
      //   return <LaunchpadClaimEternalAI />;
      // } else if (compareString(currentLaunchpad?.id, LAUNCHPAD_DETAIL.SWAMPS)) {
      //   return <LaunchpadClaimSwamps />;
    }
    return <></>;
  }, [currentLaunchpad?.id]);

  return (
    <>
      {loading ? (
        <Box className={cx(s.container, s.loadingContainer)}>
          <Spinner color={'#000'} />
        </Box>
      ) : (
        <>{renderContent()}</>
      )}
    </>
  );
};

export default LaunchpadClaimModule;
