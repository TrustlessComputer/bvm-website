import { Button, Center, Flex, Text } from '@chakra-ui/react';
import React, { useMemo, useRef } from 'react';
import s from '../item.module.scss';
import useFormatAllowBTC from '@/modules/Launchpad/Launchpad.Detail/naka/content/tasks/helpers/AllowBTCMessage/useFormatAllowBTC';
import { formatCurrency } from '@/utils/format';
import useToggle from '@/hooks/useToggle';
import { BigNumber } from 'bignumber.js';
import toast from 'react-hot-toast';
import cx from 'clsx';
import cs from 'classnames';
import { useParams } from 'next/navigation';
import { shareURLWithReferralCode } from '@/utils/helpers';
import { User } from '@/stores/states/user/types';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { useDispatch, useSelector } from 'react-redux';
import CLaunchpadAPI from '@/modules/Launchpad/services/launchpad';
import { userSelector } from '@/stores/states/user/selector';
import { requestReload } from '@/stores/states/common/reducer';
import { getError } from '@/utils/error';
import ConnectModal from '@/components/ConnectModal';

export const shareTw = (params: {
  fee: string | number;
  feeUSD: string | number;
  user: User | undefined;
  id: string;
}) => {
  // const shareUrl = `https://nakachain.xyz${LAUNCHPAD_URL}`;
  // const amount = new BigNumber(params.fee).gte(0.0001)
  //   ? new BigNumber(params.fee).toFixed(4, BigNumber.ROUND_FLOOR)
  //   : new BigNumber(params.fee).toFixed();
  // const content = `Staked ${amount} BTC on @MerlinLayer2 and earned ${formatCurrency(
  //   new BigNumber(params.feeUSD || 1).toNumber() || 1,
  //   0,
  //   2,
  // )} points for $NAKA IDO allowlist\n\n@naka_chain is setting out to be one of the biggest DeFi Bitcoin L2s in 2024\n\nJoin allowlist: ${shareUrl}`;
  const url = shareURLWithReferralCode({
    subDomain: `launchpad/detail/${params.id}`,
    user: params.user,
  });
  const content = `Just claimed ${formatCurrency(
    new BigNumber(params.feeUSD || 1).toNumber() || 1,
    0,
    2,
  )} points for $NAKA IDO allowlist with my staked $BTC on @MerlinLayer2\n\n@Naka_Chain is setting out to be one of the biggest DeFi Bitcoin L2s in 2024\n\n$NAKA IDO starting soon on Mar 11!\n\nBe early & join the allowlist:\n${url}`;

  //   Just claimed <xxxxx> points for $NAKA IDO allowlist with my staked $BTC on @MerlinLayer2
  //
  // @Naka_Chain is setting out to be one of the biggest DeFi Bitcoin L2s in 2024
  //
  //   $NAKA IDO starting soon on Mar 11!
  //
  //   Be early & join the allowlist: <ref link>

  setTimeout(() => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`,
      '_blank',
    );
  }, 200);
};

interface IReferFriend {
  isVerifyTW?: boolean;
  index: number;
}

const StakingMerlin = (props: IReferFriend) => {
  const { currentLaunchpad } = useLaunchpadContext();
  const allowBTC = useFormatAllowBTC();
  const dispatch = useDispatch();
  const launchpadApi = useRef(new CLaunchpadAPI()).current;
  const user = useSelector(userSelector);
  const paramsURL = useParams();

  const btcOGMessage =
    Number(allowBTC.amount.merlin_amount) > 0 ? (
      <p>
        Congratulations! You have staked{' '}
        {
          <span>
            {formatCurrency(allowBTC.amount.merlin_amount, 0, 6, 'BTC')}
          </span>
        }{' '}
        BTC on Merlin and earned a total of{' '}
        {<span>{formatCurrency(allowBTC.amount.merlin_point, 0)}</span>} points.
      </p>
    ) : (
      'The more BTC you stake on Merlin, the higher your points. Connect your Unisat or Xverse wallet to confirm your Merlin staking status.'
    );
  const isNeedClaimBTCPoint = allowBTC.isUnclaimed;
  const { toggle: isShowConnect, onToggle: onToggleConnect } = useToggle();

  const isDisabled = useMemo(() => {
    return currentLaunchpad?.status !== 'prelaunch';
  }, [currentLaunchpad?.status]);

  const onClickShare = async () => {
    if (isNeedClaimBTCPoint) {
      shareTw({
        fee: allowBTC.amount.merlin_amount,
        feeUSD: allowBTC.amount.merlin_point,
        user,
        id: (paramsURL.id || '') as string,
      });
      await launchpadApi.requestClaimBTCPoint(allowBTC.status);
      dispatch(requestReload());
    } else {
      onToggleConnect();
    }
  };

  // const handleConnect = async (res: any) => {
  //   if (res) {
  //     try {
  //       const { address, pubKey, message, signature } = res;
  //       await launchpadApi.verifyBTCSignature({
  //         address,
  //         pubKey,
  //         message,
  //         signature,
  //         launchpadId: currentLaunchpad?.id as number,
  //         network: 'bitcoin',
  //         type: 'gas-fee',
  //       });
  //     } catch (error) {
  //       const { message } = getError(error);
  //       toast.error(message);
  //     } finally {
  //       onToggleConnect();
  //     }
  //   } else {
  //     onToggleConnect();
  //   }
  // };

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
            <Text className={s.title}>Are you staking on Merlin?</Text>
            <Text className={s.desc}>{btcOGMessage}</Text>
          </Flex>
          <Flex direction="column" minW={'110px'} alignItems={'flex-end'}>
            <Text className={s.title}>+100 pts</Text>
            <Text className={s.desc} textAlign={'right'}>
              per 0.00025 BTC
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
            {isNeedClaimBTCPoint
              ? `Tweet to claim ${formatCurrency(
                  allowBTC.amount.unClaimedMerlinPoint,
                  0,
                  0,
                )} pts`
              : 'How much have I staked on Merlin?'}
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
        </Flex>
      </Flex>
      <ConnectModal isShow={isShowConnect} onHide={onToggleConnect} />
    </Flex>
  );
};

export default StakingMerlin;
