import BannerUpcommingInPage from '@/modules/Launchpad/components/BannerUpcommingInPage';
import Tasks from '@/modules/Launchpad/Launchpad.Detail/eternalAI/content/tasks';
import BecomeBVMHolder from '@/modules/Launchpad/Launchpad.Detail/eternalAI/content/tasks/becomeBVMHolder';
import EAIPaymentBox from '@/modules/Launchpad/Launchpad.Detail/eternalAI/EAIPayment/EAIPaymentBox';
import WhatBVM from '@/modules/Launchpad/Launchpad.Detail/naka/idoPhase/WhatBVM';
import CLaunchpadAPI from '@/modules/Launchpad/services/launchpad';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { commonSelector } from '@/stores/states/common/selector';
import { formatCurrency } from '@/utils/format';
import { Flex } from '@chakra-ui/react';
import cs from 'classnames';
import dayjs from 'dayjs';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';

const BuyTicket = () => {
  const { currentLaunchpad, myDataLeaderBoard } = useLaunchpadContext();
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
      <Flex flexDirection="column" gap={{ base: '24px', md: '40px' }}>
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
    <Flex flexDirection="column" gap={{ base: '24px', md: '40px' }}>
      {hasJoinIDO && <Tasks />}
      {showBuyTickets && (
        <div className={styles.container}>
          <EAIPaymentBox />
        </div>
      )}
      {!hasJoinIDO && <Tasks />}
      {showBuyTickets && (
        <div className={cs(styles.container, styles.container_whiteBox)}>
          <WhatBVM />
        </div>
      )}
      <BecomeBVMHolder />
    </Flex>
  );
};

export default BuyTicket;
