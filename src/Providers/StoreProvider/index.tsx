'use client';

import { AppStore, persistor, store } from '@/stores';
import useAnimationStore from '@/stores/useAnimationStore';
import React, { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';

// import useBootstrapApp from '@/hooks/useBootstrapApp';

dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

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
