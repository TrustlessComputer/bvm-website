import storage from '@/utils/storage/local';
import AuthenStorage from '@/utils/storage/authen.storage';

class TimeChainStorage {
  private static AIRDROP_TIME_CHAIN_CLICKED = 'AIRDROP_TIME_CHAIN_CLICKED';

  public static getKeyTimeChainClicked = () => 'TIME_CHAIN_' + AuthenStorage.getAuthenKey();
  public static getTimeChainClicked = () => !!storage.get(TimeChainStorage.getKeyTimeChainClicked());
  public static setTimeChainClicked = () => {
    const authenKey = AuthenStorage.getAuthenKey();
    if (!authenKey) return;
    storage.set(TimeChainStorage.getKeyTimeChainClicked(), 'true')
  };
}

export default TimeChainStorage
