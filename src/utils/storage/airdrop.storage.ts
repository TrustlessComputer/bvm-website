import storage from '@/utils/storage/local';
import AuthenStorage from '@/utils/storage/authen.storage';

export interface IAirdropItem {
  id: number;
  address: string;
  balance: string;
  claimed: string;
  claimeable_at: string;
}

class AirdropStorage {
  private static CONNECT_META_MASK_KEY = 'CONNECT_META_MASK';
  private static CONNECT_BITCOIN_WALLET_KEY = 'CONNECT_BITCOIN_WALLET';
  private static AIRDROP_ALPHA_USERS_KEY = 'AIRDROP_ALPHA_USERS';
  private static AIRDROP_GM_HOLDERS_KEY = 'AIRDROP_GM_HOLDERS';
  private static AIRDROP_GENERATIVE_USERS_KEY = 'AIRDROP_GENERATIVE_USERS';
  private static AIRDROP_PERCEPTRONS_HOLDERS_KEY = 'AIRDROP_PERCEPTRONS_HOLDERS';
  private static AIRDROP_TIME_CHAIN_CLICKED = 'AIRDROP_TIME_CHAIN_CLICKED';

  public static getIsConnectMetaMask = () => storage.get(this.CONNECT_META_MASK_KEY) || false;
  public static setIsConnectMetaMask = (isConnect: boolean) => storage.set(this.CONNECT_META_MASK_KEY, isConnect || '');

  public static getIsConnectBitcoinWallet = () => storage.get(this.CONNECT_BITCOIN_WALLET_KEY) || false;
  public static setIsConnectBitcoinWallet = (isConnect: boolean) => storage.set(this.CONNECT_BITCOIN_WALLET_KEY, isConnect || '');

  public static getAirdropGMHolders = () => {
    try {
      const data = storage.get(this.AIRDROP_GM_HOLDERS_KEY);
      if (data) {
        return JSON.parse(data as string) as IAirdropItem
      }
      return null
    } catch (e) {
      return null
    }
  };
  public static setAirdropGMHolders = (data: any) => storage.set(this.AIRDROP_GM_HOLDERS_KEY, data || null);

  public static getAirdropGenerativeUsers = () => {
    try {
      const data = storage.get(this.AIRDROP_GENERATIVE_USERS_KEY);
      if (data) {
        return JSON.parse(data as string) as IAirdropItem
      }
      return null
    } catch (e) {
      return null
    }
  };

  public static setAirdropGenerativeUsers = (data: any) => storage.set(this.AIRDROP_GENERATIVE_USERS_KEY, data || null);

  public static getAirdropPerceptronsHolders = () => {
    try {
      const data = storage.get(this.AIRDROP_PERCEPTRONS_HOLDERS_KEY);
      if (data) {
        return JSON.parse(data as string) as IAirdropItem
      }
      return null
    } catch (e) {
      return null
    }
  };

  public static setAirdropPerceptronsHolders = (data: any) => storage.set(this.AIRDROP_PERCEPTRONS_HOLDERS_KEY, data || null);

  public static getKeyTimeChainClicked = () => 'TIME_CHAIN_' + AuthenStorage.getAuthenKey();
  public static getTimeChainClicked = () => !!storage.get(AirdropStorage.getKeyTimeChainClicked());
  public static setTimeChainClicked = () => {
    const authenKey = AuthenStorage.getAuthenKey();
    if (!authenKey) return;
    storage.set(AirdropStorage.getKeyTimeChainClicked(), 'true')
  };
}

export default AirdropStorage
