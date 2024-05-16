import { PUBLIC_SALE_EAI_URL } from '@/constants/route-path';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { compareString } from '@/utils/string';
import { Box, Spinner } from '@chakra-ui/react';
import cx from 'clsx';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { LAUNCHPAD_DETAIL } from './constant';
import s from './styles.module.scss';
import DetailNaka from '@/modules/Launchpad/Launchpad.Detail/naka';
import DetailEternalAI from '@/modules/Launchpad/Launchpad.Detail/eternalAI';
import DetailSwamps from '@/modules/Launchpad/Launchpad.Detail/swamps';
import { useRouter } from 'next/navigation';
import LaunchpadDetailCommon from './detail/index';

const LaunchpadDetail = () => {
  const router = useRouter();
  const { loading, currentLaunchpad } = useLaunchpadContext();

  useEffect(() => {
    if (
      currentLaunchpad?.id === 2 &&
      (currentLaunchpad?.status === 'ido' ||
        currentLaunchpad?.status === 'ended') &&
      dayjs().isAfter(dayjs(currentLaunchpad?.pre_launch_end_date))
    ) {
      router.push(PUBLIC_SALE_EAI_URL);
    }
  }, [currentLaunchpad?.id]);

  const renderContent = useMemo(() => {
    if (compareString(currentLaunchpad?.id, LAUNCHPAD_DETAIL.NAKACHAIN)) {
      return <DetailNaka />;
    } else if (compareString(currentLaunchpad?.id, LAUNCHPAD_DETAIL.EAI)) {
      return <DetailEternalAI />;
    } else if (compareString(currentLaunchpad?.id, LAUNCHPAD_DETAIL.SWAMPS)) {
      return <DetailSwamps />;
    } else if (currentLaunchpad?.id) {
      return <LaunchpadDetailCommon />;
    }
    return <></>;
  }, [currentLaunchpad?.id]);

  if (loading) {
    return (
      <Box className={cx(s.container, s.loadingContainer)}>
        <Spinner color={'#FFFFFF'} />
      </Box>
    );
  }

  return renderContent;
};

export default LaunchpadDetail;
