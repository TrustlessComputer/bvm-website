import s from './styles.module.scss';
import { Flex, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useAnimationStore from '@/stores/useAnimationStore';
import BuyForm from '@/modules/PublicSale/BuyForm';
import LocalStorageUtil from '@/utils/localstorage';
import { KEY_VC_TYPE } from '@/constants/storage-key';
import { getVCInformation } from '@/services/player-share';
import { VCInfo } from '@/interfaces/vc';
import LeaderBoardVisual from '@/modules/PublicSale/leaderBoardVisual';
import useWindowSize from '@/hooks/useWindowSize';
import DailyReward from '@/modules/PublicSale/dailyReward';
import ActivitiesVer2 from '@/modules/PublicSale/activities/AcitivitiesVer2';
import LuckyMoneyShare from '@/modules/PublicSale/luckyMoneyShare';
import EngageWithTeam from '@/modules/PublicSale/engageWithTeam';

const AboveTheFold = () => {
  const { setPlay } = useAnimationStore();
  const vcType = LocalStorageUtil.get(KEY_VC_TYPE);
  const [vcInfo, setVCInfo] = useState<VCInfo>();
  const { mobileScreen } = useWindowSize();

  useEffect(() => {
    setTimeout(setPlay, 400);
  }, []);

  useEffect(() => {
    if (vcType) {
      getVCInfo(vcType as string);
    }
  }, [vcType]);

  const getVCInfo = async (id: string) => {
    const res = await getVCInformation({ vc_type: id });
    setVCInfo(res);
  };

  return (
    <Flex
      direction={'column'}
      justifyContent={'space-between'}
      className={s.container}
    >
      <SimpleGrid
        className={`${s.content}`}
        gridTemplateColumns={{ lg: '1fr', xl: '6.5fr 3.5fr' }}
        gap={[0, '40px']}
      >
        <Flex
          className={s.leftSection}
          direction={'column'}
          justifyContent={'flex-start'}
        >
          <LeaderBoardVisual />
          {/*<AddMoreContribution />*/}
          <DailyReward />
          {/*<HourlyReward />*/}
          {/*<LeaderBoardSwitch classNames={s.boardSwitch} />*/}
          {mobileScreen && <ActivitiesVer2 />}
        </Flex>
        <Flex className={s.rightSection} direction={'column'}>
          <BuyForm vcInfo={vcInfo} />
          <LuckyMoneyShare />
          <EngageWithTeam />
          {/*<Welcome />*/}
          {/*<Playgame />*/}
          {!mobileScreen && <ActivitiesVer2 />}
        </Flex>
      </SimpleGrid>
    </Flex>
  );
};

export default AboveTheFold;
