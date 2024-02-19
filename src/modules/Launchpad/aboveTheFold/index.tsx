import s from './styles.module.scss';
import { Flex, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import useAnimationStore from '@/stores/useAnimationStore';
import LeaderBoardVisual from '@/modules/PublicSale/leaderBoardVisual';
import LaunchpadBuyForm from '@/modules/Launchpad/BuyForm';

const AboveTheFold = () => {
  const { setPlay } = useAnimationStore();

  useEffect(() => {
    setTimeout(setPlay, 400);
  }, []);

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
        </Flex>
        <Flex className={s.rightSection} direction={'column'}>
          <LaunchpadBuyForm />
        </Flex>
      </SimpleGrid>
    </Flex>
  );
};

export default AboveTheFold;
