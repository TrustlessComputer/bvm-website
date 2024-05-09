import {Flex} from '@chakra-ui/react';
import React, {useMemo} from 'react';
import s from './styles.module.scss';
import {useLaunchpadContext} from '@/providers/LaunchpadProvider/hooks/useLaunchpadContext';
import StakingBVM from "@/modules/Launchpad/Launchpad.Detail/eternalAI/content/tasks/stakingBVM2";
import useAllowStaking
  from "@/modules/Launchpad/Launchpad.Detail/naka/content/tasks/helpers/stakingBVMMessage/useAllowStaking";

const Tasks = () => {
  // const token = AuthenStorage.getAuthenKey();
  // const [_, setIsVerifyTW] = useState(!!token);
  // useHoldingEAI();
  // useAllow404();
  useAllowStaking();
  // useHoldingBTC();
  // useHoldingAirdrop();

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
    <Flex className={s.container} id={"list-task"}>
      {/*{!isDone && (
        <ShareTw
          onVerifySuccess={() => setIsVerifyTW(true)}
          index={index + 1}
          isDone={isDone}
        />
      )}*/}
      <StakingBVM isVerifyTW={isDone} index={index + 1} />
      {/*<FollowTwitter isVerifyTW={isDone} index={index + 2} />*/}
      {/*<FollowTwitter isVerifyTW={isDone} index={index + 3} />*/}
      {/*<JoinTelegram isVerifyTW={isDone} index={index + 2} />*/}
      {/*<ReferFriend isVerifyTW={isDone} index={index + 3} />*/}
      {/*<HoldingBTC isVerifyTW={isDone} index={index + 4} />*/}
      {/*<EarnTestnetToken isVerifyTW={isDone} index={index + 3} />*/}
      {/*<BitcoinOG index={index + 5}/>*/}
      {/*<StakingMerlin isVerifyTW={isDone} index={index + 5} />*/}
      {/*<Holding404 isVerifyTW={isDone} index={index + 6} />*/}
      {/*<RndrOG isVerifyTW={isDone} index={index + 4} />*/}
      {/*{isDone && (
        <ShareTw
          onVerifySuccess={() => setIsVerifyTW(true)}
          index={index + 4}
          isDone={isDone}
        />
      )}*/}
    </Flex>
  );
};

export default Tasks;
