import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import MainLayout from '@/layouts/MainLayout';
import IdoDescription from '@/modules/Launchpad/Launchpad.Detail/description';
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import cx from 'clsx';
import AboveTheFold from 'src/modules/Launchpad/Launchpad.Detail/eternalAI/aboveTheFold';
import Content from 'src/modules/Launchpad/Launchpad.Detail/eternalAI/content';
import s from './styles.module.scss';

const DetailEternalAI = () => {
  const { currentLaunchpad } = useLaunchpadContext();

  const renderHeader = () => {
    return <AboveTheFold />;
  };

  const renderContent = () => {
    return <Content />;
  };

  const renderPhases = () => {
    return null;
  };

  return (
    <MainLayout>
      <Box className={cx(s.container, s.bgGrey)}>
        {renderPhases()}
        <Box className={s.content}>
          {renderHeader()}
          {renderContent()}
          <Box className={s.tabWrapper}>
            <Tabs className={cx(s.tabContainer)} mt={[8, 16]} mb={[8, 16]}>
              <TabList mb={8} mt={8}>
                <Tab>
                  <Text fontSize={'16px'}>STORY</Text>
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <IdoDescription launchpadDetail={currentLaunchpad} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default DetailEternalAI;
