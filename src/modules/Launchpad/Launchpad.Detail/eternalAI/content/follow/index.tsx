import {Flex} from '@chakra-ui/react';
import React, {useMemo} from 'react';
import s from './styles.module.scss';
import {useLaunchpadContext} from '@/providers/LaunchpadProvider/hooks/useLaunchpadContext';
import FollowTwitter from "@/modules/Launchpad/Launchpad.Detail/eternalAI/content/tasks/followTwitter";
import JoinTelegram from "@/modules/Launchpad/Launchpad.Detail/eternalAI/content/tasks/joinTelegram";

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
    <Flex className={s.container} id={"list-airdrop"}>
      <FollowTwitter isVerifyTW={isDone} index={index + 1} position={1}/>
      <FollowTwitter isVerifyTW={isDone} index={index + 2} position={2}/>
      <JoinTelegram isVerifyTW={isDone} index={index + 3}/>
    </Flex>
  );
};

export default Follow;
