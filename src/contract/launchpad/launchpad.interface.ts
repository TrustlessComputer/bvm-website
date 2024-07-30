export interface IBodyStartLaunchpad {
  launchPoolAddress: string;
  saleTokenAddress: string;
}

export interface IBodyTransferBVMLaunchpad {
  amountBVM: string;
  adminAddress: string;
}

export interface IBodyDepositLaunchpad {
  launchPoolAddress: string;
  depositTokenAddress: string;
  depositAmount: string;
  depositAmountOriginal: string;
}
