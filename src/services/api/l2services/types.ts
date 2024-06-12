export interface IOrderBuyEstimateRespone {
  SetupCode: string;
  OperationCost: string;
  RollupCost: string;
  TotalCost: string;
}

export type SubmitFormParams = {
  bitcoinL2Name: string;
  bitcoinL2Description: string;
  network: string;
  dataAvailability: string;
  blockTime: string;
  rollupProtocol: string;
  withdrawPeriod: string;
  twName: string;
  telegram: string;
  isContractUs: boolean;
  subject: string;
};
