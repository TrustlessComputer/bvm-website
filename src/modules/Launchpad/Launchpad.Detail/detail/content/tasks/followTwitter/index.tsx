import ButtonConnected from '@/components/ButtonConnected';
import CLaunchpadAPI from '@/modules/Launchpad/services/launchpad';
import { IPreLaunchpadTask } from '@/modules/Launchpad/services/launchpad.interfaces';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { formatCurrency } from '@/utils/format';
import { Button, Center, Flex, Text } from '@chakra-ui/react';
import cs from 'classnames';
import { useMemo } from 'react';
import s from '../item.module.scss';
import useTasks from '../useTasks';

interface IReferFriend {
  isVerifyTW?: boolean;
  index?: number;
  data: IPreLaunchpadTask;
}

const FollowTwitter = (props: IReferFriend) => {
  const { currentLaunchpad } = useLaunchpadContext();
  const launchpadApi = new CLaunchpadAPI();

  const data = props.data;

  const { point, xData } = useTasks({ task: data });

  const isDisabled = useMemo(() => {
    return currentLaunchpad?.status !== 'prelaunch';
  }, [currentLaunchpad?.status]);

  const handleFollow = (url: string) => {
    if (!url) return;
    window.open(url, '_blank');
    setTimeout(() => {
      launchpadApi.requestClaimFollow(currentLaunchpad?.id as number, {
        type: data?.point_type,
      });
    }, 30000);
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
            <Text className={s.title}>{data?.launchpad_task?.description}</Text>
          </Flex>
          <Flex direction="column" minW={'110px'} alignItems={'flex-end'}>
            <Text className={s.title}>
              +{formatCurrency(point?.value, 0, 2)} pts
            </Text>
          </Flex>
        </Flex>
        <ButtonConnected className={cs(s.btnShare, s.btnSignIn)}>
          <Button
            className={s.btnShare}
            onClick={() =>
              handleFollow(
                'https://twitter.com/intent/follow?screen_name=swamps_src20',
              )
            }
            isDisabled={isDisabled}
          >
            Follow @{xData?.value} on Twitter
          </Button>
        </ButtonConnected>
      </Flex>
    </Flex>
  );
};

export default FollowTwitter;
