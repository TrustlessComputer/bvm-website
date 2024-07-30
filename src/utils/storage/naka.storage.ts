'use client';

const NAKA_WALLET_AUTHEN = 'NAKA_WALLET_AUTHEN';
const ADDRESS_STORAGE = 'NAKA_ADDRESS_STORAGE';

class NakaUserStorage {
  public static getWalletToken = () => global?.window?.localStorage.getItem(NAKA_WALLET_AUTHEN) || '';
  public static setWalletToken = (token: string) =>
    global?.window?.localStorage.setItem(NAKA_WALLET_AUTHEN, token || '');
  public static removeWalletToken = () =>
    global?.window?.localStorage.removeItem(NAKA_WALLET_AUTHEN);

  public static getUserAddress = () => global?.window?.localStorage.getItem(ADDRESS_STORAGE) || '';
  public static setUserAddress = (address: string) =>
    global?.window?.localStorage.setItem(ADDRESS_STORAGE, address || '');
  public static removeUserAddress = () =>
    global?.window?.localStorage.removeItem(ADDRESS_STORAGE);
}

export default NakaUserStorage;
