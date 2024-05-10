import { LAUNCHPAD_URL } from '@/constants/route-path';
import IdoDescription from '@/modules/Launchpad/Launchpad.Detail/description';
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import cx from 'clsx';
import AboveTheFold from './aboveTheFold';
import Content from './content';
import s from './styles.module.scss';
import IdoFaqs from '@/modules/Launchpad/Launchpad.Detail/swamps/faqs';
import Roadmap from '@/modules/Launchpad/Launchpad.Detail/swamps/Roadmap';
import Tokenomics from '@/modules/Launchpad/Launchpad.Detail/swamps/Tokenomics';
import ContentIDO from '@/modules/Launchpad/Launchpad.Detail/swamps/idoPhase';
import dayjs from 'dayjs';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import MainLayout from '@/layouts/MainLayout';
import { PHASES_SWAMPS } from '../../components/phases/data';
import Phases from '../../components/phases';
import { useRouter } from 'next/navigation';

const DetailSwamps = () => {
  const router = useRouter();

  const { currentLaunchpad } = useLaunchpadContext();

  const renderHeader = () => {
    return <AboveTheFold />;
  };

  const renderContent = () => {
    if (
      currentLaunchpad?.status === 'prelaunch' ||
      dayjs().isBefore(dayjs(currentLaunchpad?.pre_launch_end_date))
    ) {
      return <Content />;
    } else {
      return <ContentIDO />;
    }
  };

  const renderPhases = () => {
    return (
      <Box bg={'#F6F6F6'} className={s.phaseWrapper}>
        <Flex
          className={s.viewAllProjects}
          gap={'8px'}
          justifyContent={'center'}
          alignItems={'center'}
          onClick={() => {
            router.push(`${LAUNCHPAD_URL}`);
          }}
        >
          <Text fontSize={'16px'} fontWeight={500} color={'#6633CE'}>
            View all projects
          </Text>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.2419 10.2392C17.2103 10.3159 17.1646 10.385 17.1071 10.4425L13.7737 13.7758C13.6521 13.8975 13.492 13.9591 13.332 13.9591C13.172 13.9591 13.012 13.8983 12.8903 13.7758C12.6462 13.5317 12.6462 13.1358 12.8903 12.8916L15.157 10.625H3.33203C2.98703 10.625 2.70703 10.345 2.70703 9.99998C2.70703 9.65498 2.98703 9.37498 3.33203 9.37498H15.1562L12.8895 7.10834C12.6454 6.86417 12.6454 6.46831 12.8895 6.22414C13.1337 5.97997 13.5296 5.97997 13.7737 6.22414L17.1071 9.55747C17.1646 9.61497 17.2103 9.68405 17.2419 9.76072C17.3053 9.91405 17.3053 10.0859 17.2419 10.2392Z"
              fill="#6633CE"
            />
          </svg>
        </Flex>
        <Flex justifyContent={'center'} direction={['column', 'row']}>
          <Phases data={PHASES_SWAMPS} />
        </Flex>
      </Box>
    );
  };

  return (
    <MainLayout>
      <Box className={cx(s.container)}>
        {renderPhases()}
        <Box className={s.content}>
          {renderHeader()}
          {renderContent()}
          <Roadmap />
          <Tokenomics />
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

export default DetailSwamps;
