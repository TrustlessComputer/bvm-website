import {
  isValidBTCTxHash,
  isValidERC20TxHash,
  isValidFractalBTCTxHash,
} from '@/utils/form-validate';
import { useParams } from 'next/navigation';
import React, { PropsWithChildren, useMemo } from 'react';

export interface IL2RollupExplorerContext {
  address: string;
  isBTCTxAddress: boolean;
  isERC20TxAddress: boolean;
  isFBTxAddress: boolean;
}

const initialValue: IL2RollupExplorerContext = {
  address: '',
  isBTCTxAddress: false,
  isERC20TxAddress: false,
  isFBTxAddress: false,
};

export const L2RollupExplorerContext =
  React.createContext<IL2RollupExplorerContext>(initialValue);

export const L2RollupExplorerProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const params = useParams();

  const address = useMemo(() => params?.id as string, [params]);

  const isFBTxAddress = useMemo(
    () => isValidFractalBTCTxHash(address),
    [address],
  );
  const isBTCTxAddress = useMemo(
    () => isValidBTCTxHash(address) || isFBTxAddress,
    [address, isFBTxAddress],
  );
  const isERC20TxAddress = useMemo(
    () => isValidERC20TxHash(address),
    [address],
  );

  const contextValues = React.useMemo((): IL2RollupExplorerContext => {
    return { address, isBTCTxAddress, isERC20TxAddress, isFBTxAddress };
  }, [address, isBTCTxAddress, isERC20TxAddress, isFBTxAddress]);

  return (
    <L2RollupExplorerContext.Provider value={contextValues}>
      {children}
    </L2RollupExplorerContext.Provider>
  );
};
