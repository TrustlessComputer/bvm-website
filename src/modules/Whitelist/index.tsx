import { Box } from '@chakra-ui/react';
import React from 'react';
import LeaderBoard, { LEADER_BOARD_ID } from './leaderBoard';
import s from './styles.module.scss';
import useElementHeight from '@/hooks/useElementHeight';
import { HEADER_ID } from '@/layouts/Header';
import Steps, { STEP_ID } from '@/modules/Whitelist/steps';
import BoxContent from '@/layouts/BoxContent';
import { useAppSelector } from '@/stores/hooks';
import { leaderBoardSelector } from '@/stores/states/user/selector';
import Loading from '@/components/Loading';
import AppLoading from '@/components/AppLoading';
import CountUp from 'react-countup';
// import FAQContent from './FAQContent';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import StepsEco from './stepsEco';
import StepsAirdrop from '@/modules/Whitelist/stepAirdrop';
import FAQContent from './FAQContent';
import { isMobile } from 'react-device-detect';

const CONTAINER_ID = 'WHITE_LIST_CONTAINER_ID';

const Whitelist = () => {
  const { count } = useAppSelector(leaderBoardSelector);
  const { height } = useElementHeight({ elementID: HEADER_ID });
  const { height: stepHeight } = useElementHeight({ elementID: STEP_ID });

  React.useEffect(() => {
    const element = document.getElementById(CONTAINER_ID);
    if (height && element) {
      element.style.paddingTop = `${height + 32}px`;
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

  React.useEffect(() => {
    const leaderBoard = document.getElementById(LEADER_BOARD_ID);
    const stepper = document.getElementById(STEP_ID);
    if (stepper && stepHeight && !isMobile && leaderBoard) {
      leaderBoard.style.maxHeight = `${stepHeight}px`;
    }
  }, [stepHeight]);

  return (
    <BoxContent className={s.container} id={CONTAINER_ID}>
      <div className={s.tokenSection}>
        <div>
          <div className={s.countUpDesktop}>{renderCountUp()}</div>
          <LeaderBoard />
        </div>

        <div>
          <div className={s.countUpMobile}>{renderCountUp()}</div>
          <Tabs variant="unstyled">
            <TabList mb="32px" overflow="hidden">
              <Tab>Start here</Tab>
              <Tab>Ecosystem</Tab>
              <Tab>Airdrop 1</Tab>
            </TabList>
            <TabPanels w="100%">
              <TabPanel>
                <Steps />
              </TabPanel>
              <TabPanel>
                <StepsEco />
              </TabPanel>
              <TabPanel>
                <StepsAirdrop />
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
