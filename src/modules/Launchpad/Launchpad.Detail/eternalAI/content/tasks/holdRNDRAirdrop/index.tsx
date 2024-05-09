import { Button, Center, Flex, Text } from '@chakra-ui/react';
import React, { useMemo, useRef } from 'react';
import s from '../item.module.scss';
import { formatCurrency } from '@/utils/format';
import HoldingRNDRMessage from '../helpers/holdingAirdropMessage';
import useFormatHoldingRNDR from '@/modules/Launchpad/Launchpad.Detail/eternalAI/content/tasks/helpers/holdingAirdropMessage/useFormatHoldingRNDR';
import throttle from 'lodash/throttle';
import { signMessage as signMessageMetamask } from '@/utils/metamask-helper';
import cx from 'clsx';
import { BigNumber } from 'bignumber.js';
import { shareURLWithReferralCode } from '@/utils/helpers';
import { useParams } from 'next/navigation';
import { User } from '@/stores/states/user/types';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { useDispatch, useSelector } from 'react-redux';
import CLaunchpadAPI from '@/modules/Launchpad/services/launchpad';
import { userSelector } from '@/stores/states/user/selector';
import { useAuthenticatedWallet } from '@/Providers/AuthenticatedProvider/hooks';
import { requestReload } from '@/stores/states/common/reducer';

const shareTw = (params: {
  fee: string | number;
  point: string | number;
  refCode: string;
  user: User | undefined;
  id: string;
}) => {
  const amount = new BigNumber(params.fee).gte(0.0001)
    ? new BigNumber(
        new BigNumber(params.fee).toFixed(4, BigNumber.ROUND_FLOOR),
      ).toNumber()
    : new BigNumber(new BigNumber(params.fee).toFixed()).toNumber();

  const points = new BigNumber(params.point).lte(0.1) ? 1 : params.point;

  const url = shareURLWithReferralCode({
    subDomain: `launchpad/detail/${params.id}`,
    user: params.user,
  });

  const content = `Just claimed ${formatCurrency(
    points,
    0,
    0,
  )} $EAI by holding ${amount} $RNDR\n\n@CryptoEternalAI is setting out to be the 1st Bitcoin L2 designed for AI\n\n$EAI public sale starting soon!\n\nBe early & join the allowlist:\n${url}`;

  setTimeout(() => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`,
      '_blank',
    );
  }, 200);
};

const HoldRNDRAirdrop = (props: { index: number; isVerifyTW?: boolean }) => {
  const { currentLaunchpad } = useLaunchpadContext();
  const allowSAVM = useFormatHoldingRNDR();
  const dispatch = useDispatch();
  const launchpadApi = useRef(new CLaunchpadAPI()).current;
  const user = useSelector(userSelector);
  const paramsURL = useParams();

  const wallet = useAuthenticatedWallet();

  const isAuthenticated = wallet?.address;

  const [loading, setLoading] = React.useState(false);

  const onSignMessage = async () => {
    try {
      if (loading) return;
      setLoading(true);
      const { signature, message, address } = await signMessageMetamask(
        (address: string) => {
          return `This action verifies the ownership of ${address}.`;
        },
      );

      await launchpadApi.verifyAirdropSignature({
        address,
        pubKey: '',
        message,
        signature,
        launchpadId: currentLaunchpad?.id as number,
        network: 'ethereum',
        type: 'render',
      });
      dispatch(requestReload());
      // showSuccess({
      //   message: 'Successfully',
      // });
    } catch (error) {
      // const { message } = getErrorMessage(error);
      // showError({ message: message });
    } finally {
      setLoading(false);
    }
  };

  const throttleSignMessage = React.useCallback(throttle(onSignMessage, 300), [
    loading,
  ]);
  const savmOGMessage =
    Number(allowSAVM.amount.render_amount) > 0 ? (
      <p>
        Congratulations! You've earned a reservation for{' '}
        {<span>{formatCurrency(allowSAVM.amount.render_airdrop, 0)}</span>} $EAI
        tokens, which will be available after the upcoming TGE.
      </p>
    ) : (
      <>
        <p>The more $RNDR you hold, the larger your $EAI airdrop is.</p>
        <p>Connect your Metamask wallet to confirm your balance.</p>
      </>
    );
  const isNeedClaimBTCPoint = allowSAVM.isUnclaimed;

  const isDisabled = useMemo(() => {
    return currentLaunchpad?.status !== 'prelaunch' || loading;
  }, [currentLaunchpad?.status, loading]);

  const onClickShare = async () => {
    // if (!isAuthenticated) return openSignView();
    try {
      if (isNeedClaimBTCPoint) {
        shareTw({
          fee: allowSAVM.amount.render_amount,
          point: allowSAVM.amount.render_airdrop,
          refCode: user?.referral_code || '',
          user,
          id: (paramsURL.id || '') as string,
        });
        await launchpadApi.requestClaimAirdrop(allowSAVM.status);
        dispatch(requestReload());
      } else {
        throttleSignMessage();
      }
    } catch (error) {
      // const { message } = getErrorMessage(error);
      // showError({ message });
    }
  };

  return (
    <Flex
      className={cx(s.container, {
        [`${s.container_disable}`]: !props.isVerifyTW,
      })}
    >
      <Center className={s.index}>{props.index}</Center>
      <Flex className={s.shareTw}>
        <Flex justifyContent={'space-between'} gap={'12px'}>
          <Flex direction="column">
            <Text className={s.title}>Are you holding $RNDR?</Text>
            <Text className={s.desc}>{savmOGMessage}</Text>
          </Flex>
          <Flex direction="column" minW={'110px'} alignItems={'flex-end'}>
            <Text className={s.title}>+10 EAI</Text>
            <Text className={s.desc} textAlign={'right'}>
              per 100 RNDR
            </Text>
          </Flex>
        </Flex>
        <Flex direction={'column'} gap={'12px'} w={'100%'}>
          <Button
            className={s.btnShare}
            loadingText="Submitting..."
            onClick={onClickShare}
            isDisabled={isDisabled}
          >
            {!isAuthenticated
              ? 'Connect Naka wallet'
              : isNeedClaimBTCPoint
              ? `Tweet to claim ${formatCurrency(
                  allowSAVM.amount.unClaimedAirdrop,
                  0,
                  0,
                )} $EAI`
              : 'Verify now'}
          </Button>
          {isNeedClaimBTCPoint && (
            <Button
              className={cx(s.btnShare, s.btnSecondary)}
              loadingText="Submitting..."
              onClick={throttleSignMessage}
              isDisabled={isDisabled}
            >
              Verify another wallet
            </Button>
          )}
          <HoldingRNDRMessage />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HoldRNDRAirdrop;
