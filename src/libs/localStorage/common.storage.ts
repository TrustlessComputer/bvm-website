/* eslint-disable @typescript-eslint/no-explicit-any */
import LocalStorage from '@/libs/localStorage';

class CommonStorage {
  IS_FIRST_OPEN_APP = 'IS_FIRST_OPEN_APP';

  FORCE_OPEN_LOGIN = 'FORCE_OPEN_LOGIN';

  getFirstTimeOpenAppKey = () => this.IS_FIRST_OPEN_APP;

  getForceOpenLoginKey = () => this.FORCE_OPEN_LOGIN;

  setAlreadyUseApp = () => {
    const key = this.getFirstTimeOpenAppKey();
    LocalStorage.setItem(key as any, false);
  };

  getFirstTimeOpenApp = () => {
    const key = this.getFirstTimeOpenAppKey();
    const isFirstTimeOpenApp = LocalStorage.getItem(key as any) as boolean;
    return isFirstTimeOpenApp == null;
  };

  setAlreadyForceLogin = () => {
    const key = this.getForceOpenLoginKey();
    LocalStorage.setItem(key as any, true);
  };

  getForceLogin = () => {
    const key = this.getForceOpenLoginKey();
    const data = LocalStorage.getItem(key as any) as boolean;
    return data;
  };
}

const commonStorage = new CommonStorage();

export default commonStorage;
