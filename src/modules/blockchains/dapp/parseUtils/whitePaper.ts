import { IYoloGame } from '@/services/api/dapp/yolo/interface';

export const parseWhitePapers = (games: IYoloGame[]): any[] => {
  const result: any[] = [];
  for (const game of games) {
    result.push(
      {
        id: 'white_paper',
        key: 'white_paper',
        title: 'White Paper',
        icon: 'https://storage.googleapis.com/bvm-network/image/ic-whitepaper.svg',
        order: 5,
        color: '#F76649',
        created_at: '2021-09-14T09:00:00.000Z',
        updated_at: '2021-09-14T09:00:00.000Z',
        tooltip: '',
        label: {
          title: 'New',
          color: '#000',
          background: '#00AA6C',
          status: '',
        },
        sections: [
          {
            key: 'information',
            icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
            title: 'Information',
            tooltip: '',
            required: false,
          },
        ],
        // baseModuleFields: [
        //   {
        //     key: 'token',
        //     title: 'Token',
        //     icon: '',
        //     placableAmount: -1,
        //     section: 'information',
        //     preview: false,
        //     background: '#A041FF',
        //     fields: [
        //       {
        //         key: 'bvm',
        //         title: 'BVM', // symbol
        //         value: '0x08b4e0434c42d9bfeeba468324ee5e2a23cd4222', // contract_address
        //         icon: 'https://cdn.bvm.network/internal/8c50c936-cb41-40d0-8d93-8cdf7f88bd37.svg', // image_url
        //         tooltip: '',
        //         type: '',
        //         options: [],
        //         selectable: true,
        //       },
        //     ],
        //   },
        // ],
        baseBlock: {
          key: '',
          title: 'Create a White Paper',
          icon: 'https://storage.googleapis.com/bvm-network/image/ic-whitepaper.svg',
          placableAmount: -1,
          section: '',
          preview: false,
          fields: [
            {
              key: 'token',
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
            {
              key: 'download',
              title: 'Download',
              inputType: '',
              type: 'button',
              icon: '',
              value: '',
              tooltip: '',
              placeholder: '',
              options: [],
              background: '#00AA6C',
              action: {
                title: 'Download Template',
                actionMapperID: `${game.id}`,
                tokenInfo: game.settlement_token,
              } as any
            },
          ],
        },
      }
    );
  }

  return result;
}
