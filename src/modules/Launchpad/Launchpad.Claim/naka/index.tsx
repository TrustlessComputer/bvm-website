'use client';

import FAQs from '@/components/faq';
import { showError, showSuccess } from '@/components/toast';
import { CDN_URL_ICONS } from '@/config';
import { StakeV2Role } from '@/contract/stakeV2/types';
import useNakaAuthen from '@/hooks/useRequestNakaAccount';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { NakaConnectContext } from '@/Providers/NakaConnectProvider';
import { requestReload } from '@/stores/states/common/reducer';
import { commonSelector } from '@/stores/states/common/selector';
import { stakeUserSelector } from '@/stores/states/stakingV2/selector';
import { getErrorMessage } from '@/utils/errorV2';
import { formatCurrency } from '@/utils/format';
import sleep from '@/utils/sleep';
import {
  Box,
  Button,
  Center,
  Flex,
  Skeleton,
  Spinner,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import cx from 'classnames';
import dayjs from 'dayjs';
import { ethers } from 'ethers';
import { first } from 'lodash';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CLaunchpadAPI from '../../services/launchpad';
import { ILaunchpadClaimParams } from '../../services/launchpad.interfaces';
import s from './styles.module.scss';

const LaunchpadClaimNaka = () => {
  const { getConnector } = useContext(NakaConnectContext);
  const params = useParams();
  const dispatch = useDispatch();
  const needReload = useSelector(commonSelector).needReload;
  const [loading, setLoading] = useState<boolean>(true);
  const { nakaAddress } = useNakaAuthen();

  const id = params?.id;
  const [currentLeaderboard, setCurrentLeaderboard] = useState<
    ILeaderBoardPoint | undefined
  >(undefined);
  const launchpadApi = useRef(new CLaunchpadAPI()).current;
  // const cStake = useRef(new CStakeV2()).current;
  // const contract = useRef(new CContract()).current;

  const stakeUser = useSelector(stakeUserSelector);

  const [claiming, setClaiming] = useState(false);
  const [isClaimWithStake, setIsClaimWithStake] = useState(true);
  const [claimed, setClaimed] = useState(false);
  const [amountNAKAAirdrop, setAmountNAKAAirdrop] = useState(0);

  const currentClaim2Stake = useRef(false);
  const { currentLaunchpad } = useLaunchpadContext();

  useEffect(() => {
    if (id) {
      getLaunchpadInfo();
    }
  }, [id, needReload]);

  const getLaunchpadInfo = async () => {
    try {
      const response: any = await Promise.all([
        launchpadApi.getPrelaunchLeaderBoards(Number(id), {
          page: 1,
          limit: 0,
        }),
        launchpadApi.getLaunchpadIDOAirdrop(Number(id)),
      ]);

      setCurrentLeaderboard(first(response[0]?.rows));
      setAmountNAKAAirdrop(response[1]);
    } catch (err) {
      console.log('getLaunchpadInfo err', err);
    } finally {
      setLoading(false);
    }
  };

  const amountBVM = useMemo(
    () =>
      new BigNumber(
        new BigNumber(currentLeaderboard?.total_ticket_not_boost || '0')
          .multipliedBy(currentLaunchpad?.launchpad_valuation || '0')
          .minus(
            new BigNumber(currentLeaderboard?.won_ticket || '0').multipliedBy(
              currentLaunchpad?.bvm_win_per_ticket || '0',
            ),
          ),
      ).toString(),
    [currentLeaderboard, currentLaunchpad],
  );

  const amountNAKA = useMemo(
    () =>
      new BigNumber(currentLeaderboard?.won_ticket || '0')
        .multipliedBy(currentLaunchpad?.token_per_ticket || '0')
        .toString(),
    [currentLeaderboard, currentLaunchpad],
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
    return claiming || parseFloat(amountBVM) === 0;
  }, [amountBVM, claiming]);

  // const onRefreshEnd = async () => {
  //   try {
  //     await sleep(2);
  //     dispatch(requestReload());
  //   } catch (error) {}
  // };

  const onClaimBVM = async () => {
    try {
      const message = 'claim_NAKA_' + nakaAddress;
      const connector = getConnector();
      const signature = await connector.requestSignMessage({
        signMessage: message,
        target: 'popup',
        fromAddress: nakaAddress,
      });

      const body: ILaunchpadClaimParams = {
        address: nakaAddress as string,
        message: message,
        signature: signature.signature,
        is_stake: currentClaim2Stake.current,
      };

      return await launchpadApi.requestClaimBVM(body, Number(id));
    } catch (error) {
      throw error;
    }
  };

  const onClaimBVMWithoutStake = async () => {
    try {
      currentClaim2Stake.current = false;
      setIsClaimWithStake(false);
      setClaiming(true);
      await onClaimBVM();
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

  const onClaimBVMWithStake = async () => {
    try {
      currentClaim2Stake.current = true;
      setIsClaimWithStake(true);
      setClaiming(true);
      await onClaimBVM();
      await sleep(1);

      let teamCode = ethers.utils.formatBytes32String(
        StakeV2Role.empty.toString(),
      );
      if (stakeUser && stakeUser?.userTeamCode) {
        teamCode = ethers.utils.formatBytes32String(stakeUser.userTeamCode);
      }
      // const tx = await cStake.createStakeca({
      //   amount: amountBVM,
      //   code: teamCode,
      //   role: stakeUser?.teamRole || StakeV2Role.empty,
      // });

      // await launchpadApi.updateHashForStakeBVM(Number(id), tx.hash);

      // showSuccess({
      //   message: 'You has claimed & stake successfully!',
      //   linkText: 'Check my staking',
      //   url: '/staking/dashboard',
      // });
      setClaimed(true);
      dispatch(requestReload());
    } catch (error) {
      console.log('error', error);

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
    } else if (!isClaimable) {
      content = (
        <>
          <Flex className={s.balanceWrapper} flexDirection={'column'}>
            <Text className={s.balanceTitle}>Claimable balance</Text>
            <Skeleton isLoaded={false}>
              <Text className={s.balanceBalance}>{`${formatCurrency(
                amountBVM,
                0,
                2,
              )} $BVM`}</Text>
            </Skeleton>
          </Flex>
        </>
      );
    } else if (isClaimed || claimed) {
      content = (
        <>
          <Flex className={s.balanceWrapper} flexDirection={'column'}>
            <Text className={s.balanceTitle}>Claimable balance</Text>
            <Flex gap={'4px'}>
              <Text className={s.balanceBalance}>{`${formatCurrency(
                amountBVM,
                0,
                2,
              )} $BVM`}</Text>
              {parseFloat(amountNAKA) > 0 && (
                <Text className={s.balanceBalance}>{`+ ${formatCurrency(
                  amountNAKA,
                  0,
                  2,
                )} $NAKA`}</Text>
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
              <Text className={s.balanceBalance}>{`${formatCurrency(
                amountBVM,
                0,
                2,
              )} $BVM`}</Text>
              {parseFloat(amountNAKA) > 0 && (
                <Text className={s.balanceBalance}>{`+ ${formatCurrency(
                  amountNAKA,
                  0,
                  2,
                )} $NAKA`}</Text>
              )}
            </Flex>
          </Flex>
          <Button
            isLoading={isClaimWithStake && claiming}
            isDisabled={isDisabled}
            className={s.btnClaimed}
            onClick={onClaimBVMWithStake}
          >
            <Text>Claim & Stake</Text>
            <Text> </Text>
          </Button>
          <Button
            isDisabled={isDisabled}
            onClick={onClaimBVMWithoutStake}
            className={s.linkClaimed}
            isLoading={claiming && !isClaimWithStake}
            loadingText={'Claiming...'}
          >
            Claim without airdrop
          </Button>
        </>
      );
    }

    return (
      <Center className={cx(s.wrapper)}>
        <Center className={cx(s.container, s.loadingContainer)}>
          <Text className={s.title}>
            Claim your <span>$BVM</span> and receive<span>$NAKA</span> airdrop.
          </Text>
          <Text className={s.desc}>
            Thank you for participating in the $NAKA IDO.
            <br />
            Exclusive 0.5% of the $NAKA supply will be airdropped for $NAKA IDO
            participants
          </Text>
          <Text className={s.desc}>
            Your total airdropped $NAKA is {formatCurrency(amountNAKAAirdrop)}{' '}
            $NAKA.
            <Tooltip
              minW="220px"
              bg="#000000"
              label={
                <Flex direction="column" color="#ffffff" padding={'4px'}>
                  Notes:
                  <p>
                    - You will receive the first airdropped $NAKA on{' '}
                    {dayjs('03/18/2024').add(90, 'day').format('MM/DD/YYYY')}.
                  </p>
                  <p>- Your airdropped $NAKA will be locked for 1 years</p>
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
                a: `<p>0.5% of the $NAKA supply will be airdropped to all wallets that purchased tickets for the $NAKA IDO</p>`,
              },
            ]}
          />
        </Flex>
      </Center>
    );
  };

  return renderContent();
};

export default LaunchpadClaimNaka;
