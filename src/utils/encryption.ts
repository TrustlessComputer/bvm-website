import * as CryptoJS from 'crypto-js';

class ErrorHelper extends Error {
  message: string;
  constructor(message: string) {
    super();
    this.message = `${message || ''}` || '';
  }
  getMessage() {
    return this.message;
  }
}

const doubleHash = (key: string) => {
  const hash = CryptoJS.SHA256(key);
  return CryptoJS.SHA256(hash).toString();
};

const decryptAES = (cipherText: string, key: string, isDoubleHash = true) => {
  const password = isDoubleHash ? doubleHash(key?.toString()) : key?.toString();
  const decrypted = CryptoJS.AES.decrypt(cipherText, password);
  if (decrypted) {
    try {
      const str = decrypted.toString(CryptoJS.enc.Utf8 as any);
      if (str.length > 0) {
        return str;
      }
      throw new ErrorHelper('Incorrect password.');
    } catch (e) {
      throw new ErrorHelper('Incorrect password.');
    }
  }
  throw new ErrorHelper('Incorrect password.');
};

const generateRandomString = (length = 24) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export { decryptAES, generateRandomString };
