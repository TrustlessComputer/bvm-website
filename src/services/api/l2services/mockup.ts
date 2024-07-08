import { IDappItem } from '@/stores/states/l2services/types';

export const DAPPS_LIST: IDappItem[] = [
  {
    id: '1',
    name: 'Trustless Bridge',
    desc: 'Trustless Bridge Description',
    iconUrl: '/icons/dapp_trustless_bridge_ic.svg',
    canInstall: false,
    isHide: true,
  },
  {
    id: '2',
    name: 'Account Abstraction',
    desc: 'Account Abstraction Description',
    iconUrl: '/icons/dapp_trustless_bridge_ic.svg',
    canInstall: true,
    isHide: false,
  },
  {
    id: '3',
    name: 'DEX',
    desc: 'DEX Description',
    iconUrl: '/icons/dapp_trustless_bridge_ic.svg',
    canInstall: true,
    isHide: false,
  },
  {
    id: '4',
    name: 'DAO',
    desc: 'DAO Description',
    iconUrl: '/icons/dapp_trustless_bridge_ic.svg',
    canInstall: true,
    isHide: false,
  },
];
