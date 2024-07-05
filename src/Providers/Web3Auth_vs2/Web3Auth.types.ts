import { UserInfo } from '@web3auth/base';
import { Dispatch, SetStateAction } from 'react';

// ---------------------------------------------------
// Define Methods
// ---------------------------------------------------
export type IWeb3AuthActions = {
  init?: () => Promise<any>;
  login: () => Promise<any>;
  logout: () => Promise<any>;

  getWeb3AuthUserInfor?: () => Promise<Partial<UserInfo>>;
};

// ---------------------------------------------------
// Define Props
// ---------------------------------------------------
export type IWeb3AuthProps = {
  userInfo?: Partial<UserInfo> | undefined;
  loggedIn?: boolean;
  l2ServiceAccessToken?: string;
};

// Context
export type IWeb3AuthContext = IWeb3AuthActions & IWeb3AuthProps;
