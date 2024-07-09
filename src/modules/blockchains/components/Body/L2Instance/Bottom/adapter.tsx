import { IDappInstalled } from '@/stores/states/l2services/types';

export const AdapterDappInstalled = (dappInstalled: IDappInstalled) => {
  return {
    id: dappInstalled.appID,
    desc: dappInstalled.appDescription,
    isInstallNewDapps: false,
    name: dappInstalled.appName,
    iconUrl: dappInstalled.appImageURL || '/icons/add_dapp_ic.svg',
  };
};
