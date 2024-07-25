export const dappMockupData: DappModel[] = [
  {
    id: 'account_abstraction_generation',
    key: 'account_abstraction_generation',
    title: 'Account Abstraction Generation',
    icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
    order: 1,
    color: '#F76649',
    created_at: '2021-09-14T09:00:00.000Z',
    updated_at: '2021-09-14T09:00:00.000Z',
    tooltip: '',
    sections: [
      {
        key: 'account_abstraction',
        icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
        title: 'Account Abstraction',
        tooltip: 'Account Abstraction information',
        required: true,
      },
    ],
    baseBlock: {
      key: 'account_abstraction_base_block',
      title: 'Account Abstraction',
      icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
      placableAmount: -1,
      section: 'account_abstraction',
      fields: [
        {
          key: 'address',
          title: 'Address',
          type: 'input',
          icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
          value: '',
          tooltip: '',
          options: [],
        },
        {
          key: 'fee_rate',
          title: 'Fee Rate',
          type: 'input',
          icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
          value: '',
          tooltip: '',
          options: [],
        },
      ],
    },
  },
];

// <baseIndex>-<type>-<fieldKey>-<level>-<index>-<blockKey>
export const dappTemplateFormMockupData = {
  dappKey: 'token_generation',
  fieldValue: {
    '0-base-token_name-0': 'BVM',
    '0-base-token_symbol-0': 'BVM',
    '0-base-token_supply-0': '1000000000',
    '0-block-name-0-0-allocation': 'Airdrop',
    '0-block-total_amount-0-0-allocation': '300000',
    '0-block-address-0-0-allocation': '0x1234',
    '0-block-is_vesting-0-0-allocation': true,
    '0-block-cliff_unit-1-0-allocation': '0',
    '0-block-cliff-1-0-allocation': '10',
    '0-block-duration_unit-1-0-allocation': '0',
    '0-block-duration-1-0-allocation': '10',

    '1-base-token_name-0': 'Meme',
    '1-base-token_symbol-0': 'MEM',
    '1-base-token_supply-0': '100000000000000',
    '1-block-name-0-0-allocation': 'Airdrop',
    '1-block-total_amount-0-0-allocation': '100000000000000',
    '1-block-address-0-0-allocation': '0x1231',
    '1-block-is_vesting-0-0-allocation': false,
  },
};
