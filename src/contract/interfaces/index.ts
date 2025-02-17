import { CHAIN_TYPE } from '@constants/chains';

export type ERC20Chain = 'NAKA';

interface ContractParams {
  contractAddress: string;
  chain?: ERC20Chain;
  rpc?: string;
}

interface ContractParamsVer2 {
  contractAddress: string;
  chainID: string | number;
}

interface NOSContractParams {
  contractAddress: string;
}

export type { ContractParams, NOSContractParams, ContractParamsVer2 };
