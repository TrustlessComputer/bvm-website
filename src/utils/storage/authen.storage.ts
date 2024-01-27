import storage from '@/utils/storage/local';

class AuthenStorage {
  private static STORAGE_KEY = 'TWITTER_TOKEN';
  private static STORAGE_KEY_GUEST_SECRET_KEY = 'STORAGE_KEY_GUEST_SECRET_KEY';
  private static STORAGE_KEY_GUEST_TOKEN = 'STORAGE_KEY_GUEST_TOKEN';

  public static getAuthenKey = () => storage.get(this.STORAGE_KEY) || '';
  public static setAuthenKey = (token: string) =>
    storage.set(this.STORAGE_KEY, token || '');
  //GUEST MODE
  public static getGuestAuthenKey = (): string =>
    storage.get(this.STORAGE_KEY_GUEST_TOKEN) as string;
  public static setGuestAuthenKey = (token: string) =>
    storage.set(this.STORAGE_KEY_GUEST_TOKEN, token || '');
  public static getGuestSecretKey = (): string =>
    storage.get(this.STORAGE_KEY_GUEST_SECRET_KEY) as string;
  public static setGuestSecretKey = (secret_code: string) =>
    storage.set(this.STORAGE_KEY_GUEST_SECRET_KEY, secret_code || '');
}

export default AuthenStorage;
