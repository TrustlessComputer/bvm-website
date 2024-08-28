import { isValidBTCTxHash, isValidERC20TxHash } from '@/utils/form-validate';
import { useParams } from 'next/navigation';
import React, { PropsWithChildren, useMemo } from 'react';

export interface IL2RollupExplorerContext {
  address: string;
  isBTCTxAddress: boolean;
  isERC20TxAddress: boolean;
}

const initialValue: IL2RollupExplorerContext = {
  address: '',
  isBTCTxAddress: false,
  isERC20TxAddress: false,
};

export const L2RollupExplorerContext =
  React.createContext<IL2RollupExplorerContext>(initialValue);

export const L2RollupExplorerProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const params = useParams();

  const address = useMemo(() => params?.id as string, [params]);

  const isBTCTxAddress = useMemo(() => isValidBTCTxHash(address), [address]);
  const isERC20TxAddress = useMemo(
    () => isValidERC20TxHash(address),
    [address],
  );

  const contextValues = React.useMemo((): IL2RollupExplorerContext => {
    return { address, isBTCTxAddress, isERC20TxAddress };
  }, [address, isBTCTxAddress, isERC20TxAddress]);

  return (
    <L2RollupExplorerContext.Provider value={contextValues}>
      {children}
    </L2RollupExplorerContext.Provider>
  );
};
