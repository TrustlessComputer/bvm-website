import ButtonConnected from '@/components/ButtonConnected';
import { openExtraLink, shareURLWithReferralCode } from '@/utils/helpers';
import { Button, Center, Flex, Text } from '@chakra-ui/react';
import cs from 'classnames';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import s from '../item.module.scss';
import { userSelector } from '@/stores/states/user/selector';
import { useSelector } from 'react-redux';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { IPreLaunchpadTask } from '@/modules/Launchpad/services/launchpad.interfaces';
import useTasks from '../useTasks';
import { formatCurrency } from '@/utils/format';

interface IReferFriend {
  isVerifyTW?: boolean;
  index?: number;
  data: IPreLaunchpadTask;
}

const ReferFriend = (props: IReferFriend) => {
  const user = useSelector(userSelector);
  const { currentLaunchpad } = useLaunchpadContext();
  const params = useParams();
  const data = props.data;

  const { point, xData } = useTasks({ task: data });

  const isDisabled = useMemo(() => {
    return currentLaunchpad?.status !== 'prelaunch';
  }, [currentLaunchpad?.status]);

  const onClickRefer = async () => {
    if (!user?.referral_code) return;

    const url = shareURLWithReferralCode({
      subDomain: `launchpad/detail/${params.id}`,
      user: user,
    });

    const content = `@${xData?.value} ${currentLaunchpad?.short_description}.\n\n$${currentLaunchpad?.token_name} IDO starting soon! Join the allowlist now:\n\n${url}`;
    return openExtraLink(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`,
    );
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
            <Text className={s.title}>
              +{formatCurrency(point?.value, 0, 2)} pts
            </Text>
            <Text className={s.desc}>per friend</Text>
          </Flex>
        </Flex>
        <ButtonConnected className={cs(s.btnShare, s.btnSignIn)}>
          <Button
            className={s.btnShare}
            onClick={onClickRefer}
            isDisabled={isDisabled}
          >
            Share your referral link
          </Button>
        </ButtonConnected>
      </Flex>
    </Flex>
  );
};

export default ReferFriend;
