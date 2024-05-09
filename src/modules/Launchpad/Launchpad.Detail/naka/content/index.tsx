import { GridItem, SimpleGrid } from '@chakra-ui/react';
import s from './styles.module.scss';
import React from 'react';
import LeaderBoard from './leaderBoard';
import BuyTicket from '@/modules/Launchpad/Launchpad.Detail/naka/idoPhase/BuyTicket';
import { isDesktop } from 'react-device-detect';

const Content = () => {
  return (
    <SimpleGrid
      columns={[1, 2]}
      gridTemplateColumns={[
        '1fr 1fr',
        '1fr 1fr',
        'minmax(600px, 1fr) minmax(320px, 600px)',
      ]}
      gridTemplateAreas={[
        `'leaderboard' 'task'`,
        `'leaderboard' 'task'`,
        `'leaderboard task'`,
      ]}
      className={s.container}
      gap={['16px', '32px']}
      mt={'48px'}
    >
      <GridItem area={'leaderboard'} order={[2, 1]}>
        <LeaderBoard />
      </GridItem>
      <GridItem area={'task'} order={[1, 2]}>
        {isDesktop && <BuyTicket />}
      </GridItem>
    </SimpleGrid>
  );
};

export default Content;
