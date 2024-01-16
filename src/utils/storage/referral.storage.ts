import storage from '@/utils/storage/local';

class ReferralStorage {
  private static STORAGE_KEY = 'REFERRAL_CODE';

  public static getReferralCode = () => storage.get(this.STORAGE_KEY) || '';
  public static setReferralCode = (code: string) => {
    const storageCode = ReferralStorage.getReferralCode();
    if (!!storageCode) return;
    storage.set(this.STORAGE_KEY, code || '')
  };
}

export default ReferralStorage
