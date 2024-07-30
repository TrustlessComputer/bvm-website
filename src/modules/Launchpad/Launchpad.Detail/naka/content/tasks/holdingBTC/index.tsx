import ButtonConnected from '@/components/ButtonConnected';
import useFormatHoldingBTC from '@/modules/Launchpad/Launchpad.Detail/naka/content/tasks/helpers/holdingBTCMessage/useFormatHoldingBTC';
import CLaunchpadAPI from '@/modules/Launchpad/services/launchpad';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { userSelector } from '@/stores/states/user/selector';
import { formatCurrency } from '@/utils/format';
import { shareURLWithReferralCode } from '@/utils/helpers';
import { Button, Center, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { BigNumber } from 'bignumber.js';
import cs from 'classnames';
import { useParams } from 'next/navigation';
import { useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from '../item.module.scss';
import { requestReload } from '@/stores/states/common/reducer';

interface IReferFriend {
  isVerifyTW?: boolean;
  index: number;
}

const HoldingBTC = (props: IReferFriend) => {
  const { currentLaunchpad } = useLaunchpadContext();
  const holdingBTC = useFormatHoldingBTC();
  const isNeedClaimBTCPoint = holdingBTC.isUnclaimed;
  const dispatch = useDispatch();
  const launchpadApi = useRef(new CLaunchpadAPI()).current;
  const user = useSelector(userSelector);
  const params = useParams();

  const isDisabled = useMemo(() => {
    return currentLaunchpad?.status !== 'prelaunch';
  }, [currentLaunchpad?.status]);

  const shareTw = (p: {
    fee: string | number;
    feeUSD: string | number;
    point: string | number;
    refCode: string;
  }) => {
    const amount = new BigNumber(p.fee).gte(0.0001)
      ? new BigNumber(p.fee).toFixed(4, BigNumber.ROUND_FLOOR)
      : new BigNumber(p.fee).toFixed();

    const url = shareURLWithReferralCode({
      subDomain: `launchpad/detail/${params.id}`,
      user: user,
    });

    const content = `Just bridged ${amount} BTC to @Naka_Chain - the first Bitcoin L2 designed for BRC-20 DeFi\n\n$NAKA IDO starting soon on March 11, with only $1M FDV at launch\n\nJoin the IDO allowlist now:\n${url}`;

    setTimeout(() => {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`,
        '_blank',
      );
    }, 200);
  };

  const onDepositHandler = () => {
    if (isNeedClaimBTCPoint) {
      shareTw({
        fee: holdingBTC.amount.deposit_amount,
        feeUSD: holdingBTC.amount.depositAmountUSD,
        point: holdingBTC.amount.deposit_point,
        refCode: user?.referral_code || '',
      });
      setTimeout(() => {
        launchpadApi.requestClaimBTCPoint(holdingBTC.status);
        dispatch(requestReload());
      }, 10000);
    } else {
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
            <Text className={s.title}>
              Bridge BTC or ETH to your Naka wallet
            </Text>
            <Text className={s.desc}>
              Prepare for your first trades on NakaChain by bridging BTC or ETH
              now.
            </Text>
          </Flex>
          <Flex direction="column" minW={'110px'} alignItems={'flex-end'}>
            <Text className={s.title}>+200 pts</Text>
            <Text className={s.desc} textAlign={'right'}>
              per 0.00025 BTC
            </Text>
          </Flex>
        </Flex>
        <Flex direction={'column'} w={'100%'}>
          <ButtonConnected className={cs(s.btnShare, s.btnSignIn)}>
            <Button
              className={s.btnShare}
              onClick={onDepositHandler}
              isDisabled={isDisabled}
            >
              {isNeedClaimBTCPoint
                ? `Tweet to claim ${formatCurrency(
                    holdingBTC.amount.unClaimedPoint,
                    0,
                    0,
                  )} pts`
                : 'Deposit'}
            </Button>
          </ButtonConnected>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HoldingBTC;
