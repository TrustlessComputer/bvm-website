import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import LeaderBoard from './leaderBoard';
import s from './styles.module.scss';
import useElementHeight from '@/hooks/useElementHeight';
import { HEADER_ID } from '@/layouts/Header';
import Steps from '@/modules/Whitelist/steps';
import BoxContent from '@/layouts/BoxContent';
import { useAppSelector } from '@/stores/hooks';
import { leaderBoardSelector } from '@/stores/states/user/selector';
import Loading from '@/components/Loading';
import { formatCurrency } from '@/utils/format';
import AppLoading from '@/components/AppLoading';
import CountUp from 'react-countup';

const CONTAINER_ID = 'WHITE_LIST_CONTAINER_ID';

const Whitelist = () => {
  const { height } = useElementHeight({ elementID: HEADER_ID });
  const { count } = useAppSelector(leaderBoardSelector);

  React.useEffect(() => {
    const element = document.getElementById(CONTAINER_ID);
    if (height && element) {
      element.style.paddingTop = `${height + 32}px`;
    }
  }, [height]);

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
      <Box mt="16px" />
      <p className={s.title}>Tweet & invite friends to rank up.</p>
      <div className={s.tokenSection}>
        <LeaderBoard />
        <Steps />
      </div>
    </BoxContent>
  );
};

export default Whitelist;
