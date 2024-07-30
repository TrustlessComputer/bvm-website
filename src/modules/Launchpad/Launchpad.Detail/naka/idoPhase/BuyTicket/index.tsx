import styles from './styles.module.scss';
import BuyTicketForm from '@/modules/Launchpad/Launchpad.Detail/naka/idoPhase/BuyTicketForm';
import AppLoading from '@/components/AppLoading';
import { Flex, Text } from '@chakra-ui/react';
import WhatBVM from '@/modules/Launchpad/Launchpad.Detail/naka/idoPhase/WhatBVM';
import { useSelector } from 'react-redux';
import cs from 'classnames';
import Tasks from '@/modules/Launchpad/Launchpad.Detail/naka/content/tasks';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import NumberScale from '@/components/NumberScale';
import LaunchpadProgress from '@/modules/Launchpad/components/progress';
import { formatCurrency } from '@/utils/format';
import dayjs from 'dayjs';
import { useParams } from 'next/navigation';
import { launchpadSelector } from '@/modules/Launchpad/store/reducer';
import { commonSelector } from '@/stores/states/common/selector';
import CLaunchpadAPI from '@/modules/Launchpad/services/launchpad';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import BannerUpcommingInPage from '@/modules/Launchpad/components/BannerUpcommingInPage';

const BuyTicket = () => {
  const { currentLaunchpad, myDataLeaderBoard } = useLaunchpadContext();
  const { countTotalTickets, oldCountTotalTickets } =
    useSelector(launchpadSelector);
  const [amountNAKAAirdrop, setAmountNAKAAirdrop] = useState(0);

  const params = useParams();
  const needReload = useSelector(commonSelector).needReload;
  const id = params?.id;
  const launchpadApi = useRef(new CLaunchpadAPI()).current;

  useEffect(() => {
    if (id) {
      getLaunchpadInfo();
    }
  }, [id, needReload]);

  const getLaunchpadInfo = async () => {
    try {
      const response: any = await Promise.all([
        launchpadApi.getLaunchpadIDOAirdrop(Number(id)),
      ]);

      setAmountNAKAAirdrop(response[0]);
    } catch (err) {
      //
    } finally {
    }
  };

  const hasJoinIDO = useMemo(() => {
    return (myDataLeaderBoard?.total_ticket as number) > 0;
  }, [myDataLeaderBoard]);

  const showBuyTickets = useMemo(() => {
    return currentLaunchpad?.status === 'ido';
  }, [currentLaunchpad]);

  if (currentLaunchpad?.status === 'ended') {
    return (
      <Flex
        flexDirection="column"
        gap={{ base: '24px', md: '40px' }}
        mt={['24px', '0']}
      >
        <div className={cs(styles.container, styles.container_whiteBox)}>
          <Flex direction="column" color="#ffffff" padding={'4px'} w={'100%'}>
            <p>
              Your total airdropped $NAKA is{' '}
              <strong>{formatCurrency(amountNAKAAirdrop)} $NAKA</strong>.
            </p>
            <p>Notes:</p>
            <p>
              - You will receive the first airdropped $NAKA on{' '}
              {dayjs('03/18/2024').add(90, 'day').format('MM/DD/YYYY')}.
            </p>
            <p>- Your airdropped $NAKA will be locked for 1 years</p>
            <p>- Vesting will occur quarterly.</p>
          </Flex>
        </div>
        <BannerUpcommingInPage />
      </Flex>
    );
  }

  return (
    <Flex
      flexDirection="column"
      gap={{ base: '24px', md: '40px' }}
      mt={['24px', '0']}
    >
      {hasJoinIDO && <Tasks />}
      {showBuyTickets && (
        <div className={styles.container}>
          <Flex className={styles.container_headerBox} direction={'column'}>
            <Flex
              justifyContent={'space-between'}
              alignItems={'center'}
              w={'100%'}
            >
              <Text textTransform="uppercase" fontSize="16px" fontWeight="600">
                TOTAL TICKETS
              </Text>
              <Text textTransform="uppercase" fontSize="28px" fontWeight="600">
                <NumberScale
                  label={''}
                  couters={countTotalTickets}
                  maximumFractionDigits={0}
                  minimumFractionDigits={0}
                  defaultFrom={String(oldCountTotalTickets)}
                />
              </Text>
            </Flex>
            <LaunchpadProgress
              goal={currentLaunchpad?.launching_valuation as string}
            />
          </Flex>
          {!!currentLaunchpad?.admin_address ? (
            <BuyTicketForm />
          ) : (
            <AppLoading />
          )}
        </div>
      )}
      {!hasJoinIDO && <Tasks />}
      {showBuyTickets && (
        <div className={cs(styles.container, styles.container_whiteBox)}>
          <WhatBVM />
        </div>
      )}
    </Flex>
  );
};

export default BuyTicket;
