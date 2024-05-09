import { Flex } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import ShareTw from './shareTw';
import s from './styles.module.scss';
import HoldingBTC from './holdingBTC';
import StakingBVM from './stakingBVM';
import ReferFriend from './referFriend';
import ReferFriendIDO from './referFriendIDO';
import Holding404 from '@/modules/Launchpad/Launchpad.Detail/naka/content/tasks/holding404';
import SavmOG from '@/modules/Launchpad/Launchpad.Detail/naka/content/tasks/savmOG';
import StakingMerlin from '@/modules/Launchpad/Launchpad.Detail/naka/content/tasks/stakingMerlin';
import AuthenStorage from '@/utils/storage/authen.storage';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';

const Tasks = () => {
  const token = AuthenStorage.getAuthenKey();
  const [_, setIsVerifyTW] = useState(!!token);
  // useAllowBTC();
  // useAllow404();
  // useAllowStaking();
  // useHoldingBTC();
  // useAllowSAVM();

  const { currentLaunchpad, myDataLeaderBoard } = useLaunchpadContext();

  const isDone = useMemo(() => {
    return (
      myDataLeaderBoard?.need_active &&
      Number(myDataLeaderBoard?.content_point) > 0
    );
  }, [myDataLeaderBoard]);

  const index = useMemo(() => {
    return isDone ? -1 : 0;
  }, [isDone]);

  if (currentLaunchpad?.status === 'ended') {
    return null;
  }

  if (currentLaunchpad?.status === 'ido') {
    return (
      <Flex className={s.container}>
        <ReferFriendIDO
          isVerifyTW={true}
          index={1}
          myDataLeaderBoard={myDataLeaderBoard}
        />
      </Flex>
    );
  }

  return (
    <Flex className={s.container}>
      {!isDone && (
        <ShareTw
          onVerifySuccess={() => setIsVerifyTW(true)}
          index={index + 1}
          isDone={isDone}
        />
      )}
      <ReferFriend isVerifyTW={isDone} index={index + 2} />
      <HoldingBTC isVerifyTW={isDone} index={index + 3} />
      <StakingBVM isVerifyTW={isDone} index={index + 4} />
      {/*<BitcoinOG index={index + 5}/>*/}
      <StakingMerlin isVerifyTW={isDone} index={index + 5} />
      <Holding404 isVerifyTW={isDone} index={index + 6} />
      <SavmOG isVerifyTW={isDone} index={index + 7} />
      {isDone && (
        <ShareTw
          onVerifySuccess={() => setIsVerifyTW(true)}
          index={index + 8}
          isDone={isDone}
        />
      )}
    </Flex>
  );
};

export default Tasks;
