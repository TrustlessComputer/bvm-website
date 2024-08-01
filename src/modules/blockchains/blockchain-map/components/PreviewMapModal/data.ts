import { Position } from '@xyflow/react';

export const FAKE_DATA_MAPPING = [
  {
    id: '1',
    data: {
      label: 'Blockchain',
      positionDot: Position.Right,
      legoList: [
        {
          background: '#000',
          icon: 'http://localhost:9001/icons-tool/icon-gas-medium.svg',
          title: '16 GB RAM, 8 cores, 320 GB SSD'
        },
        {
          background: '#12dac2',
          icon: 'http://localhost:9001/icons-tool/icon-filecoin.svg',
          title: 'ZK Rollup'
        },
        {
          background: '#000',
          icon: 'http://localhost:9001/icons-tool/icon-gas-medium.svg',
          title: '16 GB RAM, 8 cores, 320 GB SSD'
        },
        {
          background: '#12dac2',
          icon: 'http://localhost:9001/icons-tool/icon-filecoin.svg',
          title: 'ZK Rollup'
        }
      ]
    },
    handleType: 'source',
    position: { x: 50, y: 25 },
    connection: [
      {
        id: 'c1-3',
        target: '3',
        label: 'Output 1',
      },
      {
        id: 'c1-2',
        target: '2',
        label: 'Output 2',
      },
      {
        id: 'c1-4',
        target: '4',
        label: 'Output 3',
      },
    ]
  },
  {
    id: '2',
    data: {
      label: 'Staking apps',
      positionDot: Position.Right,
      legoList: [
        {
          background: '#000',
          icon: 'http://localhost:9001/icons-tool/icon-gas-medium.svg',
          title: '16 GB RAM, 8 cores, 320 GB SSD'
        },
        {
          background: '#12dac2',
          icon: 'http://localhost:9001/icons-tool/icon-filecoin.svg',
          title: 'ZK Rollup'
        }
      ],
      handleType: 'target',
    },
    position: { x: 350, y: 25 },
  },
  {
    id: '3',
    data: {
      label: 'Degen apps',
      positionDot: Position.Left,
      legoList: [
        {
          background: '#000',
          icon: 'http://localhost:9001/icons-tool/icon-gas-medium.svg',
          title: '16 GB RAM, 8 cores, 320 GB SSD'
        },
        {
          background: '#12dac2',
          icon: 'http://localhost:9001/icons-tool/icon-filecoin.svg',
          title: 'ZK Rollup'
        }
      ],
      handleType: 'target',
    },
    position: { x: 350, y: 25 },
  },
  {
    id: '4',
    data: {
      label: 'Gaming apps',
      positionDot: Position.Left,
      legoList: [
        {
          background: '#000',
          icon: 'http://localhost:9001/icons-tool/icon-gas-medium.svg',
          title: '16 GB RAM, 8 cores, 320 GB SSD'
        },
        {
          background: '#12dac2',
          icon: 'http://localhost:9001/icons-tool/icon-filecoin.svg',
          title: 'ZK Rollup'
        }
      ],
      handleType: 'target',
    },
    position: { x: 350, y: 250 },
  }
]


