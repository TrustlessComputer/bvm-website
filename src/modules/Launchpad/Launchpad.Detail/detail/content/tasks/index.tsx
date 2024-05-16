import { Flex } from '@chakra-ui/react';
import React, { useContext, useMemo, useState } from 'react';
import s from './styles.module.scss';
import {
  ELaunchpadStatus,
  IPreLaunchpadPointType,
  IPreLaunchpadTask,
} from '@/modules/Launchpad/services/launchpad.interfaces';
import { compareString } from '@/utils/string';
import ShareTw from './shareTw';
import { LaunchpadContext } from '@/Providers/LaunchpadProvider';
import AuthenStorage from '@/utils/storage/authen.storage';

const PreLaunchpadTasks = ({ tasks }: { tasks: IPreLaunchpadTask[] }) => {
  const { currentLaunchpad } = useContext(LaunchpadContext);

  const token = AuthenStorage.getAuthenKey();
  const [_, setIsVerifyTW] = useState(!!token);

  const referTW = useMemo(
    () =>
      tasks.find((v) =>
        compareString(v.point_type, IPreLaunchpadPointType.Refer),
      ),
    [tasks],
  );

  const isDone = useMemo(() => {
    return true;
  }, []);

  const index = useMemo(() => {
    return isDone ? 0 : 0;
  }, [isDone]);

  if (compareString(currentLaunchpad?.status, ELaunchpadStatus.ended)) {
    return <></>;
  }

  return (
    <Flex className={s.container} id={'list-task'}>
      {referTW && (
        <ShareTw
          onVerifySuccess={() => setIsVerifyTW(true)}
          index={index + 1}
          isDone={false}
          content={`Can't wait to see how $${currentLaunchpad?.token_name}. IDO soon on @naka_chain! You don't wanna miss this out`}
        />
      )}
    </Flex>
  );
};

export default PreLaunchpadTasks;
