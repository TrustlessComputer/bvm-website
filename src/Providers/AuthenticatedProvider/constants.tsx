import { createContext } from 'react';

import type { AuthenticatedActionsContext } from './types';

export const authenticatedInContext =
  createContext<AuthenticatedActionsContext>({} as AuthenticatedActionsContext);
