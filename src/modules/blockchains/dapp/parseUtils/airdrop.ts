import { IAirdrop, IAirdropTask } from '@/services/api/dapp/airdrop/interface';
import { IToken } from '@/services/api/dapp/token_generation/interface';
import { store } from '@/stores';
import dayjs from 'dayjs';
import stc from 'string-to-color';
import { DappType } from '../types';
import { getAirdropTaskKey } from '../utils';
import { compareString } from '@/utils/string';

export const parseAirdrop = (airdrop: IAirdrop, _token: IToken) => {
  const dappState = store.getState().dapp;

  const tokens = dappState.tokens;
  const airdropTasks = dappState.airdropTasks;

  const result = {} as DappModel;

  result.id = DappType.airdrop;
  result.key = DappType.airdrop;
  result.title = 'Token for Airdrop';
  result.icon =
    'https://storage.googleapis.com/bvm-network/icons-tool/icon-issue-a-token.svg';
  result.order = 1;
  result.color = stc(airdrop.token_address);

  const baseBlock: BlockModel = {} as BlockModel;

  baseBlock.key = 'token_info';
  baseBlock.title = airdrop.title;
  baseBlock.icon =
    'https://storage.googleapis.com/bvm-network/icons-tool/icon-issue-a-token.svg';
  baseBlock.placableAmount = -1;
  baseBlock.section = 'information';
  baseBlock.preview = true;
  baseBlock.fields = [
    {
      key: 'airdrop_title',
      title: 'Title',
      type: 'input',
      icon: '',
      value: airdrop.title,
      tooltip: '',
      options: [],
    },
    {
      key: 'reward_token',
      title: 'Token',
      type: 'dropdown',
      icon: '',
      value: airdrop.token_address,
      tooltip: '',
      options: [
        {
          key: _token?.symbol as any,
          title: _token?.symbol as any,
          value: _token?.contract_address as any,
          icon: (_token?.image_url || '') as any,
          tooltip: '',
          type: '',
          options: [],
        },
      ],
    },
    {
      key: 'airdrop_amount',
      title: 'Reward',
      type: 'input',
      icon: '',
      value: airdrop.amount,
      tooltip: '',
      options: [],
    },
    {
      key: 'start_date',
      title: 'Start date',
      previewTitle: 'Start',
      type: 'datetime',
      icon: '',
      value: dayjs(airdrop.start_time).format('YYYY-MM-DDTHH:mm'),
      tooltip: '',
      options: [],
    },
    {
      key: 'end_date',
      title: 'End date',
      previewTitle: 'End',
      type: 'datetime',
      icon: '',
      value: dayjs(airdrop.end_time).format('YYYY-MM-DDTHH:mm'),
      tooltip: '',
      options: [],
    },
  ];

  if (airdrop.is_bvm_shard) {
    baseBlock.fields.push({
      key: 'is_bvm_shard',
      title: 'Shared Holder',
      type: 'extends',
      icon: '',
      value: 1,
      tooltip: '',
      options: [],
      disabled: true,
    });
  }

  result.baseBlock = baseBlock;
  const blockFields: BlockModel[] = [];
  for (const task of airdrop.tasks as IAirdropTask[]) {
    const fields: FieldModel[] = [
      {
        key: 'task',
        title: task.type,
        type: 'input',
        icon: '',
        value: task.title,
        tooltip: '',
        options: [],
      },
      {
        key: 'reward_amount',
        title: 'Reward',
        type: 'input',
        icon: '',
        value: task.amount,
        tooltip: '',
        options: [],
      },
    ];

    if (compareString(task.type, 'follow')) {
      fields.push({
        key: getAirdropTaskKey(task),
        title: 'X Username',
        type: 'input',
        icon: '',
        value: (task as any)[getAirdropTaskKey(task)],
        tooltip: '',
        options: [],
      });
    } else if (compareString(task.type, 'share')) {
      fields.push({
        key: getAirdropTaskKey(task),
        title: 'Link Share X',
        type: 'input',
        icon: '',
        value: (task as any)[getAirdropTaskKey(task)],
        tooltip: '',
        options: [],
      });
    }

    const _task: BlockModel = {
      key: getAirdropTaskKey(task),
      title: 'For tasks',
      icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
      placableAmount: -1,
      section: 'tasks',
      preview: true,
      fields: fields,
    };
    console.log('_task', _task);

    blockFields.push(_task);
  }

  result.blockFields = blockFields;

  return result;
};
