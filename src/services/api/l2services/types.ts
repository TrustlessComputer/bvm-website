export interface IOrderBuyEstimateRespone {
  SetupCode: string;
  OperationCost: string;
  RollupCost: string;
  TotalCost: string;
}

export interface IOrderBuyEstimateRespone_V2 {
  TotalCostUSD: number | string;
  TotalCostBVM: number | string;
  BVMPrice: number | string;
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
  email?: string;

  //NEW
  nodeConfigs?: any[];
};

export type IExploreItem = {
  chainInfo: {
    description: string;
    image: string;
    name: string;
    url: string;
    templateType: 'template' | 'mainnet' | 'testnet';
  };
  template: IModelCategory[];
};
