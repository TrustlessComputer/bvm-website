'use client';

import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import CLaunchpadAPI from '@/modules/Launchpad/services/launchpad';
import { ILaunchpad } from '@/modules/Launchpad/services/launchpad.interfaces';
import {
  launchpadSelector,
  setCountCurrentLeaderboard,
  setCountTotalTickets,
  setOldCountCurrentLeaderboard,
  setOldCountTotalTickets,
} from '@/modules/Launchpad/store/reducer';
import { commonSelector } from '@/stores/states/common/selector';
import { useParams } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface IProps {
  children: React.ReactNode;
}

export interface ILaunchpadContext {
  currentLaunchpad?: ILaunchpad;
  setCurrentLaunchpad?: any;
  myDataLeaderBoard?: ILeaderBoardPoint;
  loading: boolean;
}

export const LaunchpadContext = React.createContext({} as ILaunchpadContext);

let interval: any = undefined;
const LaunchpadProvider = ({ children }: IProps) => {
  const [currentLaunchpad, setCurrentLaunchpad] = useState<ILaunchpad>();

  const needReload = useSelector(commonSelector).needReload;
  const launchpadApi = useRef(new CLaunchpadAPI()).current;
  const { countCurrentLeaderboard, countTotalTickets, blockScout } =
    useSelector(launchpadSelector);
  const dispatch = useDispatch();

  const params = useParams();

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

  const myDataLeaderBoard = useRef<ILeaderBoardPoint>();

  const getMyLeaderBoardInfo = async () => {
    try {
      const response2 = await launchpadApi.getPrelaunchLeaderBoards(
        Number(currentLaunchpad?.id),
        {
          page: 1,
          limit: 0,
        },
      );

      myDataLeaderBoard.current = response2?.rows[0];
    } catch (error) {
      //
    }
  };

  const fetchData = async (id: number) => {
    try {
      const [summary] = await Promise.all([
        launchpadApi.getSummaryLaunchpad(id),
      ]);

      dispatch(setOldCountCurrentLeaderboard(countCurrentLeaderboard));
      dispatch(setCountCurrentLeaderboard(summary?.total_user));

      dispatch(setOldCountTotalTickets(countTotalTickets));
      dispatch(setCountTotalTickets(summary?.total_ticket));
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  React.useEffect(() => {
    if (interval) {
      clearInterval(interval);
      interval = undefined;
    }

    if (currentLaunchpad?.id) {
      fetchData(Number(currentLaunchpad?.id));
      getMyLeaderBoardInfo();
      interval = setInterval(() => {
        fetchData(Number(currentLaunchpad?.id));
        getMyLeaderBoardInfo();
      }, 30000);
    }
  }, [
    currentLaunchpad?.id,
    countCurrentLeaderboard,
    countTotalTickets,
    JSON.stringify(blockScout),
    needReload,
  ]);

  const values = useMemo(() => {
    return {
      currentLaunchpad,
      setCurrentLaunchpad,
      myDataLeaderBoard: myDataLeaderBoard.current,
      loading,
    };
  }, [currentLaunchpad, JSON.stringify(myDataLeaderBoard.current)]);

  return (
    <LaunchpadContext.Provider value={values}>
      {children}
    </LaunchpadContext.Provider>
  );
};

export default LaunchpadProvider;
