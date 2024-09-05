'use client';
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { FeesMempoolBlocks, IBlock, IConfirmedBlock } from '@/modules/l2-rollup-detail/MemPool/interface';
import CMemPoolAPI from '@/services/api/heartbeats/mempool';
import uniqBy from 'lodash/uniqBy';

export interface IMemPoolContext {
  selectedBlock: IBlock | undefined;
  setSelectedBlock: any;
  pendingBlocks: FeesMempoolBlocks[];
  confirmedBlocks: IConfirmedBlock[];
  fetchConfirmedBlocks: any;
}

const initialValue: IMemPoolContext = {
  selectedBlock: undefined,
  setSelectedBlock: () => {},
  pendingBlocks: [],
  confirmedBlocks: [],
  fetchConfirmedBlocks: () => {},
};

export const MemPoolContext =
  React.createContext<IMemPoolContext>(initialValue);

export const MemPoolProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const memPoolApi = new CMemPoolAPI();

  const [selectedBlock, setSelectedBlock] = useState<IBlock | undefined>(undefined);
  const [pendingBlocks, setPendingBlocks] = useState<FeesMempoolBlocks[]>([]);
  const [confirmedBlocks, setConfirmedBlocks] = useState<IConfirmedBlock[]>([]);

  const [isLoadingConfirmedBlock, setIsLoadingConfirmedBlocks] = useState(false);

  useEffect(() => {
    fetchPendingBlocks();
    fetchConfirmedBlocks();
    const interval = setInterval(() => {
      fetchPendingBlocks();
      // fetchConfirmedBlocks();
    }, 60000);
    return () => {
      clearInterval(interval);
    }
  }, []);

  const fetchPendingBlocks = async () => {
    try {
      const res = await memPoolApi.getPendingBlocks();
      setPendingBlocks(res);
    } catch (e) {}
  }

  const fetchConfirmedBlocks = useCallback(async (loadMore?: boolean) => {
    try {
      if(isLoadingConfirmedBlock) {
        return;
      }

      setIsLoadingConfirmedBlocks(true);
      let blockNumber = '';
      if(loadMore) {
        const lastBlock: IConfirmedBlock = confirmedBlocks[confirmedBlocks.length - 1];
        blockNumber = lastBlock.height.toString();
      }
      let res = await memPoolApi.getConfirmedBlocks(blockNumber);
      res = loadMore ? [...confirmedBlocks, ...res] : res;
      res = uniqBy(res, (block: IConfirmedBlock) => block.height);

      setConfirmedBlocks(res);
    } catch (e) {
      console.log('fetchConfirmedBlocks eeee', e);
    } finally {
      setIsLoadingConfirmedBlocks(false);
    }
  }, [confirmedBlocks, isLoadingConfirmedBlock]);

  const contextValues = React.useMemo((): IMemPoolContext => {
    return {
      selectedBlock,
      setSelectedBlock,
      pendingBlocks,
      confirmedBlocks,
      fetchConfirmedBlocks,
    };
  }, [
    selectedBlock,
    setSelectedBlock,
    pendingBlocks,
    confirmedBlocks,
    fetchConfirmedBlocks
  ]);

  return (
    <MemPoolContext.Provider value={contextValues}>
      {children}
    </MemPoolContext.Provider>
  );
};
