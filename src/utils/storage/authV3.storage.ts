import storage from '@/utils/storage/local';

interface AccessToken {
  accessToken: string;
  refreshToken: string;
  tcAddress: string;
}

class AuthV3Storage {
  public static AUTH_KEY_V3 = 'AUTH_KEY_V3';

  public static getTokenKey(tcAddress: string) {
    return `${this.AUTH_KEY_V3}-${tcAddress.toLowerCase()}`;
  }
  public static getToken(tcAddress: string): AccessToken | undefined {
    const key = this.getTokenKey(tcAddress);
    const data = storage.get(key) as AccessToken | undefined;
    return data;
  }

  public static setToken(token: AccessToken) {
    const key = this.getTokenKey(token.tcAddress);
    storage.setString(key, JSON.stringify(token));
  }
  public static removeToken(tcAddress: string) {
    const key = this.getTokenKey(tcAddress);
    storage.remove(key);
  }
}

export default AuthV3Storage;
