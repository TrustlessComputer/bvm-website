import React from 'react';
import { DALayerEnum, NetworkEnum } from './Buy.constanst';
import { ORDER_FIELD } from './stores';
import { LegoColor } from './components3/BoxOptionV2';

export type OrderFormOption = {
  [key in (typeof ORDER_FIELD)[keyof typeof ORDER_FIELD]]: {
    title: string;
    subTitle: string;
    background: LegoColor;
    description?: {
      title: string;
      content: JSX.Element;
    };
    options?: {
      id: number;
      label: string;
      keyInField?: string;
      value: NetworkEnum | DALayerEnum;
      icon: string;
      disabled?: boolean;
      avalaibleNetworks?: NetworkEnum[];
    }[];
  };
};

export const OrderFormOptions: OrderFormOption = {
  [ORDER_FIELD.CHAIN_NAME]: {
    title: 'Chain Name',
    subTitle: 'Chain Name',
    background: 'brown',
  },
  [ORDER_FIELD.NETWORK]: {
    title: '1. Network',
    subTitle: 'Network',
    background: 'brown',
    options: [
      {
        id: 1,
        label: 'Mainnet',
        value: NetworkEnum.Network_Mainnet,
        icon: '/landingV3/images/pricing/7.png',
      },
      {
        id: 2,
        label: 'Testnet',
        value: NetworkEnum.Network_Testnet,
        icon: '/landingV3/images/pricing/8.png',
      },
    ],
  },
  [ORDER_FIELD.DATA_AVAILABILITY_CHAIN]: {
    title: '2. Data Availability',
    subTitle: 'Data Availability',
    background: 'violet',
    description: {
      title: 'Data Availability',
      content: (
        <p>
          The data of your blockchain is written to a Data Availability layer
          such as Polygon, Celestia, NearDA, Eigen, Filecoin or Avail.
        </p>
      ),
    },
    options: [
      {
        id: 1,
        label: 'Polygon',
        value: DALayerEnum.DALayer_PLG,
        icon: '/landingV3/images/pricing/1.png',
        avalaibleNetworks: [
          NetworkEnum.Network_Mainnet,
          NetworkEnum.Network_Testnet,
        ],
      },
      {
        id: 2,
        label: 'Celestia',
        value: DALayerEnum.DALayer_Celestia,
        disabled: true,
        avalaibleNetworks: [NetworkEnum.Network_Testnet],
        icon: '/landingV3/images/pricing/2.png',
      },
      {
        id: 3,
        label: 'NearDA',
        value: DALayerEnum.DALayer_NearDa,
        disabled: true,
        avalaibleNetworks: [],
        icon: '/landingV3/images/pricing/3.png',
      },
      {
        id: 4,
        label: 'Eigen',
        value: DALayerEnum.DALayer_Eigen,
        icon: '/landingV3/images/pricing/4.png',
        avalaibleNetworks: [],
        disabled: true,
      },
      {
        id: 5,
        label: 'Filecoin',
        value: DALayerEnum.DALayer_FILECOIN,
        icon: '/landingV3/images/pricing/5.png',
        avalaibleNetworks: [],

        disabled: true,
      },
      {
        id: 6,
        label: 'Avail',
        value: DALayerEnum.DALayer_AVAIL,
        avalaibleNetworks: [],
        icon: '/landingV3/images/pricing/6.png',
      },
    ],
  },
  [ORDER_FIELD.GAS_LIMIT]: {
    title: '3. Block Gas Limit',
    subTitle: 'Block Gas Limit',
    background: 'green',
    description: {
      title: 'Block Gas Limit',
      content: (
        <p>
          The data of your blockchain is written to a Data Availability layer
          such as Polygon, Celestia, NearDA, Eigen, Filecoin or Avail.
        </p>
      ),
    },
  },
  [ORDER_FIELD.WITHDRAW_PERIOD]: {
    title: '4. Withdrawal Time',
    subTitle: 'Withdrawal Time',
    background: 'pink',
    description: {
      title: 'Withdrawal Time',
      content: (
        <p>
          The withdrawal period is the time frame during which your users can
          withdraw their funds from your blockchain.
        </p>
      ),
    },
  },
};
