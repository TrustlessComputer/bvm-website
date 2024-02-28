import { UserProfile } from '@/services/api/auth/types';
import type { UserInfo } from '@web3auth/base';
import type { Wallet } from 'ethers';

export interface AuthState {
  wallet: Wallet | undefined;
  address: string | undefined;
  isAutoReconnecting: boolean;
  userInfo?: UserProfile;
  walletBalance?: string | undefined;
  isLogged: boolean;
}
