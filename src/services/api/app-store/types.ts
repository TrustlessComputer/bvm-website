import { RollupEnum } from '@/modules/blockchains/Buy/Buy.constanst';
import { PRICING_PACKGE } from '@/modules/PricingV2/constants';

export interface IOrderInstallReq {
  serviceType: RollupEnum;
  domain: string;
  chainId: string;
  chainName: string;
  description: string;
  finalizationPeriod: number;
  blockTime: number;
  minGasPrice: string;
  dataAvaibilityChain: number;
  isMainnet: boolean;
  userName?: string;
  pluginIds: number[];
  nativeTokenPayingGas: number;
  preMintAmount?: string;
  preMintAddress?: string;
  ticker?: string;
  gasLimit: number;
  twitter_id?: string | null;
  bitcoinValidity: number;
  email?: string;
  cpuCore?: number;
  memory?: number;
  storage?: number;
  package?: PRICING_PACKGE;
  rollupProtocol?: number;
  prover?: number;
  bridgeStatus?: number;
}
