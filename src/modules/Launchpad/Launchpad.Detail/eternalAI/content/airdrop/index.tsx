import { Flex } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import s from './styles.module.scss';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import HoldRNDRAirdrop from '@/modules/Launchpad/Launchpad.Detail/eternalAI/content/tasks/holdRNDRAirdrop';
import useHoldingAirdrop from '@/modules/Launchpad/Launchpad.Detail/eternalAI/content/tasks/helpers/holdingAirdropMessage/useHoldingAirdrop';
import HoldFETAirdrop from '@/modules/Launchpad/Launchpad.Detail/eternalAI/content/tasks/holdFETAirdrop';

const Airdrop = () => {
  // const token = AuthenStorage.getAuthenKey();
  // const [_, setIsVerifyTW] = useState(!!token);
  // useHoldingEAI();
  // useAllow404();
  // useAllowStaking();
  // useHoldingBTC();
  useHoldingAirdrop();

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
      <HoldRNDRAirdrop isVerifyTW={isDone} index={index + 1} />
      <HoldFETAirdrop isVerifyTW={isDone} index={index + 2} />
    </Flex>
  );
};

export default Airdrop;
