import { WalletType } from '@/stores/states/dapp/types';
import { StatusBox } from '../../Buy/component4/CustomNode/DappTemplateNode';

export const parseWalletType = (walletType: WalletType): any[] => {
  let selected = {};
  switch (walletType) {
    case WalletType.inGame:
      selected = {
        key: WalletType.inGame,
        value: 'In Game', // contract_address
      };
      break;
    case WalletType.naka:
      selected = {
        key: WalletType.naka,
        value: 'Naka Wallet', // contract_address
      };
      break;
    case WalletType.thirdWeb:
      selected = {
        key: WalletType.thirdWeb,
        value: 'ThirdWeb Wallet', // contract_address
      };
      break;
    case WalletType.unisat:
      selected = {
        key: WalletType.unisat,
        value: 'Unisat Wallet', // contract_address
      }
  }

  const result: any[] = [
    {
      id: 'wallet_type',
      key: 'wallet_type',
      title: 'Wallet',
      icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-yolo.svg',
      order: 5,
      color: '#F76649',
      created_at: '2021-09-14T09:00:00.000Z',
      updated_at: '2021-09-14T09:00:00.000Z',
      tooltip: '',
      label: {
        title: 'Installed',
        color: '#000',
        background: '#00AA6C',
        status: StatusBox.INSTALLED,
      },
      sections: [
        {
          key: 'wallet_information',
          icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
          title: 'WalletInformation',
          tooltip: '',
          required: false,
        },
      ],
      baseModuleFields: [
        {
          key: 'wallet_type',
          title: '',
          icon: '',
          placableAmount: 1,
          section: 'wallet_information',
          preview: false,
          background: '#A041FF',
          fields: [],
        },
      ],
      baseBlock: {
        key: '',
        title: 'Wallet Type',
        icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-yolo.svg',
        placableAmount: -1,
        section: '',
        preview: false,
        fields: [
          {
            title: '',
            tooltip: '',
            type: 'input',
            options: [],
            selectable: true,
            ...selected,
          },
        ],
      },
    },
  ];

  return result;
};
