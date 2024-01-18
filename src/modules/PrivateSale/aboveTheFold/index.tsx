import s from './styles.module.scss';
import { Box, Button, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Lines from '@/interactive/Lines';
import Fade from '@/interactive/Fade';
import useAnimationStore from '@/stores/useAnimationStore';
import BuyForm from '@/modules/PrivateSale/BuyForm';
import HeadingTextTyping from '@/modules/landing/Componets/HeadingTextTyping';

const AboveTheFold = () => {
  const { setPlay } = useAnimationStore();

  useEffect(() => {
    setTimeout(setPlay, 400);
  }, []);

  return (
    <Flex direction={"column"} justifyContent={"space-between"} className={s.container} bgImg={`/private-sale/bg.webp`}>
      <SimpleGrid className={`container ${s.content}`} gridTemplateColumns={["1fr", "1.25fr 1fr"]} gap={[6, 0]}>
        <Flex className={s.leftSection} direction={"column"} gap={[6, 6]} justifyContent={"center"}>
          <Text className={s.title}>
            <HeadingTextTyping
              first={'Hello '}
              last={''}
              headings={[
                '#name',
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
            <Lines delay={1.4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Lines>
          </Box>
          <Flex gap={6} direction={["column", "row"]}>
            <Fade delay={1.5}>
              <Button className={s.downloadBtn}>
                Losem
              </Button>
            </Fade>
            <Fade delay={1.6}>
              <Flex alignItems={"center"} gap={2}>
                <Button className={s.buildBtn}>Explore the docs</Button>
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
            <BuyForm />
          </Flex>
        </Flex>
      </SimpleGrid>
    </Flex>
  );
};

export default AboveTheFold;
