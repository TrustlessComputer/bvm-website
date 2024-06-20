import {
  IPreLaunchpadTask,
  IPreLaunchpadTaskKey,
} from '@/modules/Launchpad/services/launchpad.interfaces';
import { compareString } from '@/utils/string';
import { useMemo } from 'react';

const useTasks = ({ task }: { task: IPreLaunchpadTask }) => {
  const point = useMemo(
    () =>
      task?.input_values?.find(
        (v) =>
          compareString(v.key, IPreLaunchpadTaskKey.Point) ||
          compareString(v.key, IPreLaunchpadTaskKey.PointPerAmount),
      ),
    [task],
  );

  const xData = useMemo(
    () =>
      task?.input_values?.find((v) =>
        compareString(v.key, IPreLaunchpadTaskKey.Text),
      ),
    [task],
  );

  const taskPointPerAmount = useMemo(
    () =>
      task?.launchpad_task?.input_fileds?.find((v) =>
        compareString(v.key, IPreLaunchpadTaskKey.PointPerAmount),
      ),
    [task],
  );

  return { point, xData, taskPointPerAmount };
};

export default useTasks;
