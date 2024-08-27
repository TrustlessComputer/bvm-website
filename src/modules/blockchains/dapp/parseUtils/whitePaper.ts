import { IYoloGame } from '@/services/api/dapp/yolo/interface';
import BigNumberJS from 'bignumber.js';

export const parseWhitePapers = (games: IYoloGame[]): any[] => {
  const result: any[] = [];
  for (const game of games) {
    result.push(
      {
        id: 'whitepaper',
        key: 'whitepaper',
        title: 'White Paper',
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
          actionID: game.id,
        },
        sections: [
          {
            key: 'information',
            icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
            title: 'YOLO',
            tooltip: '',
            required: true,
          },
        ],
        baseBlock: {
          key: '',
          title: `White Paper #${game.id}`,
          icon: '',
          placableAmount: -1,
          section: 'information',
          preview: false,
          fields: [
            {
              key: 'settlement_token',
              title: 'Token',
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
          ],
        },
        action: {
          title: 'Download Template',
          actionMapperID: `0`,
          tokenInfo: null,
        } as any
      }
    );
  }

  return result;
}
