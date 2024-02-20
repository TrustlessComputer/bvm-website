import { IPublicSaleDepositInfo } from '@/interfaces/vc';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import { ILaunchpadDetail } from '@/services/interfaces/launchpad';

export interface ILaunchpadContext {
  launchpadDetail: ILaunchpadDetail | undefined;
  setCurrentLaunchpadDetail:(_:ILaunchpadDetail) => void;
  launchpadSummary: IPublicSaleDepositInfo | undefined;
  setCurrentLaunchpadSummary:(_:IPublicSaleDepositInfo) => void;
  userContributeInfo: ILeaderBoardPoint | undefined;
  setCurrentUserContributeInfo:(_:ILeaderBoardPoint) => void;
  launchpadLeaderBoard: ILeaderBoardPoint[];
  setCurrentLaunchpadLeaderBoard:(_:ILeaderBoardPoint[]) => void;
  clearPublicSaleLeaderBoard:() => void;
  launchpadLeaderBoardVisual: ILeaderBoardPoint[];
  setCurrentLaunchpadLeaderBoardVisual:(_:ILeaderBoardPoint[]) => void;
}
