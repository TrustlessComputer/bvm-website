import React from 'react';
import { DALayerEnum, NetworkEnum } from './Buy.constanst';
import { ORDER_FIELD } from './stores';

export const OrderFormOptions = {
  [ORDER_FIELD.NETWORK]: {
    title: '1. Network',
    subTitle: 'Network',
    options: [
      {
        id: 1,
        label: <React.Fragment>Mainnet</React.Fragment>,
        value: NetworkEnum.Network_Mainnet,
      },
      {
        id: 2,
        label: <React.Fragment>Testnet</React.Fragment>,
        value: NetworkEnum.Network_Testnet,
      },
    ],
  },
  [ORDER_FIELD.DATA_AVAILABILITY_CHAIN]: {
    title: '2. Data Availability',
    subTitle: 'Data Availability',
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
        label: <React.Fragment>Polygon</React.Fragment>,
        value: DALayerEnum.DALayer_PLG,
      },
      {
        id: 2,
        label: <React.Fragment>Celestia</React.Fragment>,
        value: DALayerEnum.DALayer_Celestia,
        disabled: true,
      },
      {
        id: 3,
        label: <React.Fragment>NearDA</React.Fragment>,
        value: DALayerEnum.DALayer_NearDa,
        disabled: true,
      },
      {
        id: 4,
        label: <React.Fragment>Eigen</React.Fragment>,
        value: DALayerEnum.DALayer_Eigen,
        disabled: true,
      },
      {
        id: 5,
        label: <React.Fragment>Filecoin</React.Fragment>,
        value: DALayerEnum.DALayer_FILECOIN,
        disabled: true,
      },
      {
        id: 6,
        label: <React.Fragment>Avail</React.Fragment>,
        value: DALayerEnum.DALayer_AVAIL,
        disabled: true,
      },
    ],
  },
  [ORDER_FIELD.GAS_LIMIT]: {
    title: '3. Block Gas Limit',
    subTitle: 'Block Gas Limit',
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
