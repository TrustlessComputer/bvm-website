import s from './styles.module.scss';
import { Box, Button, Flex, SimpleGrid, Text, useSteps } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Lines from '@/interactive/Lines';
import Fade from '@/interactive/Fade';
import useAnimationStore from '@/stores/useAnimationStore';
import BuyForm from '@/modules/PublicSale/BuyForm';
import HeadingTextTyping from '@/modules/landing/Componets/HeadingTextTyping';
import LocalStorageUtil from '@/utils/localstorage';
import { KEY_VC_TYPE } from '@/constants/storage-key';
import { getVCInformation } from '@/services/player-share';
import { VCInfo } from '@/interfaces/vc';
import LeaderBoard from '@/modules/PublicSale/leaderBoard';
import Welcome from '@/modules/PublicSale/welcome';
import Playgame from '@/modules/PublicSale/playGame';
import AddMoreContribution from '@/modules/PublicSale/addMoreContribution';
import TopHeader from '@/modules/PublicSale/topHeader';

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
      <SimpleGrid className={`${s.content}`} gridTemplateColumns={["1fr", "1fr 1fr"]} gap={[6, 0]}>
        <Flex className={s.leftSection} direction={"column"} gap={[6, 6]} justifyContent={"flex-start"}>
          <TopHeader />
          <LeaderBoard />
          <AddMoreContribution />
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
