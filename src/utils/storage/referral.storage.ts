import storage from '@/utils/storage/local';

class ReferralStorage {
  private static STORAGE_KEY = 'REFERRAL_CODE';
  private static STORAGE_KEY_MODULAR = 'REFERRAL_MODULAR';

  public static getReferralCode = () => storage.get(this.STORAGE_KEY) || '';
  public static setReferralCode = (code: string) => {
    const storageCode = ReferralStorage.getReferralCode();
    if (!!storageCode) return;
    storage.set(this.STORAGE_KEY, code || '');
  };

  public static getReferralModular = () =>
    storage.get(this.STORAGE_KEY_MODULAR) || '';
  public static setReferralModular = (code: string) => {
    const storageCode = ReferralStorage.getReferralModular();
    if (!!storageCode) return;
    storage.set(this.STORAGE_KEY_MODULAR, code || '');
  };
}

export default ReferralStorage;
