import { ILaunchpadContext } from '@/Providers/LaunchpadProvider/types';
import React, { PropsWithChildren, useMemo, useState } from 'react';
import { IPublicSaleDepositInfo } from '@/interfaces/vc';

const initialValue: ILaunchpadContext = {
  launchpadSummary: undefined,
  setCurrentLaunchpadSummary:(_:IPublicSaleDepositInfo) => {}
};

export const LaunchpadContext = React.createContext<ILaunchpadContext>(initialValue);

export const LaunchpadProvider: React.FC<PropsWithChildren> = ({children}: PropsWithChildren): React.ReactElement => {
  const [launchpadSummary, setLaunchpadSummary] = useState<IPublicSaleDepositInfo>();

  const setCurrentLaunchpadSummary = (summary: IPublicSaleDepositInfo) => {
    setLaunchpadSummary(summary);
  }

  const values: ILaunchpadContext = useMemo(() => {
    return {
      launchpadSummary,
      setCurrentLaunchpadSummary
    };
  }, []);

  return (
    <LaunchpadContext.Provider value={values}>
      {children}
    </LaunchpadContext.Provider>
  )
}
