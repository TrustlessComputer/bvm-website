import EAIFAQ from '@/modules/Launchpad/Launchpad.Detail/eternalAI/EAIPayment/EAIFAQ';
import faqData from '@/modules/Launchpad/Launchpad.Detail/eternalAI/EAIPayment/EAIFAQ/constants';
import BuyTokenBox from '@/modules/Launchpad/Launchpad.Detail/eternalAI/EAIPayment/EAIPaymentBox';
import LeaderBoardVisual from '@/modules/Launchpad/Launchpad.Detail/eternalAI/EAIPayment/LeaderBoardVisual';
import Roadmap from '@/modules/Launchpad/Launchpad.Detail/eternalAI/EAIPayment/Roadmap';
import Tokenomics from '@/modules/Launchpad/Launchpad.Detail/eternalAI/EAIPayment/Tokenomics';
import AboveTheFoldEternalAI, {
  AboveTheFoldEternalAIInfo,
} from '@/modules/Launchpad/Launchpad.Detail/eternalAI/aboveTheFold';
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import { isMobile } from 'react-device-detect';
import styles from './styles.module.scss';
import WhatEAI from '@/modules/Launchpad/Launchpad.Detail/eternalAI/EAIPayment/WhatEAI';
import EAITasks from '@/modules/Launchpad/Launchpad.Detail/eternalAI/EAIPayment/Tasks';
import ContributionIds from '../ContributionIDs';
import { isProduction } from '@/utils/commons';
import MainLayout from '@/layouts/MainLayout';

const Home = () => {
  return (
    <Flex background={'#fff'} flexDirection={'column'} minHeight={'100vh'}>
      <MainLayout>
        <Box className={styles.container}>
          {/*<EAIHeader />*/}
          <AboveTheFoldEternalAI className={styles.above} />
          <SimpleGrid
            className={styles.content}
            gridTemplateColumns={{ lg: '1fr', xl: '1fr 600px' }}
            gap={[0, '40px']}
          >
            {isMobile ? (
              <div className={styles.content_rightSection}>
                <BuyTokenBox />
                <ContributionIds />
                <WhatEAI />
                <EAITasks />
                <AboveTheFoldEternalAIInfo />
              </div>
            ) : (
              <div className={styles.content_leftSection}>
                <LeaderBoardVisual />
              </div>
            )}

            {isMobile ? (
              <div className={styles.content_leftSection}>
                <LeaderBoardVisual />
              </div>
            ) : (
              <div className={styles.content_rightSection}>
                <Box zIndex={2} top={'0'} position={'sticky'}>
                  <BuyTokenBox />
                </Box>
                {isProduction() && <ContributionIds />}
                <WhatEAI />
                <EAITasks />
              </div>
            )}
          </SimpleGrid>
          <Tokenomics />
          <Roadmap />
          <EAIFAQ faqs={faqData.HOME_FAQ_DATA} />
        </Box>
      </MainLayout>
    </Flex>
  );
};

export default Home;
