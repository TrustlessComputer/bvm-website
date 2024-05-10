import { Button, Center, Flex, Text } from '@chakra-ui/react';
import cs from 'classnames';
import { useMemo } from 'react';
import s from '../item.module.scss';
import ButtonConnected from '@/components/ButtonConnected';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import CLaunchpadAPI from '@/modules/Launchpad/services/launchpad';

interface IReferFriend {
  isVerifyTW?: boolean;
  index: number;
}

const FollowTwitter = (props: IReferFriend) => {
  const { currentLaunchpad } = useLaunchpadContext();
  const launchpadApi = new CLaunchpadAPI();

  const isDisabled = useMemo(() => {
    return currentLaunchpad?.status !== 'prelaunch';
  }, [currentLaunchpad?.status]);

  const handleFollow = (url: string) => {
    if (!url) return;
    window.open(url, '_blank');
    setTimeout(() => {
      launchpadApi.requestClaimFollow(currentLaunchpad?.id as number, {
        type: 'follow_on_x',
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
            <Text className={s.title}>
              {"Follow and turn on the notification Swamps' Twitter"}
            </Text>
          </Flex>
          <Flex direction="column" minW={'110px'} alignItems={'flex-end'}>
            <Text className={s.title}>+1,000 pts</Text>
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
            Follow @swamps_src20 on Twitter
          </Button>
        </ButtonConnected>
      </Flex>
    </Flex>
  );
};

export default FollowTwitter;
