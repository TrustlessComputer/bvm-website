import { isDevelopment, isProduction } from '@/utils/commons';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import { persistCombineReducers, persistStore } from 'redux-persist';
import { getPersistConfig } from 'redux-deep-persist';
import persistLocalStorage from 'redux-persist/lib/storage';
// import logger from 'redux-logger';

const reducers = combineReducers(reducer);

const persistConfig = getPersistConfig({
  key: 'root',
  storage: persistLocalStorage,
  whitelist: [
    'common.poolTabIndex',
    'common.coinPrices',
    'airdrop',
    'user',
    'activities.numberReport',
    'common.publicSaleSummary',
    'stakingV2.stakeUser',
    'stakingV2.memberCount',
    'stakingV2.stakingPercent',
    'launchpad',
    'lpEAIPayment',
  ],
  rootReducer: reducers,
});

const persistedReducer = persistCombineReducers(persistConfig, reducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    devTools: isDevelopment(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }).concat(isProduction() ? [] : []),
  });
};

export const store = makeStore();

// DEBUG State change Redux (instead of redux-logger...)

// const unsubscribe = store.subscribe(() =>
//   console.log('State after dispatch: ', store.getState()),
// );
// unsubscribe()

export const persistor = persistStore(store);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
