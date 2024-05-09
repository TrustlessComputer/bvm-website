'use client';

import CContract from '@/contract/contract';
import { formatCurrency } from '@/utils/format';
import { Button, Center, Flex, Text } from '@chakra-ui/react';
import BigNumberJS from 'bignumber.js';
import cx from 'classnames';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './styles.module.scss';
import { MIN_DECIMAL } from '@/constants/constants';
import { useRouter } from 'next/navigation';
import { useAuthenticatedWallet } from '@/Providers/AuthenticatedProvider/hooks';
import CPaymentEAIAPI from '@/modules/Launchpad/services/payment.eai';
import { userContributeSelector } from '@/modules/Launchpad/store/lpEAIPayment/selector';
import { ILaunchpadClaimParams } from '@/modules/Launchpad/services/launchpad.interfaces';
import { requestReload } from '@/stores/states/common/reducer';

const ClaimBox = () => {
  const dispatch = useDispatch();
  const wallet = useAuthenticatedWallet();

  const launchpadApi = useRef(new CPaymentEAIAPI()).current;
  const contract = useRef(new CContract()).current;

  const [claiming, setClaiming] = useState(false);
  const [isClaimWithStake, setIsClaimWithStake] = useState(true);
  const [claimed, setClaimed] = useState(false);

  const currentClaim2Stake = useRef(false);
  const userContribute = useSelector(userContributeSelector);
  // const { openSignView } = useAuthen();
  const router = useRouter();

  const claimableAmount = React.useMemo(() => {
    return new BigNumberJS(userContribute?.token_balance || 0)
      .minus(userContribute?.vesting_token_balance || 0)
      .toString();
  }, [userContribute]);

  const isClaimable = useMemo(
    () => userContribute?.claimable,
    [userContribute],
  );

  const isClaimed = useMemo(() => userContribute?.is_claimed, [userContribute]);

  const isDisabled = useMemo(() => {
    return claiming || parseFloat(claimableAmount) === 0;
  }, [claimableAmount, claiming]);

  const onClaimBVM = async () => {
    try {
      const message = 'claim_EAI_' + wallet?.address;
      // const signature = await (await contract.getWalle()).signMessage(message);
      // const body: ILaunchpadClaimParams = {
      //   address: wallet?.address as string,
      //   message: message,
      //   signature,
      //   is_stake: currentClaim2Stake.current,
      // };

      // return await launchpadApi.requestClaimIDO(body);
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
      // await sleep(2);
      setClaimed(true);
      // showSuccess({
      //   message: 'You has claimed successfully!',
      // });
      dispatch(requestReload());
    } catch (error) {
      // showError(getErrorMessage(error));
    } finally {
      setClaiming(false);
    }
  };

  // const onClaimBVMWithStake = async () => {
  //   try {
  //     currentClaim2Stake.current = true;
  //     setIsClaimWithStake(true);
  //     setClaiming(true);
  //     await onClaimBVM();
  //     await sleep(1);
  //
  //     // let teamCode = ethers.utils.formatBytes32String(
  //     //   StakeV2Role.empty.toString(),
  //     // );
  //     // if (stakeUser && stakeUser?.userTeamCode) {
  //     //   teamCode = ethers.utils.formatBytes32String(stakeUser.userTeamCode);
  //     // }
  //     // const tx = await cStake.createStake({
  //     //   amount: claimableAmount,
  //     //   code: teamCode,
  //     //   role: stakeUser?.teamRole || StakeV2Role.empty,
  //     // });
  //     //
  //     // await launchpadApi.updateHashForStakeBVM(Number(id), tx.hash);
  //
  //     showSuccess({
  //       message: 'You has claimed & stake successfully!',
  //       linkText: 'Check my staking',
  //       url: '/staking/dashboard',
  //     });
  //     setClaimed(true);
  //     dispatch(requestReload());
  //   } catch (error) {
  //     console.log('error', error);
  //
  //     showError(getErrorMessage(error));
  //   } finally {
  //     setClaiming(false);
  //   }
  // };

  const renderTokenVesting = useCallback(() => {
    return (
      <Flex gap={'4px'} alignItems={'center'}>
        <Text>6M cliff & 12M vesting:</Text>
        <Text>
          {formatCurrency(
            userContribute?.vesting_token_balance,
            MIN_DECIMAL,
            MIN_DECIMAL,
            'BTC',
            false,
            1000,
          )}{' '}
          $EAI
        </Text>
      </Flex>
    );
  }, [userContribute?.vesting_token_balance]);

  const renderContent = () => {
    let content = <></>;

    if (!isClaimable) {
      content = (
        <>
          <Flex className={s.balanceWrapper} flexDirection={'column'}>
            <Text className={s.balanceTitle}>Claimable balance</Text>
            <Text className={s.balanceBalance}>{`${formatCurrency(
              claimableAmount,
              0,
              2,
            )} $EAI`}</Text>
          </Flex>
          {renderTokenVesting()}
          {!wallet?.address && (
            <Flex gap={'24px'} w={'100%'} mt={'12px'}>
              <Button
                // isLoading={isClaimWithStake && claiming}
                // isDisabled={isDisabled}
                className={s.linkClaimed}
                // onClick={openSignView}
                flex={1}
              >
                Sign in to claim
              </Button>
            </Flex>
          )}
        </>
      );
    } else if (isClaimed || claimed) {
      content = (
        <>
          <Flex className={s.balanceWrapper} flexDirection={'column'}>
            <Text className={s.balanceBalance}>
              You have claimed your $EAI.
            </Text>
          </Flex>
          {renderTokenVesting()}
          <Flex gap={'24px'} w={'100%'} mt={'12px'}>
            <Button
              className={s.btnClaimed}
              onClick={() => {
                router.push('https://eternalai.org');
              }}
              flex={1}
            >
              Go to Eternal AI
            </Button>
          </Flex>
        </>
      );
    } else if (!(isClaimed || claimed) && isClaimable) {
      content = (
        <>
          <Flex className={s.balanceWrapper} flexDirection={'column'}>
            <Text className={s.balanceTitle}>Claimable balance</Text>
            <Flex gap={'4px'}>
              <Text className={s.balanceBalance}>{`${formatCurrency(
                claimableAmount,
                0,
                2,
              )} $EAI`}</Text>
            </Flex>
          </Flex>
          {renderTokenVesting()}
          <Flex gap={'24px'} w={'100%'} mt={'12px'}>
            <Button
              isDisabled={isDisabled}
              onClick={onClaimBVMWithoutStake}
              className={s.btnClaimed}
              isLoading={claiming && !isClaimWithStake}
              loadingText={'Claiming...'}
              flex={1}
            >
              Claim $EAI
            </Button>
            {/*<Button
              isLoading={isClaimWithStake && claiming}
              isDisabled={isDisabled}
              className={s.btnClaimed}
              onClick={onClaimBVMWithStake}
              flex={1}
            >
              Claim and Stake $EAI
            </Button>*/}
          </Flex>
        </>
      );
    }

    return (
      <Center className={cx(s.wrapper)}>
        <Center className={cx(s.container, s.loadingContainer)}>
          {content}
        </Center>
      </Center>
    );
  };

  return renderContent();
};

export default ClaimBox;
