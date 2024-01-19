type CachesType = {
  [key: string]: any;
};

const ONE_DAY = 24 * 60 * 60 * 1000;

const Caches: CachesType = {};

const EXPIRED_TIME = {
  DEFAULT: ONE_DAY, // 1 day
  RATE_TOKENS_EXPIRED_TIME: 2 * 60 * 1000, // 5 minute,
  LIST_TOKENS_DEPOSIT: 5 * 60 * 1000, // 5 minute,
  ALL_TOKENS: ONE_DAY, //  1 day
  TOKENS_PRICE: 5 * 60 * 1000, // 5 minute,
  NETWORK_LIST: 24 * 60 * 60 * 1000, //  1 day,
  TOKEN_MULTI_CHAIN: ONE_DAY, // 1day,
};

const CACHE_KEYS = {
  RATE_TOKENS: 'RATE_TOKENS',
  LIST_TOKENS_DEPOSIT: 'LIST_TOKENS_DEPOSIT',
  ALL_TOKENS: 'ALL_TOKENS',
  TOKENS_PRICE: 'TOKENS_PRICE',
  NETWORK_LIST: 'NETWORK_LIST',
  TOKEN_MULTI_CHAIN: 'TOKEN_MULTI_CHAIN',
  COIN_LIST: 'COIN_LIST',
};

type CacheParams = {
  key: string;
  data: any;
  expiredTime: number; // miliseconds
};

const cache = (params: CacheParams) => {
  const { key, data, expiredTime } = params;
  Caches[key] = {
    data: data,
    expiredTime: new Date().getTime() + expiredTime,
  };
};

type CachePromiseParams = {
  key: string;
  promiseFunc?: any;
  expiredTime?: number; // miliseconds
};

const cachePromise = async (params: CachePromiseParams) => {
  const {
    key,
    promiseFunc,
    expiredTime = EXPIRED_TIME.RATE_TOKENS_EXPIRED_TIME,
  } = params;

  const cachedData = getCache({ key });

  // Get data from cache memory
  if (cachedData !== null && cachedData !== undefined) {
    return cachedData;
  }

  // Otherwise, get data from PromiseFunc, after => cache data from result
  const data = await promiseFunc();
  if (data) {
    cache({
      key: key,
      data: data,
      expiredTime: expiredTime,
    });
  }
  return data;
};

type GetCacheParams = {
  key: string;
};
const getCache = (params: GetCacheParams) => {
  const { key } = params;
  const cacheData = Caches[key];

  if (cacheData && cacheData.expiredTime > new Date().getTime()) {
    return cacheData.data;
  }

  return null;
};

type ClearCacheType = {
  key: string;
};
const clearCache = (params: ClearCacheType) => {
  const { key } = params;
  if (!Caches[key]) {
    return;
  }
  return delete Caches[key];
};

const clearAllCaches = () => {
  Object.keys(Caches).forEach((key) => delete Caches[key]);
};

const FUNCTIONS = {
  cache,
  cachePromise,
  getCache,
  clearCache,
  clearAllCaches,
};

export const CacheManager = {
  KEYS: CACHE_KEYS,
  EXPIRED_TIME: EXPIRED_TIME,
  ...FUNCTIONS,
};

export default CacheManager;
