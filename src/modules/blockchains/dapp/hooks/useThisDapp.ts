import React from 'react';
import useDappsStore from '@/modules/blockchains/dapp/stores/useDappStore';

export const useThisDapp = () => {
  const { dapps, currentIndexDapp } = useDappsStore();

  return React.useMemo(() => {
    return dapps[currentIndexDapp];
  }, [dapps, currentIndexDapp]);
};
