import useOrderFormStoreV3 from '@/modules/blockchains/Buy/stores/index_v3';
import { useEffect } from 'react';
import useFlowStore from '@/modules/blockchains/Buy/stores/useFlowStore';


export default function useRemoveBridgeNode() {
  const { field } = useOrderFormStoreV3();
  const {nodes, setNodes} = useFlowStore()

  useEffect(() => {
    if(Array.isArray(field['bridge_apps']?.value) && field['bridge_apps']?.value.length > 0) {
      const index = nodes.findIndex(node => node.id == 'bridge_apps')

      if(index != -1){
        nodes.splice(index, 1);
        setNodes([...nodes]);
      }
    }
  }, [field['bridge_apps']]);
}
