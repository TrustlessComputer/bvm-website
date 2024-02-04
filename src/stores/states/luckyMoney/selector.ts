import { RootState } from '@/stores';

export const luckyMoneySelector = (state: RootState) => state.luckyMoney;
export const lastPackageIdSelector = (state: RootState) =>
  state.luckyMoney.lastPackageId;
export const currentPackageIdSelector = (state: RootState) =>
  state.luckyMoney.currentPackageId;
