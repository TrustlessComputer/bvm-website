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

export const PRICING_PACKGE_MAP = {
  [PRICING_PACKGE.Hacker]: 'Hacker',
  [PRICING_PACKGE.Growth]: 'Growth',
  [PRICING_PACKGE.Secure]: 'Secure',
  [PRICING_PACKGE.Enterprise]: 'Enterprise',
};

export const PRICING_PACKGE_DATA = {
  [PRICING_PACKGE.Hacker]: {
    maxGasLimit: 1000000000,
    minGasLimit: 100000000,
    stepGasLimit: 10000000,
    minWithdrawalPeriod: 6,
    maxWithdrawalPeriod: 24,
    prover: 0,
  },
  [PRICING_PACKGE.Growth]: {
    maxGasLimit: 2000000000,
    minGasLimit: 1000000000,
    stepGasLimit: 10000000,
    minWithdrawalPeriod: 4,
    maxWithdrawalPeriod: 24,
    prover: 0,
  },
  [PRICING_PACKGE.Secure]: {
    maxGasLimit: 4000000000,
    minGasLimit: 1000000000,
    stepGasLimit: 10000000,
    minWithdrawalPeriod: 2,
    maxWithdrawalPeriod: 24,
    prover: 1,
  },
  [PRICING_PACKGE.Enterprise]: {
    maxGasLimit: 1000000000,
    minGasLimit: 100000000,
    stepGasLimit: 10000000,
    minWithdrawalPeriod: 6,
    maxWithdrawalPeriod: 24,
    prover: 0,
  },
};
