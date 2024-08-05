import { BlockchainMap } from '@/types/customize-model';
import { HandleType, Position } from '@xyflow/react';
import { type Node } from '@xyflow/react';

export const FAKE_DATA_MAPPING = [
  {
    id: '1',
    data: {
      label: 'Blockchain',
      positionDot: Position.Right,
      // handleType: 'source',
      status: 'Drafting',
      legoList: [
        {
          background: '#FF3A3A',
          icon: '/icons-tool/icon-gas-medium.svg',
          title: 'Name: Blockchain name',
        },
        {
          background: '#DEA000',
          icon: '/icons-tool/icon-btc.svg',
          title: 'Bitcoin Settlement',
        },
        {
          background: '#FF7A41',
          icon: '/icons-tool/icon-mainnet.svg',
          title: 'Mainnet',
        },
        {
          background: '#A041FF',
          icon: '/icons-tool/icon-op.svg',
          title: 'Optimistic Rollups',
        },
        {
          background: '#12DAC2',
          icon: '/icons-tool/icon-hardware.svg',
          title: '16 GB RAM, 8 cores, 320 GB SSD',
        },
        {
          background: '#15C888',
          icon: '/icons-tool/icon-gas-min.svg',
          title: '2,000,000,000 block gas limit',
        },
        {
          background: '#FB4FAC',
          icon: '/icons-tool/icon-time-medium.svg',
          title: '4 hours withdrawal time',
        },
      ],
      // sourceHandles: [
      //   {
      //     id: '1-s-2',
      //   },
      //   {
      //     id: '1-s-3',
      //   },
      // ],
      // targetHandles: [],
    },
    type: 'elk',
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    data: {
      label: 'Issue a token',
      // positionDot: Position.Left,
      // handleType: 'target',
      status: 'Missing',
      // sourceHandles: [],
      // targetHandles: [
      //   {
      //     id: '2-t-1',
      //   },
      // ],
      legoParent: {
        background: '#F76649',
      },
      legoList: [
        {
          background: '#DE5C42',
          icon: '/icons-tool/icon_staking.svg',
          title: 'Issue a token',
        },
        {
          background: '#DE5C42',
          icon: '/icons-tool/icon-vesting.svg',
          title: 'Vesting',
        },
        {
          background: '#DE5C42',
          icon: '/icons-tool/icon-gas-medium.svg',
          title: 'Staking',
        },
        {
          background: '#DE5C42',
          icon: '/icons-tool/icon-dex.svg',
          title: 'DEX',
        },
        {
          background: '#DE5C42',
          icon: '/icons-tool/icon-orderbook.svg',
          title: 'Orderbook',
        },
        {
          background: '#DE5C42',
          icon: '/icons-tool/icon-perceptual.svg',
          title: 'Perpetual',
        },
      ],
    },
    type: 'elk',
    position: { x: 0, y: 0 },
  },
  {
    id: '3',
    data: {
      label: 'Pool ZKJ/BVM',
      positionDot: Position.Left,
      // handleType: 'target',
      status: 'Running',
      legoParent: {
        background: '#C000E6',
      },
      // sourceHandles: [],
      // targetHandles: [
      //   {
      //     id: '3-t-1',
      //   },
      // ],
      legoList: [
        {
          background: '#AA00CC',
          icon: '/icons-tool/icon_staking.svg',
          title: 'Pool 1',
        },
        {
          background: '#AA00CC',
          icon: '/icons-tool/icon_staking.svg',
          title: 'Pool 2',
        },
        {
          background: '#AA00CC',
          icon: '/icons-tool/icon_staking.svg',
          title: 'Pool 3',
        },
      ],
    },
    type: 'elk',
    position: { x: 0, y: 0 },
  },
  {
    id: '4',
    data: {
      label: 'Gaming apps',
      positionDot: Position.Left,
      // handleType: 'target',
      status: 'Down',
      // sourceHandles: [],
      // targetHandles: [
      //   {
      //     id: '4-t-1',
      //   },
      // ],
      legoParent: {
        background: '#E6004D',
      },
      legoList: [
        {
          background: '#CC0044',
          icon: '/icons-tool/icon-game.svg',
          title: 'Pepe Fight',
        },
        {
          background: '#CC0044',
          icon: '/icons-tool/icon-game.svg',
          title: 'Merge',
        },
        {
          background: '#CC0044',
          icon: '/icons-tool/icon-game.svg',
          title: 'Blast',
        },
        {
          background: '#CC0044',
          icon: '/icons-tool/icon-game.svg',
          title: 'Connect',
        },
      ],
    },
    type: 'elk',
    position: { x: 0, y: 0 },
  },
  {
    id: '5',
    data: {
      label: 'Gaming apps',
      positionDot: Position.Left,
      // handleType: 'target',
      status: 'Ready',
      // sourceHandles: [],
      // targetHandles: [
      //   {
      //     id: '4-t-1',
      //   },
      // ],
      legoParent: {
        background: '#E6004D',
      },
      legoList: [
        {
          background: '#CC0044',
          icon: '/icons-tool/icon-game.svg',
          title: 'Pepe Fight',
        },
        {
          background: '#CC0044',
          icon: '/icons-tool/icon-game.svg',
          title: 'Merge',
        },
        {
          background: '#CC0044',
          icon: '/icons-tool/icon-game.svg',
          title: 'Blast',
        },
        {
          background: '#CC0044',
          icon: '/icons-tool/icon-game.svg',
          title: 'Connect',
        },
      ],
    },
    type: 'elk',
    position: { x: 0, y: 0 },
  },
];

export const blockchainMapMockup: BlockchainMap = {
  blockchain: null,
  dapps: [],
};
