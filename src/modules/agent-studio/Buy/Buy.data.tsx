import { DALayerEnum, NetworkEnum } from './Buy.constanst';
import { LegoColor } from './components3/BoxOptionV2';
import { ORDER_FIELD } from './stores';

export type OrderFormOption = {
  [key in (typeof ORDER_FIELD)[keyof typeof ORDER_FIELD]]: {
    title: string;
    subTitle: string;
    background: LegoColor;
    backgroundParent?: LegoColor;
    isRequired?: boolean;
    description?: {
      title: string;
      content: JSX.Element;
    };
    options?: {
      id: number;
      label: string;
      keyInField?: string;
      value: NetworkEnum | DALayerEnum | number;
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
    title: 'Network',
    subTitle: 'Network',
    background: 'brown',
    isRequired: true,
    description: {
      title: 'Network',
      content: (
        <p>Select whether you want to create a testnet or deploy a mainnet.</p>
      ),
    },
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
    title: ' Data Availability',
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
        id: 6,
        label: 'Avail',
        isDisabled: true,
        value: DALayerEnum.DALayer_AVAIL,
        avalaibleNetworks: [NetworkEnum.Network_Testnet],
        icon: '/landingV3/images/pricing/6.png',
      },
      {
        id: 2,
        label: 'Celestia',
        value: DALayerEnum.DALayer_Celestia,
        isDisabled: true,
        avalaibleNetworks: [],
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
    ],
  },
  [ORDER_FIELD.GAS_LIMIT]: {
    title: ' Block Gas Limit',
    subTitle: 'Block Gas Limit',
    background: 'green',
    description: {
      title: 'Block Gas Limit',
      content: (
        <p>
          The block gas limit defines the maximum amount of gas that all
          transactions in a single block can consume.
        </p>
      ),
    },
  },
  [ORDER_FIELD.WITHDRAW_PERIOD]: {
    title: 'Withdrawal Time',
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
  // [ORDER_FIELD.DEFI]: {
  //   title: 'DeFi',
  //   subTitle: 'DeFi',
  //   background: 'brown',
  //   backgroundParent: 'orange',
  //   options: [
  //     {
  //       label: 'Issue a token',
  //       keyInField: 'nestedKey1',
  //       value: 1,
  //       icon: '/landingV3/images/pricing/13.png',
  //       id: 1,
  //     },
  //     {
  //       label: 'Orderbook',
  //       keyInField: 'nestedKey2',
  //       value: 2,
  //       icon: '/landingV3/images/pricing/12.png',
  //       id: 2,
  //     },
  //     {
  //       label: 'Orderbook',
  //       keyInField: 'nestedKey1',
  //       value: 3,
  //       icon: '/landingV3/images/pricing/14.png',
  //       id: 3,
  //     },
  //   ],
  //   description: {
  //     title: 'DeFi',
  //     content: (
  //       <p>
  //         The data of your blockchain is written to a Data Availability layer
  //         such as Polygon, Celestia, NearDA, Eigen, Filecoin or Avail.
  //       </p>
  //     ),
  //   },
  // },
  // [ORDER_FIELD.BRIDGEAPPS]: {
  //   title: 'Bridge Apps',
  //   subTitle: 'Bridge Apps',
  //   background: 'blue',
  //   description: {
  //     title: 'Bridge Apps',
  //     content: (
  //       <p>
  //         The data of your blockchain is written to a Data Availability layer
  //         such as Polygon, Celestia, NearDA, Eigen, Filecoin or Avail.
  //       </p>
  //     ),
  //   },
  //   options: [
  //     {
  //       label: 'Bridge',
  //       id: 1,
  //       value: 1,
  //       avalaibleNetworks: [],
  //     },
  //     {
  //       label: 'Bitcoin Bridge',
  //       id: 2,
  //       value: 2,
  //       avalaibleNetworks: [],
  //     },
  //     {
  //       label: 'Ethereum Bridge',
  //       id: 3,
  //       value: 3,
  //       avalaibleNetworks: [],
  //     },
  //     {
  //       label: 'Solana Bridge',
  //       id: 4,
  //       value: 4,
  //       avalaibleNetworks: [],
  //     },
  //     {
  //       label: 'BRC-20 Bridge',
  //       id: 5,
  //       value: 5,
  //       avalaibleNetworks: [],
  //     },
  //     {
  //       label: 'Runes Bridge',
  //       id: 6,
  //       value: 6,
  //       avalaibleNetworks: [],
  //     },
  //     {
  //       label: 'Ordinals Bridge',
  //       id: 7,
  //       value: 7,
  //       avalaibleNetworks: [],
  //     },
  //     {
  //       label: 'Decentralized Bridge for Bitcoin',
  //       id: 8,
  //       value: 8,
  //       avalaibleNetworks: [],
  //     },
  //   ],
  // },
  // [ORDER_FIELD.COMPUTED]: {
  //   title: 'Compute',
  //   subTitle: 'Compute',
  //   background: 'violet',
  //   options: [
  //     {
  //       label: 'ZK Rollups',
  //       id: 1,
  //       value: 1,
  //       icon: '/landingV3/images/pricing/10.png',
  //       avalaibleNetworks: [],
  //     },
  //     {
  //       label: 'Optimistic Rollups',
  //       id: 2,
  //       value: 2,
  //       icon: '/landingV3/images/pricing/9.png',
  //       avalaibleNetworks: [],
  //     },
  //     {
  //       label: 'GPU Rollups',
  //       id: 3,
  //       value: DALayerEnum.DALayer_PLG,
  //       avalaibleNetworks: [],
  //     },
  //   ],
  //   description: {
  //     title: 'Computed',
  //     content: (
  //       <p>
  //         The data of your blockchain is written to a Data Availability layer
  //         such as Polygon, Celestia, NearDA, Eigen, Filecoin or Avail.
  //       </p>
  //     ),
  //   },
  // },
  // [ORDER_FIELD.STORAGE]: {
  //   title: '8. Storage',
  //   subTitle: 'Storage',
  //   background: 'green',
  //   description: {
  //     title: 'Storage',
  //     content: (
  //       <p>
  //         The data of your blockchain is written to a Data Availability layer
  //         such as Polygon, Celestia, NearDA, Eigen, Filecoin or Avail.
  //       </p>
  //     ),
  //   },
  //   options: [
  //     {
  //       id: 1,
  //       label: 'BVM DA',
  //       value: 1,
  //       icon: '/landingV3/images/pricing/11.png',
  //       avalaibleNetworks: [
  //         NetworkEnum.Network_Mainnet,
  //         NetworkEnum.Network_Testnet,
  //       ],
  //     },
  //     {
  //       id: 6,
  //       label: 'Avail',
  //       value: DALayerEnum.DALayer_AVAIL,
  //       avalaibleNetworks: [],
  //       icon: '/landingV3/images/pricing/6.png',
  //     },
  //     {
  //       id: 2,
  //       label: 'Celestia',
  //       value: DALayerEnum.DALayer_Celestia,
  //       isDisabled: true,
  //       avalaibleNetworks: [NetworkEnum.Network_Testnet],
  //       icon: '/landingV3/images/pricing/2.png',
  //     },
  //     {
  //       id: 5,
  //       label: 'Filecoin',
  //       value: DALayerEnum.DALayer_FILECOIN,
  //       icon: '/landingV3/images/pricing/5.png',
  //       avalaibleNetworks: [],
  //       isDisabled: true,
  //     },
  //     {
  //       id: 3,
  //       label: 'NearDA',
  //       value: DALayerEnum.DALayer_NearDa,
  //       isDisabled: true,
  //       avalaibleNetworks: [],
  //       icon: '/landingV3/images/pricing/3.png',
  //     },
  //   ],
  // },

  // [ORDER_FIELD.SETTLEMENT]: {
  //   title: 'Settlement',
  //   subTitle: 'Settlement',
  //   background: 'yellow',
  //   options: [
  //     {
  //       id: 1,
  //       label: 'Bitcoin',
  //       value: 1,
  //       icon: '/landingV3/images/pricing/15.png',
  //       avalaibleNetworks: [
  //         NetworkEnum.Network_Mainnet,
  //         NetworkEnum.Network_Testnet,
  //       ],
  //     },
  //     {
  //       id: 1,
  //       label: 'Ethereum',
  //       value: 2,
  //       icon: '/landingV3/images/pricing/16.png',
  //       avalaibleNetworks: [
  //         NetworkEnum.Network_Mainnet,
  //         NetworkEnum.Network_Testnet,
  //       ],
  //     },
  //   ],
  //   description: {
  //     title: 'Settlement',
  //     content: (
  //       <p>
  //         The data of your blockchain is written to a Data Availability layer
  //         such as Polygon, Celestia, NearDA, Eigen, Filecoin or Avail.
  //       </p>
  //     ),
  //   },
  // },
  // [ORDER_FIELD.SYSTEMAPPS]: {
  //   title: 'System Apps',
  //   subTitle: 'System Apps',
  //   background: 'pink',
  //   options: [
  //     {
  //       id: 1,
  //       label: 'Explorer',
  //       value: 1,
  //       icon: '/landingV3/images/pricing/17.png',
  //       avalaibleNetworks: [
  //         NetworkEnum.Network_Mainnet,
  //         NetworkEnum.Network_Testnet,
  //       ],
  //     },
  //   ],
  //   description: {
  //     title: 'System Apps',
  //     content: (
  //       <p>
  //         The data of your blockchain is written to a Data Availability layer
  //         such as Polygon, Celestia, NearDA, Eigen, Filecoin or Avail.
  //       </p>
  //     ),
  //   },
  // },

  // [ORDER_FIELD.WALLET]: {
  //   title: 'Wallet',
  //   subTitle: 'Wallet',
  //   background: 'skyBlue',
  //   description: {
  //     title: 'Wallet',
  //     content: (
  //       <p>
  //         The data of your blockchain is written to a Data Availability layer
  //         such as Polygon, Celestia, NearDA, Eigen, Filecoin or Avail.
  //       </p>
  //     ),
  //   },
  //   options: [
  //     {
  //       id: 1,
  //       label: 'Paymaster',
  //       value: 1,
  //       icon: '/landingV3/images/pricing/18.png',
  //       avalaibleNetworks: [
  //         NetworkEnum.Network_Mainnet,
  //         NetworkEnum.Network_Testnet,
  //       ],
  //     },
  //   ],
  // },
  // [ORDER_FIELD.DEGENAPPS]: {
  //   title: 'Degen Apps',
  //   subTitle: 'Degen Apps',
  //   background: 'cowYellow',
  //   description: {
  //     title: 'Degen Apps',
  //     content: (
  //       <p>
  //         The data of your blockchain is written to a Data Availability layer
  //         such as Polygon, Celestia, NearDA, Eigen, Filecoin or Avail.
  //       </p>
  //     ),
  //   },
  //   options: [
  //     {
  //       id: 1,
  //       label: 'NFT Raffle',
  //       value: 1,
  //       icon: '/landingV3/images/pricing/19.png',
  //       avalaibleNetworks: [],
  //     },
  //     {
  //       id: 1,
  //       label: 'NFT Raffle',
  //       value: 1,
  //       icon: '/landingV3/images/pricing/20.png',
  //       avalaibleNetworks: [],
  //     },
  //     {
  //       id: 1,
  //       label: 'NFT Raffle',
  //       value: 1,
  //       icon: '/landingV3/images/pricing/21.png',
  //       avalaibleNetworks: [],
  //     },
  //   ],
  // },

  // [ORDER_FIELD.GAMES]: {
  //   title: 'Games',
  //   subTitle: 'Games',
  //   background: 'green',
  //   description: {
  //     title: 'Games',
  //     content: (
  //       <p>
  //         The data of your blockchain is written to a Data Availability layer
  //         such as Polygon, Celestia, NearDA, Eigen, Filecoin or Avail.
  //       </p>
  //     ),
  //   },
  //   options: [
  //     {
  //       id: 1,
  //       label: 'Games',
  //       value: 1,
  //       icon: '/landingV3/images/pricing/20.png',
  //       avalaibleNetworks: [],
  //     },
  //   ],
  // },
};

export const iconToolNames = [
  '/icons-tool/icon-avail.svg',
  '/icons-tool/icon-brc20.svg',
  '/icons-tool/icon-bridge-confused.svg',
  '/icons-tool/icon-bsc.svg',
  '/icons-tool/icon-btc-decen.svg',
  '/icons-tool/icon-btc.svg',
  '/icons-tool/icon-bull-bear.svg',
  '/icons-tool/icon-bvm.svg',
  '/icons-tool/icon-ceslestia.svg',
  '/icons-tool/icon-dex.svg',
  '/icons-tool/icon-eth.svg',
  '/icons-tool/icon-explorer.svg',
  '/icons-tool/icon-filecoin.svg',
  '/icons-tool/icon-game.svg',
  '/icons-tool/icon-gas-max.svg',
  '/icons-tool/icon-gas-medium.svg',
  '/icons-tool/icon-gas-min.svg',
  '/icons-tool/icon-hardware.svg',
  '/icons-tool/icon-issue-a-token.svg',
  '/icons-tool/icon-l1-v2.svg',
  '/icons-tool/icon-l1.svg',
  '/icons-tool/icon-l2.svg',
  '/icons-tool/icon-l3.svg',
  '/icons-tool/icon-light.svg',
  '/icons-tool/icon-mainnet.svg',
  '/icons-tool/icon-near.svg',
  '/icons-tool/icon-op.svg',
  '/icons-tool/icon-orderbook.svg',
  '/icons-tool/icon-ordinals.svg',
  '/icons-tool/icon-perceptual.svg',
  '/icons-tool/icon-polygon.svg',
  '/icons-tool/icon-raffle.svg',
  '/icons-tool/icon-runes.svg',
  '/icons-tool/icon-solana.svg',
  '/icons-tool/icon-sov.svg',
  '/icons-tool/icon-staking.svg',
  '/icons-tool/icon-testnet.svg',
  '/icons-tool/icon-time-fast.svg',
  '/icons-tool/icon-time-medium.svg',
  '/icons-tool/icon-time-slow.svg',
  '/icons-tool/icon-time-superfast.svg',
  '/icons-tool/icon-vesting.svg',
  '/icons-tool/icon-wallet.svg',
  '/icons-tool/icon-yolo.svg',
  '/icons-tool/icon-zk.svg',
  '/icons-tool/icon-gas.svg',
  '/icons-tool/icon-address.svg',
  '/icons-tool/ic-doge.svg',
  '/icons-tool/ic-fractal.svg',
];
