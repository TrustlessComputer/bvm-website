import { ISTToken } from '@/services/api/dapp/staking/interface';
import BigNumberJS from 'bignumber.js';
import { DappType } from '../types';

export const parseStakingPools = (pools: ISTToken[]): DappModel[] => {
  const result: DappModel[] = [];
  for (const item of pools) {
    const isRunout = Number(item.balance) <= 1;
    result.push({
      id: DappType.staking,
      key: DappType.staking,
      title: 'Staking',
      icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-staking.svg',
      order: 2,
      color: '#24704D',
      created_at: '2021-09-14T09:00:00.000Z',
      updated_at: '2021-09-14T09:00:00.000Z',
      tooltip: '',
      label: isRunout
        ? {
            title: 'Run out',
            color: '#000',
            background: '#FF4747',
            status: '',
          }
        : {
            title: 'Deployed',
            color: '#000',
            background: '#00AA6C',
            status: '',
          },
      sections: [
        {
          key: 'information',
          icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-staking.svg',
          title: 'Staking Pool',
          tooltip: '',
          required: true,
        },
      ],
      baseBlock: {
        key: 'token_info',
        title:
          'Pool ' +
          (item.principle_token?.symbol || '-') +
          '/' +
          (item.reward_token?.symbol || '-'),
        icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-staking.svg',
        placableAmount: -1,
        section: 'information',
        preview: true,
        fields: [
          {
            key: 'staking_token',
            title: 'Staking Token',
            type: 'dropdown',
            icon: '',
            value: item.principle_token_address,
            tooltip: '',
            options: [
              {
                key: item.principle_token?.symbol,
                title: item.principle_token?.symbol,
                value: item.principle_token?.contract_address,
                icon: item.principle_token?.image_url || '',
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
            value: item.reward_token_address,
            tooltip: '',
            options: [
              {
                key: item.reward_token?.symbol,
                title: item.reward_token?.symbol,
                value: item.reward_token?.contract_address,
                icon: item.reward_token?.image_url || '',
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
            value: `${1 / Number(item.token_rate)}`,
            tooltip: 'Exchange rate between staking token and reward token.',
            placeholder: 'eg. 1',
            options: [],
          },
          {
            key: 'apr',
            title: 'APR',
            type: 'input',
            icon: '',
            value:
              new BigNumberJS(item?.interest_rate || '0.2')
                .times(100)
                .toString() + '%',
            tooltip: '',
            placeholder: 'eg. 20%',
            options: [],
          },
          {
            key: 'amount',
            title: 'Reward pool',
            type: 'input',
            icon: '',
            value: item.balance,
            tooltip: '',
            placeholder: 'eg. 100,000',
            options: [],
          },
        ],
      },
    });
  }
  return result;
};
