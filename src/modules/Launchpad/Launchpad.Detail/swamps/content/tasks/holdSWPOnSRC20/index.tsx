import ButtonConnected from '@/components/ButtonConnected';
import ConnectModal from '@/components/ConnectModal';
import useToggle from '@/hooks/useToggle';
import { formatCurrency } from '@/utils/format';
import { openExtraLink, shareURLWithReferralCode } from '@/utils/helpers';
import { Button, Center, Flex, Text } from '@chakra-ui/react';
import { BigNumber } from 'bignumber.js';
import cs from 'classnames';
import cx from 'clsx';
import { useParams } from 'next/navigation';
import { useMemo, useRef } from 'react';
import toast from 'react-hot-toast';
import useFormatHoldingSWPSRC20 from '../helpers/holdingAirdropMessage/useFormatHoldingSWPSRC20';
import s from '../item.module.scss';
import HoldingSWPSRC20Message from './message';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { useDispatch, useSelector } from 'react-redux';
import CLaunchpadAPI from '@/modules/Launchpad/services/launchpad';
import { userSelector } from '@/stores/states/user/selector';
import { User } from '@/stores/states/user/types';
import { requestReload } from '@/stores/states/common/reducer';
import { getError } from '@/utils/error';

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

interface IReferFriend {
  isVerifyTW?: boolean;
  index: number;
}

const HoldSwampsSRC20 = (props: IReferFriend) => {
  const { currentLaunchpad } = useLaunchpadContext();
  const allowBTC = useFormatHoldingSWPSRC20();
  const dispatch = useDispatch();
  const launchpadApi = useRef(new CLaunchpadAPI()).current;
  const user = useSelector(userSelector);
  const paramsURL = useParams();

  const btcOGMessage =
    Number(allowBTC.amount.src20_amount) > 0 ? (
      <p>
        Congratulations! You have staked{' '}
        {
          <span>
            {formatCurrency(allowBTC.amount.src20_amount, 0, 6, 'BTC')}
          </span>
        }{' '}
        BTC on Merlin and earned a total of{' '}
        {<span>{formatCurrency(allowBTC.amount.src20_point, 0)}</span>} points.
      </p>
    ) : (
      'Connect Unisat or Leather wallet'
    );
  const isNeedClaimBTCPoint = allowBTC.isUnclaimed;
  const { toggle: isShowConnect, onToggle: onToggleConnect } = useToggle();

  const isDisabled = useMemo(() => {
    return currentLaunchpad?.status !== 'prelaunch';
  }, [currentLaunchpad?.status]);

  const onClickShare = async () => {
    if (isNeedClaimBTCPoint) {
      shareTw({
        fee: allowBTC.amount.src20_amount,
        feeUSD: allowBTC.amount.src20_point,
        user,
        id: (paramsURL.id || '') as string,
      });
      await launchpadApi.requestClaimBTCPoint(allowBTC.status);
      dispatch(requestReload());
    } else {
      onToggleConnect();
    }
  };

  const handleConnect = async (res: any) => {
    if (res) {
      try {
        const { address, pubKey, message, signature } = res;
        await launchpadApi.verifyBTCSignature({
          address,
          pubKey,
          message,
          signature,
          launchpadId: currentLaunchpad?.id as number,
          network: 'bitcoin',
          type: 'src20',
        });
      } catch (error) {
        const { message } = getError(error);
        toast.error(message);
      } finally {
        onToggleConnect();
      }
    } else {
      onToggleConnect();
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
            <Text className={s.title}>Holding $SWP on SRC-20</Text>
            <Text className={s.desc}>{btcOGMessage}</Text>
          </Flex>
          <Flex direction="column" minW={'110px'} alignItems={'flex-end'}>
            <Text className={s.title}>+200 pts</Text>
            <Text className={s.desc} textAlign={'right'}>
              per 10,000 $SWP
            </Text>
          </Flex>
        </Flex>
        <Flex direction={'column'} gap={'12px'}>
          <ButtonConnected className={cs(s.btnShare, s.btnSignIn)}>
            <Button
              className={s.btnShare}
              loadingText="Submitting..."
              onClick={onClickShare}
              isDisabled={isDisabled}
            >
              {isNeedClaimBTCPoint
                ? `Tweet to claim ${formatCurrency(
                    allowBTC.amount.unClaimedPoint,
                    0,
                    0,
                  )} pts`
                : 'Verify now'}
            </Button>
            {isNeedClaimBTCPoint && (
              <Button
                className={cx(s.btnShare, s.btnSecondary)}
                loadingText="Submitting..."
                onClick={onToggleConnect}
                isDisabled={isDisabled}
              >
                Verify another wallet
              </Button>
            )}
          </ButtonConnected>
          <HoldingSWPSRC20Message />
        </Flex>
      </Flex>
      <ConnectModal isShow={isShowConnect} onHide={handleConnect} />
    </Flex>
  );
};

export default HoldSwampsSRC20;
