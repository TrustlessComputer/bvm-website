import { RollupEnum } from '../blockchains/Buy/Buy.constanst';

export const ORDER_BUY_NO_PROVER = {
  domain: 'zk-powered-blockchain-99999999',
  chainId: '70486',
  chainName: 'ZK-powered Blockchain-99999999',
  description: '',
  finalizationPeriod: 7200,
  blockTime: 1,
  minGasPrice: '1000000000',
  dataAvaibilityChain: 10,
  isMainnet: true,
  pluginIds: [30],
  nativeTokenPayingGas: 0,
  gasLimit: 30000000,
  bitcoinValidity: 0,
  prover: 0,
  package: 1,
  rollupProtocol: RollupEnum.Rollup_ZK,
  serviceType: RollupEnum.Rollup_ZK,
};

export const ORDER_BUY_YES_PROVER = {
  domain: 'zk-powered-blockchain-88888888',
  chainId: '70486',
  chainName: 'ZK-powered Blockchain-88888888',
  description: '',
  finalizationPeriod: 7200,
  blockTime: 1,
  minGasPrice: '1000000000',
  dataAvaibilityChain: 10,
  isMainnet: true,
  pluginIds: [30],
  nativeTokenPayingGas: 0,
  gasLimit: 30000000,
  bitcoinValidity: 0,
  prover: 1,
  package: 1,
  rollupProtocol: RollupEnum.Rollup_ZK,
  serviceType: RollupEnum.Rollup_ZK,
};

export enum PRICING_PACKGE {
  Hacker = 0,
  Growth = 1,
  Secure = 2,
  Enterprise = 3,
}

export const PRICING_PACKGE_DATA = {
  [PRICING_PACKGE.Hacker]: {
    maxGasLimit: 30000000,
    minGasLimit: 10000000,
    stepGasLimit: 1000000,
    minWithdrawalPeriod: 6,
    maxWithdrawalPeriod: 24,
    prover: false,
  },
  [PRICING_PACKGE.Growth]: {
    maxGasLimit: 50000000,
    minGasLimit: 10000000,
    stepGasLimit: 1000000,
    minWithdrawalPeriod: 4,
    maxWithdrawalPeriod: 24,
    prover: false,
  },
  [PRICING_PACKGE.Secure]: {
    maxGasLimit: 100000000,
    minGasLimit: 10000000,
    stepGasLimit: 1000000,
    minWithdrawalPeriod: 2,
    maxWithdrawalPeriod: 24,
    prover: true,
  },
  [PRICING_PACKGE.Enterprise]: {
    maxGasLimit: 30000000,
    minGasLimit: 10000000,
    stepGasLimit: 1000000,
    minWithdrawalPeriod: 6,
    maxWithdrawalPeriod: 24,
    prover: false,
  },
};
