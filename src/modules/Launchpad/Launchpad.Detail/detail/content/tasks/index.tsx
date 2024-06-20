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
import ReferFriend from './referFriend';
import HoldingBTC from './holdingBTC';
import StakingBVM from './stakingBVM';
import FollowTwitter from './followTwitter';
import LikeTwitter from './likeTwitter';

const PreLaunchpadTasks = ({ tasks }: { tasks: IPreLaunchpadTask[] }) => {
  const { currentLaunchpad } = useContext(LaunchpadContext);

  const token = AuthenStorage.getAuthenKey();
  const [_, setIsVerifyTW] = useState(!!token);

  const renderTasks = (t: IPreLaunchpadTask) => {
    switch (t.point_type) {
      case IPreLaunchpadPointType.Refer:
        return <ReferFriend index={t.launchpad_task_id} data={t} />;
      case IPreLaunchpadPointType.SpreadOnX:
        return (
          <ShareTw
            onVerifySuccess={() => setIsVerifyTW(true)}
            index={t.launchpad_task_id}
            isDone={false}
            data={t}
          />
        );
      case IPreLaunchpadPointType.Portfolio:
        return <HoldingBTC data={t} index={t.launchpad_task_id} />;
      case IPreLaunchpadPointType.Staking:
        return <StakingBVM data={t} index={t.launchpad_task_id} />;
      case IPreLaunchpadPointType.FollowOnX:
        return <FollowTwitter data={t} index={t.launchpad_task_id} />;
      case IPreLaunchpadPointType.LikeOnX:
        return <LikeTwitter data={t} index={t.launchpad_task_id} />;

      default:
        return <></>;
    }
  };

  if (compareString(currentLaunchpad?.status, ELaunchpadStatus.ended)) {
    return <></>;
  }

  return (
    <Flex className={s.container} id={'list-task'}>
      {tasks?.map((t) => (
        <div key={t.launchpad_task_id}>{renderTasks(t)}</div>
      ))}
    </Flex>
  );
};

export default PreLaunchpadTasks;
