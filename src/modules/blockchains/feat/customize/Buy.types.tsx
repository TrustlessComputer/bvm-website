import {
  DALayerEnum,
  IntervalChargeTimeEnum,
  NetworkEnum,
  RollupEnum,
} from './Buy.constanst';
import React from 'react';

//Data Strcuture API
export type IAvailableList = {
  network: ItemDetail[];
  dataAvaibilityChain: {
    [key in NetworkEnum]: ItemDetail[];
  };
  rollupProtocol: {
    [key in NetworkEnum]: ItemDetail[];
  };
  blockTime: {
    [key in NetworkEnum]: {
      [key in number]: ItemDetail[];
    };
  };
  plugin: {
    [key in NetworkEnum]: ItemDetail[];
  };
  nativeTokenPayingGas: {
    [key in NetworkEnum]: ItemDetail[];
  };
  gasLimit: ItemDetail[];
  bitcoinValidity: {
    [key in NetworkEnum]: ItemDetail[];
  };
  prover: {
    [key in NetworkEnum]: ItemDetail[];
  };
  package: {
    [key in NetworkEnum]: ItemDetail[];
  };
};

export type ItemDetail = {
  value: number;
  valueStr: string;

  price: string;
  priceNote?: string;

  intervalChargeTime: IntervalChargeTimeEnum | number;
  pluginType?: number;
};

export type BuyBuilderSelectState = {
  chainName: string;
  description: string;
  projectXAccount: string;
  yourXAccount: string;
  yourTelegramAccount: string;
  network: NetworkEnum;
  rollupProtocol: RollupEnum;
  dataAvaibilityChain: DALayerEnum;
  blockTime: number;
  pluginIds: number[];
  withdrawPeriod: number;
  minGasPrice: string;
  gasLimit: string;
  bitcoinValidity: number;
  projectWebsite?: string;
  // layer1: Layer1Enum;
};

export type SectionProps = {
  title?: string;
  desc?: string;
  sectionType: string;
  valueDisabled?: number;
  data?: any;
  descriptionDetail?: {
    title: string;
    content: React.ReactNode | null;
  };
};

export type SectionType = keyof IAvailableList;
