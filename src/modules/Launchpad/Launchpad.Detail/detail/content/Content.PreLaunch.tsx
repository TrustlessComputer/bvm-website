import {
  Box,
  GridItem,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import s from './styles.module.scss';
import LeaderBoard from './leaderBoard';
import { ILaunchpadSetupTask } from '@/modules/Launchpad/services/lauchpad.create.interface';
import { LaunchpadContext } from '@/Providers/LaunchpadProvider';
import CLaunchpadAPI from '@/modules/Launchpad/services/launchpad';
import { IPreLaunchpadTask } from '@/modules/Launchpad/services/launchpad.interfaces';
import PreLaunchpadTasks from './tasks';

const ContentPreLaunch = () => {
  const launchpadAPI = useRef(new CLaunchpadAPI()).current;
  const { currentLaunchpad } = useContext(LaunchpadContext);
  const [tasks, setTasks] = useState<IPreLaunchpadTask[]>([]);

  useEffect(() => {
    getData();
  }, [currentLaunchpad]);

  const getData = async () => {
    try {
      if (!currentLaunchpad?.id) {
        return;
      }
      const [resTasks] = await Promise.all([
        launchpadAPI.getPreLaunchpadTasksById(currentLaunchpad?.id),
      ]);
      setTasks(resTasks);
    } catch (error) {
      //
    }
  };

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
        <LeaderBoard tasks={tasks} />
      </GridItem>
      <GridItem area={'task'}>
        <Box className={s.tabWrapper}>
          <Tabs className={s.tabContainer} mt={[8, 16]} mb={[8, 16]}>
            <TabList mb={8} mt={8}>
              <Tab>EXCLUSIVE ACCESS</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <PreLaunchpadTasks tasks={tasks} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </GridItem>
    </SimpleGrid>
  );
};

export default ContentPreLaunch;
