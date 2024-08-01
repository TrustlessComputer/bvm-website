export type ERC20Chain = 'NAKA';

interface ContractParams {
  contractAddress: string;
  chain?: ERC20Chain;
  rpc?: string;
}

interface NOSContractParams {
  contractAddress: string;
}

export type { ContractParams, NOSContractParams };
