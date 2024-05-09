import { Flex } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import s from './styles.module.scss';
import { useLaunchpadContext } from '@/providers/LaunchpadProvider/hooks/useLaunchpadContext';
import FollowTwitter from '@/modules/Launchpad/Launchpad.Detail/swamps/content/tasks/followTwitter';

const Follow = () => {
  const { currentLaunchpad } = useLaunchpadContext();

  const isDone = useMemo(() => {
    return true;
  }, []);

  const index = useMemo(() => {
    return isDone ? 0 : 0;
  }, [isDone]);

  if (currentLaunchpad?.status === 'ended') {
    return null;
  }

  return (
    <Flex className={s.container} id={'list-airdrop'}>
      <FollowTwitter isVerifyTW={isDone} index={index + 1} />
      <FollowTwitter isVerifyTW={isDone} index={index + 2} />
    </Flex>
  );
};

export default Follow;
