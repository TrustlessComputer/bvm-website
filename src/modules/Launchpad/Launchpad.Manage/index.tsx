'use client';

import React, { useEffect, useRef, useState } from 'react';
import s from './styles.module.scss';
import { Box } from '@chakra-ui/react';
import CLaunchpadAPI from '../services/launchpad';
import useNakaAuthen from '@/hooks/useRequestNakaAccount';
import { ILaunchpad } from '../services/launchpad.interfaces';
import LaunchpadManageItem from './Launchpad.Item';

const LaunchpadManage = () => {
  const { nakaAddress } = useNakaAuthen();
  const launchpadAPI = useRef(new CLaunchpadAPI()).current;
  const [list, setList] = useState<ILaunchpad[]>([]);

  useEffect(() => {
    getData();
  }, [nakaAddress]);

  const getData = async () => {
    try {
      if (!nakaAddress) {
        return;
      }
      const rs: any = await launchpadAPI.getListLaunchpad({});
      setList(rs.rows || []);
    } catch (error) {}
  };

  return (
    <Box className={s.container}>
      {list?.map((d) => {
        return <LaunchpadManageItem data={d as ILaunchpad} />;
      })}
    </Box>
  );
};

export default LaunchpadManage;
