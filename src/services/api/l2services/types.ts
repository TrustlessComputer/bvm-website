export interface IOrderBuyReq {
  serviceType: number;
  domain: string;
  chainId: string;
  chainName: string;
  description: string;
  finalizationPeriod: number;
  blockTime: number;
  minGasPrice: string;
  dataAvaibilityChain: number;
  isMainnet: boolean;
  userName: string;
  pluginIds: number[];
  nativeTokenPayingGas: number;
  preMintAmount?: string;
  preMintAddress?: string;
  ticker?: string;
  gasLimit: number;
  twitter_id?: string | null;
  bitcoinValidity: number;
}

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
};
