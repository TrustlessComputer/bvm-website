import { on } from 'events';
import { limit } from 'react-laag/dist/util';
import { CategoryAction, SendPromptResponse } from '../types';

export const mockupPromptResponses: SendPromptResponse[] = [
  {
    status: 1,
    data: {
      message:
        'I have updated your settlement layer to Bitcoin. Please let me know if you need any further adjustments or have additional requests!',
      is_clear: false,
      actions: [
        {
          action_type: CategoryAction.ADD,
          category: {
            key: 'settlement',
            options: [
              {
                key: 'bitcoin',
                title: 'Bitcoin',
                value: 0,
              },
            ],
          },
        },
      ],
    },
  },
  {
    status: 1,
    data: {
      message:
        'I have updated your settlement layer to Bitcoin. Please let me know if you need any further adjustments or have additional requests!',
      is_clear: false,
      actions: [
        {
          action_type: CategoryAction.ADD,
          category: {
            key: 'hardware',
            options: [
              {
                key: '16g',
                title: 'Bitcoin',
                value: 0,
              },
            ],
          },
        },
      ],
    },
  },
  {
    status: 1,
    data: {
      message:
        'I have updated your settlement layer to Bitcoin. Please let me know if you need any further adjustments or have additional requests!',
      is_clear: false,
      actions: [
        {
          action_type: CategoryAction.ADD,
          category: {
            key: 'block_gas_limit',
            options: [
              {
                key: '1m',
                title: 'Bitcoin',
                value: 0,
              },
            ],
          },
        },
        {
          action_type: CategoryAction.ADD,
          category: {
            key: 'withdrawal_time',
            options: [
              {
                key: 'withdrawal_time_3',
                title: 'Bitcoin',
                value: 0,
              },
            ],
          },
        },
      ],
    },
  },
  {
    status: 1,
    data: {
      message:
        'I have updated your settlement layer to Bitcoin. Please let me know if you need any further adjustments or have additional requests!',
      is_clear: false,
      actions: [
        {
          action_type: CategoryAction.UPDATE,
          category: {
            key: 'hardware',
            options: [
              {
                key: '32g',
                title: 'Bitcoin',
                value: 0,
              },
            ],
          },
        },
      ],
    },
  },
  {
    status: 1,
    data: {
      message:
        'I have updated your settlement layer to Bitcoin. Please let me know if you need any further adjustments or have additional requests!',
      is_clear: false,
      actions: [
        {
          action_type: CategoryAction.REMOVE,
          category: {
            key: 'hardware',
            options: [
              {
                key: '32g',
                title: 'Bitcoin',
                value: 0,
              },
            ],
          },
        },
      ],
    },
  },
];

export const mockupPromptResponsesV2: string[] = [
  "To improve the performance of your blockchain, you might want to consider upgrading your hardware configuration for better RAM and CPU capabilities. Additionally, implementing scaling solutions, particularly focusing on more advanced rollup technologies, can significantly enhance transaction throughput and efficiency. \nHere’s a recommendation for you based on these factors:\n```json{'network': ['mainnet'],'hardware': ['32g'],'layers': ['layer2'],'block_gas_limit': ['2m'],'storage': ['polygon'],'withdrawal_time': ['withdrawal_time_3'],'bridge_apps': ['btc_bridge', 'eth_bridge'],'tools': ['explorer'],'settlement': ['bitcoin']}```\nThis configuration includes an upgrade to 32 GB of RAM, adjustments to the scaling solution, and an increase in the block gas limit to facilitate higher throughput. Please let me know if you would like any other specific adjustments or have further questions!",
];
