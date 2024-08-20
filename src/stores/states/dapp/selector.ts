import { RootState } from '@/stores';
import { createSelector } from 'reselect';
import { DappState } from '@/stores/states/dapp/types';

export const dappSelector = (state: RootState) => state.dapp as DappState;

export const isInstalledIssueTokenSelector = createSelector(dappSelector, (dapp) => {
  return !dapp?.chain?.dApps?.find((item) => item?.appName === 'create_token');
});
