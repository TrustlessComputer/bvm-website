/* eslint-disable @typescript-eslint/no-explicit-any */
import { STORAGE_KEYS } from '@/constants/storage-key';
import LocalStorage from '@/libs/localStorage';
import { decryptAES, encryptAES } from '@/utils/encryption';

class WalletStorage {
  ACCOUNT_KEY = 'ACCOUNT_CIPHER_TEXT';

  ADDRESS_KEY = STORAGE_KEYS.USER_ADDRESS;

  PASS_WORD = 'NUMBER_STORAGE_L2';

  ACCOUNT_KEY_OLD = 'ACCOUNT_CIPHER_TEXT_STORAGE';

  getAccountKey = () => this.ACCOUNT_KEY;

  getAccountCipher = () => {
    const key = this.getAccountKey();
    const cipherText = LocalStorage.getItem(key as any);
    return cipherText;
  };

  getAccount = (password: string) => {
    const cipherText = this.getAccountCipher();
    if (cipherText) {
      const prvKey = decryptAES(cipherText, password);
      return prvKey;
    }
    return undefined;
  };

  setAccount = ({ prvKey, password }: { prvKey: string; password: string }) => {
    const key = this.getAccountKey();
    const cipherText = encryptAES({
      value: prvKey,
      pass: password,
    });
    LocalStorage.setItem(key as any, cipherText);
  };

  getAddressKey = () => this.ADDRESS_KEY;

  getAddress = () => {
    const key = this.getAddressKey();
    const address = LocalStorage.getItem(key as any);
    return address;
  };

  setAddress = ({ address }: { address: string }) => {
    const key = this.getAddressKey();
    LocalStorage.setItem(key as any, address);
  };

  getPassWordKey = () => this.PASS_WORD;

  getPassWord = () => {
    const key = this.getPassWordKey();
    const password = LocalStorage.getItem(key as any);
    return password;
  };

  setPassWord = ({ password }: { password: string }) => {
    const key = this.getPassWordKey();
    LocalStorage.setItem(key as any, `${password}`);
  };

  clearStorage = () => {
    LocalStorage.removeItem(this.ACCOUNT_KEY as any);
    LocalStorage.removeItem(this.ADDRESS_KEY as any);
    LocalStorage.removeItem(this.PASS_WORD as any);
  };
}

const walletStorage = new WalletStorage();

export default walletStorage;
