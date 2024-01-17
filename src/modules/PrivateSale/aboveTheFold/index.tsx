import s from './styles.module.scss';
import { Box, Button, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { CDN_URL_IMAGES } from '@/config';
import React, { useEffect } from 'react';
import Lines from '@/interactive/Lines';
import Fade from '@/interactive/Fade';
import Countdown from '@/components/Countdown';
import dayjs from 'dayjs';
import { formatCurrency } from '@/utils/format';
import useAnimationStore from '@/stores/useAnimationStore';
import BuyForm from '@/modules/PrivateSale/BuyForm';

const AboveTheFold = () => {
  const { setPlay } = useAnimationStore();

  useEffect(() => {
    setTimeout(setPlay, 400);
  }, []);

  return (
    <Flex direction={"column"} justifyContent={"space-between"} className={s.container} bgImage={`${CDN_URL_IMAGES}/home3/top_4.webp`}>
      <SimpleGrid className={s.content} gridTemplateColumns={["1fr", "1.25fr 1fr"]} gap={[6, 0]}>
        <Flex className={s.leftSection} direction={"column"} gap={[6, 6]} justifyContent={"center"}>
          <Text className={s.title}>
            Welcome VENTURE CAPTITAL 1
          </Text>
          <Box className={s.desc}>
            <Lines delay={1.2}>
              Spend real fights effective anything extra by leading. Mouthwatering leading how real formula also locked-in have can mountain thought. Jumbo plus shine sale.
            </Lines>
          </Box>
          <Flex gap={6} direction={["column", "row"]}>
            <Fade delay={1.5}>
              <Button className={s.downloadBtn}>
                Download Naka Genesis
              </Button>
            </Fade>
            <Fade delay={1.6}>
              <Button className={s.buildBtn}>Build on Bitcoin</Button>
            </Fade>
          </Flex>
        </Flex>
        <Flex className={s.rightSection} justifyContent={["center", "flex-end"]} alignItems={"flex-end"}>
          <Flex className={s.btnJoinWrapper} direction={"column"}>
            <Text className={s.launchText}>End in</Text>
            <Text>Total raised: ${formatCurrency(1234567, 2, 8, 'BTC', true)}</Text>
            <Box>
              <Countdown className={s.textCountdown} expiredTime={dayjs.utc('2024-01-26', 'YYYY-MM-DD').toString()} hideIcon={true}/>
            </Box>
            <Text>Price: $0.0001 / 1 BVM</Text>
            <BuyForm />
          </Flex>
        </Flex>
      </SimpleGrid>
    </Flex>
  );
};

export default AboveTheFold;
