import useAllowStaking from '@/modules/Launchpad/Launchpad.Detail/naka/content/tasks/helpers/stakingBVMMessage/useAllowStaking';
import StakingBVM from '@/modules/Launchpad/Launchpad.Detail/swamps/content/tasks/stakingBVM';
import { Flex } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import FollowTwitter from './followTwitter';
import useHoldingAirdrop from './helpers/holdingAirdropMessage/useHoldingAirdrop';
import useHoldingSwamps from './helpers/holdingEAIMessage/useHoldingEAI';
import HoldingBTC from './holdingBTC';
import HoldSWPOnSRC20 from './holdSWPOnSRC20';
import LikeTwitter from './likeTwitter';
import ReferFriend from './referFriend';
import ShareTw from './shareTw';
import s from './styles.module.scss';
import AuthenStorage from '@/utils/storage/authen.storage';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';

const Tasks = () => {
  const token = AuthenStorage.getAuthenKey();
  const [_, setIsVerifyTW] = useState(!!token);
  // useHoldingEAI();
  // useAllow404();
  useAllowStaking();
  // useHoldingBTC();
  useHoldingAirdrop();
  useHoldingSwamps();

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
    <Flex className={s.container} id={'list-task'}>
      {/*{!isDone && (
        <ShareTw
          onVerifySuccess={() => setIsVerifyTW(true)}
          index={index + 1}
          isDone={isDone}
        />
      )}*/}
      <ShareTw
        onVerifySuccess={() => setIsVerifyTW(true)}
        index={index + 1}
        isDone={false}
        content={`Can't wait to see how $GSWP transforms the way we trade SRC-20 tokens on @swamps_src20. IDO soon on @naka_chain! You don't wanna miss this out`}
      />
      <ReferFriend isVerifyTW={isDone} index={index + 2} />
      {/*<FollowTwitter isVerifyTW={isDone} index={index + 3} />*/}
      {/*<JoinTelegram isVerifyTW={isDone} index={index + 2} />*/}
      <HoldingBTC isVerifyTW={isDone} index={index + 3} />
      <StakingBVM isVerifyTW={isDone} index={index + 4} />
      <FollowTwitter isVerifyTW={isDone} index={index + 5} />
      <HoldSWPOnSRC20 isVerifyTW={isDone} index={index + 6} />
      {/* <HoldSWPOnBTCL2 isVerifyTW={isDone} index={index + 5} /> */}

      <LikeTwitter isVerifyTW={isDone} index={index + 7} />
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
