import { DappModel } from '@types/customize-model';
import { IYoloGame } from '@/services/api/dapp/yolo/interface';

export const parseYoloGames = (games: IYoloGame[]): DappModel[] => {
  const result: DappModel[] = [];
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
          status: '',
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
              title: 'Settlement Token',
              type: 'dropdown',
              icon: '',
              value: game.settlement_token.contract_address,
              tooltip: '',
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
              title: 'Value Per Entry',
              inputType: 'number',
              type: 'input',
              icon: '',
              value: game.value_per_entry,
              tooltip: 'Number of token per entry',
              placeholder: 'eg. 1000',
              options: [],
              background: '#C44127',
            },
            {
              key: 'round_duration',
              title: 'Round Duration',
              inputType: 'number',
              type: 'input',
              icon: '',
              value: game.round_duration,
              tooltip: 'Round duration in second',
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
              tooltip: 'Maximum participants per round',
              placeholder: 'eg. 500',
              options: [],
              background: '#0d2dd0',
            },
            {
              key: 'protocol_fee_ratio',
              title: 'Protocol Fee Ratio',
              inputType: 'number',
              type: 'input',
              icon: '',
              value: game.protocol_fee_ratio,
              tooltip: 'Protocol Fee Ratio',
              placeholder: 'eg. 0.1',
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
