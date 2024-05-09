import AboveTheFold from 'src/modules/Launchpad/Launchpad.Detail/naka/aboveTheFold';
import Content from 'src/modules/Launchpad/Launchpad.Detail/naka/content';
import IdoDescription from '@/modules/Launchpad/Launchpad.Detail/description';
import IdoFaqs from 'src/modules/Launchpad/Launchpad.Detail/naka/faqs';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
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
import s from './styles.module.scss';
import MainLayout from '@/layouts/MainLayout';

const DetailNaka = () => {
  const { currentLaunchpad } = useLaunchpadContext();

  console.log('currentLaunchpad', currentLaunchpad);

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
      <Box className={cx(s.container)}>
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
                <Tab>
                  <Text fontSize={'16px'}>FAQS</Text>
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <IdoDescription launchpadDetail={currentLaunchpad} />
                </TabPanel>
                <TabPanel>
                  <IdoFaqs launchpadDetail={currentLaunchpad} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default DetailNaka;
