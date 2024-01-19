import { Box } from '@chakra-ui/react';
import React from 'react';
import LeaderBoard, { LEADER_BOARD_ID } from './leaderBoard';
import s from './styles.module.scss';
import useElementHeight from '@/hooks/useElementHeight';
import { HEADER_ID } from '@/layouts/Header';
import Steps from '@/modules/Whitelist/steps';
import BoxContent from '@/layouts/BoxContent';
import { useAppSelector } from '@/stores/hooks';
import { leaderBoardSelector } from '@/stores/states/user/selector';
import Loading from '@/components/Loading';
import AppLoading from '@/components/AppLoading';
import CountUp from 'react-countup';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import StepsEco from './stepsEco';
import StepsAirdrop from '@/modules/Whitelist/stepAirdrop';

const CONTAINER_ID = 'WHITE_LIST_CONTAINER_ID';

const Whitelist = () => {
  const { count } = useAppSelector(leaderBoardSelector);
  const { height } = useElementHeight({ elementID: HEADER_ID });

  React.useEffect(() => {
    const element = document.getElementById(CONTAINER_ID);
    if (height && element) {
      element.style.paddingTop = `${height + 24}px`;
    }
  }, [height]);

  const renderCountUp = () => {
    return (
      <>
        <Box mt="16px" />
        {!!count ? (
          <p className={s.title}>
            Join{' '}
            <span>
              {!count ? (
                <Loading />
              ) : (
                <CountUp
                  separator=","
                  start={0}
                  end={Number(count)}
                  decimals={0}
                  duration={2}
                  useEasing={false}
                />
              )}{' '}
              people
            </span>{' '}
            on the public sale allowlist.
          </p>
        ) : (
          <AppLoading />
        )}
        <Box mt="40px" />
      </>
    );
  };

  return (
    <BoxContent className={s.container} id={CONTAINER_ID}>
      <div className={s.tokenSection}>
        <Box w="100%" overflow="hidden">
          <div className={s.countUpDesktop}>{renderCountUp()}</div>
          <LeaderBoard />
        </Box>

        <div>
          <div className={s.countUpMobile}>{renderCountUp()}</div>
          <Tabs variant="unstyled">
            <TabList mb="32px" overflow="hidden">
              <Tab>Start here</Tab>
              <Tab>Airdrop 1</Tab>
              <Tab>Explore the ecosystem</Tab>
            </TabList>
            <TabPanels w="100%">
              <TabPanel>
                <Steps />
              </TabPanel>
              <TabPanel>
                <StepsAirdrop />
              </TabPanel>
              <TabPanel>
                <StepsEco />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
      {/* <FAQContent /> */}
    </BoxContent>
  );
};

export default Whitelist;
