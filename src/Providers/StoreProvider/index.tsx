'use client';

import { AppStore, store } from '@/stores';
import React, { useRef } from 'react';
import { Provider } from 'react-redux';

// import useBootstrapApp from '@/hooks/useBootstrapApp';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // useBootstrapApp();
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store;
  }

  return <Provider store={storeRef.current as any}>{children}</Provider>;
}
