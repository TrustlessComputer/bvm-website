import { showError, showSuccess } from '@/components/toast';
import useNakaAuthen from '@/hooks/useRequestNakaAccount';
import useFormatHoldingSWPL2 from '@/modules/Launchpad/Launchpad.Detail/swamps/content/tasks/helpers/holdingAirdropMessage/useFormatHoldingSWPL2';
import CLaunchpadAPI from '@/modules/Launchpad/services/launchpad';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { requestReload } from '@/stores/states/common/reducer';
import { userSelector } from '@/stores/states/user/selector';
import { User } from '@/stores/states/user/types';
import { getErrorMessage } from '@/utils/errorV2';
import { formatCurrency } from '@/utils/format';
import { openExtraLink, shareURLWithReferralCode } from '@/utils/helpers';
import { signMessage as signMessageMetamask } from '@/utils/metamask-helper';
import { Button, Center, Flex, Text } from '@chakra-ui/react';
import { BigNumber } from 'bignumber.js';
import cx from 'clsx';
import throttle from 'lodash/throttle';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HoldingSWPL2Message from '../helpers/holdingAirdropMessage';
import s from '../item.module.scss';

export const SWAMP_L2_CONFIG = {
  chainId: '0xb18e',
  chainName: 'Swamps L2',
  rpcUrls: ['https://swamps.tc.l2aas.com'],
  iconUrls: [],
  nativeCurrency: {
    name: 'SWP',
    symbol: 'SWP',
    decimals: 18,
  },
};

export const shareTw = (params: {
  fee: string | number;
  feeUSD: string | number;
  user: User | undefined;
  id: string;
}) => {
  const url = shareURLWithReferralCode({
    subDomain: `launchpad/detail/${params.id}`,
    user: params.user,
  });
  const content = `Just claimed ${formatCurrency(
    new BigNumber(params.feeUSD || 1).toNumber() || 1,
    0,
    2,
  )} points for $SWP IDO allowlist with my $SWP on @swamps_src20\n\n$GSWP IDO starting soon on April 15!\n\nBe early & join the allowlist:\n${url}`;

  return openExtraLink(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`,
  );
};

const HoldSWPOnBTCL2 = (props: { index: number; isVerifyTW?: boolean }) => {
  const { currentLaunchpad } = useLaunchpadContext();
  const allowSAVM = useFormatHoldingSWPL2();
  const dispatch = useDispatch();
  const launchpadApi = new CLaunchpadAPI();
  const user = useSelector(userSelector);
  const paramsURL = useParams();

  const { isAuthen, requestAccount } = useNakaAuthen();

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
        network: 'swamps',
        type: 'swamps',
      });
      dispatch(requestReload());
      showSuccess({
        message: 'Successfully',
      });
    } catch (error) {
      const { message } = getErrorMessage(error);
      showError({ message: message });
    } finally {
      setLoading(false);
    }
  };

  const throttleSignMessage = React.useCallback(throttle(onSignMessage, 300), [
    loading,
  ]);

  const savmOGMessage =
    Number(allowSAVM.amount.swamps_point) > 0 ? (
      <p>
        Congratulations! You've earned a reservation for{' '}
        {<span>{formatCurrency(allowSAVM.amount.swamps_point, 0)}</span>} $EAI
        tokens, which will be available after the upcoming TGE.
      </p>
    ) : (
      <>
        <p>The more $SWP you hold, the larger your pts is.</p>
        <p>Connect your Metamask wallet to confirm your balance.</p>
      </>
    );
  const isNeedClaimBTCPoint = allowSAVM.isUnclaimed;

  const isDisabled = useMemo(() => {
    return currentLaunchpad?.status !== 'prelaunch' || loading;
  }, [currentLaunchpad?.status, loading]);

  const onClickShare = async () => {
    if (!isAuthen) return requestAccount();
    try {
      if (isNeedClaimBTCPoint) {
        shareTw({
          fee: allowSAVM.amount.swamps_amount,
          feeUSD: allowSAVM.amount.swamps_point,
          user,
          id: (paramsURL.id || '') as string,
        });
        await launchpadApi.requestClaimBTCPoint(allowSAVM.status);
        dispatch(requestReload());
      } else {
        throttleSignMessage();
      }
    } catch (error) {
      const { message } = getErrorMessage(error);
      showError({ message });
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
            <Text className={s.title}>Holding $SWP on Swamp L2?</Text>
            <Text className={s.desc}>{savmOGMessage}</Text>
          </Flex>
          <Flex direction="column" minW={'110px'} alignItems={'flex-end'}>
            <Text className={s.title}>+200 pts</Text>
            <Text className={s.desc} textAlign={'right'}>
              per 10,000 $SWP
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
            {!isAuthen
              ? 'Connect Naka wallet'
              : isNeedClaimBTCPoint
              ? `Tweet to claim ${formatCurrency(
                  allowSAVM.amount.unClaimedPoint,
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
          <HoldingSWPL2Message />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HoldSWPOnBTCL2;
