import { useContext } from 'react';
import {
  ILaunchpadContext,
  LaunchpadContext,
} from '@/Providers/LaunchpadProvider';

export function useLaunchpadContext(): ILaunchpadContext {
  const ctx = useContext(LaunchpadContext);

  return ctx;
}
