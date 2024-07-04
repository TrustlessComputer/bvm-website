export type IDappDetail = {
  name: string;
  desc: string;
  iconUrl: string;
  isHide?: boolean;
  canInstall?: boolean;
};

export const DAPPS_LIST: IDappDetail[] = [
  {
    name: 'Trustless Bridge',
    desc: 'Trustless Bridge Description',
    iconUrl: '/icons/dapp_trustless_bridge_ic.svg',
    canInstall: false,
    isHide: true,
  },
  {
    name: 'Account Abstraction',
    desc: 'Account Abstraction Description',
    iconUrl: '/icons/dapp_trustless_bridge_ic.svg',
    canInstall: true,
    isHide: false,
  },
  {
    name: 'DEX',
    desc: 'DEX Description',
    iconUrl: '/icons/dapp_trustless_bridge_ic.svg',
    canInstall: true,
    isHide: false,
  },
  {
    name: 'DAO',
    desc: 'DAO Description',
    iconUrl: '/icons/dapp_trustless_bridge_ic.svg',
    canInstall: true,
    isHide: false,
  },
].filter((item) => !item.isHide);
