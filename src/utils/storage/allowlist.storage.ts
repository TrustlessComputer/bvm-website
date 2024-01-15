import storage from '@/utils/storage/local';
import { WalletType } from '@/interfaces/wallet';
import { compareString } from '@/utils/string';

interface IStorageItem {
  address: string,
  pubKey: string,
  walletType: WalletType;
}

class AllowListStorage {
  private static STORAGE_KEY = 'ALLOW_LIST_STORAGE_0.0.1';

  public static getStorage = (): IStorageItem[] | undefined => {
    try {
      const data = storage.get(this.STORAGE_KEY);
      if (data) {
        return JSON.parse(data as string) as IStorageItem[]
      }
      return undefined
    } catch (e) {
      return undefined
    }
  };
  public static setStorage = (payload: IStorageItem) => {
    try {
      const data = AllowListStorage.getStorage();
      if (!data) {
        storage.set(this.STORAGE_KEY, JSON.stringify([payload]));
        return;
      }
      if (!data.some(item => compareString(item.address, payload.address))) {
        data.push(payload)
      }
      storage.set(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.log('setStorage error: ', error);
    }
  };
}

export default AllowListStorage
