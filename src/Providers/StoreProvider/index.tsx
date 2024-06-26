'use client';

import AppLoading from '@/components/AppLoading';
import { AppStore, persistor, store } from '@/stores';
import { Center } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import useAnimationStore from '@/stores/useAnimationStore';

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

  const { fontLoaded } = useAnimationStore();
  useEffect(() => {
    document.fonts.ready.then(fontLoaded);
  }, []);

  return (
    <Provider store={storeRef.current as any}>
      <PersistGate loading={<></>} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
