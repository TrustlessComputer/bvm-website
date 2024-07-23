export const dappMockupData: DappModel[] = [
  {
    id: 'class',
    key: 'class',
    title: 'Class',
    icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
    order: 1,
    color: '#F76649',
    created_at: '2021-09-14T09:00:00.000Z',
    updated_at: '2021-09-14T09:00:00.000Z',
    tooltip: '',
    baseBlock: {
      key: 'class',
      title: 'Token Generation',
      icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
      placableAmount: -1,
      fields: [
        {
          key: 'name',
          title: 'Token Name',
          type: 'input',
          icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
          value: '',
          tooltip: '',
          options: [],
        },
        {
          key: 'symbol',
          title: 'Symbol',
          type: 'input',
          icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
          value: '',
          tooltip: '',
          options: [],
        },
        {
          key: 'total_supply',
          title: 'Total Supply',
          type: 'input',
          icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
          value: '',
          tooltip: '',
          options: [],
        },
      ],
    },
    blockFields: [
      {
        key: 'tokenomics',
        title: 'Tokenomics',
        icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
        placableAmount: -1,
        fields: [
          {
            key: 'name',
            title: 'Name',
            type: 'input',
            icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
            value: '',
            tooltip: '',
            options: [],
          },
          {
            key: 'amount',
            title: 'Amount',
            type: 'input',
            icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
            value: '',
            tooltip: '',
            options: [],
          },
          {
            key: 'receiver_address',
            title: 'Receiver Address',
            type: 'input',
            icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
            value: '',
            tooltip: '',
            options: [],
          },
          {
            key: 'vesting',
            title: 'Vesting?',
            type: 'extends',
            icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
            value: 0,
            tooltip: '',
            options: [
              {
                key: 'cliff',
                title: 'Cliff',
                value: '',
                icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
                tooltip: '',
                type: 'group',
                options: [
                  {
                    key: 'timeCliff',
                    title: 'Time',
                    value: 'day',
                    icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
                    tooltip: '',
                    type: 'dropdown',
                    options: [
                      {
                        key: 'day',
                        title: 'Day',
                        value: 'day',
                        icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
                        tooltip: '',
                        type: '',
                        options: [],
                      },
                      {
                        key: 'week',
                        title: 'Week',
                        value: 'week',
                        icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
                        tooltip: '',
                        type: '',
                        options: [],
                      },
                      {
                        key: 'month',
                        title: 'Month',
                        value: 'month',
                        icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
                        tooltip: '',
                        type: '',
                        options: [],
                      },
                    ],
                  },
                  {
                    key: 'amountCliff',
                    title: 'Amount',
                    value: '',
                    icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
                    tooltip: '',
                    type: 'input',
                    options: [],
                  },
                ],
              },
              {
                key: 'duration',
                title: 'Duration',
                value: '',
                icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
                tooltip: '',
                type: 'group',
                options: [
                  {
                    key: 'timeDuration',
                    title: 'Time',
                    value: 'day',
                    icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
                    tooltip: '',
                    type: 'dropdown',
                    options: [
                      {
                        key: 'day',
                        title: 'Day',
                        value: 'day',
                        icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
                        tooltip: '',
                        type: '',
                        options: [],
                      },
                      {
                        key: 'week',
                        title: 'Week',
                        value: 'week',
                        icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
                        tooltip: '',
                        type: '',
                        options: [],
                      },
                      {
                        key: 'month',
                        title: 'Month',
                        value: 'month',
                        icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
                        tooltip: '',
                        type: '',
                        options: [],
                      },
                    ],
                  },
                  {
                    key: 'amountDuration',
                    title: 'Amount',
                    value: '',
                    icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
                    tooltip: '',
                    type: 'input',
                    options: [],
                  },
                ],
              },
              // {
              //   key: 'amount',
              //   title: 'Amount',
              //   value: '',
              //   icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
              //   tooltip: '',
              //   type: 'input',
              //   options: [],
              // },
              // {
              //   key: 'marks',
              //   title: 'Marks',
              //   value: 0,
              //   icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
              //   tooltip: '',
              //   type: 'extends',
              //   options: [
              //     {
              //       key: 'math',
              //       title: 'Math',
              //       value: '',
              //       icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
              //       tooltip: '',
              //       type: 'input',
              //       options: [],
              //     },
              //     {
              //       key: 'english',
              //       title: 'English',
              //       value: '',
              //       icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
              //       tooltip: '',
              //       type: 'input',
              //       options: [],
              //     },
              //   ],
              // },
            ],
          },
        ],
      },
    ],
    singleFields: [
      {
        key: 'color',
        title: 'Color',
        icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
        placableAmount: -1,
        fields: [
          {
            key: 'color',
            title: 'Color',
            type: 'input',
            icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
            value: '',
            tooltip: '',
            options: [],
          },
        ],
      },
    ],
  },
  {
    id: 'staking',
    key: 'staking',
    title: 'Staking',
    icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
    order: 2,
    color: '#F76649',
    created_at: '2021-09-14T09:00:00.000Z',
    updated_at: '2021-09-14T09:00:00.000Z',
    tooltip: '',
    baseBlock: {
      key: 'class',
      title: 'Create a Staking Pool',
      icon: '',
      fields: [
        {
          key: 'staking_token',
          title: 'Staking Token',
          type: 'dropdown',
          icon: '',
          value: 'math',
          tooltip: '',
          options: [
            {
              key: 'eth',
              title: 'ETH', // symbol
              value: '0x1234', // contract_address
              icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg', // image_url
              tooltip: '',
              type: '',
              options: [],
            },
          ],
        },
        {
          key: 'reward_token',
          title: 'Reward Token',
          type: 'dropdown',
          icon: '',
          value: 'math',
          tooltip: '',
          options: [
            {
              key: 'eth',
              title: 'ETH', // symbol
              value: '0x1234', // contract_address
              icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg', // image_url
              tooltip: '',
              type: '',
              options: [],
            },
          ],
        },
        {
          key: 'rate',
          title: 'Rate',
          type: 'input',
          icon: '',
          value: '',
          tooltip: '',
          options: [],
        },
        {
          key: 'apr',
          title: 'APR',
          type: 'input',
          icon: '',
          value: '',
          tooltip: '',
          options: [],
        },
      ],
    },
  },
  {
    id: 'airdrop',
    key: 'airdrop',
    title: 'Airdrop',
    icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
    order: 2,
    color: '#F76649',
    created_at: '2021-09-14T09:00:00.000Z',
    updated_at: '2021-09-14T09:00:00.000Z',
    tooltip: '',
    baseBlock: {
      key: 'class',
      title: 'Token for Airdrop',
      icon: '',
      placableAmount: -1,
      fields: [
        {
          key: 'reward_token',
          title: 'Reward Token',
          type: 'dropdown',
          icon: '',
          value: 'math',
          tooltip: '',
          options: [
            {
              key: 'eth',
              title: 'ETH', // symbol
              value: '0x1234', // contract_address
              icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg', // image_url
              tooltip: '',
              type: '',
              options: [],
            },
          ],
        },
        {
          key: 'airdrop_amount',
          title: 'Amount',
          type: 'input',
          icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
          value: '',
          tooltip: '',
          options: [],
        },
      ],
    },
    blockFields: [
      {
        key: 'airdrop_staking',
        title: 'For staking',
        icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
        placableAmount: -1,
        fields: [
          {
            key: 'token',
            title: 'Token',
            type: 'dropdown',
            icon: '',
            value: 'token',
            tooltip: '',
            options: [
              {
                key: 'eth',
                title: 'ETH', // symbol
                value: '0x1234', // contract_address
                icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg', // image_url
                tooltip: '',
                type: '',
                options: [],
              },
            ],
          },
          {
            key: 'required_amount',
            title: 'Require Amount',
            type: 'input',
            icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
            value: '',
            tooltip: '',
            options: [],
          },
          {
            key: 'reward_amount',
            title: 'Reward Amount',
            type: 'input',
            icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
            value: '',
            tooltip: '',
            options: [],
          },
        ],
      },
      {
        key: 'airdrop_holding',
        title: 'For holding',
        icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
        placableAmount: -1,
        fields: [
          {
            key: 'token',
            title: 'Token',
            type: 'dropdown',
            icon: '',
            value: 'token',
            tooltip: '',
            options: [
              {
                key: 'eth',
                title: 'ETH', // symbol
                value: '0x1234', // contract_address
                icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg', // image_url
                tooltip: '',
                type: '',
                options: [],
              },
            ],
          },
          {
            key: 'required_amount',
            title: 'Require Amount',
            type: 'input',
            icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
            value: '',
            tooltip: '',
            options: [],
          },
          {
            key: 'reward_amount',
            title: 'Reward Amount',
            type: 'input',
            icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
            value: '',
            tooltip: '',
            options: [],
          },
        ],
      },
      {
        key: 'airdrop_tasks',
        title: 'For tasks',
        icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
        placableAmount: -1,
        fields: [
          {
            key: 'task',
            title: 'Task',
            type: 'dropdown',
            icon: '',
            value: 'task',
            tooltip: '',
            options: [
              {
                key: 'refer',
                title: 'Refer a friend to join IDO', // symbol
                value: 'refer', // contract_address
                icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg', // image_url
                tooltip:
                  'Spread the love to your friends, team, and communities.',
                type: '',
                options: [],
              },
              {
                key: 'spread_on_x',
                title: 'Publish a tweet mentioning', // symbol
                value: 'spread_on_x', // contract_address
                icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg', // image_url
                tooltip: 'Publish a tweet mentioning',
                type: '',
                options: [],
              },
              {
                key: 'like_on_x',
                title: `Like and retweet Twitter' pinned tweet`, // symbol
                value: 'like_on_x', // contract_address
                icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg', // image_url
                tooltip: `Like and retweet Twitter' pinned tweet`,
                type: '',
                options: [],
              },
            ],
          },
          {
            key: 'reward_amount',
            title: 'Reward Amount',
            type: 'input',
            icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
            value: '',
            tooltip: '',
            options: [],
          },
        ],
      },
    ],
  },
];
