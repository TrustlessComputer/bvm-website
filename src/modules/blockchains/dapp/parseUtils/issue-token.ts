import { IToken, ITokenVesting } from '@/services/api/dapp/token_generation/interface';
import { DappType } from '@/modules/blockchains/dapp/types';

export const parseIssuedToken = (token: IToken) => {
  const result = {} as DappModel;

  result.id = DappType.token_generation;
  result.key = DappType.token_generation;
  result.title = 'Token Generation';
  result.icon = 'https://storage.googleapis.com/bvm-network/icons-tool/icon-issue-a-token.svg';
  result.order = 1;
  result.color = '#24704D';
  result.label = {
    title: 'Deployed',
    color: '#000',
    background: '#00AA6C',
    status: 'deployed',
    actionID: token?.contract_address
  };

  const baseBlock: BlockModel = {} as BlockModel;
  baseBlock.key = 'token_info';
  baseBlock.title = `Token ${token.symbol}`;
  baseBlock.icon = 'https://storage.googleapis.com/bvm-network/icons-tool/icon-issue-a-token.svg';
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
      value: token.total_supply as string,
      tooltip: '',
      options: [],
    },
  ];

  result.baseBlock = baseBlock;

  const blockFields: BlockModel[] = [];

  for (const vesting of token.vestings as ITokenVesting[]) {
    const allocation: BlockModel = {
      key: 'allocation',
      title: 'Allocation',
      icon: '/icons-tool/issue-a-token/icon-allocation.svg',
      placableAmount: -1,
      section: 'tokenomics',
      preview: true,
      fields: [
        {
          key: 'name',
          title: 'Name',
          type: 'input',
          icon: '',
          value: vesting.beneficiary_name as string,
          tooltip: '',
          options: [],
        },
        {
          key: 'total_amount',
          title: 'Amount',
          type: 'input',
          icon: '',
          value: (Number(vesting.amount_total) > 0 ? vesting.amount_total : vesting.unvest_amount) as string,
          tooltip: '',
          options: [],
        },
        {
          key: 'address',
          title: 'Receiver Address',
          type: 'input',
          icon: '',
          value: vesting.beneficiary as string,
          tooltip: '',
          options: [],
        },
        {
          key: 'is_vesting',
          title: 'Vesting?',
          type: 'extends',
          icon: '',
          value: Number(vesting.unvest_amount) > 0 ? 0 : 1,
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
        },
      ],
    };

    blockFields.push(allocation);
  }

  result.blockFields = blockFields;

  return result;
}
