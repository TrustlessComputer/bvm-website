import CMempoolApi from '@/services/api/mempool';
import {
  isValidBTCTxHash,
  isValidERC20TxHash,
  isValidFractalBTCTxHash,
} from '@/utils/form-validate';
import { useParams } from 'next/navigation';
import React, {
  PropsWithChildren,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';

export interface IL2RollupExplorerContext {
  address: string;
  isBTCTxAddress: boolean;
  isERC20TxAddress: boolean;
  fbBlockCount: number;
}

const initialValue: IL2RollupExplorerContext = {
  address: '',
  isBTCTxAddress: false,
  isERC20TxAddress: false,
  fbBlockCount: 0,
};

export const L2RollupExplorerContext =
  React.createContext<IL2RollupExplorerContext>(initialValue);

export const L2RollupExplorerProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const params = useParams();

  const address = useMemo(() => params?.id as string, [params]);
  const mempoolApi = useRef(new CMempoolApi()).current;

  const [fbBlockCount, setFbBlockCount] = useState(0);

  const isBTCTxAddress = useMemo(() => isValidBTCTxHash(address), [address]);
  const isERC20TxAddress = useMemo(
    () => isValidERC20TxHash(address),
    [address],
  );

  useEffect(() => {
    getFbBlockCount();
  }, []);

  const getFbBlockCount = async () => {
    try {
      const data = await mempoolApi.getFBMiningPool();
      if (data) setFbBlockCount(data?.blockCount);
    } catch (error) {}
  };

  const contextValues = React.useMemo((): IL2RollupExplorerContext => {
    return { address, isBTCTxAddress, isERC20TxAddress, fbBlockCount };
  }, [address, isBTCTxAddress, isERC20TxAddress, fbBlockCount]);

  return (
    <L2RollupExplorerContext.Provider value={contextValues}>
      {children}
    </L2RollupExplorerContext.Provider>
  );
};
