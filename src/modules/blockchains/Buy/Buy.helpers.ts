import { BuyBuilderSelectState } from './Buy.types';
import {
  BitcoinValidityEnum,
  DALayerEnum,
  GAS_LITMIT,
  MIN_GAS_PRICE,
  NetworkEnum,
  PluginEnum,
  PriceType,
  PriceTypeList,
  RollupEnum,
} from './Buy.constanst';

import { validateChainIdAPI } from '@/services/api/l2services';
import {
  IOrderBuyEstimateRespone,
  IOrderBuyEstimateRespone_V2,
} from '@/services/api/l2services/types';
import { formatAmount } from '@/modules/price/Pricing.helper';

export const getChainIDRandom = async () => {
  let chainID = Math.floor(Math.random() * 90000) + 10000; //random from 10000 -> 999999
  const isValid = await validateChainIdAPI(String(chainID));
  if (isValid) {
    return chainID;
  } else {
    getChainIDRandom();
  }

  return chainID;
};

export const convertDayToHours = (day: number) => {
  if (!day || day === 0) return 1; // 1hour === MIN
  return day * 24; //hours
};

export const convertDayToSeconds = (day: number) => {
  if (!day || day === 0) return 60 * 60; //1hour === 3600s
  return day * 24 * 60 * 60; //second
};

export const convertHoursToSeconds = (hours: number) => {
  if (!hours || hours === 0) return 0;
  return hours * 60 * 60; //second
};

export const convertSecondsToHours = (seconds: number) => {
  if (!seconds || seconds === 0) return 0;
  return seconds / 60 / 60; //hours
};

export const dayDescribe = (day: number) => {
  let str;
  let timer;
  if (day === 0) {
    str = '1 hour (minimum hour)';
    timer = '1 hour';
  } else {
    const fullDay = Math.ceil(day * 24);
    const n = Math.floor(fullDay / 24);
    const hours = fullDay % 24;

    const dayStr = n < 1 ? '' : n === 1 ? `${n} day` : `${n} days`;
    const hoursStr =
      hours < 1 ? '' : hours === 1 ? `${hours} hour` : `${hours} hours`;

    if (hours === 0) {
      str = `${dayStr}`;
      timer = `${dayStr}`;
    } else {
      str = `${day} days = ${dayStr} ${hoursStr}`;
      timer = `${dayStr} ${hoursStr}`;
    }
  }
  return {
    str,
    timer,
  };
};

export const getBuyBuilderStateInit = (
  type?: string | null,
): BuyBuilderSelectState | any => {
  const dataInit: BuyBuilderSelectState = {
    network: NetworkEnum.Network_Testnet, //
    blockTime: 10,
    dataAvaibilityChain: DALayerEnum.DALayer_BTC,
    pluginIds: [PluginEnum.Plugin_Bridge], // HARD CODE: Force Bridge select
    rollupProtocol: RollupEnum.Rollup_OpStack,
    withdrawPeriod: 7,
    chainName: '',
    description: '',
    minGasPrice: `${MIN_GAS_PRICE}`,
    gasLimit: `${GAS_LITMIT}`,
    bitcoinValidity: BitcoinValidityEnum.BitcoinValidity_Ordinals,
    projectXAccount: '',
    yourXAccount: '',
    yourTelegramAccount: '',
  };

  if (type === undefined || type === null) return dataInit;

  const typeCatch = Number(type) as PriceType;

  if (!PriceTypeList.includes(typeCatch)) return dataInit;

  switch (typeCatch) {
    case PriceType.FREE:
      return dataInit; // Default
    case PriceType.ESSENTIALS:
      return {
        ...dataInit,
        network: NetworkEnum.Network_Mainnet,
        dataAvaibilityChain: DALayerEnum.DALayer_PLG,
        blockTime: 10,
      };
    case PriceType.PROFESSIONAL:
      return {
        ...dataInit,
        network: NetworkEnum.Network_Mainnet,
        dataAvaibilityChain: DALayerEnum.DALayer_BTC,
        blockTime: 10,
      };
    case PriceType.ENTERPRISE:
      return dataInit; // TO DO
  }
};

export const getRandonComputerName = (isMainnet: boolean) => {
  const prefix = 'BVM';
  const suffix = isMainnet ? '' : '(Testnet)';
  const randomNumber = Math.floor(Math.random() * 9000) + 1000; //random from 1000 -> 9999
  return `${prefix} ${randomNumber}${suffix ? ` ${suffix}` : ''}`;
};

export const getRandonComputerName_VS2 = (isMainnet: boolean) => {
  const prefix = 'BVM';
  const suffix = isMainnet ? '' : '(Testnet)';
  const randomNumber = new Date().getTime();
  return `${prefix}-${randomNumber}${suffix ? `-${suffix}` : ''}`;
};

export const estimateDataFormater = (
  estimateData: IOrderBuyEstimateRespone,
) => {
  let result = {
    SetupCode: '0',
    OperationCost: '0',
    RollupCost: '0',
    TotalCost: '0',
  };
  if (!estimateData) {
    return result;
  } else {
    let setupCodeFomatted = `${formatAmount({
      originalAmount: Number(estimateData.SetupCode || '0'),
      decimals: 18,
      maxDigits: 2,
      isCeil: true,
    })}`;

    let operationCostFomatted = `${formatAmount({
      originalAmount: Number(estimateData.OperationCost || '0'),
      decimals: 18,
      maxDigits: 2,
      isCeil: true,
    })}`;

    let rollupCostFomatted = `${formatAmount({
      originalAmount: Number(estimateData.RollupCost || '0'),
      decimals: 18,
      maxDigits: 2,
      isCeil: true,
    })}`;

    let totalCostFomatted = `${formatAmount({
      originalAmount: Number(estimateData.TotalCost || '0'),
      decimals: 18,
      maxDigits: 2,
      isCeil: true,
    })}`;

    result.SetupCode = setupCodeFomatted;
    result.OperationCost = operationCostFomatted;
    result.RollupCost = rollupCostFomatted;
    result.TotalCost = totalCostFomatted;
    return result;
  }
};

export const estimateDataFormater_V2 = (
  estimateData: IOrderBuyEstimateRespone_V2,
) => {
  let result = {
    BVMPrice: '0',
    TotalCostBVM: '0',
    TotalCostUSD: '0',
  };
  if (!estimateData) {
    return result;
  } else {
    let BVMPriceFomatted = `${formatAmount({
      originalAmount: Number(estimateData.BVMPrice || '0'),
      decimals: 18,
      maxDigits: 2,
      isCeil: true,
    })}`;

    let totalCostBVMFomatted = `${formatAmount({
      originalAmount: Number(estimateData.TotalCostBVM || '0'),
      decimals: 18,
      maxDigits: 2,
      isCeil: true,
    })}`;

    let totalCostUSDFomatted = `${formatAmount({
      originalAmount: Number(estimateData.TotalCostUSD || '0'),
      decimals: 18,
      maxDigits: 2,
      isCeil: true,
    })}`;

    result.BVMPrice = BVMPriceFomatted;
    result.TotalCostBVM = totalCostBVMFomatted;
    result.TotalCostUSD = totalCostUSDFomatted;

    return result;
  }
};
