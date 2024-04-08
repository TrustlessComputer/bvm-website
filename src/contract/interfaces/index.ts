export type ERC20Chain = 'NAKA';

interface ContractParams {
  contractAddress: string;
  chain?: ERC20Chain;
}

interface NOSContractParams {
  contractAddress: string;
}

export type { ContractParams, NOSContractParams };
