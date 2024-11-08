import { IModelCategory } from '@/types/customize-model';

export const ACCOUNT_ABSTRACTION_MOCKUP_DATA: IModelCategory[] = [
  {
    id: '668f8ec088f822fe3ebd3477',
    created_at: '2024-07-11T07:50:24.179Z',
    updated_at: '0001-01-01T00:00:00Z',
    key: 'input_apps',
    title: 'Account Abstraction',
    required: true,
    tooltip: '',
    options: [
      {
        key: 'input_apps_address',
        title: 'Token contract address',
        value: 0,
        valueStr: '',
        selectable: true,
        priceUSD: 0,
        priceBVM: 0,
        tooltip: 'The token that users can use to pay for gas fees.',
        supportNetwork: 'both',
        icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-address.svg',
        logo: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-address.svg',
        setupLogo: '',
        needContactUs: false,
        needConfig: false,
        order: 0,
        appTemplateUrl: '',
        requiredFor: null,
        supportLayer: '',
        disabled: false,
        type: 'text',
        keyDapp: '',
      },
      {
        key: 'input_apps_fee_rate',
        title: 'Number of tokens per gas',
        value: 1,
        valueStr: '',
        selectable: true,
        priceUSD: 0,
        priceBVM: 0,
        tooltip:
          'For example, if you input 0.05 tokens per gas, a regular transfer transaction (21,000 gas) would require 1.05 tokens.',
        supportNetwork: 'both',
        icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-gas.svg',
        logo: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-gas.svg',
        setupLogo: '',
        needContactUs: false,
        needConfig: false,
        order: 0,
        appTemplateUrl: '',
        requiredFor: null,
        supportLayer: '',
        disabled: false,
        type: 'number',
        keyDapp: '',
      },
    ],
    color: '#F76649',
    type: 'form',
    disable: false,
    hidden: false,
    multiChoice: true,
    confuseWord: true,
    confuseIcon:
      'https://storage.googleapis.com/bvm-network/icons-tool/icon-bridge-confused.svg',
    confuseTitle: '',
    updatable: true,
    whitelistAddress: null,
    order: 0,
    isChain: false,
  },
];
