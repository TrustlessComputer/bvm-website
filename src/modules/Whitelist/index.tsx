import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import LeaderBoard, { LEADER_BOARD_ID } from './leaderBoard';
import s from './styles.module.scss';
import useElementSize from '@/hooks/useElementSize';
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
import StepsAirdrop, { TIME_CHAIN_EXPIRED_TIME } from '@/modules/Whitelist/stepAirdrop';
import useAllowBTC from '@/modules/Whitelist/AllowBTCMessage/useAllowBTC';
import useAllowCelestia from '@/modules/Whitelist/AllowCelestiaMessage/useAllowCelestia';
import useAllowEVM from '@/modules/Whitelist/AllowEVMMessage/useAllowEVM';
import TimechainBanner from '@/modules/Whitelist/TimechainBanner';
import dayjs from 'dayjs';
import Countdown from '@/modules/Whitelist/stepAirdrop/Countdown';
import ArcadeBanner from '@/modules/Whitelist/ArcadeBanner';

const CONTAINER_ID = 'WHITE_LIST_CONTAINER_ID';

export const PUBLIC_SALE_START = '2024-01-30 03:30:00'

const Whitelist = () => {
  useAllowBTC();
  useAllowCelestia();
  useAllowEVM({ type: "allowOptimism" });
  const { count } = useAppSelector(leaderBoardSelector);
  const { height } = useElementSize({ elementID: HEADER_ID });
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    const element = document.getElementById(CONTAINER_ID);
    if (height && element) {
      element.style.paddingTop = `${height + 24}px`;
    }
  }, [height]);

  const isCountDown = React.useMemo(() => {
    return dayjs
      .utc(PUBLIC_SALE_START, 'YYYY-MM-DD HH:mm:ss')
      .isAfter(dayjs().utc().format())
  }, [])

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
        <Box mt={['0px', '40px']} />
      </>
    );
  };

  return (
    <BoxContent className={s.container} id={CONTAINER_ID}>
      <Flex className={s.header} w="100%">
          {isCountDown && (
            <Flex flexDirection="column" gap="8px">
              <p className={s.countDown_title}>Public sale starting in</p>
              <Countdown
                className={s.countDown_time}
                expiredTime={dayjs.utc(PUBLIC_SALE_START, 'YYYY-MM-DD HH:mm:ss').toString()}
                hideIcon={true}
                type="column"
              />
            </Flex>
          )}
        <ArcadeBanner setTabIndex={setIndex} />
      </Flex>
      <div className={s.tokenSection}>
        <Box w="100%" overflow="hidden">
          <div className={s.countUpDesktop}>{renderCountUp()}</div>
          <LeaderBoard setIndex={setIndex} />
        </Box>

        <div id="ALLOW_TASKS_LIST">
          <div className={s.countUpMobile}>{renderCountUp()}</div>
          <Tabs variant="unstyled" index={index} onChange={(tabIndex) => setIndex(tabIndex)}>
            <TabList mb="32px" overflow="hidden">
              <Tab>Start here</Tab>
              <Tab>Experience BVM</Tab>
              <Tab>Airdrop</Tab>
            </TabList>
            <TabPanels w="100%">
              <TabPanel>
                <Steps />
              </TabPanel>
              <TabPanel>
                <StepsEco setTabIndex={setIndex}/>
              </TabPanel>
              <TabPanel>
                <StepsAirdrop setIndex={setIndex}/>
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
