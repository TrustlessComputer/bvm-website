import CTokenAirdropAPI from '@/services/api/dapp/airdrop';
import {
  EAirdropStatus,
  IAirdrop,
  IAirdropTask,
} from '@/services/api/dapp/airdrop/interface';
import { IToken } from '@/services/api/dapp/token_generation/interface';
import { BlockModel, DappModel, FieldModel } from '@/types/customize-model';
import { compareString } from '@/utils/string';
import dayjs from 'dayjs';
import stc from 'string-to-color';
import { DappType } from '../types';
import { getAirdropTaskKey } from '../utils';

const renderLabel = {
  [EAirdropStatus.new]: {
    label: 'Deposit now', //draft
    color: '#fff',
    background: 'rgb(255, 98, 0)',
    status: EAirdropStatus.new,
  },
  [EAirdropStatus.processing]: {
    label: 'Processing', // run
    color: '#fff',
    background: '#00AA6C',
    status: EAirdropStatus.processing,
  },
  [EAirdropStatus.ended]: {
    label: 'Ended', // down
    color: '#fff',
    background: 'rgba(255, 0, 0, 1)',
    status: EAirdropStatus.ended,
  },
  [EAirdropStatus.deposited]: {
    label: 'Processing', // run
    color: '#fff',
    background: '#00AA6C',
    status: EAirdropStatus.deposited,
  },
  [EAirdropStatus.expired]: {
    label: 'Expired', // down
    color: '#fff',
    background: 'rgba(255, 0, 0, 1)',
    status: 'stopped',
  },
};

export const parseAirdrop = async (airdrop: IAirdrop, _token: IToken) => {
  const api = new CTokenAirdropAPI();

  const result = {} as DappModel;

  result.id = DappType.airdrop;
  result.key = DappType.airdrop;
  result.title = 'Token for Airdrop';
  result.icon =
    'https://storage.googleapis.com/bvm-network/icons-tool/icon-issue-a-token.svg';
  result.order = 1;
  result.color = stc(airdrop.token_address);

  if (airdrop.status === EAirdropStatus.new) {
    result.action = {
      title: 'Top up reward',
      actionMapperID: `${airdrop.id}`,
      paymentAddress: airdrop.contract_address,
      tokenInfo: airdrop.token,
      paymentAmount: airdrop.amount,
    } as any;
  }

  console.log('renderLabel[airdrop.status]', renderLabel[airdrop.status]);

  result.label = {
    ...renderLabel[airdrop.status],
    title: renderLabel[airdrop.status].label,
  } as any;

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

  if (airdrop.tasks.length === 0) {
    const rs: any = await api.getListReceivers(airdrop.id as unknown as string);
    console.log('getListReceivers', rs);
    const lst = rs.rows;
    blockFields.push({
      key: 'whitelist',
      title: 'For tasks',
      icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
      placableAmount: 1,
      section: 'tasks',
      preview: false,
      fields: [
        {
          key: 'task',
          title: 'Address listxxxx',
          type: 'list',
          icon: '',
          value: '',
          tooltip: '',
          options: lst,
        },
      ],
    });
  } else {
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
        placableAmount: 1,
        section: 'tasks',
        preview: true,
        fields: fields,
      };

      blockFields.push(_task);
    }
  }

  result.blockFields = blockFields;

  return result;
};
