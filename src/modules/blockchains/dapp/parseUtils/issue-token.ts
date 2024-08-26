import {
  IToken,
  ITokenVesting,
} from '@/services/api/dapp/token_generation/interface';
import { DappType } from '@/modules/blockchains/dapp/types';
import { formatCurrency } from '@utils/format';
import { BlockModel, DappModel, FieldModel } from '@/types/customize-model';

export const parseIssuedToken = (token: IToken) => {
  const result = {} as DappModel;

  result.id = DappType.token_generation;
  result.key = DappType.token_generation;
  result.title = 'Token Generation';
  result.icon =
    'https://storage.googleapis.com/bvm-network/icons-tool/icon-issue-a-token.svg';
  result.order = 1;
  result.color = '#24704D';
  result.label = {
    title: 'Deployed',
    color: '#000',
    background: '#00AA6C',
    status: 'deployed', // run
    actionID: token?.contract_address,
  };

  const baseBlock: BlockModel = {} as BlockModel;
  baseBlock.key = 'token_info';
  baseBlock.title = `${token.symbol}`;
  baseBlock.icon =
    token.image_url ||
    'https://storage.googleapis.com/bvm-network/icons-tool/icon-issue-a-token.svg';
  baseBlock.placableAmount = -1;
  baseBlock.section = 'information';
  baseBlock.preview = true;
  baseBlock.fields = [
    {
      key: 'token_name',
      title: 'Token Name',
      type: 'input',
      icon: '',
      value: token.name as string,
      tooltip: '',
      options: [],
    },
    {
      key: 'token_symbol',
      title: 'Symbol',
      type: 'input',
      icon: '',
      value: token.symbol as string,
      tooltip: '',
      options: [],
    },
    {
      key: 'token_supply',
      title: 'Total Supply',
      type: 'input',
      icon: '',
      value: formatCurrency(token.total_supply as string, 0, 2, 'BTC', true),
      tooltip: '',
      options: [],
    },
  ];

  result.baseBlock = baseBlock;

  const isFoundation =
    token.vestings?.length === 1 &&
    token.vestings.findIndex((v) => v.beneficiary_name === 'Foundation') >= 0;

  if (isFoundation) {
    baseBlock.fields.push({
      key: 'receiver_address',
      title: 'Receiver Address',
      type: 'input',
      icon: '',
      value: (token?.vestings?.[0] as any).beneficiary as string,
      tooltip: '',
      options: [],
    });
  } else {
    const blockFields: BlockModel[] = [];

    for (const vesting of token.vestings as ITokenVesting[]) {
      const allocation: BlockModel = {
        key: 'allocation',
        title: 'Allocation',
        icon: '/icons-tool/issue-a-token/icon-allocation.svg',
        placableAmount: -1,
        section: 'tokenomics',
        preview: true,
        background: '#00AA6C',
        fields: [
          {
            key: 'name',
            title: 'Name',
            type: 'input',
            icon: '',
            value: vesting.beneficiary_name as string,
            tooltip: '',
            options: [],
            background: '#00AA6C',
          },
          {
            key: 'total_amount',
            title: 'Amount',
            type: 'input',
            icon: '',
            value: formatCurrency(
              (Number(vesting.amount_total) > 0
                ? vesting.amount_total
                : vesting.unvest_amount) as string,
              0,
              2,
              'BTC',
              true,
            ),
            tooltip: '',
            options: [],
            background: '#00AA6C',
          },
        ],
      };

      const childrenFields: FieldModel[] = [];
      childrenFields.push({
        key: 'address',
        title: 'Receiver Address',
        type: 'input',
        icon: '',
        value: vesting.beneficiary as string,
        tooltip: '',
        options: [],
        background: '#00AA6C',
      } as FieldModel);

      if (Number(vesting.amount_total) > 0) {
        childrenFields.push({
          key: 'is_vesting',
          title: 'Vesting?',
          type: 'extends',
          icon: '',
          value: 1,
          tooltip: '',
          options: [
            {
              key: 'cliff',
              title: 'Cliff',
              value: '',
              icon: '',
              tooltip: '',
              type: 'group',
              options: [
                {
                  key: 'cliff_unit',
                  title: 'Time',
                  value: vesting.cliff_units?.toString() || '0',
                  icon: '',
                  tooltip: '',
                  type: 'dropdown',
                  level: 1,
                  options: [
                    {
                      key: 'day',
                      title: 'Day',
                      value: '0',
                      icon: '',
                      tooltip: '',
                      type: '',
                      options: [],
                    },
                    {
                      key: 'week',
                      title: 'Week',
                      value: '1',
                      icon: '',
                      tooltip: '',
                      type: '',
                      options: [],
                    },
                    {
                      key: 'month',
                      title: 'Month',
                      value: '2',
                      icon: '',
                      tooltip: '',
                      type: '',
                      options: [],
                    },
                  ],
                },
                {
                  key: 'cliff',
                  title: 'Amount',
                  value: vesting.cliff as number,
                  icon: '',
                  tooltip: '',
                  type: 'input',
                  options: [],
                  level: 1,
                },
              ],
            },
            {
              key: 'duration',
              title: 'Duration',
              value: '',
              icon: '',
              tooltip: '',
              type: 'group',
              options: [
                {
                  key: 'duration_unit',
                  title: 'Time',
                  value: vesting.duration_units?.toString() || '0',
                  icon: '',
                  tooltip: '',
                  type: 'dropdown',
                  level: 1,
                  options: [
                    {
                      key: 'day',
                      title: 'Day',
                      value: '0',
                      icon: '',
                      tooltip: '',
                      type: '',
                      options: [],
                    },
                    {
                      key: 'week',
                      title: 'Week',
                      value: '1',
                      icon: '',
                      tooltip: '',
                      type: '',
                      options: [],
                    },
                    {
                      key: 'month',
                      title: 'Month',
                      value: '2',
                      icon: '',
                      tooltip: '',
                      type: '',
                      options: [],
                    },
                  ],
                },
                {
                  key: 'duration',
                  title: 'Amount',
                  value: vesting.duration as number,
                  icon: '',
                  tooltip: '',
                  type: 'input',
                  options: [],
                  level: 1,
                },
              ],
            },
          ],
        });
      }

      allocation.childrenFields = childrenFields;

      blockFields.push(allocation);
    }

    result.blockFields = blockFields;
  }

  return result;
};
