import { RootState } from '@/stores';
import { createSelector } from 'reselect';

export const dappSelector = (state: RootState) => state.dapp;

export const isInstalledIssueTokenSelector = createSelector(dappSelector, (dapp) => {
  return !dapp?.chain?.dApps?.find((item) => item?.appName === 'create_token');
});
