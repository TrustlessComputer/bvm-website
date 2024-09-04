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
