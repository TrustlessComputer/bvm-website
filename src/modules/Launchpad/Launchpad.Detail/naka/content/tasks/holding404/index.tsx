import { Button, Center, Flex, Text } from '@chakra-ui/react';
import cs from 'classnames';
import React, { useEffect, useMemo, useRef } from 'react';
import s from '../item.module.scss';
import ButtonConnected from '@/components/ButtonConnected';
import { useParams, useRouter } from 'next/navigation';
import { formatCurrency } from '@/utils/format';
import { useDispatch, useSelector } from 'react-redux';
import useFormatAllow404 from '@/modules/Launchpad/Launchpad.Detail/naka/content/tasks/helpers/holding404Message/useFormatAllow404';
import { shareURLWithReferralCode } from '@/utils/helpers';
import { useAuthenticatedWallet } from '@/Providers/AuthenticatedProvider/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { userSelector } from '@/stores/states/user/selector';
import CLaunchpadAPI from '@/modules/Launchpad/services/launchpad';
import { requestReload } from '@/stores/states/common/reducer';
import { ERC404 } from '@/constants/route-path';

interface IReferFriend {
  isVerifyTW?: boolean;
  index: number;
}

const Holding404 = (props: IReferFriend) => {
  const router = useRouter();
  const wallet = useAuthenticatedWallet();
  const needReload = useSelector(commonSelector).needReload;
  const { currentLaunchpad } = useLaunchpadContext();
  const allow404 = useFormatAllow404();
  const isNeedClaimBTCPoint = allow404.isUnclaimed;
  const dispatch = useDispatch();
  const launchpadApi = useRef(new CLaunchpadAPI()).current;
  const user = useSelector(userSelector);
  const params = useParams();

  useEffect(() => {
    onLoadBalance();
  }, [wallet?.address, needReload]);

  const onLoadBalance = async () => {
    try {
      if (!wallet?.provider || !wallet?.address) return;
      /*const [balance] = */ await Promise.all([
        // playerShareContract.getTokenBalance(BRC_404_TOKEN_ADDRESS),
        launchpadApi.verifyBTCSignature({
          address: '',
          pubKey: '',
          message: '',
          signature: '',
          launchpadId: currentLaunchpad?.id as number,
          network: 'naka',
          type: 'brc404',
        }),
      ]);

      // setBVMBalance(balance);
    } catch (e) {
      console.log('onLoadBalance', e);
    } finally {
    }
  };

  const isDisabled = useMemo(() => {
    return currentLaunchpad?.status !== 'prelaunch';
  }, [currentLaunchpad?.status]);

  const shareTw = () => {
    const url = shareURLWithReferralCode({
      subDomain: `launchpad/detail/${params.id}`,
      user: user,
    });

    const content = `Just grabbed some of the first-ever BRC 404 tokens on @Naka_Chain - the Bitcoin L2 designed for DeFi dapps on Bitcoin\n\n$NAKA IDO starting soon on Mar 11, with only $1M FDV at launch\n\nJoin the IDO allowlist now:\n${url}`;

    setTimeout(() => {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`,
        '_blank',
      );
    }, 200);
  };

  const onClickShare = async () => {
    if (isNeedClaimBTCPoint) {
      shareTw();
      setTimeout(() => {
        launchpadApi.requestClaimBTCPoint(allow404.status);
        dispatch(requestReload());
      }, 10000);
    } else {
      router.push(`${ERC404}`);
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
            <Text className={s.title}>Hold BRC-404 Tokens</Text>
            <Text className={s.desc}>
              The more BRC-404 tokens you hold in the Naka wallet, the higher
              your points.
            </Text>
          </Flex>
          <Flex direction="column" minW={'110px'} alignItems={'flex-end'}>
            <Text className={s.title}>+100 pts</Text>
            <Text className={s.desc} textAlign={'right'}>
              per 0.00025 BTC
            </Text>
          </Flex>
        </Flex>
        <Flex direction={'column'} w={'100%'}>
          {/*{
            wallet?.address && (
              <Text className={s.desc}>Your 404 balance: {formatCurrency(bvmBalance, 0, 2, 'BTC', true)}</Text>
            )
          }*/}
          <ButtonConnected className={cs(s.btnShare, s.btnSignIn)}>
            <Button
              className={s.btnShare}
              loadingText="Submitting..."
              onClick={onClickShare}
              isDisabled={isDisabled}
            >
              {isNeedClaimBTCPoint
                ? `Tweet to claim ${formatCurrency(
                    allow404.amount.unClaimedPoint,
                    0,
                    0,
                  )} pts`
                : 'Buy BRC-404 Tokens'}
            </Button>
          </ButtonConnected>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Holding404;
