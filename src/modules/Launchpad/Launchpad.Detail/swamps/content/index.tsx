import {Box, GridItem, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs,} from '@chakra-ui/react';
import s from './styles.module.scss';
import React from 'react';
import LeaderBoard from './leaderBoard';
import Tasks from "./tasks";

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
        `'task' 'leaderboard'`,
        `'leaderboard' 'task'`,
        `'leaderboard task'`,
      ]}
      className={s.container}
      gap={['16px', '32px']}
      mt={'48px'}
    >
      <GridItem area={'leaderboard'}>
        <LeaderBoard />
      </GridItem>
      <GridItem area={'task'}>
        <Box className={s.tabWrapper}>
          <Tabs className={s.tabContainer} mt={[8, 16]} mb={[8, 16]}>
            <TabList mb={8} mt={8}>
              <Tab>EXCLUSIVE ACCESS</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Tasks />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </GridItem>
    </SimpleGrid>
  );
};

export default Content;
