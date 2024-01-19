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

  // React.useEffect(() => {
  //   const leaderBoard = document.getElementById(LEADER_BOARD_ID);
  //   const stepper = document.getElementById(STEP_ID);
  //   if (stepper && stepHeight && leaderBoard) {
  //     leaderBoard.style.maxHeight = `${stepHeight}px`;
  //   }
  // }, [stepHeight]);

  return (
    <BoxContent className={s.container} id={CONTAINER_ID}>
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
      <Box mt="8px" />
      <p className={s.title}>Tweet & invite friends to rank up.</p>
      <div className={s.tokenSection}>
        <LeaderBoard />
        <Steps />
      </div>
      {/* <FAQContent /> */}
    </BoxContent>
  );
};

export default Whitelist;
