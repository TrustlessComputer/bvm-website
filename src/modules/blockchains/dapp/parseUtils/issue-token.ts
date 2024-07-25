import { IToken, ITokenVesting } from '@/services/api/dapp/token_generation/interface';

export const parseIssuedToken = (token: IToken) => {
  const result = {} as DappModel;

  console.log('parseIssueToken', token)

  result.id = 'token_generation';
  result.key = 'token_generation';
  result.title = 'Token Generation';
  result.icon = 'https://storage.googleapis.com/bvm-network/icons-tool/icon-issue-a-token.svg';
  result.order = 1;
  result.color = '#F76649';

  const baseBlock: BlockModel = {} as BlockModel;
  baseBlock.key = 'token_info';
  baseBlock.title = 'Token Information';
  baseBlock.icon = 'https://storage.googleapis.com/bvm-network/icons-tool/icon-issue-a-token.svg';
  baseBlock.placableAmount = -1;
  baseBlock.section = 'information';
  baseBlock.preview = true;
  baseBlock.fields = [
    {
      key: 'token_name',
      title: token.name as string,
      type: 'input',
      icon: '',
      value: '',
      tooltip: '',
      options: [],
    },
    {
      key: 'token_symbol',
      title: token.symbol as string,
      type: 'input',
      icon: '',
      value: '',
      tooltip: '',
      options: [],
    },
    {
      key: 'token_supply',
      title: token.total_supply as string,
      type: 'input',
      icon: '',
      value: '',
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
          value: vesting.beneficiary as string,
          tooltip: '',
          options: [],
        },
        {
          key: 'total_amount',
          title: 'Amount',
          type: 'input',
          icon: '',
          value: vesting.amount_total as string,
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
                  value: vesting.duration_units as number,
                  icon: '',
                  tooltip: '',
                  type: 'dropdown',
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
                  value: vesting.duration as number,
                  icon: '',
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
              icon: '',
              tooltip: '',
              type: 'group',
              options: [
                {
                  key: 'duration_unit',
                  title: 'Time',
                  value: vesting.duration_units as number,
                  icon: '',
                  tooltip: '',
                  type: 'dropdown',
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
