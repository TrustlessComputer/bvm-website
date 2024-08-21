import useFlowStore, { AppNode } from '@/modules/blockchains/Buy/stores/useFlowStore';
import LocalStorage from '@/libs/localStorage';
import React, { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { STORAGE_KEYS } from '@constants/storage-key';
import { useReactFlow } from '@xyflow/react';
import { needReactFlowRenderSignal } from '@/modules/blockchains/Buy/studio/ReactFlowRender';
import useDapps from '@/modules/blockchains/Buy/hooks/useDapps';
import { draggedDappIndexesSignal, draggedIds2DSignal } from '@/modules/blockchains/Buy/signals/useDragSignal';

function useHandleReloadNode() {
  const { nodes, setNodes, setEdges, edges, onNodesChange } = useFlowStore();
  const [rfInstance, setRfInstance] = useState<any>(null);
  const { setViewport } = useReactFlow();
  React.useEffect(()=>{
    onSave();
  },[nodes.length]);

  const onRestore = useCallback(async () => {
    const restoreFlow = async () => {
      const flow = LocalStorage.getItem(STORAGE_KEYS.LAST_NODES);
      const signals = LocalStorage.getItem(STORAGE_KEYS.USE_DRAG_SIGNALS) || {};
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes);
        setEdges(flow.edges);
        draggedDappIndexesSignal.value = signals.draggedDappIndexesSignal
        draggedIds2DSignal.value = signals.draggedIds2DSignal
        await setViewport({ x, y, zoom });
      }
    };

    await restoreFlow();
  }, []);

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      const signals = {
        draggedDappIndexesSignal,
        draggedIds2DSignal,
      };
      LocalStorage.setItem(STORAGE_KEYS.LAST_NODES, JSON.stringify(flow));
      LocalStorage.setItem(STORAGE_KEYS.USE_DRAG_SIGNALS, JSON.stringify(signals));
    }
  }, [rfInstance]);

  return {
    setRfInstance,
    onRestore,
    rfInstance,
    onSave,
  }
}

export default useHandleReloadNode;
