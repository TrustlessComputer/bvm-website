'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import s from './styles.module.scss';
import { Box } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import CLaunchpadAPI from '../../services/launchpad';
import {
  ELaunchpadStatus,
  ILaunchpad,
} from '../../services/launchpad.interfaces';
import { useSelector } from 'react-redux';
import { commonSelector } from '@/stores/states/common/selector';
import { compareString } from '@/utils/string';

const LaunchpadManageDetail = () => {
  const params = useParams();
  const [currentLaunchpad, setCurrentLaunchpad] = useState<ILaunchpad>();

  const needReload = useSelector(commonSelector).needReload;
  const launchpadApi = useRef(new CLaunchpadAPI()).current;

  const id = params?.id;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      getLaunchpadInfo();
    }
  }, [id, needReload]);

  const getLaunchpadInfo = async () => {
    try {
      const response: any = await Promise.all([
        launchpadApi.getDetailLaunchpad(Number(id)),
      ]);

      setCurrentLaunchpad(response[0]);
    } catch (err) {
      //
    } finally {
      setLoading(false);
    }
  };

  const canTGE = useMemo(() => {
    return compareString(currentLaunchpad?.status, ELaunchpadStatus.ended);
  }, [currentLaunchpad]);

  return <Box className={s.container}>{}</Box>;
};

export default LaunchpadManageDetail;
