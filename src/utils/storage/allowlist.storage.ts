import storage from '@/utils/storage/local';
import { WalletType } from '@/interfaces/wallet';

interface IStorageItem {
  address: string,
  pubKey: string,
  walletType: WalletType;
}

class AllowListStorage {
  private static STORAGE_KEY = 'ALLOW_LIST_STORAGE';

  public static getStorage = (): IStorageItem[] | undefined => {
    const data = storage.get(this.STORAGE_KEY);
    if (data) {
      return JSON.parse(data as string) as IStorageItem[]
    }
    return undefined
  };
  public static setStorage = (payload: IStorageItem) => {
    try {
      const data = AllowListStorage.getStorage();
      if (!data) {
        storage.set(this.STORAGE_KEY, JSON.stringify([payload]));
        return;
      }
      storage.set(this.STORAGE_KEY, JSON.stringify(data.push(payload)));
    } catch (error) {
      console.log('setStorage error: ', error);
    }
  };
}

export default AllowListStorage
