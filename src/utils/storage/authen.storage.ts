import storage from '@/utils/storage/local';

class AuthenStorage {
  private static STORAGE_KEY = 'TWITTER_TOKEN';

  public static getAuthenKey = () => storage.get(this.STORAGE_KEY) || '';
  public static setAuthenKey = (token: string) => storage.set(this.STORAGE_KEY, token || '');
}

export default AuthenStorage
