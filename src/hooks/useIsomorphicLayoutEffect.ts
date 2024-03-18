'use client';

import React, { useEffect } from 'react';

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : useEffect;
