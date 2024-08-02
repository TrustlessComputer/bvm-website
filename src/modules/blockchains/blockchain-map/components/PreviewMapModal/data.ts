import { Position } from '@xyflow/react';
import { type Node } from '@xyflow/react';

export type ElkNodeData = {
  label: string;
  sourceHandles: { id: string, label: string }[];
  targetHandles: { id: string, label: string }[];
};

export type ElkNode = Node<ElkNodeData, 'elk'>;

export const FAKE_DATA_MAPPING = [
  {
    id: '1',
    data: {
      label: 'Blockchain',
      positionDot: Position.Right,
      handleType: 'source',
      isRunning: true,
      legoList: [
        {
          background: '#FF3A3A',
          icon: '/icons-tool/icon-gas-medium.svg',
          title: 'Name: Blockchain name',
        },
        {
          background: '#DEA000',
          icon: '/icons-tool/icon-btc.svg',
          title: 'Bitcoin Settlement'
        },
        {
          background: '#FF7A41',
          icon: '/icons-tool/icon-mainnet.svg',
          title: 'Mainnet'
        },
        {
          background: '#A041FF',
          icon: '/icons-tool/icon-op.svg',
          title: 'Optimistic Rollups'
        },
        {
          background: '#12DAC2',
          icon: '/icons-tool/icon-hardware.svg',
          title: '16 GB RAM, 8 cores, 320 GB SSD'
        },
        {
          background: '#15C888',
          icon: '/icons-tool/icon-gas-min.svg',
          title: '2,000,000,000 block gas limit'
        },
        {
          background: '#FB4FAC',
          icon: '/icons-tool/icon-time-medium.svg',
          title: '4 hours withdrawal time'
        }
      ]
    },
    position: { x: 50, y: 25 },
    connection: [
      {
        id: 'c1-3',
        target: '3',
        label: 'Output 1',
      },
      {
        id: 'c2-2',
        target: '2',
        label: 'Output 2',
      },
      {
        id: 'c1-4',
        target: '4',
        label: 'Output 2',

      },
    ],
    type: 'elk',
  },
  {
    id: '2',
    data: {
      label: 'Staking apps',
      positionDot: Position.Left,
      handleType: 'target',
      isRunning: true,
      legoParent: {
        background: '#C000E6',
      },
      legoList: [
        {
          background: '#AA00CC',
          icon: '/icons-tool/icon_staking.svg',
          title: 'Pool 1'
        },
        {
          background: '#AA00CC',
          icon: '/icons-tool/icon_staking.svg',
          title: 'Pool 2'
        },
        {
          background: '#AA00CC',
          icon: '/icons-tool/icon_staking.svg',
          title: 'Pool 3'
        },
      ],
    },
    position: { x: 350, y: 25 },
    type: 'elk',
  },
  {
    id: '3',
    data: {
      label: 'DeFi Apps',
      isRunning: false,
      positionDot: Position.Left,
      handleType: 'target',
      legoParent: {
        background: '#F76649',
      },
      legoList: [
        {
          background: '#DE5C42',
          icon: '/icons-tool/icon_staking.svg',
          title: 'Issue a token'
        },
        {
          background: '#DE5C42',
          icon: '/icons-tool/icon-vesting.svg',
          title: 'Vesting'
        },
        {
          background: '#DE5C42',
          icon: '/icons-tool/icon-gas-medium.svg',
          title: 'Staking'
        },
        {
          background: '#DE5C42',
          icon: '/icons-tool/icon-dex.svg',
          title: 'DEX'
        },
        {
          background: '#DE5C42',
          icon: '/icons-tool/icon-orderbook.svg',
          title: 'Orderbook'
        },
        {
          background: '#DE5C42',
          icon: '/icons-tool/icon-perceptual.svg',
          title: 'Perpetual'
        },
      ],
    },
    position: { x: 350, y: 25 },
    type: 'elk',
  },
  {
    id: '4',
    data: {
      label: 'Gaming apps',
      positionDot: Position.Left,
      handleType: 'target',
      isRunning: true,
      legoParent: {
        background: '#E6004D',
      },
      legoList: [
        {
          background: '#CC0044',
          icon: '/icons-tool/icon-game.svg',
          title: 'Pepe Fight'
        },
        {
          background: '#CC0044',
          icon: '/icons-tool/icon-game.svg',
          title: 'Merge'
        },
        {
          background: '#CC0044',
          icon: '/icons-tool/icon-game.svg',
          title: 'Blast'
        },
        {
          background: '#CC0044',
          icon: '/icons-tool/icon-game.svg',
          title: 'Connect'
        },
      ],
    },
    position: { x: 350, y: 250 },
    type: 'elk',
  },
]


