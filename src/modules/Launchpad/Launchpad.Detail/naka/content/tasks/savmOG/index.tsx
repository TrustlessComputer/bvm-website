import { Button, Center, Flex, Text } from '@chakra-ui/react';
import React, { useMemo, useRef } from 'react';
import s from '../item.module.scss';
import { formatCurrency } from '@/utils/format';
import { BigNumber } from 'bignumber.js';
import cx from 'clsx';
import AllowSAVMMessage from '@/modules/Launchpad/Launchpad.Detail/naka/content/tasks/helpers/allowSAVMMessage';
import useFormatAllowSAVM from '@/modules/Launchpad/Launchpad.Detail/naka/content/tasks/helpers/allowSAVMMessage/useFormatAllowSAVM';
import throttle from 'lodash/throttle';
import { signMessage as signMessageMetamask } from '@/utils/metamask-helper';
import cs from 'classnames';
import { useParams } from 'next/navigation';
import { shareURLWithReferralCode } from '@/utils/helpers';
import { User } from '@/stores/states/user/types';
import { requestReload } from '@/stores/states/common/reducer';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { useDispatch, useSelector } from 'react-redux';
import CLaunchpadAPI from '@/modules/Launchpad/services/launchpad';
import { userSelector } from '@/stores/states/user/selector';
import { useAuthenticatedWallet } from '@/Providers/AuthenticatedProvider/hooks';

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
  )} points for $NAKA IDO allowlist by holding ${amount} $SAVM\n\n@naka_chain is setting out to be one of the biggest DeFi Bitcoin L2s in 2024\n\n$NAKA IDO starting soon on Mar 11!\n\nBe early & join the allowlist:\n${url}`;

  setTimeout(() => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`,
      '_blank',
    );
  }, 200);
};

const SavmOG = (props: { index: number; isVerifyTW?: boolean }) => {
  const { currentLaunchpad } = useLaunchpadContext();
  const allowSAVM = useFormatAllowSAVM();
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

      await launchpadApi.verifyBTCSignature({
        address,
        pubKey: '',
        message,
        signature,
        launchpadId: currentLaunchpad?.id as number,
        network: 'ethereum',
        type: 'savm',
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
    Number(allowSAVM.amount.savm_amount) > 0 ? (
      <p>
        Congratulations! You have{' '}
        {
          <span>
            {formatCurrency(allowSAVM.amount.savm_amount, 0, 6, 'BTC')}
          </span>
        }{' '}
        $SAVM and earned a total of{' '}
        {<span>{formatCurrency(allowSAVM.amount.savm_point, 0)}</span>} points.
      </p>
    ) : (
      <>
        <p>The more $SAVM you hold, the higher your points.</p>
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
          fee: allowSAVM.amount.savm_amount,
          point: allowSAVM.amount.savm_point,
          refCode: user?.referral_code || '',
          user,
          id: (paramsURL.id || '') as string,
        });
        await launchpadApi.requestClaimBTCPoint(allowSAVM.status);
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
      className={cs(s.container, {
        [`${s.container_disable}`]: !props.isVerifyTW,
      })}
    >
      <Center className={s.index}>{props.index}</Center>
      <Flex className={s.shareTw}>
        <Flex justifyContent={'space-between'} gap={'12px'}>
          <Flex direction="column">
            <Text className={s.title}>Are you holding $SAVM?</Text>
            <Text className={s.desc}>{savmOGMessage}</Text>
          </Flex>
          <Flex direction="column" minW={'110px'} alignItems={'flex-end'}>
            <Text className={s.title}>+100 pts</Text>
            <Text className={s.desc} textAlign={'right'}>
              per 2 SAVM
            </Text>
          </Flex>
        </Flex>
        <Flex direction={'column'} gap={'12px'}>
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
                  allowSAVM.amount.unClaimedSAVMPoint,
                  0,
                  0,
                )} pts`
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
          <AllowSAVMMessage />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SavmOG;
