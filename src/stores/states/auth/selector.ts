import type { Wallet } from 'ethers';

import type { AuthState } from './types';
import { RootState } from '@/stores';
import { UserProfile } from '@/services/api/auth/types';

export const authSelector = (state: RootState): AuthState => state.auth;

export const authWalletSelector = (state: RootState): Wallet | undefined =>
  state.auth.wallet;

export const authUserInfoSelector = (
  state: RootState,
): UserProfile | undefined => state.auth.userInfo;

export const authAddressSelector = (state: RootState): string | undefined =>
  state.auth.address;

export const authIsAutoReconnectingSelector = (state: RootState): boolean =>
  state.auth.isAutoReconnecting;

export const authWalletBalanceSelector = (
  state: RootState,
): string | undefined => state.auth.walletBalance;
