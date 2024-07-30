'use client';

import FAQs from '@/components/faq';
import { showError, showSuccess } from '@/components/toast';
import { CDN_URL_ICONS } from '@/config';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { requestReload } from '@/stores/states/common/reducer';
import { commonSelector } from '@/stores/states/common/selector';
import { getErrorMessage } from '@/utils/errorV2';
import { formatCurrency } from '@/utils/format';
import sleep from '@/utils/sleep';
import {
  Box,
  Button,
  Center,
  Flex,
  Spinner,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import cx from 'classnames';
import dayjs from 'dayjs';
import { first } from 'lodash';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ILeaderBoardEAI } from '../../services/laupEAI-payment.interfaces';
import CPaymentEAIAPI from '../../services/payment.eai';
import s from './styles.module.scss';

const LaunchpadClaimEternalAI = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const needReload = useSelector(commonSelector).needReload;
  const [loading, setLoading] = useState<boolean>(true);

  const id = params?.id;
  const [currentLeaderboard, setCurrentLeaderboard] = useState<
    ILeaderBoardEAI | undefined
  >(undefined);
  const launchpadApi = useRef(new CPaymentEAIAPI()).current;

  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const { currentLaunchpad } = useLaunchpadContext();

  useEffect(() => {
    if (id) {
      getLaunchpadInfo();
    }
  }, [id, needReload]);

  const getLaunchpadInfo = async () => {
    try {
      const response: any = await Promise.all([
        launchpadApi.getPublicSaleLeaderBoards({
          page: 1,
          limit: 0,
        }),
      ]);

      setCurrentLeaderboard(first(response[0]?.rows));
    } catch (err) {
      //
    } finally {
      setLoading(false);
    }
  };

  const amountAllocation = useMemo(
    () => currentLeaderboard?.token_balance || '0',
    [currentLeaderboard],
  );

  const isClaimable = useMemo(
    () => currentLeaderboard?.claimable,
    [currentLeaderboard],
  );

  const isClaimed = useMemo(
    () => currentLeaderboard?.is_claimed,
    [currentLeaderboard],
  );

  const isDisabled = useMemo(() => {
    return claiming;
  }, [claiming]);

  const onClaim = async () => {
    try {
      // const message = 'claim_GSWP_' + wallet?.address;
      // const signature = await (await contract.getWallet()).signMessage(message);
      // const body: ILaunchpadClaimParams = {
      //   address: wallet?.address as string,
      //   message: message,
      //   signature,
      // };
      // return await launchpadApi.requestClaimIDO(body);
    } catch (error) {
      throw error;
    }
  };

  const onClickClaim = async () => {
    try {
      setClaiming(true);
      await onClaim();
      await sleep(2);
      setClaimed(true);
      showSuccess({
        message: 'You has claimed successfully!',
      });
      dispatch(requestReload());
    } catch (error) {
      showError(getErrorMessage(error));
    } finally {
      setClaiming(false);
    }
  };

  const renderContent = () => {
    let content = <></>;

    if (loading) {
      content = <Spinner color={'#000'} />;
    } else if (!currentLaunchpad) {
      content = (
        <Flex className={s.balanceWrapper} flexDirection={'column'}>
          <Text className={s.balanceTitle}>Launchpad not found</Text>
        </Flex>
      );
    } else if (isClaimed || claimed) {
      content = (
        <>
          <Flex className={s.balanceWrapper} flexDirection={'column'}>
            <Text className={s.balanceTitle}>Claimable balance</Text>
            <Flex gap={'4px'}>
              {parseFloat(amountAllocation) > 0 && (
                <Text className={s.balanceBalance}>{`+ ${formatCurrency(
                  amountAllocation,
                  0,
                  2,
                )} $EAI`}</Text>
              )}
            </Flex>
          </Flex>
          <Box className={s.claimedBox}>
            <Text>Claimed</Text>
          </Box>
        </>
      );
    } else if (!(isClaimed || claimed) && isClaimable) {
      content = (
        <>
          <Flex className={s.balanceWrapper} flexDirection={'column'}>
            <Text className={s.balanceTitle}>Claimable balance</Text>
            <Flex gap={'4px'}>
              {parseFloat(amountAllocation) > 0 && (
                <Text className={s.balanceBalance}>{`+ ${formatCurrency(
                  amountAllocation,
                  0,
                  2,
                )} $EAI`}</Text>
              )}
            </Flex>
          </Flex>
          <Button
            isDisabled={isDisabled}
            onClick={onClickClaim}
            className={s.btnClaimed}
            isLoading={claiming}
            loadingText={'Claiming...'}
          >
            Claim
          </Button>
        </>
      );
    }

    return (
      <Center className={cx(s.wrapper)}>
        <Center className={cx(s.container, s.loadingContainer)}>
          <Text className={s.title}>
            Claim your <span>$EAI</span>
          </Text>
          <Text className={s.desc}>
            Thank you for participating in the $EAI IDO.
            <br />
            Exclusive 0.5% of the $EAI supply will be airdropped for $EAI IDO
            participants
          </Text>
          <Text className={s.desc}>
            Your total airdropped $EAI is {formatCurrency(amountAllocation)}{' '}
            $EAI.
            <Tooltip
              minW="220px"
              bg="#000000"
              label={
                <Flex direction="column" color="#ffffff" padding={'4px'}>
                  Notes:
                  <p>
                    - You will receive the first airdropped $EAI on{' '}
                    {dayjs('03/18/2024').add(90, 'day').format('MM/DD/YYYY')}.
                  </p>
                  <p>- Your airdropped $EAI will be locked for 1 years</p>
                  <p>- Vesting will occur quarterly.</p>
                </Flex>
              }
            >
              <img
                className={s.tooltipIcon2}
                src={`${CDN_URL_ICONS}/ic-information-wh.svg`}
              />
            </Tooltip>
          </Text>
          {content}
        </Center>
        <Flex className={s.faqContainer} flexDirection={'column'}>
          <Text className={s.title}>FAQs</Text>
          <FAQs
            data={[
              {
                q: 'Can I unstake $BVM?',
                a: `<p>Yes, you can unstake BVM at any time. Please note that your staked tokens will be released after a 21-day period. You can claim your tokens through the Staking Dashboard once the unstaking process is complete.</p>`,
              },
              {
                q: 'Why does it take 21 days to unstake?',
                a: `<p>The staking program is the first step to decentralize the BVM network further. The staked BVM will ensure the security of the upcoming products, like decentralized bridges and shared sequencers. A short unstaking period could compromise the security of these products. The best practice that we’ve found from other networks is 21 days.</p>`,
              },
              {
                q: 'What is the total airdrop supply?',
                a: `<p>0.5% of the $EAI supply will be airdropped to all wallets that purchased tickets for the $EAI IDO</p>`,
              },
            ]}
          />
        </Flex>
      </Center>
    );
  };

  return renderContent();
};

export default LaunchpadClaimEternalAI;
