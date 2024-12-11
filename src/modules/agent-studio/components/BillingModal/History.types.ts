export enum HistoryType {
  HistoryType_Topup, // 0: user top up
  HistoryType_BuyNode, // 1: user click order
  HistoryType_WithdrawBalance, // 2: user withdraw funds from top up address
  HistoryType_ChargeOperationFee, // 3: system charge operation fee
  HistoryType_ChargeServiceFee, // 4: system charge service fee

  HistoryType_RequestWithdrawReward, // 5: request withdraw reward (TC L2) to deployer L2 (still be held in contract)

  HistoryType_ProveWithdrawReward, // 6: prove reward L1 (use tx submit withdraw)
  HistoryType_FinalizeWithdrawReward, // 7: transfer TC (NOS) from master wallet => top up user wallet
  HistoryType_TransferL1RewardToUserAddress, // 8: transfer deployer L1 to user tc wallet
}

export const HistoryTypeMap = {
  [HistoryType.HistoryType_Topup]: 'Top up',
  [HistoryType.HistoryType_BuyNode]: 'Buy Node',
  [HistoryType.HistoryType_WithdrawBalance]: 'Withdraw Balance',
  [HistoryType.HistoryType_ChargeOperationFee]: 'Monthly Fee',
  [HistoryType.HistoryType_ChargeServiceFee]: 'Charge Service Fee',
  [HistoryType.HistoryType_RequestWithdrawReward]: 'Withdraw Reward',
  [HistoryType.HistoryType_ProveWithdrawReward]: 'Prove Reward',
  [HistoryType.HistoryType_FinalizeWithdrawReward]: 'Claim Reward',
  [HistoryType.HistoryType_TransferL1RewardToUserAddress]: 'Receive Reward',
};

export enum HistoryStatus {
  HistoryStatus_Pending,
  HistoryStatus_Processing,
  HistoryStatus_Success,
  HistoryStatus_Failed,
  HistoryStatus_Insufficient,
  HistoryStatus_Invalid,
  HistoryStatus_TimedOut,
}

export const HistoryStatusMap = {
  [HistoryStatus.HistoryStatus_Pending]: 'Pending',
  [HistoryStatus.HistoryStatus_Processing]: 'Processing',
  [HistoryStatus.HistoryStatus_Success]: 'Success',
  [HistoryStatus.HistoryStatus_Failed]: 'Failed',
  [HistoryStatus.HistoryStatus_Insufficient]: 'Insufficient',
  [HistoryStatus.HistoryStatus_Invalid]: 'Invalid',
  [HistoryStatus.HistoryStatus_TimedOut]: 'TimedOut',
};

export const HistoryStatusColorMap = {
  [HistoryStatus.HistoryStatus_Pending]: '#000000',
  [HistoryStatus.HistoryStatus_Processing]: '#0437F2',
  [HistoryStatus.HistoryStatus_Success]: '#0ec00e',
  [HistoryStatus.HistoryStatus_Failed]: '#FF0000',
  [HistoryStatus.HistoryStatus_Insufficient]: '#FFA500',
  [HistoryStatus.HistoryStatus_Invalid]: '#FFA500',
  [HistoryStatus.HistoryStatus_TimedOut]: '#FFA500',
};

export type InstanceInfoType = {
  domain: string;
  chainId: string;
  chainName: string;
  isMainnet: boolean;
};

export interface HistoryItem {
  created_at: string;
  id: string;
  orderId: string;
  tcAddress: string;
  type: HistoryType;
  status: HistoryStatus;
  amount: string;
  txProcess: string;
  note: string;
  instanceInfo: InstanceInfoType;
}
