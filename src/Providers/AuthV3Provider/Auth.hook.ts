'use client';

import { useContext } from 'react';
import { AuthContext } from './Auth.context';
import { IAuthContext } from './Auth.type';

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'AuthContext not found, useAuth must be used within the AuthProvider',
    );
  }
  return context;
};
