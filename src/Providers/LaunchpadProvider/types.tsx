import { IPublicSaleDepositInfo } from '@/interfaces/vc';

export interface ILaunchpadContext {
  launchpadSummary: IPublicSaleDepositInfo | undefined;
  setCurrentLaunchpadSummary:(_:IPublicSaleDepositInfo) => void;
}
