import { useAppDispatch } from '@/stores/hooks';
import React, { PropsWithChildren, createContext } from 'react';
import { AuthContextInit, IAuthContext } from './Auth.type';

export const AuthContext = createContext<IAuthContext>(AuthContextInit);

export const AuthProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const dispatch = useAppDispatch();

  const values = {};

  // console.log('[DEBUG] Provider ALL DATA: ', values);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
