import {
  PRICING_PACKGE,
  PRICING_PACKGE_DATA,
} from '@/modules/PricingV2/constants';
import { IOrderBuyReq } from '@/stores/states/l2services/types';
import {
  BitcoinValidityEnum,
  BlockTimeEnum,
  DALayerEnum,
  GAS_PRICE,
  NativeTokenPayingGasEnum,
  PluginEnum,
  RollupEnum,
} from './Buy.constanst';
import { convertHoursToSeconds } from './Buy.helpers';
import BigNumber from 'bignumber.js';
import { orderBuyAPI } from '@/services/api/l2services';
import sleep from '@/utils/sleep';

export type CustomizeParams = {
  pricingPackage: PRICING_PACKGE;
  chainID: number;
  chainName: string;
  dataAvaibilityChain: DALayerEnum;
  gasLimit: string;
  network: number; // Ex: 1 = Testnet, 2 = Mainnet
  withdrawPeriod: number; // E: "3" (hours)
};

export const registerOrderHandler = async (params: CustomizeParams) => {
  try {
    const {
      chainID,
      chainName,
      pricingPackage,
      dataAvaibilityChain: dataAvaibilityChain,
      gasLimit,
      network,
      withdrawPeriod,
    } = params;

    const pricingPackageData = PRICING_PACKGE_DATA[pricingPackage];

    const computerName = chainName;
    const finalizationPeriodSeconds = convertHoursToSeconds(
      Number(withdrawPeriod),
    );
    const chainNameTrim = computerName
      ?.toLowerCase()
      ?.trim()
      .replaceAll(' ', '-');
    const domain = computerName?.toLowerCase()?.trim().replaceAll(' ', '-');
    const blockTime = BlockTimeEnum.BlockTime_1s;
    const minGasPrice = new BigNumber(GAS_PRICE).toFixed();
    const bitcoinValidity = BitcoinValidityEnum.BitcoinValidity_Ordinals;
    const dataAvaibilityChainFinal =
      dataAvaibilityChain || DALayerEnum.DALayer_PLG;

    let registerParams: IOrderBuyReq = {
      domain: domain,
      chainId: String(chainID), // random
      chainName: chainNameTrim,
      description: '', // hard code
      finalizationPeriod: Math.ceil(finalizationPeriodSeconds),
      blockTime: Number(blockTime),
      minGasPrice: minGasPrice,
      dataAvaibilityChain: Number(dataAvaibilityChainFinal),
      isMainnet: Number(network) === 2,
      pluginIds: [PluginEnum.Plugin_Bridge],
      // nativeTokenPayingGas: nativeTokenPayingGasSelected,
      gasLimit: Number(gasLimit),
      bitcoinValidity: bitcoinValidity,
      prover: pricingPackageData.prover,
      package: pricingPackage as PRICING_PACKGE,
      nativeTokenPayingGas: NativeTokenPayingGasEnum.NativeTokenPayingGas_BVM,
      ...PRICING_PACKGE_DATA[pricingPackage as PRICING_PACKGE].hardware,
      rollupProtocol: RollupEnum.Rollup_ZK,
      serviceType: RollupEnum.Rollup_ZK,
    };

    console.log('Regiater Params --- ', registerParams);

    const result = await orderBuyAPI(registerParams);

    return result;
  } catch (error) {
    throw error;
  }
};
