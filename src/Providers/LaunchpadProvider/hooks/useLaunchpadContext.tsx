import { useContext } from 'react';
import { LaunchpadContext } from '@/Providers/LaunchpadProvider';
import { ILaunchpadContext } from '@/Providers/LaunchpadProvider/types';

export function useLaunchpadContext(): ILaunchpadContext {
  const ctx = useContext(LaunchpadContext);

  return ctx;
}
