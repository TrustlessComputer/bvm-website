'use client';

import { Box } from '@chakra-ui/react';
import s from './styles.module.scss';
import TopContent from '@/modules/Launchpad/topContent';
import AboveTheFold from '@/modules/Launchpad/aboveTheFold';
import { useEffect } from 'react';
import { getLaunchpadDetail } from '@/services/launchpad';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { commonSelector } from '@/stores/states/common/selector';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';

const LaunchpadDetailModule = () => {
  const params = useParams();
  const id = params?.id;

  const needReload = useSelector(commonSelector).needReload;
  const {setCurrentLaunchpadDetail} = useLaunchpadContext();

  useEffect(() => {
    if(id) {
      getLaunchpadInfo(id as unknown as number);
    }
  }, [id, needReload]);

  const getLaunchpadInfo = async (id: number) => {
    const res = await getLaunchpadDetail({id: id});
    setCurrentLaunchpadDetail(res);
  }

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
