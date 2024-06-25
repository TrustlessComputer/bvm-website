'use client';

import { createContext, useContext } from 'react';
import { DashboardProps } from '../Dashboard.types';

export const DashboardContext = createContext<DashboardProps>({});

export const useDashboard = (): DashboardProps => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      'DashboardContext not found, useDashboard must be used within the DashboardContext.Provider',
    );
  }
  return context;
};
