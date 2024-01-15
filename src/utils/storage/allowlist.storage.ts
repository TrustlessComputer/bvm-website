import storage from '@/utils/storage/local';
import { WalletType } from '@/interfaces/wallet';

interface IStorageItem {
  address: string,
  pubKey: string,
  walletType: WalletType;
}

class AllowListStorage {
  private static STORAGE_KEY = 'ALLOW_LIST_STORAGE';

  public static getStorage = () => {
    const data = storage.get(this.STORAGE_KEY);
    if (data) {
      return JSON.parse(data as string)
    }
    return data
  };
  public static setStorage = (payload: IStorageItem) => storage.set(this.STORAGE_KEY, JSON.stringify(payload));
}

export default AllowListStorage
