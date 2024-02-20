'use client';

import { Box } from '@chakra-ui/react';
import s from './styles.module.scss';
import TopContent from '@/modules/Launchpad/topContent';
import AboveTheFold from '@/modules/Launchpad/aboveTheFold';
import React, { useEffect } from 'react';
import { getLaunchpadDetail } from '@/services/launchpad';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { commonSelector } from '@/stores/states/common/selector';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import IntroVideos from '@/modules/PublicSale/IntroVideos';
import RoadmapModule from '@/modules/PublicSale/roadmap';
import Allocation from '@/modules/bvm_v2/Allocation';
import FAQContent from '@/modules/Whitelist/FAQContent';
import LuckyMoney from '@/modules/PublicSale/luckyMoney';

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
      <IntroVideos />
      <RoadmapModule />
      <Allocation />
      <FAQContent />
      <LuckyMoney />
    </Box>
  )
};

export default LaunchpadDetailModule;
