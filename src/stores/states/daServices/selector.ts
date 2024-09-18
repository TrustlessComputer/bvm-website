import { RootState } from '@/stores';
import { createSelector } from '@reduxjs/toolkit';

const getDaServicesSelector = (state: RootState) => state.daServices;

const getIsssueTokenListSelector = createSelector(
  getDaServicesSelector,
  (reducer) => reducer.issueTokenList,
);

export { getDaServicesSelector, getIsssueTokenListSelector };
