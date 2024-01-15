"use client"

import React, { PropsWithChildren, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { getError } from '@/utils/error';

export interface IUnisatContext {
  onConnect: () => Promise<unknown>;
}

const initialValue: IUnisatContext = {
  onConnect: () => new Promise<unknown>(() => undefined),
};

export const UnisatContext = React.createContext<IUnisatContext>(initialValue);

export const UnisatProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {

  const checkUnisatInstalled = () => {
    const installed = !!(window as any)?.unisat;
    if (!installed) {
      window.open('https://unisat.io/download', '_blank');
    }
    return installed;
  };

  const onConnect = async () => {
    try {
      const unisat = (window as any)?.unisat;
      const installed = checkUnisatInstalled();
      if (!installed) return;
      await unisat.requestAccounts();
    } catch (error) {
      const { message } = getError(error);
      toast.error(message);
    }
  };


  const contextValues = useMemo((): IUnisatContext => {
    return {
      onConnect,
    };
  }, [onConnect]);

  return (
    <UnisatContext.Provider value={contextValues}>
      {children}
    </UnisatContext.Provider>
  );
};
