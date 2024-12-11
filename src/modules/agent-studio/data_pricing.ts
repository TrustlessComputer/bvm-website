import {
  DALayerEnum,
  GAS_LITMIT,
  NetworkEnum,
  WITHDRAWAL_PERIOD_BOOTSTRAP,
} from './Buy/Buy.constanst';

export const DATA_PRICING = {
  network: {
    title: 'Network',
    sub_title: 'Network',
    options: [
      {
        label: 'Mainnet',
        id: 1,
        value: NetworkEnum.Network_Mainnet,
      },
      {
        label: 'Testnet',
        id: 2,
        value: NetworkEnum.Network_Testnet,
      },
    ],
  },

  availability: {
    title: 'Data Availability',
    sub_title: 'Data Availability',
    options: [
      {
        label: 'Polygon',
        id: 1,
        value: DALayerEnum.DALayer_PLG,
        icon: '/landingV3/images/pricing/1.png',
        avalaibleNetworks: [
          NetworkEnum.Network_Mainnet,
          NetworkEnum.Network_Testnet,
        ],
      },
      {
        label: 'Avail',
        id: 2,
        value: DALayerEnum.DALayer_AVAIL,
        icon: '/landingV3/images/pricing/6.png',
        avalaibleNetworks: [NetworkEnum.Network_Testnet],
      },
      {
        label: 'Celestia',
        id: 3,
        value: DALayerEnum.DALayer_Celestia,
        icon: '/landingV3/images/pricing/2.png',
        avalaibleNetworks: [],
      },
      {
        label: 'NearDA',
        id: 4,
        value: DALayerEnum.DALayer_NearDa,
        isDisabled: true,
        icon: '/landingV3/images/pricing/3.png',
        avalaibleNetworks: [],
      },
      {
        label: 'Eigen',
        id: 5,
        value: DALayerEnum.DALayer_Eigen,
        icon: '/landingV3/images/pricing/4.png',
        avalaibleNetworks: [],
      },
      {
        label: 'Filecoin',
        id: 6,
        value: DALayerEnum.DALayer_FILECOIN,
        icon: '/landingV3/images/pricing/5.png',
        avalaibleNetworks: [],
      },
    ],
  },

  gas: {
    title: 'Block gas limit',
    sub_title: 'Block gas limit',
    max: GAS_LITMIT,
  },

  withdrawal: {
    title: 'Withdrawal time',
    sub_title: 'Withdrawal time',
    max: WITHDRAWAL_PERIOD_BOOTSTRAP,
  },
  computed: {
    title: 'Compute',
    options: [
      {
        label: 'ZK Rollups',
        id: 1,
        value: 1,
        icon: '/landingV3/images/lego/12.png',
        // avalaibleNetworks: [
        //   NetworkEnum.Network_Mainnet,
        //   NetworkEnum.Network_Testnet,
        // ],
      },
      {
        label: 'Optimistic Rollups',
        id: 1,
        value: 2,
        icon: '/landingV3/images/lego/13.png',
        // avalaibleNetworks: [
        //   NetworkEnum.Network_Mainnet,
        //   NetworkEnum.Network_Testnet,
        // ],
      },
      {
        label: 'GPU Rollups',
        id: 1,
        value: DALayerEnum.DALayer_PLG,
        // avalaibleNetworks: [
        //   NetworkEnum.Network_Mainnet,
        //   NetworkEnum.Network_Testnet,
        // ],
      },
    ],
  },
  storage: {
    title: 'Storage',
  },
};
