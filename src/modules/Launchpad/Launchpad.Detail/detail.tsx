import { PUBLIC_SALE_EAI_URL } from '@/constants/route-path';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { compareString } from '@/utils/string';
import { Box, Spinner } from '@chakra-ui/react';
import cx from 'clsx';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { LAUNCHPAD_DETAIL } from './constant';
import s from './styles.module.scss';
import DetailNaka from '@/modules/Launchpad/Launchpad.Detail/naka';
import DetailEternalAI from '@/modules/Launchpad/Launchpad.Detail/eternalAI';
import DetailSwamps from '@/modules/Launchpad/Launchpad.Detail/swamps';
import { useRouter } from 'next/navigation';

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

  if (loading) {
    return (
      <Box className={cx(s.container, s.loadingContainer)}>
        <Spinner color={'#FFFFFF'} />
      </Box>
    );
  }

  if (compareString(currentLaunchpad?.id, LAUNCHPAD_DETAIL.NAKACHAIN)) {
    return <DetailNaka />;
  } else if (compareString(currentLaunchpad?.id, LAUNCHPAD_DETAIL.EAI)) {
    return <DetailEternalAI />;
  } else if (compareString(currentLaunchpad?.id, LAUNCHPAD_DETAIL.SWAMPS)) {
    return <DetailSwamps />;
  }
  return <></>;
};

export default LaunchpadDetail;
