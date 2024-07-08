import { IDappItem } from '@/stores/states/l2services/types';

export const DAPP_INSTALLED_LIST: IDappItem[] = [
  {
    id: 'Install New Dapp',
    desc: '',
    isInstallNewDapps: true,
    name: 'Install new apps',
    iconUrl: '/icons/add_dapp_ic.svg',
  },
  {
    id: 'Trustless Bridge',
    desc: '',
    isInstallNewDapps: false,
    name: 'Trustless Bridge',
    iconUrl: '/icons/dapp_trustless_bridge_ic.svg',
  },
];
