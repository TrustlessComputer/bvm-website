import { IYoloGame } from '@/services/api/dapp/yolo/interface';
import BigNumberJS from 'bignumber.js';

export const parseYoloGames = (games: IYoloGame[]): any[] => {
  const result: any[] = [];
  for (const game of games) {
    result.push(
      {
        id: 'yologame',
        key: 'yologame',
        title: 'YOLO',
        icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-yolo.svg',
        order: 5,
        color: '#F76649',
        created_at: '2021-09-14T09:00:00.000Z',
        updated_at: '2021-09-14T09:00:00.000Z',
        tooltip: '',
        label: {
          title: 'Running',
          color: '#000',
          background: '#00AA6C',
          status: 'Running', // run
          actionID: game.id,
        },
        sections: [
          {
            key: 'yolo',
            icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
            title: 'YOLO',
            tooltip: '',
            required: true,
          },
        ],
        baseBlock: {
          key: '',
          title: `YOLO Game #${game.id}`,
          icon: '',
          placableAmount: -1,
          section: 'yolo',
          preview: false,
          fields: [
            {
              key: 'settlement_token',
              title: 'Payment Token',
              type: 'dropdown',
              icon: '',
              value: game.settlement_token.contract_address,
              tooltip: 'Specify the currency to be used for payments in the game.',
              options: [
                {
                  key: game.settlement_token?.symbol as any,
                  title: game.settlement_token?.symbol as any,
                  value: game.settlement_token?.contract_address as any,
                  icon: (game.settlement_token?.image_url || '') as any,
                  tooltip: '',
                  type: '',
                  options: [],
                },
              ],
              background: '#A041FF',
            },
            {
              key: 'value_per_entry',
              title: 'Entry Cost (Tokens per Ticket)',
              inputType: 'number',
              type: 'input',
              icon: '',
              value: game.value_per_entry,
              tooltip: 'Enter the number of tokens required for each ticket/entry.',
              placeholder: 'eg. 1000',
              options: [],
              background: '#C44127',
            },
            {
              key: 'round_duration',
              title: 'Round Duration (Seconds)',
              inputType: 'number',
              type: 'input',
              icon: '',
              value: game.round_duration,
              tooltip: 'Set the duration of each round in seconds.',
              placeholder: 'eg. 300',
              options: [],
              background: '#00AA6C',
            },
            {
              key: 'maximum_participants',
              title: 'Maximum Participants',
              inputType: 'number',
              type: 'input',
              icon: '',
              value: game.maximum_number_of_participants_per_round,
              tooltip: 'Enter the maximum number of participants allowed per round.',
              placeholder: 'eg. 500',
              options: [],
              background: '#0d2dd0',
            },
            {
              key: 'protocol_fee_ratio',
              title: 'Creator Fee (%)',
              inputType: 'number',
              type: 'input',
              icon: '',
              value: new BigNumberJS(game.protocol_fee_ratio).multipliedBy(100).toString(),
              tooltip: 'Specify the percentage of the fee that will be paid to the creators.',
              placeholder: 'eg. 10',
              options: [],
              background: '#C44127',
            },
          ],
        },
      }
    );
  }

  return result;
}
