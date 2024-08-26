export const KEY_TWITTER_TOKEN = 'twitter_token';

export const UUID = 'uuid';
export const BACKUP_PRV_KEY = 'BACKUP_PRV_KEY';
export const KEY_TWITTER_USERNAME = 'twitter_username';

export const KEY_VC_TYPE = 'vc_type';
export const KEY_WALLET_ID = 'wallet_id';
export const LOCAL_VERSION = '2';

export enum STORAGE_KEYS {
  WEB3_AUTH_TOKEN = 'WEB3_AUTH_TOKEN',
  USER_REFERRAL_CODE = 'user_referral_code',
  AIRDROP_STAGE = 'air-drop-stage',

  USER_ADDRESS = 'user-address',
  USER_INFO = 'user-info',

  FCM_TOKEN = 'fcm_token',
  SHOW_NOTIFICATION = 'showed_notification',

  API_ACCESS_TOKEN = 'API_ACCESS_TOKEN',
  L2_SERVICE_ACCESS_TOKEN_V2 = 'L2_SERVICE_ACCESS_TOKEN_V2',
  L2_SERVICE_USER_ADDRESS = 'L2_SERVICE_USER_ADDRESS',

  LAST_NODES = `${LOCAL_VERSION}-last_nodes`,
  USE_DRAG_SIGNALS = `${LOCAL_VERSION}-use_drag_signals`,
  USE_SIGNALS_FORM = `${LOCAL_VERSION}-use_signals_form`,
  USE_BLOCKCHAIN_FORM = `${LOCAL_VERSION}-use_blockchain_form`,
}
