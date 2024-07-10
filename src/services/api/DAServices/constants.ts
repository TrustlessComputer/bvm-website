import { IDApp } from './types';

export const DA_DUMMY_LIST: IDApp[] = [
  {
    id: 1,
    name: 'Token Issuing',
    code: 'create_token',
    description:
      'SHARD holders collectively make decisions and steer the direction of the BVM ecosystem. SHARD holders can propose and vote on various initiatives, including launching a marketing campaign, building a new product, or funding an ambitious Bitcoin L2 builder.',
    image_url: '/app-store/ic-create-token.svg',
    installed: 0,
    details: [
      {
        id: 3,
        network_id: 1,
        name: 'Basic',
        description:
          'For organizations who need customization and dedicated support\n\n',
        image_url: 'https://i.ibb.co/0fgnRZP/BTC.png',
        package: 'basic',
        price_usd: '0',
        price_bvm: '0',
        includes: [
          {
            name: 'Token Generation',
            valid: '1',
          },
          {
            name: 'Tokenomic',
            valid: '1',
          },
          {
            name: 'Vesting',
            valid: '1',
          },
          {
            name: 'Token info page',
            valid: '1',
          },
        ],
      },
    ],
    inputs: [],
    user_package: '',
    status: "0"
  },
  {
    id: 2,
    name: 'Staking',
    code: 'staking',
    description:
      'SHARD holders collectively make decisions and steer the direction of the BVM ecosystem. SHARD holders can propose and vote on various initiatives, including launching a marketing campaign, building a new product, or funding an ambitious Bitcoin L2 builder.',
    image_url: '/app-store/ic-staking.svg',
    installed: 0,
    details: [
      {
        id: 1,
        network_id: 2,
        name: 'Basic',
        description:
          'For organizations who need customization and dedicated support',
        image_url: 'https://i.ibb.co/0fgnRZP/BTC.png',
        package: 'basic',
        price_usd: '0',
        price_bvm: '0',
        includes: [
          {
            name: 'BVM staking',
            valid: '1',
          },
          {
            name: 'BTC staking ',
            valid: '0',
          },
          {
            name: 'ETH staking',
            valid: '0',
          },
          {
            name: 'Chain token staking',
            valid: '1',
          },
          {
            name: 'BVM staking reward',
            valid: '1',
          },
          {
            name: 'BTC staking reward',
            valid: '0',
          },
          {
            name: 'ETH staking reward',
            valid: '0',
          },
          {
            name: 'Chain token staking reward',
            valid: '1',
          },
        ],
      },
      {
        id: 2,
        network_id: 2,
        name: 'Advance',
        description:
          'For organizations who need customization and dedicated support\n\n',
        image_url: 'https://i.ibb.co/0fgnRZP/BTC.png',
        package: 'advance',
        price_usd: '99',
        price_bvm: '200',
        includes: [
          {
            name: 'BVM staking',
            valid: '1',
          },
          {
            name: 'BTC staking ',
            valid: '1',
          },
          {
            name: 'ETH staking',
            valid: '1',
          },
          {
            name: 'Chain token staking',
            valid: '1',
          },
          {
            name: 'BVM staking reward',
            valid: '1',
          },
          {
            name: 'BTC staking reward',
            valid: '1',
          },
          {
            name: 'ETH staking reward',
            valid: '1',
          },
          {
            name: 'Chain token staking reward',
            valid: '1',
          },
        ],
      },
    ],
    inputs: [],
    user_package: '',
    status: "0"
  },
  {
    id: 3,
    name: 'Account Abstraction',
    code: 'account_abstraction',
    description: 'Account Abstraction description',
    image_url:
      'https://cdn.bvm.network/internal/8c50c936-cb41-40d0-8d93-8cdf7f88bd37.svg',
    installed: 0,
    details: [
      {
        id: 0,
        network_id: 1,
        name: 'free',
        description: 'Free',
        image_url: 'https://i.ibb.co/0fgnRZP/BTC.png',
        package: 'free',
        price_usd: '0',
        price_bvm: '0',
        includes: [],
      },
    ],
    inputs: [],
    user_package: '',
    status: "0"
  },
];
