import type { Wallet } from 'ethers';

export type UserProfile = {
  address: string;
  auth_challenge: string;
  created_at: string;
  email: string;
  fcm_token: string;
  id: string;
  last_seen: string;
  name: string;
  profile_image: string;
  social_type: string;
  twitter_username: string;
  updated_at: string;
  verified_follow: boolean;
  verifier_id: string;
};

export interface AuthState {
  wallet: Wallet | undefined;
  address: string | undefined;
  isAutoReconnecting: boolean;
  userInfo?: UserProfile;
  walletBalance?: string | undefined;
  isLogged: boolean;
}

export interface AuthenticatedActionsContext {
  login: () => void;
  logout: () => void;
  getPlayerInfo: () => void;
}

export type AuthenticatedDataContext = AuthState;

export type AIModelMethods = {
  deployAIModel?: () => Promise<void>;
  evaluateAIModel?: () => Promise<void>;
};

export type AuthenticatedContext = AuthenticatedActionsContext &
  AuthenticatedDataContext &
  AIModelMethods;
