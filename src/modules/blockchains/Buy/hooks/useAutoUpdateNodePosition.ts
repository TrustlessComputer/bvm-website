import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import CDappAPI from '@/services/api/dapp';
import { DappNode } from '@/types/node';
import React from 'react';
import useFlowStore, { AppNode } from '../stores/useFlowStore';

const useAutoUpdateNodePosition = () => {
  const dappApi = new CDappAPI();

  const { nodes } = useFlowStore();
  const { l2ServiceUserAddress } = useWeb3Auth();

  const timeoutRef = React.useRef<any>(null);

  const update = async () => {
    console.log('[useAutoUpdateNodePosition] update', {
      nodes,
    });

    const promises: any[] = [];

    nodes.forEach((node: AppNode) => {
      const _node = node as unknown as AppNode;

      if (_node.data.node !== 'dapp' || !l2ServiceUserAddress) return;

      const { data } = _node as DappNode;
      if (data.dapp.isDefaultDapp || !!!data.positionId) return;

      promises.push(
        dappApi.updatePosition({
          app_code: data.dapp.key as any,
          user_address: l2ServiceUserAddress,
          id: data.itemId as any,
          position_id: data.positionId as any,
          position_x: node.position.x,
          position_y: node.position.y,
        }),
      );

      console.log('[useAutoUpdateNodePosition] update -> forEach', {
        app_code: data.dapp.key as any,
        user_address: l2ServiceUserAddress,
        id: data.itemId as any,
        position_id: data.positionId as any,
        position_x: node.position.x,
        position_y: node.position.y,
      });
    });

    await Promise.all(promises);
  };

  React.useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      update();
    }, 1000);
  }, [nodes]);
};

export default useAutoUpdateNodePosition;
