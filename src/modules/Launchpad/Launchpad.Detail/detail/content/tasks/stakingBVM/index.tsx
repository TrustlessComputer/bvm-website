import { Button, Center, Flex, Text } from '@chakra-ui/react';
import cs from 'classnames';
import React, { useMemo, useRef } from 'react';
import s from '../item.module.scss';
import { EARN_URL } from '@/constants/route-path';
import ButtonConnected from '@/components/ButtonConnected';
import { formatCurrency } from '@/utils/format';
import useFormatAllowStaking from '@/modules/Launchpad/Launchpad.Detail/naka/content/tasks/helpers/stakingBVMMessage/useFormatAllowStaking';
import { shareURLWithReferralCode } from '@/utils/helpers';
import { useParams, useRouter } from 'next/navigation';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { useDispatch } from 'react-redux';
import CLaunchpadAPI from '@/modules/Launchpad/services/launchpad';
import { userSelector } from '@/stores/states/user/selector';
import { useAppSelector } from '@/stores/hooks';
import { requestReload } from '@/stores/states/common/reducer';
import { IPreLaunchpadTask } from '@/modules/Launchpad/services/launchpad.interfaces';
import useTasks from '../useTasks';

interface IReferFriend {
  isVerifyTW?: boolean;
  index?: number;
  data: IPreLaunchpadTask;
}

const StakingBVM = (props: IReferFriend) => {
  const router = useRouter();
  const { currentLaunchpad } = useLaunchpadContext();
  const allowStaking = useFormatAllowStaking();
  const isNeedClaimBTCPoint = allowStaking.isUnclaimed;
  const dispatch = useDispatch();
  const launchpadApi = useRef(new CLaunchpadAPI()).current;
  const user = useAppSelector(userSelector);
  const params = useParams();

  const data = props.data;

  const { point, taskPointPerAmount } = useTasks({ task: data });

  const shareTw = (p: {
    numBVMStaking: string | number;
    stakingRate: string | number;
    refCode: string;
  }) => {
    const url = shareURLWithReferralCode({
      subDomain: `launchpad/detail/${params.id}`,
      user: user,
    });

    const content = `Just staked ${formatCurrency(
      p.numBVMStaking,
    )} $BVM with 58% interest on @Naka_Chain - the first Bitcoin L2 designed for BRC-20 DeFi\n\n$${
      currentLaunchpad?.token_name
    } IDO starting soon.\n\nJoin the IDO allowlist now:\n${url}`;

    setTimeout(() => {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`,
        '_blank',
      );
    }, 200);
  };

  const isDisabled = useMemo(() => {
    return currentLaunchpad?.status !== 'prelaunch';
  }, [currentLaunchpad?.status]);

  const onClickShare = () => {
    if (isNeedClaimBTCPoint) {
      shareTw({
        numBVMStaking: allowStaking.amount.staking_amount,
        stakingRate: '50',
        refCode: user?.referral_code || '',
      });
      setTimeout(() => {
        launchpadApi.requestClaimBTCPoint(allowStaking.status);
        dispatch(requestReload());
      }, 10000);
    } else {
      router.push(EARN_URL);
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
            <Text className={s.title}>{data?.launchpad_task?.name}</Text>
            <Text className={s.desc}>{data?.launchpad_task?.description}</Text>
          </Flex>
          <Flex direction="column" minW={'110px'} alignItems={'flex-end'}>
            <Text className={s.title}>+{formatCurrency(point?.value)} pts</Text>
            <Text className={s.desc} textAlign={'right'}>
              {taskPointPerAmount?.description}
            </Text>
          </Flex>
        </Flex>
        <Flex direction={'column'} w={'100%'}>
          {Number(allowStaking.amount.staking_amount) > 0 && (
            <Text className={s.desc}>
              Your bvm staked:{' '}
              {formatCurrency(
                allowStaking.amount.staking_amount,
                0,
                2,
                'BTC',
                true,
              )}
            </Text>
          )}
          <ButtonConnected className={cs(s.btnShare, s.btnSignIn)}>
            <Button
              className={s.btnShare}
              loadingText="Submitting..."
              onClick={onClickShare}
              isDisabled={isDisabled}
            >
              {isNeedClaimBTCPoint
                ? `Tweet to claim ${formatCurrency(
                    allowStaking.amount.unClaimedPoint,
                    0,
                    0,
                  )} pts`
                : Number(allowStaking.amount.staking_amount) > 0
                ? 'Stake now'
                : 'Stake now'}
            </Button>
          </ButtonConnected>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default StakingBVM;
