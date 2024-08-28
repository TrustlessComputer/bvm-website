import { IWhitePaper } from '@/services/api/dapp/whitePapers/interface';

export const parseWhitePapers = (whitePapers: IWhitePaper[]): any[] => {
  const result: any[] = [];

  for (const whitePaper of whitePapers) {
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
        baseBlock: {
          key: '',
          title: `${whitePaper.token?.symbol} White Paper`,
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
              value: whitePaper.token.contract_address,
              tooltip: '',
              options: [
                {
                  key: whitePaper.token?.symbol as any,
                  title: whitePaper.token?.symbol as any,
                  value: whitePaper.token?.contract_address as any,
                  icon: (whitePaper.token?.image_url || '') as any,
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
          title: 'View',
          actionMapperID: `${whitePaper.id}`,
          tokenInfo: whitePaper,
        } as any
      }
    );
  }

  return result;
}
