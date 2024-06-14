import { IOrderBuyReq } from '@/stores/states/l2services/types';
import BigNumber from 'bignumber.js';
import {
  BitcoinValidityEnum,
  BlockTimeEnum,
  DALayerEnum,
  GAS_LITMIT,
  HardwareBootstrap,
  MIN_GAS_PRICE,
  NativeTokenPayingGasEnum,
  PluginEnum,
  PricingPackageEnum,
  RollupEnum,
  ServiceTypeEnum,
  WITHDRAWAL_PERIOD_BOOTSTRAP,
} from '../blockchains/Buy/Buy.constanst';
import {
  convertHoursToSeconds,
  getChainIDRandom,
  getRandonComputerName,
} from '../blockchains/Buy/Buy.helpers';

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
    serviceType: ServiceTypeEnum.DEFAULT, // hard code
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
    gasLimit: GAS_LITMIT,
    bitcoinValidity: BitcoinValidityEnum.BitcoinValidity_Ordinals,
    // twitter_id: yourXField.value?.trim(),
    rollupProtocol: RollupEnum.Rollup_ZK,

    package: PricingPackageEnum.Bootstrap,
    ...HardwareBootstrap,
  };

  console.log('[orderRegisterBootstrap] PARAMS --- ', params);

  return params;
};
