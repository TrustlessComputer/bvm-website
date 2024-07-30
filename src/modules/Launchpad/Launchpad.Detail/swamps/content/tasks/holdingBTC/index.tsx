import { Button, Center, Flex, Text, useDisclosure } from '@chakra-ui/react';
import cs from 'classnames';
import React, { useMemo, useRef } from 'react';
import s from '../item.module.scss';
import ButtonConnected from '@/components/ButtonConnected';
import { formatCurrency } from '@/utils/format';
import useFormatHoldingBTC from '@/modules/Launchpad/Launchpad.Detail/swamps/content/tasks/helpers/holdingBTCMessage/useFormatHoldingBTC';
import { BigNumber } from 'bignumber.js';
import { shareURLWithReferralCode } from '@/utils/helpers';
import { useParams } from 'next/navigation';
import useHoldingBTC from '../helpers/holdingBTCMessage/useHoldingBTC';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { useDispatch, useSelector } from 'react-redux';
import CLaunchpadAPI from '@/modules/Launchpad/services/launchpad';
import { userSelector } from '@/stores/states/user/selector';
import { requestReload } from '@/stores/states/common/reducer';
import DepositModal from '@/modules/PublicSale/depositModal';

interface IReferFriend {
  isVerifyTW?: boolean;
  index: number;
}

const HoldingBTC = (props: IReferFriend) => {
  const {
    isOpen: isOpenDeposit,
    onOpen: onOpenDeposit,
    onClose: onCloseDeposit,
  } = useDisclosure({ id: 'DepositModalID' });
  useHoldingBTC();
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

    const content = `Just bridged ${amount} BTC to @Naka_Chain - the first Bitcoin L2 designed for BRC-20 DeFi\n\n$GSWP IDO starting soon on April 15.\n\nJoin the IDO allowlist now:\n${url}`;

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
      onOpenDeposit();
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
            <Text className={s.title}>+2,000 pts</Text>
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
      {isOpenDeposit && (
        <DepositModal isOpen={isOpenDeposit} onClose={onCloseDeposit} />
      )}
    </Flex>
  );
};

export default HoldingBTC;
