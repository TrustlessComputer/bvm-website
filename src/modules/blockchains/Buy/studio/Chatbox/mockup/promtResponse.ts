import { CategoryAction, SendPromptResponse } from '../types';

export const mockupPromptResponses: SendPromptResponse[] = [
  {
    message:
      'I have updated your settlement layer to Bitcoin. Please let me know if you need any further adjustments or have additional requests!',
    is_clear: false,
    actions: [
      {
        action_type: CategoryAction.ADD,
        category: {
          layer: 'settlement',
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
  {
    message:
      'I have updated your settlement layer to Bitcoin. Please let me know if you need any further adjustments or have additional requests!',
    is_clear: false,
    actions: [
      {
        action_type: CategoryAction.ADD,
        category: {
          layer: 'hardware',
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
  {
    message:
      'I have updated your settlement layer to Bitcoin. Please let me know if you need any further adjustments or have additional requests!',
    is_clear: false,
    actions: [
      {
        action_type: CategoryAction.UPDATE,
        category: {
          layer: 'hardware',
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
  {
    message:
      'I have updated your settlement layer to Bitcoin. Please let me know if you need any further adjustments or have additional requests!',
    is_clear: false,
    actions: [
      {
        action_type: CategoryAction.REMOVE,
        category: {
          layer: 'hardware',
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
];
