import { useAppSelector } from '@/stores/hooks';
import { dappSelector } from '@/stores/states/dapp/selector';
import React, { useEffect } from 'react';

const useFetchDapp = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const dappState = useAppSelector(dappSelector);

  useEffect(() => {
    if (!dappState.loading && !loading) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [dappState.loading, loading]);

  return {
    loading: dappState.loading || loading,
    configs: dappState.configs,
    loaded,
  };
};

export default useFetchDapp;
