'use client';

import { ILaunchpadContext } from '@/Providers/LaunchpadProvider/types';
import React, { PropsWithChildren, useMemo, useState } from 'react';
import { IPublicSaleDepositInfo } from '@/interfaces/vc';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import { ILaunchpadDetail } from '@/services/interfaces/launchpad';
import uniqueBy from '@popperjs/core/lib/utils/uniqueBy';

const initialValue: ILaunchpadContext = {
  launchpadDetail: undefined,
  setCurrentLaunchpadDetail:(_:ILaunchpadDetail) => {},
  launchpadSummary: undefined,
  setCurrentLaunchpadSummary:(_:IPublicSaleDepositInfo) => {},
  userContributeInfo: undefined,
  setCurrentUserContributeInfo:(_:ILeaderBoardPoint) => {},
  launchpadLeaderBoard: [],
  setCurrentLaunchpadLeaderBoard:(_:ILeaderBoardPoint[]) => {},
  clearPublicSaleLeaderBoard:() => {},
  launchpadLeaderBoardVisual: [],
  setCurrentLaunchpadLeaderBoardVisual:(_:ILeaderBoardPoint[]) => {}
};

export const LaunchpadContext = React.createContext<ILaunchpadContext>(initialValue);

export const LaunchpadProvider: React.FC<PropsWithChildren> = ({children}: PropsWithChildren): React.ReactElement => {
  const [launchpadDetail, setLaunchpadDetail] = useState<ILaunchpadDetail>();
  const [launchpadSummary, setLaunchpadSummary] = useState<IPublicSaleDepositInfo>();
  const [userContributeInfo, setUserContributeInfo] = useState<ILeaderBoardPoint>();
  const [launchpadLeaderBoard, setLaunchpadLeaderBoard] = useState<ILeaderBoardPoint[]>([]);
  const [launchpadLeaderBoardVisual, setLaunchpadLeaderBoardVisual] = useState<ILeaderBoardPoint[]>([]);

  const setCurrentLaunchpadDetail = (detail: ILaunchpadDetail) => {
    setLaunchpadDetail(detail);
  }

  const setCurrentLaunchpadSummary = (summary: IPublicSaleDepositInfo) => {
    setLaunchpadSummary(summary);
  }

  const setCurrentUserContributeInfo = (contributeInfo: ILeaderBoardPoint) => {
    setUserContributeInfo(contributeInfo);
  }

  const setCurrentLaunchpadLeaderBoard = (payload: ILeaderBoardPoint[]) => {
    const res = uniqueBy(
      [...launchpadLeaderBoard, ...payload],
      (item) => item.twitter_id,
    )
    setLaunchpadLeaderBoard(res);
  }

  const clearPublicSaleLeaderBoard = () => {
    setLaunchpadLeaderBoard([]);
  }

  const setCurrentLaunchpadLeaderBoardVisual = (payload: ILeaderBoardPoint[]) => {
    const res = uniqueBy(
      [...payload],
      (item) => item.twitter_id,
    );
    setLaunchpadLeaderBoardVisual(res);
  }

  const values: ILaunchpadContext = useMemo(() => {
    return {
      launchpadDetail,
      setCurrentLaunchpadDetail,
      launchpadSummary,
      setCurrentLaunchpadSummary,
      userContributeInfo,
      setCurrentUserContributeInfo,
      launchpadLeaderBoard,
      setCurrentLaunchpadLeaderBoard,
      clearPublicSaleLeaderBoard,
      launchpadLeaderBoardVisual,
      setCurrentLaunchpadLeaderBoardVisual,
    };
  }, [
    launchpadDetail,
    launchpadSummary,
    userContributeInfo,
    launchpadLeaderBoard,
    launchpadLeaderBoardVisual
  ]);

  return (
    <LaunchpadContext.Provider value={values}>
      {children}
    </LaunchpadContext.Provider>
  )
}
