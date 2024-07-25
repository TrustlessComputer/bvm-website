'use client';

import RollupsDappPage from './page';
import useFetchDapp from '@/modules/blockchains/dapp/hooks/useFetchDapp';

export default () => {
  useFetchDapp();
  return <RollupsDappPage />;
};
