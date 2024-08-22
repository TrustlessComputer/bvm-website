import useOrderFormStoreV3 from '@/modules/blockchains/Buy/stores/index_v3';
import useFlowStore from '@/modules/blockchains/Buy/stores/useFlowStore';
import { useEffect } from 'react';
import useFormChain from './useFormChain';

export default function useRemoveBridgeNode() {
  const { field } = useOrderFormStoreV3();
  const { nodes, setNodes } = useFlowStore();
  const { getCurrentFieldFromChain } = useFormChain();

  useEffect(() => {
    console.log('HEHEHEHEHEH', getCurrentFieldFromChain('bridge_apps'));
    if (!getCurrentFieldFromChain('bridge_apps')) {
      const index = nodes.findIndex((node) => node.id == 'bridge_apps');

      if (index != -1) {
        nodes.splice(index, 1);
        setNodes([...nodes]);
      }
    }
  }, [field['bridge_apps']]);
}
