"use client";

import React, { createContext, PropsWithChildren, useMemo } from 'react';

export interface IAppStoreContext {

};

const initialValue: IAppStoreContext = {

}

const AppStoreContext = createContext<IAppStoreContext>(initialValue);

const AppStoreProvider: React.FC<PropsWithChildren> = ({ children}: PropsWithChildren): React.ReactElement => {
  const values = useMemo(() => {
    return {

    }
  }, []);

  return <AppStoreContext.Provider value={values}>{children}</AppStoreContext.Provider>;
}

export default AppStoreProvider;
