import React from 'react';
import { Badge } from '@chakra-ui/react';
import s from './styles.module.scss';
import cx from 'clsx';
import { ILaunchpad } from '../services/launchpad.interfaces';

export enum LAUNCHPAD_STATUS {
  Upcoming,
  Prelaunch,
  Pending,
  Ido,
  Redemption,
  Ended,
}

interface LabelStatusMap {
  [name: string]: any;
}

export const LaunchpadLabelStatus: LabelStatusMap = {
  upcoming: {
    key: LAUNCHPAD_STATUS.Upcoming,
    value: 'upcoming',
    label: 'Upcoming',
  },
  prelaunch: {
    key: LAUNCHPAD_STATUS.Prelaunch,
    value: 'prelaunch',
    label: 'Running',
  },
  pending: {
    key: LAUNCHPAD_STATUS.Pending,
    value: 'pending',
    label: 'Pending',
  },
  ido: {
    key: LAUNCHPAD_STATUS.Ido,
    value: 'ido',
    label: 'Ticket Purchase',
  },
  redemption: {
    key: LAUNCHPAD_STATUS.Redemption,
    value: 'redemption',
    label: 'Redemption',
  },
  ended: {
    key: LAUNCHPAD_STATUS.Ended,
    value: 'ended',
    label: 'Ended',
  },
  publicsale: {
    key: LAUNCHPAD_STATUS.Ido,
    value: 'ido',
    label: 'Public Sale',
  },
};

export const useLaunchPadStatus = ({
  data,
}: {
  data?: ILaunchpad | undefined;
}) => {
  return LaunchpadLabelStatus[data?.status as string];
};

const LaunchpadStatus = ({
  data,
  className,
}: {
  data: ILaunchpad;
  className?: string;
}) => {
  let status = useLaunchPadStatus({ data: data });

  if (data?.status === 'ido') {
    if ((data?.allocation_ticket || 0) > 0) {
      status = LaunchpadLabelStatus['ido'];
    } else {
      status = LaunchpadLabelStatus['publicsale'];
    }
  }

  return (
    <Badge className={cx(s.container, s[status?.value], className)}>
      {status?.label}
    </Badge>
  );
};

export default LaunchpadStatus;
