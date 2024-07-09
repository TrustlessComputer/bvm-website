import React from 'react';
import { DALayerEnum, NetworkEnum } from './Buy.constanst';
import { ORDER_FIELD } from './stores';
import { LegoColor } from './components3/BoxOptionV2';
import LegoV3 from './components3/LegoV3';
import ComputerNameInput from './components3/ComputerNameInput';
import RightNetworkLego from './components3/Legos/RightNetworkLego';

export type OrderFormOption = {
  [key in (typeof ORDER_FIELD)[keyof typeof ORDER_FIELD]]: {
    title: string;
    subTitle: string;
    background: LegoColor;
    backgroundParent?: LegoColor;
    description?: {
      title: string;
      content: JSX.Element;
    };
    options?: {
      id: number;
      label: string;
      keyInField?: string;
      value: NetworkEnum | DALayerEnum | number | string;
      icon?: string;
      isDisabled?: boolean;
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
        isDisabled: true,
        avalaibleNetworks: [NetworkEnum.Network_Testnet],
        icon: '/landingV3/images/pricing/2.png',
      },
      {
        id: 3,
        label: 'NearDA',
        value: DALayerEnum.DALayer_NearDa,
        isDisabled: true,
        avalaibleNetworks: [],
        icon: '/landingV3/images/pricing/3.png',
      },
      {
        id: 4,
        label: 'Eigen',
        value: DALayerEnum.DALayer_Eigen,
        icon: '/landingV3/images/pricing/4.png',
        avalaibleNetworks: [],
        isDisabled: true,
      },
      {
        id: 5,
        label: 'Filecoin',
        value: DALayerEnum.DALayer_FILECOIN,
        icon: '/landingV3/images/pricing/5.png',
        avalaibleNetworks: [],

        isDisabled: true,
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
  [ORDER_FIELD.DEFI]: {
    title: '5. DeFi',
    subTitle: 'DeFi',
    background: 'brown',
    backgroundParent: 'orange',
    options: [
      {
        label: 'Issue a token',
        keyInField: 'nestedKey1',
        value: 1,
        icon: '/landingV3/images/pricing/13.png',
        id: 1,
      },
      {
        label: 'Orderbook',
        keyInField: 'nestedKey2',
        value: 2,
        icon: '/landingV3/images/pricing/12.png',
        id: 2,
      },
      {
        label: 'Orderbook',
        keyInField: 'nestedKey1',
        value: 3,
        icon: '/landingV3/images/pricing/14.png',
        id: 3,
      },
    ],
    description: {
      title: 'DeFi',
      content: (
        <p>
          The data of your blockchain is written to a Data Availability layer
          such as Polygon, Celestia, NearDA, Eigen, Filecoin or Avail.
        </p>
      ),
    },
  },
  [ORDER_FIELD.BRIDGEAPPS]: {
    title: '6. Bridge Apps',
    subTitle: 'Bridge Apps',
    background: 'brown',
    description: {
      title: 'Bridge Apps',
      content: (
        <p>
          The data of your blockchain is written to a Data Availability layer
          such as Polygon, Celestia, NearDA, Eigen, Filecoin or Avail.
        </p>
      ),
    },
  },
  [ORDER_FIELD.COMPUTED]: {
    title: '7. Compute',
    subTitle: 'Compute',
    background: 'violet',
    options: [
      {
        label: 'ZK Rollups',
        id: 1,
        value: 1,
        icon: '/landingV3/images/pricing/10.png',
        avalaibleNetworks: [],
      },
      {
        label: 'Optimistic Rollups',
        id: 2,
        value: 2,
        icon: '/landingV3/images/pricing/9.png',
        avalaibleNetworks: [],
      },
      {
        label: 'GPU Rollups',
        id: 3,
        value: DALayerEnum.DALayer_PLG,
        avalaibleNetworks: [],
      },
    ],
    description: {
      title: 'Computed',
      content: (
        <p>
          The data of your blockchain is written to a Data Availability layer
          such as Polygon, Celestia, NearDA, Eigen, Filecoin or Avail.
        </p>
      ),
    },
  },
  [ORDER_FIELD.STORAGE]: {
    title: '8. Storage',
    subTitle: 'Storage',
    background: 'green',
    description: {
      title: 'Storage',
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
        label: 'BVM DA',
        value: 1,
        icon: '/landingV3/images/pricing/11.png',
        avalaibleNetworks: [
          NetworkEnum.Network_Mainnet,
          NetworkEnum.Network_Testnet,
        ],
      },
      {
        id: 6,
        label: 'Avail',
        value: DALayerEnum.DALayer_AVAIL,
        avalaibleNetworks: [],
        icon: '/landingV3/images/pricing/6.png',
      },
      {
        id: 2,
        label: 'Celestia',
        value: DALayerEnum.DALayer_Celestia,
        isDisabled: true,
        avalaibleNetworks: [NetworkEnum.Network_Testnet],
        icon: '/landingV3/images/pricing/2.png',
      },
      {
        id: 5,
        label: 'Filecoin',
        value: DALayerEnum.DALayer_FILECOIN,
        icon: '/landingV3/images/pricing/5.png',
        avalaibleNetworks: [],
        isDisabled: true,
      },
      {
        id: 3,
        label: 'NearDA',
        value: DALayerEnum.DALayer_NearDa,
        isDisabled: true,
        avalaibleNetworks: [],
        icon: '/landingV3/images/pricing/3.png',
      },
    ],
  },

  [ORDER_FIELD.SETTLEMENT]: {
    title: '9. Settlement',
    subTitle: 'Settlement',
    background: 'yellow',
    options: [
      {
        id: 1,
        label: 'Bitcoin',
        value: 1,
        icon: '/landingV3/images/pricing/15.png',
        avalaibleNetworks: [
          NetworkEnum.Network_Mainnet,
          NetworkEnum.Network_Testnet,
        ],
      },
      {
        id: 1,
        label: 'Ethereum',
        value: 2,
        icon: '/landingV3/images/pricing/16.png',
        avalaibleNetworks: [
          NetworkEnum.Network_Mainnet,
          NetworkEnum.Network_Testnet,
        ],
      },
    ],
    description: {
      title: 'Settlement',
      content: (
        <p>
          The data of your blockchain is written to a Data Availability layer
          such as Polygon, Celestia, NearDA, Eigen, Filecoin or Avail.
        </p>
      ),
    },
  },
  [ORDER_FIELD.SYSTEMAPPS]: {
    title: '10. System Apps',
    subTitle: 'System Apps',
    background: 'pink',
    options: [
      {
        id: 1,
        label: 'Explorer',
        value: 1,
        icon: '/landingV3/images/pricing/17.png',
        avalaibleNetworks: [
          NetworkEnum.Network_Mainnet,
          NetworkEnum.Network_Testnet,
        ],
      },
    ],
    description: {
      title: 'System Apps',
      content: (
        <p>
          The data of your blockchain is written to a Data Availability layer
          such as Polygon, Celestia, NearDA, Eigen, Filecoin or Avail.
        </p>
      ),
    },
  },
};
