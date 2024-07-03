import { IOrderBuyReq } from '@/stores/states/l2services/types';
import BigNumber from 'bignumber.js';
import {
  BitcoinValidityEnum,
  BlockTimeEnum,
  DALayerEnum,
  HardwareBootstrap,
  MIN_GAS_PRICE,
  NativeTokenPayingGasEnum,
  PluginEnum,
  RollupEnum,
  ServiceTypeEnum,
  WITHDRAWAL_PERIOD_BOOTSTRAP,
} from '../blockchains/feat/customize/Buy.constanst';
import {
  convertHoursToSeconds,
  getChainIDRandom,
  getRandonComputerName,
} from '../blockchains/feat/customize/Buy.helpers';
import { PRICING_PACKGE, PRICING_PACKGE_DATA } from './constants';

export const orderRegisterBootstrapParams = async () => {
  const isMainnet = true;
  const computerName = getRandonComputerName(isMainnet);

  // const computerName = getRandonComputerName_VS2(isMainnet);
  const finalizationPeriodSeconds = convertHoursToSeconds(
    WITHDRAWAL_PERIOD_BOOTSTRAP,
  );
  const chainID = await getChainIDRandom();
  const chainName = computerName;
  const domain = computerName?.toLowerCase()?.trim().replaceAll(' ', '-');
  const minGasPrice = new BigNumber(String(MIN_GAS_PRICE))
    .multipliedBy(1e9)
    .toFixed();

  let params: IOrderBuyReq = {
    serviceType: RollupEnum.Rollup_ZK,
    domain: domain,
    chainId: String(chainID), // random
    chainName: chainName,
    description: '', // hard code
    finalizationPeriod: finalizationPeriodSeconds, //seconds
    blockTime: Number(BlockTimeEnum.BlockTime_1s),
    minGasPrice: minGasPrice,
    dataAvaibilityChain: Number(DALayerEnum.DALayer_PLG),

    isMainnet: isMainnet,
    userName: '',
    pluginIds: [PluginEnum.Plugin_Bridge],
    nativeTokenPayingGas: NativeTokenPayingGasEnum.NativeTokenPayingGas_BVM,
    gasLimit: PRICING_PACKGE_DATA[PRICING_PACKGE.Hacker].maxGasLimit,
    bitcoinValidity: BitcoinValidityEnum.BitcoinValidity_Ordinals,
    rollupProtocol: RollupEnum.Rollup_ZK,
    prover: 0,
    package: PRICING_PACKGE.Hacker,
    ...HardwareBootstrap,
  };

  console.log('[orderRegisterBootstrap] PARAMS --- ', params);

  return params;
};
