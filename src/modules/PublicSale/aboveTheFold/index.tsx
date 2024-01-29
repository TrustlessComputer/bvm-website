import s from './styles.module.scss';
import { Flex, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useAnimationStore from '@/stores/useAnimationStore';
import BuyForm from '@/modules/PublicSale/BuyForm';
import LocalStorageUtil from '@/utils/localstorage';
import { KEY_VC_TYPE } from '@/constants/storage-key';
import { getVCInformation } from '@/services/player-share';
import { VCInfo } from '@/interfaces/vc';
import Welcome from '@/modules/PublicSale/welcome';
import Playgame from '@/modules/PublicSale/playGame';
import AddMoreContribution from '@/modules/PublicSale/addMoreContribution';
import LeaderBoardVisual from '@/modules/PublicSale/leaderBoardVisual';
import RaffleButton from '@/modules/PublicSale/raffleButton';
import TopContent from '@/modules/PublicSale/topContent';
import LeaderBoardSwitch from '@/modules/PublicSale/leaderBoardSwitch';

const AboveTheFold = () => {
  const { setPlay } = useAnimationStore();
  const vcType = LocalStorageUtil.get(KEY_VC_TYPE);
  const [vcInfo, setVCInfo] = useState<VCInfo>();

  useEffect(() => {
    setTimeout(setPlay, 400);
  }, []);

  useEffect(() => {
    if(vcType) {
      getVCInfo(vcType as string);
    }
  }, [vcType]);

  const getVCInfo = async (id: string) => {
    const res = await getVCInformation({ vc_type: id });
    setVCInfo(res);
  }

  return (
    <Flex direction={"column"} justifyContent={"space-between"} className={s.container} bgImg={`/private-sale/bg.webp`}>
      <SimpleGrid className={`${s.content}`} gridTemplateColumns={{ lg: "1fr", xl: "7fr 3fr" }} gap={[0, 0]}>
        <Flex className={s.leftSection} direction={"column"} justifyContent={"flex-start"}>
          <TopContent />
          <LeaderBoardVisual />
          {/*<AddMoreContribution />*/}
          <RaffleButton className={s.raffleButton}/>
          <LeaderBoardSwitch classNames={s.boardSwitch} />
        </Flex>
        <Flex className={s.rightSection} direction={"column"}>
          <BuyForm vcInfo={vcInfo}/>
          <Welcome />
          <Playgame />
        </Flex>
      </SimpleGrid>
    </Flex>
  );
};

export default AboveTheFold;
