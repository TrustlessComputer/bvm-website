import s from './styles.module.scss';
import { Box, Button, Flex, SimpleGrid, Text, useSteps } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Lines from '@/interactive/Lines';
import Fade from '@/interactive/Fade';
import useAnimationStore from '@/stores/useAnimationStore';
import BuyForm from '@/modules/PrivateSale/BuyForm';
import HeadingTextTyping from '@/modules/landing/Componets/HeadingTextTyping';
import LocalStorageUtil from '@/utils/localstorage';
import { KEY_VC_TYPE } from '@/constants/storage-key';
import { getVCInformation } from '@/services/player-share';
import { VCInfo } from '@/interfaces/vc';

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
      <SimpleGrid className={`container ${s.content}`} gridTemplateColumns={["1fr", "1.25fr 1fr"]} gap={[6, 0]}>
        <Flex className={s.leftSection} direction={"column"} gap={[6, 6]} justifyContent={"flex-start"}>
          <Text className={s.title}>
            <HeadingTextTyping
              first={'Hello '}
              last={''}
              headings={[
                vcInfo?.name as string,
              ]}
              headingsStyles={[
                s.hightlight,
              ]}
            />
          </Text>
          <Box className={s.subTitle}>
            <Lines delay={1.2}>
              Welcome to <span className={s.hightlight}>the future of Bitcoin.</span>
            </Lines>
          </Box>
          <Box className={s.desc}>
            <Fade delay={1.4}>
              {vcInfo?.description as string}
            </Fade>
          </Box>
          <Flex gap={6} direction={["column", "row"]}>
            <Fade delay={1.5}>
              <Flex alignItems={"center"} gap={2}>
                <Button className={s.buildBtn} onClick={() => {
                  window.open('https://cdn.bvm.network/docs/deck.pdf', "_blank");
                }}>Deck</Button>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.59999 7.2L14.4 12L9.59999 16.8" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </Flex>
            </Fade>
            <Fade delay={1.6}>
              <Flex alignItems={"center"} gap={2}>
                <Button className={s.buildBtn} onClick={() => {
                  window.open('https://cdn.bvm.network/docs/onepager.pdf', "_blank");
                }}>One-pager</Button>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.59999 7.2L14.4 12L9.59999 16.8" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </Flex>
            </Fade>
          </Flex>
        </Flex>
        <Flex className={s.rightSection} justifyContent={["center", "flex-end"]} alignItems={"flex-end"}>
          <Flex className={s.btnJoinWrapper} direction={"column"}>
            <BuyForm vcInfo={vcInfo}/>
          </Flex>
        </Flex>
      </SimpleGrid>
    </Flex>
  );
};

export default AboveTheFold;
