'use client';
import React, { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { FeesMempoolBlocks, IBlock, IConfirmedBlock } from '@/modules/l2-rollup-detail/MemPool/interface';
import CMemPoolAPI from '@/services/api/heartbeats/mempool';
import uniqBy from 'lodash/uniqBy';
import { mapConfirmedBlockToBlock, mapPendingBlockToBlock } from '@/modules/l2-rollup-detail/MemPool/utils';
import dayjs from 'dayjs';
import { compareString } from '@utils/string';
import differenceBy from 'lodash/differenceBy';

export interface IMemPoolContext {
  selectedBlock?: IBlock;
  pendingBlocks: IBlock[];
  confirmedBlocks: IBlock[];
  fetchConfirmedBlocks: any;
  idSelectedPendingBlock: string;
  setIdSelectedPendingBlock: any;
  idSelectedConfirmedBlock: string;
  setIdSelectedConfirmedBlock: any;
  newConfirmedBlocks: IBlock[];
}

const initialValue: IMemPoolContext = {
  selectedBlock: undefined,
  pendingBlocks: [],
  confirmedBlocks: [],
  fetchConfirmedBlocks: () => {},
  idSelectedPendingBlock: '',
  setIdSelectedPendingBlock: () => {},
  idSelectedConfirmedBlock: '',
  setIdSelectedConfirmedBlock: () => {},
  newConfirmedBlocks: [],
};

export const MemPoolContext =
  React.createContext<IMemPoolContext>(initialValue);

export const MemPoolProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const memPoolApi = new CMemPoolAPI();

  const [pendingBlocks, setPendingBlocks] = useState<IBlock[]>([]);
  const [confirmedBlocks, setConfirmedBlocks] = useState<IBlock[]>([]);
  const [newConfirmedBlocks, setNewConfirmedBlocks] = useState<IBlock[]>([]);

  const [isLoadingConfirmedBlock, setIsLoadingConfirmedBlocks] = useState(false);
  const [memPoolData, setMemPoolData] = useState(null);
  const [idSelectedPendingBlock, setIdSelectedPendingBlock] = useState('');
  const [idSelectedConfirmedBlock, setIdSelectedConfirmedBlock] = useState('');

  const selectedBlock = useMemo(() => {
    if(idSelectedPendingBlock !== '') {
      return pendingBlocks.find(block => compareString(block.id, idSelectedPendingBlock));
    }

    if(idSelectedConfirmedBlock !== '') {
      return confirmedBlocks.find(block => compareString(block.id, idSelectedConfirmedBlock));
    }

    return undefined;
  }, [idSelectedPendingBlock, idSelectedConfirmedBlock, pendingBlocks]);

  useEffect(() => {
    fetchPendingBlocks();
    fetchConfirmedBlocks();
  }, []);

  const fetchPendingBlocks = async () => {
    try {
      const res = (await memPoolApi.getPendingBlocks()) as FeesMempoolBlocks[];
      const data = res.map((block:FeesMempoolBlocks, i) => {
        const now = dayjs();
        const timestamp = now.add( (i + 1) * 10 - (i > 2 ? 2 : 1), 'minutes').unix();
        return mapPendingBlockToBlock(block, i.toString(), timestamp);
      }).reverse();

      setPendingBlocks(data);
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
        const lastBlock: IBlock = confirmedBlocks[confirmedBlocks.length - 1];
        blockNumber = (lastBlock.height as number).toString();
      }

      const res = (await memPoolApi.getConfirmedBlocks(blockNumber)) as IConfirmedBlock[];
      let data = res?.map(block => {
        return mapConfirmedBlockToBlock(block);
      })

      data = loadMore ? [...confirmedBlocks, ...data] : data;
      data = uniqBy(data, (block: IBlock) => block.height);

      setConfirmedBlocks(data);
    } catch (e) {
      console.log('fetchConfirmedBlocks eeee', e);
    } finally {
      setIsLoadingConfirmedBlocks(false);
    }
  }, [confirmedBlocks, isLoadingConfirmedBlock]);

  useEffect(() => {
    let ws: WebSocket;
    let heartbeatInterval: any;
    let reconnectInterval = 1000;  // Start with 1 second
    const maxReconnectInterval = 10000;  // Maximum delay for reconnection (10 seconds)

    function startHeartbeat() {
      heartbeatInterval = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'ping' }));  // Sending a ping to the server
        }
      }, 5000);  // Send ping every 5 seconds
    }

    function stopHeartbeat() {
      clearInterval(heartbeatInterval);
    }

    const connectWebSocket = () => {
      ws = new WebSocket('wss://mempool.space/api/v1/ws');

      ws.onopen = () => {
        console.log('WebSocket connection opened');
        reconnectInterval = 1000;  // Reset reconnect interval
        startHeartbeat();  // Start sending pings
        ws.send(
          JSON.stringify({
            action: 'init',
            data: 'blocks',
          })
        );
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMemPoolData(data);
        console.log('Received data:', data);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        ws.close();  // Close connection on error
      };

      ws.onclose = () => {
        console.log('WebSocket closed. Reconnecting...');
        stopHeartbeat();  // Stop sending pings
        setTimeout(() => {
          reconnectInterval = Math.min(maxReconnectInterval, reconnectInterval * 2);
          connectWebSocket();
        }, reconnectInterval);
      };
    };

    connectWebSocket();

    return () => {
      if (ws) ws.close();
    };
  }, []);

  useEffect(() => {
    if(memPoolData) {
      if(memPoolData['mempool-blocks']) {
        const res = memPoolData['mempool-blocks'] as FeesMempoolBlocks[];
        const data = res.map((block:FeesMempoolBlocks, i) => {
          const now = dayjs();
          const timestamp = now.add( (i + 1) * 10 - (i > 2 ? 2 : 1), 'minutes').unix();
          return mapPendingBlockToBlock(block, i.toString(), timestamp);
        }).reverse();
        setPendingBlocks(data);
      }

      if(memPoolData['blocks']) {
        const res = memPoolData['blocks'] as IConfirmedBlock[];
        const data = res?.map(block => {
          return mapConfirmedBlockToBlock(block);
        })

        let newBlocks = differenceBy(data, confirmedBlocks, 'id');
        newBlocks = differenceBy(newBlocks, newConfirmedBlocks, 'id');

        setNewConfirmedBlocks([...newBlocks, ...newConfirmedBlocks]);
      }
    }
  }, [memPoolData]);

  const contextValues = React.useMemo((): IMemPoolContext => {
    return {
      selectedBlock,
      pendingBlocks,
      confirmedBlocks,
      fetchConfirmedBlocks,
      idSelectedPendingBlock,
      setIdSelectedPendingBlock,
      idSelectedConfirmedBlock,
      setIdSelectedConfirmedBlock,
      newConfirmedBlocks
    };
  }, [
    selectedBlock,
    pendingBlocks,
    confirmedBlocks,
    fetchConfirmedBlocks,
    idSelectedPendingBlock,
    setIdSelectedPendingBlock,
    idSelectedConfirmedBlock,
    setIdSelectedConfirmedBlock,
    newConfirmedBlocks
  ]);

  return (
    <MemPoolContext.Provider value={contextValues}>
      {children}
    </MemPoolContext.Provider>
  );
};
