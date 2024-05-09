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

interface IReferFriend {
  isVerifyTW?: boolean;
  index: number;
}

const ReferFriend = (props: IReferFriend) => {
  const user = useSelector(userSelector);
  const { currentLaunchpad } = useLaunchpadContext();
  const params = useParams();

  const isDisabled = useMemo(() => {
    return currentLaunchpad?.status !== 'prelaunch';
  }, [currentLaunchpad?.status]);

  const onClickRefer = async () => {
    if (!user?.referral_code) return;

    const url = shareURLWithReferralCode({
      subDomain: `launchpad/detail/${params.id}`,
      user: user,
    });

    const content = `@swamps_src20 is a revolutionary Layer 2 solution that enables a bridge, along with fast, low-cost swaps for SRC-20 tokens.\n\n$GSWP IDO starting soon! Join the allowlist now:\n\n${url}`;
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
            <Text className={s.title}>Refer a friend to join IDO</Text>
            <Text className={s.desc}>
              Spread the love to your friends, team, and communities.
            </Text>
          </Flex>
          <Flex direction="column" minW={'110px'} alignItems={'flex-end'}>
            <Text className={s.title}>+500 pts</Text>
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
