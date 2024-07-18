export const mockupData: DappModel[] = [
  {
    id: 'issue-a-token',
    key: 'issue-a-token',
    title: 'Issue a token',
    icon: '/icons-tool/icon-issue-a-token.svg',
    order: 1,
    color: '#FFD700',
    created_at: '2021-09-14T09:00:00.000Z',
    updated_at: '2021-09-14T09:00:00.000Z',
    tooltip: '',
    requiredFields: [
      {
        key: 'name',
        title: 'Name',
        type: 'input',
        tooltip: '',
      },
      {
        key: 'symbol',
        title: 'Symbol',
        type: 'input',
        tooltip: '',
      },
      {
        key: 'total-supply',
        title: 'Total Supply',
        type: 'input',
        tooltip: '',
      },
    ],
    optionalFields: {
      key: 'token-allocation',
      title: 'Token Allocation',
      fields: [
        {
          key: 'name',
          title: 'Name',
          type: 'input',
          tooltip: '',
        },
        {
          key: 'amount',
          title: 'Amount',
          type: 'input',
          tooltip: '',
        },
        {
          key: 'receiver-address',
          title: 'Receiver Address',
          type: 'input',
          tooltip: '',
        },
        {
          key: 'vesting',
          title: 'Vesting',
          type: 'extends',
          tooltip: '',
          options: [
            {
              key: 'name',
              title: 'Name',
              type: 'input',
              tooltip: '',
            },
          ],
        },
      ],
    },
  },
];
